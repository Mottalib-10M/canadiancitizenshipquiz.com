/**
 * Examens blancs de citoyenneté canadienne : tirage reproductible (graine dans l'URL partagée) et
 * correction selon la règle d'IRCC (15 bonnes réponses sur 20), lue dans params-2026.json. Les questions sont écrites par Radif Partners à partir
 * des faits des guides officiels (data/questions/*.json) ; aucune n'est copiée d'un livre ni d'une appli.
 */
import P from '../../data/params-2026.json';

export type Country = 'ca';
export interface Question {
  id: string;
  country: Country;
  lang: 'en' | 'fr';
  /** chapitre ou partie du guide officiel où se trouve le fait */
  chapter: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
  /** où vérifier le fait : document officiel + section */
  ref: { doc: string; section: string; url: string };
}
export interface Exam { country: Country; seed: number; questions: Question[] }
export interface Score {
  correct: number;
  total: number;
  pass: boolean;
  needed: number;
}

/** Générateur pseudo-aléatoire mulberry32 : même graine, même examen (lien partageable, hydratation). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pick<T>(xs: T[], n: number, r: () => number): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export function examSize(_c: Country = 'ca'): number {
  return P.ca.test.questions;
}
export function passNeeded(_c: Country = 'ca'): number {
  return P.ca.test.passCorrect;
}

export function buildExam(bank: Question[], country: Country, seed: number): Exam {
  const n = examSize(country);
  if (bank.length < n) throw new Error('banque trop petite');
  return { country, seed, questions: pick(bank, n, rng(seed)) };
}

/** answers[i] = index choisi pour la question i, ou null si sans réponse (compte comme faux). */
export function score(exam: Exam, answers: (number | null)[]): Score {
  const correct = exam.questions.reduce((s, q, i) => s + (answers[i] === q.answer ? 1 : 0), 0);
  const needed = passNeeded(exam.country);
  return { correct, total: exam.questions.length, needed, pass: correct >= needed };
}

/** Contrôle d'une banque : identifiants uniques, réponse dans les options, source renseignée. */
export function lintBank(bank: Question[]): string[] {
  const errs: string[] = [];
  const seen = new Set<string>();
  for (const q of bank) {
    if (seen.has(q.id)) errs.push(`${q.id} : identifiant en double`);
    seen.add(q.id);
    if (q.options.length < 2 || q.answer < 0 || q.answer >= q.options.length) errs.push(`${q.id} : réponse hors des options`);
    if (new Set(q.options).size !== q.options.length) errs.push(`${q.id} : options en double`);
    if (!q.ref?.doc || !q.ref?.section || !q.ref?.url) errs.push(`${q.id} : source manquante`);
    if (!q.explain || q.explain.length < 20) errs.push(`${q.id} : explication trop courte`);
  }
  return errs;
}

/** Practice set: `n` questions of one chapter (or of the whole bank when `chapter` is null), same seed → same set. */
export function buildPractice(bank: Question[], chapter: string | null, seed: number, n = 10): Question[] {
  const own = chapter ? bank.filter((q) => q.chapter === chapter) : bank;
  return pick(own, Math.min(n, own.length), rng(seed));
}
/** Stable seed from a text (page id): the build and the browser draw the same first test. */
export function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
}
