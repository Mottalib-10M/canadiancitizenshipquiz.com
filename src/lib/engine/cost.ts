/**
 * Coût officiel d'une demande de citoyenneté canadienne, poste par poste, d'après la liste des frais
 * d'IRCC (params-2026.json). Tout ce qui n'a pas de barème officiel (test de langue, traductions,
 * photos) est saisi par l'utilisateur, jamais estimé ici.
 */
import P from '../../data/params-2026.json';

export interface Line { id: string; amount: number; each?: number; count?: number }
export interface Cost { currency: 'CAD'; lines: Line[]; total: number }
const sum = (lines: Line[]) => lines.reduce((s, l) => s + l.amount, 0);

export interface CaCostInput {
  adults: number;
  minors: number;
  /** frais saisis par l'utilisateur (test de langue, traductions, photos…) */
  other: number;
  /** certificats de citoyenneté demandés plus tard (preuve, 75 $ chacun) : facultatif */
  certificates?: number;
}
export function caCost(x: CaCostInput): Cost {
  const F = P.ca.fees;
  const lines: Line[] = [];
  if (x.adults > 0) {
    lines.push({ id: 'adultProcessing', each: F.adultProcessing, count: x.adults, amount: F.adultProcessing * x.adults });
    lines.push({ id: 'rightOfCitizenship', each: F.rightOfCitizenship, count: x.adults, amount: F.rightOfCitizenship * x.adults });
  }
  if (x.minors > 0) lines.push({ id: 'minor', each: F.minor, count: x.minors, amount: F.minor * x.minors });
  if (x.certificates && x.certificates > 0) lines.push({ id: 'certificate', each: F.certificate, count: x.certificates, amount: F.certificate * x.certificates });
  if (x.other > 0) lines.push({ id: 'other', amount: x.other });
  return { currency: 'CAD', lines, total: sum(lines) };
}
