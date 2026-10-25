/**
 * Date à partir de laquelle on peut demander la citoyenneté canadienne : présence effective de
 * 1 095 jours sur les 5 ans qui précèdent la demande (Loi sur la citoyenneté, al. 5(1)c)).
 *
 * Moteur pur : toutes les limites viennent de params-2026.json (P), « aujourd'hui » est un argument.
 * Ne juge que la condition de séjour (et l'âge) : caractère, langue, test et impôts sont rappelés
 * comme conditions à remplir, jamais tranchés ici.
 */
import P from '../../data/params-2026.json';
import { type Iso, type Trip, addDays, addYears, dayNum, maxIso, totalAbsent } from './dates';

export interface Check {
  id: string;
  ok: boolean;
  /** valeur constatée (jours, date…) et limite de la règle, pour l'affichage */
  value?: number | Iso | null;
  limit?: number | Iso;
  /** à moins de `near` jours de la limite : le résultat dépend du relevé exact des dates */
  near?: boolean;
}
export interface Verdict {
  /** date de demande examinée */
  on: Iso;
  ok: boolean;
  checks: Check[];
}
export interface Earliest {
  /** première date de dépôt possible à partir de `today` (null si aucune dans l'horizon) */
  date: Iso | null;
  verdictToday: Verdict;
  verdictAtDate: Verdict | null;
}

const NEAR = 5; // jours : marge sous laquelle on conseille de vérifier les tampons et relevés officiels
const HORIZON_DAYS = 365 * 20;

function search(today: Iso, start: Iso, test: (on: Iso) => Verdict): Earliest {
  const verdictToday = test(today);
  let d = maxIso(today, start);
  const stop = dayNum(today) + HORIZON_DAYS;
  while (dayNum(d) <= stop) {
    const v = test(d);
    if (v.ok) return { date: d, verdictToday, verdictAtDate: v };
    d = addDays(d, 1);
  }
  return { date: null, verdictToday, verdictAtDate: null };
}

/* ------------------------------------------------------------------ Canada */
export interface CaInput {
  /** date où la résidence permanente a été obtenue */
  pr: Iso;
  /** début du séjour autorisé avant la RP (résident temporaire ou personne protégée), null sinon */
  tempStart: Iso | null;
  birth?: Iso | null;
  trips: Trip[];
}
export interface CaCount { prDays: number; preDays: number; preCredit: number; total: number }
/** Jours crédités dans les 5 ans qui précèdent la date de demande (le jour de la demande ne compte pas). */
export function caCount(x: CaInput, on: Iso): CaCount {
  const C = P.ca.presence;
  const wFrom = addYears(on, -C.windowYears), wTo = addDays(on, -1);
  const span = (a: Iso, b: Iso) => (b >= a ? dayNum(b) - dayNum(a) + 1 - totalAbsent(x.trips, a, b) : 0);
  const prDays = x.pr <= wTo ? span(maxIso(x.pr, wFrom), wTo) : 0;
  const preDays = x.tempStart ? span(maxIso(x.tempStart, wFrom), addDays(x.pr < wTo ? x.pr : addDays(wTo, 1), -1)) : 0;
  const preCredit = Math.min(C.preprMaxCredit, preDays * C.preprFactor);
  return { prDays, preDays, preCredit, total: prDays + preCredit };
}
export function caVerdict(x: CaInput, on: Iso): Verdict {
  const C = P.ca.presence;
  const n = caCount(x, on);
  const checks: Check[] = [
    { id: 'pr', ok: x.pr < on, value: x.pr, limit: on },
    { id: 'presence', ok: n.total >= C.requiredDays, value: n.total, limit: C.requiredDays, near: Math.abs(n.total - C.requiredDays) <= NEAR },
  ];
  if (x.birth) checks.push({ id: 'age', ok: addYears(x.birth, 18) <= on, value: x.birth, limit: addYears(on, -18) });
  return { on, ok: checks.every((c) => c.ok), checks };
}
export function caEarliest(x: CaInput, today: Iso): Earliest {
  // Au mieux 365 jours crédités avant la RP : jamais avant RP + 730 jours.
  const start = addDays(x.pr, P.ca.presence.requiredDays - P.ca.presence.preprMaxCredit);
  return search(today, start, (on) => caVerdict(x, on));
}
