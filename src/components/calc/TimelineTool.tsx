/**
 * Citizenship timeline, step by step, placed from the day the application is signed. Only dates that
 * follow from a published rule are computed (eligibility window, 90-day paper limit, 30-day test
 * period, ceremony notice and rescheduling limit); the steps whose date depends on IRCC's processing
 * are shown in order with "date set by IRCC" and never with an estimated delay.
 * First render = example dates (RECETTE §17.5).
 */
import { useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { addDays, addYears, dayNum } from '../../lib/engine/dates';
import { dateL, langTag } from '../../lib/format-l';
import P from '../../data/params-2026.json';

type Lang = 'en' | 'fr';
const iso = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);
const T = {
  en: {
    sign: 'Day you sign the application', mode: 'How you apply', online: 'Online, in your IRCC account', paper: 'On paper, by mail', age: 'Your age that day', inv: 'Test invitation received on (if any)', cer: 'Ceremony date in your invitation (if any)',
    head: 'Your citizenship path, step by step', byIrcc: 'date set by IRCC', none: 'not needed at your age',
    s: {
      window: 'Eligibility window for the 1,095 days', sign: 'Application dated and signed', paperLimit: 'Paper file must reach IRCC by', online: 'Submitted online: confirmation email (not yet the acknowledgement)',
      aor: 'Acknowledgement of receipt: the file is complete and processing starts', test: 'Citizenship test: 30-day period, 3 attempts', testEnd: 'Last day of your test period', interview: 'Possible interview with an official',
      cerNotice: 'Ceremony invitation arrives at least 1 week before', cer: 'Citizenship ceremony and oath', resched: 'Last day to ask for a new ceremony date',
    },
    note: 'No processing time is estimated here: IRCC sets the date of each step that depends on its review.',
  },
  fr: {
    sign: 'Jour de la signature de la demande', mode: 'Mode de dépôt', online: 'En ligne, dans le compte IRCC', paper: 'Sur papier, par la poste', age: 'Votre âge ce jour-là', inv: 'Invitation à l’examen reçue le (s’il y a lieu)', cer: 'Date de cérémonie indiquée dans l’invitation (s’il y a lieu)',
    head: 'Votre parcours vers la citoyenneté, étape par étape', byIrcc: 'date fixée par IRCC', none: 'non exigé à votre âge',
    s: {
      window: 'Période d’admissibilité des 1 095 jours', sign: 'Demande datée et signée', paperLimit: 'Le dossier papier doit parvenir à IRCC au plus tard le', online: 'Envoi en ligne : courriel de confirmation (ce n’est pas encore l’accusé de réception)',
      aor: 'Accusé de réception : dossier complet, traitement commencé', test: 'Examen de citoyenneté : période de 30 jours, 3 essais', testEnd: 'Dernier jour de votre période d’examen', interview: 'Entrevue possible avec un agent',
      cerNotice: 'L’invitation à la cérémonie arrive au moins 1 semaine avant', cer: 'Cérémonie de citoyenneté et serment', resched: 'Dernier jour pour demander une autre date de cérémonie',
    },
    note: 'Aucun délai de traitement n’est estimé ici : IRCC fixe la date de chaque étape qui dépend de son examen du dossier.',
  },
} as const;
interface Props { lang?: Lang; idPrefix?: string; secondary?: boolean }
export default function TimelineTool({ lang = 'en', idPrefix = 't', secondary = false }: Props) {
  const L = T[lang];
  const [sign, setSign] = useState('2026-11-16');
  const [mode, setMode] = useState('online');
  const [age, setAge] = useState(38);
  const [inv, setInv] = useState('');
  const [cer, setCer] = useState('');
  const A = P.ca.application, TT = P.ca.test, CE = P.ca.ceremony;
  const ok = iso(sign);
  const d = (x: string) => dateL(x, lang);
  const needTest = age >= TT.ages[0] && age <= TT.ages[1];
  const rows: Array<[string, string]> = ok ? [
    [L.s.window, `${d(addYears(sign, -P.ca.presence.windowYears))} → ${d(addDays(sign, -1))}`],
    [L.s.sign, d(sign)],
    mode === 'paper' ? [L.s.paperLimit, d(addDays(sign, A.returnAfterDays))] : [L.s.online, d(sign)],
    [L.s.aor, L.byIrcc],
    [L.s.test, !needTest ? L.none : iso(inv) ? `${d(inv)} → ${d(addDays(inv, TT.onlineWindowDays))}` : L.byIrcc],
    [L.s.interview, L.byIrcc],
    [L.s.cerNotice, iso(cer) ? d(addDays(cer, -7 * CE.noticeWeeks)) : L.byIrcc],
    [L.s.cer, iso(cer) ? d(cer) : L.byIrcc],
  ] : [];
  if (ok && iso(cer)) rows.push([L.s.resched, d(addDays(cer, -CE.rescheduleDays))]);
  const tooOld = ok && iso(cer) && dayNum(cer) < dayNum(sign);
  const input = 'h-12 w-full min-w-0 rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20';
  const date = (id: string, label: string, v: string, set: (x: string) => void) => (
    <div className="grid min-w-0 grid-rows-subgrid row-span-3 content-start gap-y-0"><label htmlFor={`${idPrefix}-${id}`} className="mb-1 block text-sm font-medium text-navy-700">{label}</label><input id={`${idPrefix}-${id}`} type="date" value={v} onChange={(e) => set(e.target.value)} className={input} /><span /></div>
  );
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_380px]" {...(secondary ? { 'data-simulateur-secondaire': '' } : {})}>
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
        {date('sign', L.sign, sign, setSign)}
        <SelectField id={`${idPrefix}-mode`} label={L.mode} value={mode} onChange={setMode} options={[{ value: 'online', label: L.online }, { value: 'paper', label: L.paper }]} />
        <NumberField id={`${idPrefix}-age`} label={L.age} value={age} onChange={(x) => setAge(Math.round(x))} max={120} unit={lang === 'fr' ? 'ans' : 'yrs'} tag={langTag(lang)} />
        {date('inv', L.inv, inv, setInv)}
        {date('cer', L.cer, cer, setCer)}
      </form>
      <div {...(secondary ? {} : { 'data-resultat': '' })} aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <ol className="mt-2 space-y-2 text-sm">
          {rows.map(([k, v], i) => (
            <li key={i} className="border-l-2 border-accent-600 pl-3"><span className="block text-navy-700">{i + 1}. {k}</span><span className={`block font-semibold ${v === L.byIrcc || v === L.none ? 'text-navy-600' : 'text-navy-900'}`}>{v}</span></li>
          ))}
        </ol>
        {tooOld && <p className="mt-2 text-xs text-amber-800">{lang === 'fr' ? 'La date de cérémonie précède la signature : vérifiez les dates.' : 'The ceremony date is before the signing date: check the dates.'}</p>}
        <p className="mt-3 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
