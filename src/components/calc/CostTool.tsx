/**
 * Official cost of a Canadian citizenship application for a household, line by line, from the IRCC
 * fee list (params-2026.json). Costs without an official scale (language test, translations, photos)
 * are typed by the visitor, never estimated.
 */
import { useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import { caCost } from '../../lib/engine/cost';
import { money, langTag } from '../../lib/format-l';

type Lang = 'en' | 'fr';
const T = {
  en: {
    adults: 'Adults (18 or over) applying', minors: 'Children under 18 applying', other: 'Your own extra costs (language test, translations, photos)',
    head: 'Fees for the whole family', l: { adultProcessing: 'Processing fee, adult', rightOfCitizenship: 'Right of citizenship fee', minor: 'Fee for a minor', certificate: 'Citizenship certificate', other: 'Your extra costs' } as Record<string, string>,
    note: 'Paid to IRCC when you apply, from the IRCC fee list. This site collects no fee and sends no application.',
  },
  fr: {
    adults: 'Adultes (18 ans ou plus) qui demandent', minors: 'Enfants de moins de 18 ans qui demandent', other: 'Vos autres frais (test de langue, traductions, photos)',
    head: 'Frais pour toute la famille', l: { adultProcessing: 'Frais de traitement, adulte', rightOfCitizenship: 'Frais relatifs au droit de citoyenneté', minor: 'Frais pour un mineur', certificate: 'Certificat de citoyenneté', other: 'Vos autres frais' } as Record<string, string>,
    note: 'Payés à IRCC au dépôt de la demande, d’après la liste des frais d’IRCC. Ce site ne perçoit aucun frais et ne transmet aucune demande.',
  },
} as const;
interface Props { lang?: Lang; idPrefix?: string }
export default function CostTool({ lang = 'en', idPrefix = 'c' }: Props) {
  const L = T[lang];
  const [v, setV] = useState({ adults: 2, minors: 1, other: 0 });
  const set = (k: keyof typeof v) => (x: number) => setV((o) => ({ ...o, [k]: Math.round(x) }));
  const cost = useMemo(() => caCost({ adults: v.adults, minors: v.minors, other: v.other }), [v]);
  const tag = langTag(lang);
  const f = (id: keyof typeof v, label: string, max: number, unit = '') => <NumberField key={id} id={`${idPrefix}-${id}`} label={label} value={v[id]} onChange={set(id)} max={max} unit={unit} tag={tag} />;
  return (
    <div className="not-prose grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      <form className="grid content-start gap-x-4 gap-y-3 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>{[f('adults', L.adults, 10), f('minors', L.minors, 10), f('other', L.other, 100000, '$')]}</form>
      <div data-resultat aria-live="polite" className="h-fit rounded-xl border border-accent-200 bg-accent-50/60 p-4">
        <p className="text-sm font-medium text-navy-700">{L.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{money(cost.total, 'CAD', lang)}</p>
        <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {cost.lines.map((l) => <tr key={l.id}><td className="py-1.5 pr-2 text-navy-700">{L.l[l.id] ?? l.id}{l.count && l.count > 1 && l.each ? ` (${l.count} × ${money(l.each, 'CAD', lang)})` : ''}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{money(l.amount, 'CAD', lang)}</td></tr>)}
        </tbody></table>
        <p className="mt-2 text-xs text-navy-700">{L.note}</p>
      </div>
    </div>
  );
}
