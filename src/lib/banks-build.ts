/** Build-time access to both banks (never imported by a client component). */
import CAEN from '../data/questions/ca-en.json';
import CAFR from '../data/questions/ca-fr.json';
import type { Question } from './engine/exam';
import type { BankKey } from './banks';
export const BANKS: Record<BankKey, Question[]> = { 'ca-en': CAEN.questions as Question[], 'ca-fr': CAFR.questions as Question[] };
