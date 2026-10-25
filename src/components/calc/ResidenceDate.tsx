/**
 * "When does my 1,095th day fall?": the first date an adult meets the physical presence condition
 * for Canadian citizenship, with every trip outside Canada (past or planned) counted day by day and
 * the half-day credit for time spent in Canada before permanent residence.
 * First render = build day and example dates (RECETTE §17.5); today and a shared link after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { caCount, caEarliest, type Earliest } from '../../lib/engine/eligibility';
import { dayNum, addYears, addDays, totalAbsent, type Trip } from '../../lib/engine/dates';
import { dateL, formatNumberL } from '../../lib/format-l';
import { readParams, updateURL } from '../../lib/url-state';
import P from '../../data/params-2026.json';

declare const __BUILD_DAY__: string;
type Lang = 'en' | 'fr';
const iso = (s: string | null) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);
const T = {
  en: {
    pr: 'Day you landed as a permanent resident', before: 'Time in Canada before that day?', beforeNo: 'None, I arrived as a PR', beforeYes: 'Yes: work or study permit, visitor, protected person', temp: 'Day that earlier stay began',
    trips: 'Every trip outside Canada (taken or planned)', left: 'Departure', back: 'Return', add: 'Add another trip', remove: 'Delete trip',
    head: 'Your 1,095th day is reached on', none: 'Not within 20 years with these trips', now: 'Already reached: you meet it today', inDays: (d: number) => `${formatNumberL(d, 'en')} days from today`,
    split: 'How the window adds up on that date', prDays: 'Days present as a PR', preCredit: 'Credit for the earlier stay (½ day each)', absent: 'Whole days abroad in the window', total: 'Total credited', needed: 'Needed', window: 'Window counted',
    near: 'Your total is within 5 days of 1,095: one wrong date in a passport stamp could tip it. Keep a margin.',
    err: { order: 'One return date is earlier than its departure.', overlap: 'Two trips overlap: merge them into one.' },
    rule: 'An absence is a day with no time at all in Canada: departure and return days stay days of presence.',
    gap: (d: number) => `Still missing on today’s date: ${formatNumberL(d, 'en')} days`,
  },
  fr: {
    pr: 'Jour de votre établissement comme résident permanent', before: 'Séjour au Canada avant ce jour ?', beforeNo: 'Aucun, arrivé comme RP', beforeYes: 'Oui : permis de travail ou d’études, visiteur, personne protégée', temp: 'Début de ce séjour antérieur',
    trips: 'Chaque voyage hors du Canada (fait ou prévu)', left: 'Départ', back: 'Retour', add: 'Ajouter un voyage', remove: 'Supprimer le voyage',
    head: 'Votre 1 095e jour est atteint le', none: 'Pas dans les 20 prochaines années avec ces voyages', now: 'Déjà atteint : la condition est remplie aujourd’hui', inDays: (d: number) => `dans ${formatNumberL(d, 'fr')} jours`,
    split: 'Le détail de la période à cette date', prDays: 'Jours de présence comme RP', preCredit: 'Crédit du séjour antérieur (½ jour chacun)', absent: 'Jours entiers hors du Canada dans la période', total: 'Total crédité', needed: 'Exigé', window: 'Période comptée',
    near: 'Votre total est à moins de 5 jours du seuil de 1 095 : une seule date erronée peut le faire basculer. Gardez une marge.',
    err: { order: 'Un retour est daté avant son départ.', overlap: 'Deux voyages se chevauchent : réunissez-les en un seul.' },
    rule: 'Une absence, c’est une journée sans aucun moment au Canada : les jours de départ et de retour restent des jours de présence.',
    gap: (d: number) => `Jours manquants à la date d’aujourd’hui : ${formatNumberL(d, 'fr')}`,
  },
} as const;
const DEF = { pr: '2023-05-15', temp: '2021-09-01', trips: [{ out: '2024-12-20', back: '2025-01-10' }, { out: '2026-07-01', back: '2026-07-21' }] as Trip[] };
interface Props { lang?: Lang; idPrefix?: string; defaultBefore?: 'yes' | 'no' }

export default function ResidenceDate({ lang = 'en', idPrefix = 'd', defaultBefore = 'yes' }: Props) {
  const L = T[lang];
  const [today, setToday] = useState(__BUILD_DAY__);
  const [pr, setPr] = useState(DEF.pr);
  const [temp, setTemp] = useState(DEF.temp);
  const [opt, setOpt] = useState<string>(defaultBefore);
  const [trips, setTrips] = useState<Trip[]>(DEF.trips);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    setToday(new Date().toISOString().slice(0, 10));
    const u = readParams(window.location.search);
    const ua = u.get('a'), ub = u.get('b'), uo = u.get('o'), ut = u.get('t');
    if (iso(ua)) setPr(ua!); if (iso(ub)) setTemp(ub!); if (uo === 'yes' || uo === 'no') setOpt(uo);
    if (ut) { const tt = ut.split(',').map((x) => x.split('_')).filter(([o, k]) => iso(o) && iso(k)).map(([o, k]) => ({ out: o, back: k })); if (tt.length) setTrips(tt); }
  }, []);
  useEffect(() => { if (touched) updateURL({ a: pr, b: temp, o: opt, t: trips.filter((t) => iso(t.out) && iso(t.back)).map((t) => `${t.out}_${t.back}`).join(',') }); }, [pr, temp, opt, trips, touched]);
  const touch = <A,>(f: (x: A) => void) => (x: A) => { setTouched(true); f(x); };
  const valid = trips.filter((t) => iso(t.out) && iso(t.back));
  const err = (() => {
    const s = [...valid].sort((x, y) => (x.out < y.out ? -1 : 1));
    for (let i = 0; i < s.length; i++) { if (s[i].back! < s[i].out) return L.err.order; if (i && s[i - 1].back! > s[i].out) return L.err.overlap; }
    return null;
  })();
  const input = { pr, tempStart: opt === 'yes' && iso(temp) ? temp : null, trips: valid };
  const res: Earliest | null = useMemo(() => (err || !iso(pr) ? null : caEarliest(input, today)), [pr, temp, opt, trips, today, err]);
  const date = res?.date ?? null;
  const days = date ? dayNum(date) - dayNum(today) : null;
  const on = date && days !== null && days > 0 ? date : today;
  const cc = iso(pr) && !err ? caCount(input, on) : null;
  const wFrom = addYears(on, -P.ca.presence.windowYears), wTo = addDays(on, -1);
  const abs = cc ? totalAbsent(valid, wFrom, wTo) : 0;
  const todayCount = iso(pr) && !err ? caCount(input, today) : null;
  const missingToday = todayCount ? Math.max(0, Math.ceil(P.ca.presence.requiredDays - todayCount.total)) : 0;
  const N = (v: number) => formatNumberL(v, lang, v % 1 ? 1 : 0);
  const inputCls = 'h-12 w-full rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const field = (id: string, label: string, val: string, set: (v: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={val} onChange={(e) => set(e.target.value)} className={`${inputCls} min-w-0`} /><span /></div>
  );
  const near = cc ? Math.abs(cc.total - P.ca.presence.requiredDays) <= 5 : false;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
          {field('a', L.pr, pr, touch(setPr))}
          <SelectField id={`${idPrefix}-before`} label={L.before} value={opt} onChange={touch(setOpt)} options={[{ value: 'no', label: L.beforeNo }, { value: 'yes', label: L.beforeYes }]} />
          {opt === 'yes' && field('b', L.temp, temp, touch(setTemp))}
        </div>
        <fieldset className="rounded-xl border border-navy-200 bg-white p-4">
          <legend className="px-1 text-sm font-semibold text-navy-900">{L.trips}</legend>
          <div className="space-y-3">
            {trips.map((t, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-end gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]">
                {field(`o${i}`, L.left, t.out, touch((x: string) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, out: x } : y)))))}
                {field(`r${i}`, L.back, t.back ?? '', touch((x: string) => setTrips((o) => o.map((y, j) => (j === i ? { ...y, back: x } : y)))))}
                <button type="button" onClick={() => { setTouched(true); setTrips((o) => o.filter((_, j) => j !== i)); }} className="col-span-2 mb-0 h-12 rounded-lg border border-navy-300 px-3 text-sm text-navy-800 hover:bg-navy-50 sm:col-span-1" aria-label={`${L.remove} ${i + 1}`}>×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => { setTouched(true); setTrips((o) => [...o, { out: today, back: today }]); }} className="mt-3 h-12 rounded-lg border border-navy-300 px-4 text-sm font-medium text-navy-800 hover:bg-navy-50">+ {L.add}</button>
          {err && <p role="status" className="mt-2 text-sm font-medium text-red-700">{err}</p>}
          <p className="mt-2 text-xs text-navy-700">{L.rule}</p>
        </fieldset>
      </form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4 lg:sticky lg:top-20">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="mt-1 text-3xl font-bold text-navy-900">{res ? (date ? (days !== null && days <= 0 ? L.now : dateL(date, lang)) : L.none) : '…'}</p>
        {date && days !== null && days > 0 && <p className="text-sm text-navy-700">{L.inDays(days)}</p>}
        {cc && (
          <>
            <p className="mt-3 text-sm font-semibold text-navy-900">{L.split}</p>
            <table className="mt-1 w-full text-sm"><tbody className="divide-y divide-navy-200">
              <tr><td className="py-1.5 pr-2 text-navy-700">{L.prDays}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{N(cc.prDays)}</td></tr>
              {opt === 'yes' && <tr><td className="py-1.5 pr-2 text-navy-700">{L.preCredit}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{N(cc.preCredit)}</td></tr>}
              <tr><td className="py-1.5 pr-2 text-navy-700">{L.absent}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{N(abs)}</td></tr>
              <tr><td className="py-1.5 pr-2 font-medium text-navy-900">{L.total}</td><td className="tabular-nums py-1.5 text-right font-semibold text-navy-900">{N(Math.floor(cc.total))} / {N(P.ca.presence.requiredDays)}</td></tr>
              <tr><td className="py-1.5 pr-2 text-navy-700">{L.window}</td><td className="py-1.5 text-right text-navy-900">{dateL(wFrom, lang)} → {dateL(wTo, lang)}</td></tr>
            </tbody></table>
            {missingToday > 0 && date && days !== null && days > 0 && <p className="mt-2 text-xs text-navy-700">{L.gap(missingToday)}</p>}
            {near && <p className="mt-2 text-xs text-amber-800">{L.near}</p>}
          </>
        )}
      </div>
    </div>
  );
}
