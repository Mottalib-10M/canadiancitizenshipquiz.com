#!/usr/bin/env python3
"""Relit la liste des frais d'IRCC (section citoyenneté) et la compare à src/data/params-2026.json.

Usage : python3 scripts/update-data.py [--write]
  sans --write : affiche les écarts et sort en code 2 s'il y en a (le cron ouvre alors une alerte) ;
  avec --write : écrit data/official-latest.json (valeurs lues + date + URL), jamais params-2026.json,
                 qui ne change qu'après relecture humaine de la règle (RECETTE §17.4).

Source (aucun scraping de concurrent) : page des frais d'IRCC, ircc.canada.ca, section « Citizenship ».
Dépendances : Python 3.10+ (stdlib).
"""
import datetime as dt
import html
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PARAMS = ROOT / "src" / "data" / "params-2026.json"
OUT = ROOT / "data" / "official-latest.json"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

CA_FEES = "https://ircc.canada.ca/english/information/fees/fees.asp"


def get(url: str, ua: bool = True, tries: int = 4) -> bytes:
    import time

    req = urllib.request.Request(url, headers={"User-Agent": UA} if ua else {})
    for i in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read()
        except OSError:
            if i == tries - 1:
                raise
            time.sleep(10 * (i + 1))  # résolveur DNS ou serveur passagèrement muet


def text_of(raw: bytes) -> str:
    s = raw.decode("utf-8", errors="ignore")
    # pages SharePoint de Home Affairs : contenu en JSON échappé (\u003c…)
    s = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s).replace('\\"', '"').replace("\\n", " ").replace("\\t", " ")
    s = html.unescape(s)
    s = re.sub(r"(?s)<script.*?</script>|<style.*?</style>", " ", s)
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", s).replace("\xa0", " "))


def money(s: str) -> int:
    return int(round(float(s.replace(",", ""))))


OTHER = {
    "statelessAdult": r"Stateless adult \(18 or over\) born to Canadian parent.{0,120}?([\d,]+\.\d\d)",
    "certificate": r"Citizenship certificate \(proof of citizenship\) \$?([\d,]+\.\d\d)",
    "recordSearch": r"Search for your record of citizenship \$?([\d,]+\.\d\d)",
    "resumeAdult": r"Resume your citizenship \(18 and over\) \$?([\d,]+\.\d\d)",
    "resumeMinor": r"Resume your citizenship \(under 18\) \$?([\d,]+\.\d\d)",
    "renounce": r"Renounce your citizenship \$?([\d,]+\.\d\d)",
}


def ca() -> dict:
    t = text_of(get(CA_FEES, ua=False))  # canada.ca refuse certains User-Agent de navigateur
    i = t.find("Citizenship - application fees Fees")
    if i < 0:
        i = t.find("Citizenship")
    seg = t[i : i + 3000]
    # la page écrit « Fees $CAN » en en-tête puis les montants sans symbole (« 653.00 »)
    adult = re.search(r"Adult \(18 and over\).{0,200}?\$?([\d,]+\.\d\d)", seg)
    minor = re.search(r"Minor \(under 18\).{0,200}?\$?([\d,]+\.\d\d)", seg)
    right = re.search(r"Right of Citizenship (?:fee )?\$?([\d,]+\.\d\d)", t)
    mod = re.search(r"Date modified: (\d{4}-\d\d-\d\d)", t)
    if not adult or not minor:
        raise RuntimeError("CA : frais introuvables dans " + CA_FEES)
    return {
        "adult": money(adult.group(1)),
        "minor": money(minor.group(1)),
        "rightOfCitizenship": money(right.group(1)) if right else None,
        **{k: (money(m.group(1)) if (m := re.search(rx, t)) else None) for k, rx in OTHER.items()},
        "dateModified": mod.group(1) if mod else None,
    }


def main() -> int:
    params = json.loads(PARAMS.read_text())
    lu = dt.date.today().isoformat()
    out, diffs, errors = {"_lu": lu}, [], []
    for key, fn, ref in (("ca", ca, params["ca"]["fees"]),):
        try:
            got = fn()
        except Exception as e:  # une source muette n'arrête pas les autres
            errors.append(f"{key}: {e}")
            continue
        out[key] = got
        for k, v in got.items():
            if k in ref and v is not None and ref[k] != v:
                diffs.append(f"{key}.{k} : params={ref[k]} → source={v}")
    for e in errors:
        print("ERREUR", e)
    for d in diffs:
        print("ÉCART ", d)
    if not diffs and not errors:
        print(f"OK : frais identiques à la liste officielle d’IRCC ({lu}).")
    if "--write" in sys.argv:
        OUT.parent.mkdir(exist_ok=True)
        OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
        print("écrit", OUT.relative_to(ROOT))
    return 2 if diffs else (1 if errors else 0)


if __name__ == "__main__":
    sys.exit(main())
