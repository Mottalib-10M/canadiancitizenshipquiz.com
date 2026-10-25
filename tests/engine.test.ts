import { describe, expect, it } from 'vitest';
import P from '../src/data/params-2026.json';
import { absentDaysIn, addYears, checkTrips, totalAbsent } from '../src/lib/engine/dates';
import { caCount, caEarliest, caVerdict } from '../src/lib/engine/eligibility';
import { buildExam, lintBank, passNeeded, score, type Question } from '../src/lib/engine/exam';
import { caCost } from '../src/lib/engine/cost';
import CAEN from '../src/data/questions/ca-en.json';
import CAFR from '../src/data/questions/ca-fr.json';

describe('comptage des absences (jours entiers seulement, instructions d’IRCC)', () => {
  it('parti le 22 septembre, revenu le 23 → aucune absence', () => {
    expect(absentDaysIn({ out: '2025-09-22', back: '2025-09-23' }, '2020-01-01', '2030-01-01')).toBe(0);
  });
  it('lundi → vendredi : mardi, mercredi, jeudi', () => {
    expect(absentDaysIn({ out: '2026-10-05', back: '2026-10-09' }, '2020-01-01', '2030-01-01')).toBe(3);
  });
  it('coupe le voyage aux bornes de la fenêtre', () => {
    expect(absentDaysIn({ out: '2026-01-01', back: '2026-01-31' }, '2026-01-10', '2026-01-19')).toBe(10);
  });
  it('voyage sans retour = dehors jusqu’au bout de la fenêtre', () => {
    expect(absentDaysIn({ out: '2026-01-01', back: null }, '2026-01-01', '2026-01-10')).toBe(9);
  });
  it('29 février → 28 février', () => {
    expect(addYears('2024-02-29', 1)).toBe('2025-02-28');
  });
  it('refuse les voyages qui se chevauchent', () => {
    expect(checkTrips([{ out: '2026-01-01', back: '2026-01-10' }, { out: '2026-01-05', back: '2026-01-07' }])).toMatch(/chevauchent/);
    expect(checkTrips([{ out: '2026-01-01', back: '2026-01-10' }, { out: '2026-01-10', back: '2026-01-12' }])).toBeNull();
  });
});

describe('Canada, présence effective de 1 095 jours', () => {
  it('RP depuis exactement 1 095 jours sans voyage → admissible le lendemain du 1 095e jour', () => {
    // 2021, 2022 et 2023 ne sont pas bissextiles ; le jour de la demande ne compte pas
    const x = { pr: '2021-01-01', tempStart: null, trips: [] };
    expect(caCount(x, '2023-12-31').total).toBe(1094);
    expect(caCount(x, '2024-01-01').total).toBe(1095);
    expect(caEarliest(x, '2023-06-01').date).toBe('2024-01-01');
  });
  it('les jours avant la RP comptent pour moitié, 365 au plus', () => {
    const x = { pr: '2024-01-01', tempStart: '2021-01-01', trips: [] };
    const n = caCount(x, '2026-01-01');
    expect(n.preCredit).toBe(365); // 1 095 jours avant la RP dans la fenêtre → plafonné
    expect(n.prDays).toBe(731);
    expect(caVerdict(x, '2026-01-01').ok).toBe(true);
  });
  it('un voyage retire seulement les jours entiers passés dehors', () => {
    const x = { pr: '2021-01-01', tempStart: null, trips: [{ out: '2022-07-01', back: '2022-07-11' }] };
    expect(caCount(x, '2024-01-01').total).toBe(1095 - 9);
    expect(caEarliest(x, '2023-06-01').date).toBe('2024-01-10');
  });
  it('jamais avant RP + 730 jours', () => {
    const x = { pr: '2025-01-01', tempStart: '2015-01-01', trips: [] };
    expect(caEarliest(x, '2025-01-02').date).toBe('2027-01-01');
  });
});

describe('examens blancs', () => {
  const synth = (n: number): Question[] =>
    Array.from({ length: n }, (_, i) => ({
      id: `ca-${i}`, country: 'ca', lang: 'en', chapter: 'x',
      q: `q${i}`, options: ['a', 'b', 'c', 'd'], answer: i % 4, explain: 'explication suffisamment longue',
      ref: { doc: 'd', section: 's', url: 'https://example.org' },
    }) as Question);
  it('20 questions, 15 bonnes pour réussir', () => {
    expect(buildExam(synth(60), 'ca', 1).questions).toHaveLength(P.ca.test.questions);
    expect(passNeeded('ca')).toBe(15);
  });
  it('même graine, même examen', () => {
    const b = synth(80);
    expect(buildExam(b, 'ca', 42).questions.map((q) => q.id)).toEqual(buildExam(b, 'ca', 42).questions.map((q) => q.id));
    expect(buildExam(b, 'ca', 42).questions.map((q) => q.id)).not.toEqual(buildExam(b, 'ca', 43).questions.map((q) => q.id));
  });
  it('15 sur 20 passe, 14 échoue, une question sans réponse compte faux', () => {
    const e = buildExam(synth(40), 'ca', 3);
    const ans = e.questions.map((q, i) => (i < 15 ? q.answer : null));
    expect(score(e, ans).pass).toBe(true);
    ans[14] = null;
    expect(score(e, ans)).toMatchObject({ pass: false, correct: 14 });
  });
  it('les banques sont propres', () => {
    for (const b of [CAEN, CAFR]) expect(lintBank(b.questions as Question[])).toEqual([]);
  });
});

describe('coûts officiels', () => {
  it('653 $ par adulte (530 + 123), 100 $ par mineur', () => {
    expect(caCost({ adults: 2, minors: 1, other: 0 }).total).toBe(2 * 653 + 100);
    expect(P.ca.fees.adultProcessing + P.ca.fees.rightOfCitizenship).toBe(P.ca.fees.adult);
  });
  it('certificats à 75 $ et frais saisis ajoutés', () => {
    expect(caCost({ adults: 0, minors: 0, other: 40, certificates: 2 }).total).toBe(150 + 40);
  });
});
