import { describe, expect, it } from 'vitest';
import { BANKS } from '../src/lib/banks-build';
import { CHAPTERS, type BankKey } from '../src/lib/banks';
import { buildExam, buildPractice, lintBank, seedOf } from '../src/lib/engine/exam';
import P from '../src/data/params-2026.json';

const keys: BankKey[] = ['ca-en', 'ca-fr'];
describe('banques complètes', () => {
  for (const k of keys) {
    it(`${k} : banque propre, chaque question dans un chapitre connu`, () => {
      expect(lintBank(BANKS[k])).toEqual([]);
      for (const q of BANKS[k]) expect(CHAPTERS[k]).toContain(q.chapter);
      for (const c of CHAPTERS[k]) expect(BANKS[k].some((q) => q.chapter === c)).toBe(true);
    });
    it(`${k} : aucun tiret cadratin, réponses réparties`, () => {
      const txt = JSON.stringify(BANKS[k]);
      expect(txt.includes('—')).toBe(false);
      const by = [0, 0, 0, 0]; BANKS[k].forEach((q) => by[q.answer]++);
      expect(Math.max(...by) / BANKS[k].length).toBeLessThan(0.4);
    });
  }
  it('tirage reproductible et série par chapitre', () => {
    const a = buildExam(BANKS['ca-en'], 'ca', seedOf('ca-test')).questions.map((q) => q.id);
    const b = buildExam(BANKS['ca-en'], 'ca', seedOf('ca-test')).questions.map((q) => q.id);
    expect(a).toEqual(b);
    expect(new Set(a).size).toBe(P.ca.test.questions);
    const p = buildPractice(BANKS['ca-fr'], CHAPTERS['ca-fr'][3], 7, 10);
    expect(p).toHaveLength(10);
    expect(p.every((q) => q.chapter === CHAPTERS['ca-fr'][3])).toBe(true);
  });
});
