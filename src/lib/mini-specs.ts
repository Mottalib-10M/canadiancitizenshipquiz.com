/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always read from
 * params-2026.json or the site's engines, never a second formula. English and Canadian French.
 */
import type { MiniSpec } from './mini-types';
import P from '../data/params-2026.json';
import { caCost } from './engine/cost';
import { money, formatNumberL, pct } from './format-l';

type L = 'en' | 'fr';
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const N = (v: number, lang: L) => formatNumberL(v, lang);
const cad = (v: number, lang: L) => money(v, 'CAD', lang);
const yn = (lang: L) => (lang === 'fr' ? [{ value: '0', label: 'Non' }, { value: '1', label: 'Oui' }] : [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }]);
const T = P.ca.test, C = P.ca.presence, F = P.ca.fees, H = P.ca.hearing;
const pl = (n: number, w: string) => `${n} ${w}${n > 1 ? 's' : ''}`;
const ple = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;

const SPECS: Record<string, (lang: L) => MiniSpec> = {
  capass: (lang) => ({
    title: lang === 'fr' ? 'Ai-je réussi l’examen de citoyenneté ?' : 'Did I pass the citizenship test?',
    cta: lang === 'fr' ? 'Faire un examen blanc complet' : 'Take a full mock test', ctaPage: 'home',
    inputs: [{ id: 'right', label: lang === 'fr' ? 'Bonnes réponses' : 'Correct answers', def: 16, max: T.questions, unit: `/ ${T.questions}` }],
    run: (v) => {
      const n = T.questions, need = T.passCorrect, r = clamp(v.right ?? 0, 0, n), ok = r >= need;
      return lang === 'fr'
        ? { head: ['Résultat', ok ? 'Réussi' : 'Échoué'], rows: [['Note de passage', `${need} sur ${n} (${pct(need / n, lang)})`], ['Votre note', pct(r / n, lang)], [ok ? 'Marge' : 'Il manque', ok ? `${pl(r - need, 'réponse')} au-dessus` : pl(need - r, 'bonne réponse').replace('bonne réponses', 'bonnes réponses')]] }
        : { head: ['Result', ok ? 'Pass' : 'Fail'], rows: [['Pass mark', `${need} of ${n} (${pct(need / n, lang)})`], ['Your score', pct(r / n, lang)], [ok ? 'Margin' : 'Missing', ok ? `${ple(r - need, 'answer')} above the mark` : `${ple(need - r, 'more correct answer')}`]] };
    },
  }),
  caattempts: (lang) => ({
    title: lang === 'fr' ? 'Combien d’essais me reste-t-il ?' : 'How many attempts do I have left?',
    cta: lang === 'fr' ? 'S’entraîner avant le prochain essai' : 'Practise before the next attempt', ctaPage: 'ca-practice',
    inputs: [{ id: 'used', label: lang === 'fr' ? 'Essais déjà échoués' : 'Attempts already failed', def: 1, max: T.attempts, unit: `/ ${T.attempts}` }, { id: 'day', label: lang === 'fr' ? 'Jour de la période atteint' : 'Day of the test period reached', def: 10, max: T.onlineWindowDays, unit: `/ ${T.onlineWindowDays}` }],
    run: (v) => {
      const used = clamp(v.used ?? 0, 0, T.attempts), left = T.attempts - used, days = T.onlineWindowDays - clamp(v.day ?? 1, 1, T.onlineWindowDays);
      return lang === 'fr'
        ? { head: ['Essais restants', left ? String(left) : 'Aucun'], rows: [['Jours restants dans la période', N(days, lang)], ['Si les trois essais échouent', `audience de ${H.minMinutes} à ${H.maxMinutes} minutes avec un agent`], ['Prochaine étape', left ? 'repasser l’examen dans la période' : 'attendre la convocation à l’audience']] }
        : { head: ['Attempts left', left ? String(left) : 'None'], rows: [['Days left in the test period', N(days, lang)], ['If all three fail', `a ${H.minMinutes}- to ${H.maxMinutes}-minute hearing with an official`], ['Next step', left ? 'retake the test within the period' : 'wait to be called to a hearing']] };
    },
  }),
  castudy: (lang) => ({
    title: lang === 'fr' ? 'Mon plan de révision du guide' : 'My Discover Canada study plan',
    cta: lang === 'fr' ? 'Commencer par le premier chapitre' : 'Start with the first chapter', ctaPage: 'ca-ch-rights',
    inputs: [{ id: 'days', label: lang === 'fr' ? 'Jours avant l’examen' : 'Days until the test', def: 21, max: 365, unit: lang === 'fr' ? 'j' : 'days' }, { id: 'min', label: lang === 'fr' ? 'Minutes par jour' : 'Minutes a day', def: 30, max: 240, unit: 'min' }],
    run: (v) => {
      const d = clamp(v.days ?? 1, 1, 365), m = clamp(v.min ?? 10, 5, 240), chapters = 10, perCh = Math.max(1, Math.floor((d - Math.min(3, Math.floor(d / 4))) / chapters)), mocks = Math.min(3, Math.floor(d / 4)), hours = (d * m) / 60;
      return lang === 'fr'
        ? { head: ['Temps total de révision', `${formatNumberL(hours, lang, 1)} h`], rows: [['Jours par chapitre', d >= chapters ? N(perCh, lang) : 'moins d’un : plusieurs chapitres par jour'], ['Examens blancs à garder pour la fin', N(mocks, lang)], ['Questions de pratique par jour', N(Math.ceil((10 * chapters) / Math.max(1, d - mocks)), lang)]], note: 'Le guide compte dix chapitres ; gardez les derniers jours pour des examens blancs complets.' }
        : { head: ['Total study time', `${formatNumberL(hours, lang, 1)} h`], rows: [['Days per chapter', d >= chapters ? N(perCh, lang) : 'under one: several chapters a day'], ['Full mock tests kept for the end', N(mocks, lang)], ['Practice questions a day', N(Math.ceil((10 * chapters) / Math.max(1, d - mocks)), lang)]], note: 'The guide has ten chapters; keep the last days for full timed mock tests.' };
    },
  }),
  cahearing: (lang) => ({
    title: lang === 'fr' ? 'Ai-je réussi l’audience ?' : 'Would I pass the hearing?',
    cta: lang === 'fr' ? 'Réviser avec la banque de questions' : 'Revise with the question bank', ctaPage: 'ca-questions',
    inputs: [{ id: 'k', label: lang === 'fr' ? 'Questions orales réussies' : 'Spoken knowledge questions right', def: 15, max: H.knowledgeQuestions, unit: `/ ${H.knowledgeQuestions}` }, { id: 'l', label: lang === 'fr' ? 'Questions de langue réussies' : 'Language questions passed', def: 6, max: H.languageQuestions, unit: `/ ${H.languageQuestions}` }],
    run: (v) => {
      const k = clamp(v.k ?? 0, 0, H.knowledgeQuestions), l = clamp(v.l ?? 0, 0, H.languageQuestions), ok1 = k >= H.knowledgePass, ok2 = l >= H.languagePass;
      return lang === 'fr'
        ? { head: ['Audience', ok1 && ok2 ? 'Réussie' : 'Échouée'], rows: [['Connaissances', `${k} sur ${H.knowledgeQuestions} (${H.knowledgePass} exigées) : ${ok1 ? 'oui' : 'non'}`], ['Langue', `${l} sur ${H.languageQuestions} (${H.languagePass} exigées) : ${ok2 ? 'oui' : 'non'}`], ['Durée prévue', `${H.minMinutes} à ${H.maxMinutes} minutes`]], note: 'Un échec à l’audience entraîne le refus : il faut redéposer une demande et payer de nouveau.' }
        : { head: ['Hearing', ok1 && ok2 ? 'Passed' : 'Failed'], rows: [['Knowledge', `${k} of ${H.knowledgeQuestions} (${H.knowledgePass} needed): ${ok1 ? 'yes' : 'no'}`], ['Language', `${l} of ${H.languageQuestions} (${H.languagePass} needed): ${ok2 ? 'yes' : 'no'}`], ['Expected length', `${H.minMinutes} to ${H.maxMinutes} minutes`]], note: 'Failing the hearing means refusal: you would apply again and pay again.' };
    },
  }),
  caonline: (lang) => ({
    title: lang === 'fr' ? 'Mon appareil convient-il à l’examen en ligne ?' : 'Is my device ready for the online test?',
    cta: lang === 'fr' ? 'Faire un examen blanc chronométré' : 'Sit a timed mock test', ctaPage: 'home',
    inputs: [
      { id: 'dev', label: lang === 'fr' ? 'Appareil' : 'Device', def: 0, options: lang === 'fr' ? [{ value: '0', label: 'Ordinateur de bureau ou portable' }, { value: '1', label: 'Tablette (hors iPad avec Chrome)' }, { value: '2', label: 'Téléphone mobile' }, { value: '3', label: 'Surface Pro' }] : [{ value: '0', label: 'Desktop or laptop' }, { value: '1', label: 'Tablet (not Chrome on iPad)' }, { value: '2', label: 'Mobile phone' }, { value: '3', label: 'Surface Pro' }] },
      { id: 'br', label: lang === 'fr' ? 'Navigateur' : 'Browser', def: 0, options: [{ value: '0', label: 'Chrome' }, { value: '1', label: 'Safari' }, { value: '2', label: lang === 'fr' ? 'Autre' : 'Other' }] },
      { id: 'cam', label: lang === 'fr' ? 'Caméra qui fonctionne' : 'Working webcam', def: 1, options: yn(lang) },
      { id: 'vpn', label: lang === 'fr' ? 'VPN actif' : 'VPN switched on', def: 0, options: yn(lang) },
    ],
    run: (v) => {
      const fr = lang === 'fr', issues: string[] = [];
      if (v.dev === 2) issues.push(fr ? 'le téléphone est exclu' : 'phones are not accepted');
      if (v.dev === 3) issues.push(fr ? 'la Surface Pro est exclue' : 'the Surface Pro is not accepted');
      if (v.br === 2) issues.push(fr ? 'utilisez Chrome ou Safari' : 'use Chrome or Safari');
      if (!v.cam) issues.push(fr ? 'une caméra est obligatoire' : 'a webcam is required');
      if (v.vpn) issues.push(fr ? 'coupez le VPN' : 'turn the VPN off');
      return { head: [fr ? 'Prêt pour l’examen' : 'Ready for the test', issues.length ? (fr ? 'Pas encore' : 'Not yet') : (fr ? 'Oui' : 'Yes')], rows: [[fr ? 'À corriger' : 'To fix', issues.length ? issues.join(' ; ') : (fr ? 'rien' : 'nothing')], [fr ? 'Durée sans pause' : 'Timer, no pause', `${T.minutes} minutes`], [fr ? 'Pièce d’identité' : 'ID', fr ? 'carte de RP, même expirée, ou pièce avec photo et signature' : 'PR card, even expired, or photo ID with signature']] };
    },
  }),
  caroute: (lang) => ({
    title: lang === 'fr' ? 'Quelle démarche de citoyenneté me concerne ?' : 'Which citizenship route is mine?',
    cta: lang === 'fr' ? 'Vérifier mes jours de présence' : 'Check my days of presence', ctaPage: 'ca-presence',
    inputs: [{ id: 's', label: lang === 'fr' ? 'Votre situation' : 'Your situation', def: 0, options: lang === 'fr'
      ? [{ value: '0', label: 'Résident permanent adulte' }, { value: '1', label: 'Enfant résident permanent' }, { value: '2', label: 'Né à l’étranger d’un parent canadien' }, { value: '3', label: 'Ancien citoyen redevenu RP' }, { value: '4', label: 'Citoyen qui veut renoncer' }]
      : [{ value: '0', label: 'Adult permanent resident' }, { value: '1', label: 'Child who is a permanent resident' }, { value: '2', label: 'Born abroad to a Canadian parent' }, { value: '3', label: 'Former citizen, PR again' }, { value: '4', label: 'Citizen who wants to renounce' }] }],
    run: (v) => {
      const fr = lang === 'fr', k = clamp(v.s ?? 0, 0, 4);
      const R = [
        [fr ? 'Demande de citoyenneté (adulte)' : 'Grant of citizenship (adult)', 'CIT 0002', F.adult, fr ? `${N(C.requiredDays, lang)} jours, impôts, langue et examen de ${T.ages[0]} à ${T.ages[1]} ans` : `${N(C.requiredDays, lang)} days, taxes, language and test at ${T.ages[0]} to ${T.ages[1]}`],
        [fr ? 'Demande pour un mineur' : 'Grant for a minor', 'CIT 0003 / CIT 0403', F.minor, fr ? 'ni examen ni preuve de langue' : 'no test, no language proof'],
        [fr ? 'Certificat de citoyenneté (preuve)' : 'Citizenship certificate (proof)', 'CIT 0001', F.certificate, fr ? 'confirme si vous êtes déjà citoyen' : 'confirms whether you are already a citizen'],
        [fr ? 'Réintégration' : 'Resumption', 'CIT 0301', F.resumeAdult, fr ? `${N(P.ca.resume.presenceDays, lang)} jours comme RP sur ${P.ca.resume.windowYears} ans` : `${N(P.ca.resume.presenceDays, lang)} days as a PR in ${P.ca.resume.windowYears} years`],
        [fr ? 'Répudiation' : 'Renunciation', 'CIT 0302', F.renounce, fr ? 'avoir une autre citoyenneté et vivre hors du Canada' : 'hold another citizenship and live outside Canada'],
      ][k] as [string, string, number, string];
      return { head: [fr ? 'Démarche' : 'Route', R[0]], rows: [[fr ? 'Formulaire' : 'Form', R[1]], [fr ? 'Frais par personne' : 'Fee per person', cad(R[2], lang)], [fr ? 'Condition clé' : 'Key condition', R[3]]] };
    },
  }),
  cadocs: (lang) => ({
    title: lang === 'fr' ? 'Ma liste de pièces pour la demande' : 'My document list for the application',
    cta: lang === 'fr' ? 'Additionner les frais' : 'Add up the fees', ctaPage: 'ca-cost',
    inputs: [
      { id: 'age', label: lang === 'fr' ? 'Âge à la signature' : 'Age when you sign', def: 40, max: 120, unit: lang === 'fr' ? 'ans' : 'yrs' },
      { id: 'pol', label: lang === 'fr' ? `Pays où vous avez vécu ${P.ca.application.policeCertDaysInRow} jours de suite ou plus (${P.ca.application.policeCertYears} dernières années, depuis 18 ans)` : `Countries where you lived ${P.ca.application.policeCertDaysInRow}+ days in a row (last ${P.ca.application.policeCertYears} years, since 18)`, def: 0, max: 10 },
      { id: 'pp', label: lang === 'fr' ? 'Passeports et titres de voyage de la période' : 'Passports and travel documents in the period', def: 2, max: 10 },
      { id: 'paper', label: lang === 'fr' ? 'Demande sur papier' : 'Paper application', def: 0, options: yn(lang) },
    ],
    run: (v) => {
      const fr = lang === 'fr', age = v.age ?? 0, lng = age >= C.languageAges[0] && age <= C.languageAges[1], pol = clamp(v.pol ?? 0, 0, 10), pp = clamp(v.pp ?? 0, 0, 10);
      const items = 1 + 1 + 2 + pp + (lng ? 1 : 0) + pol + (v.paper ? 1 : 0);
      return { head: [fr ? 'Pièces à réunir' : 'Items to gather', N(items, lang)], rows: [[fr ? 'Toujours' : 'Always', fr ? 'calcul de présence, reçu des frais, 2 pièces d’identité' : 'presence calculation, fee receipt, 2 pieces of ID'], [fr ? 'Copies couleur de passeports' : 'Colour passport copies', N(pp, lang)], [fr ? 'Preuve de langue' : 'Language proof', lng ? (fr ? 'oui' : 'yes') : (fr ? 'non' : 'no')], [fr ? 'Certificats de police' : 'Police certificates', N(pol, lang)], [fr ? 'Photos' : 'Photos', v.paper ? (fr ? `2 identiques, ${P.ca.application.photosMm[0]} × ${P.ca.application.photosMm[1]} mm` : `2 identical, ${P.ca.application.photosMm[0]} × ${P.ca.application.photosMm[1]} mm`) : (fr ? 'selon le compte en ligne' : 'as the online account asks')]] };
    },
  }),
  cadescent: (lang) => ({
    title: lang === 'fr' ? 'Mon enfant né à l’étranger est-il canadien ?' : 'Is my child born abroad Canadian?',
    cta: lang === 'fr' ? 'Voir le certificat de citoyenneté' : 'See the citizenship certificate', ctaPage: 'ca-certificate',
    inputs: [
      { id: 'when', label: lang === 'fr' ? 'Naissance ou adoption' : 'Birth or adoption', def: 1, options: lang === 'fr' ? [{ value: '0', label: 'Avant le 15 décembre 2025' }, { value: '1', label: 'Le 15 décembre 2025 ou après' }] : [{ value: '0', label: 'Before December 15, 2025' }, { value: '1', label: 'On or after December 15, 2025' }] },
      { id: 'par', label: lang === 'fr' ? 'Le parent canadien est' : 'The Canadian parent was', def: 1, options: lang === 'fr' ? [{ value: '0', label: 'Né au Canada ou naturalisé' }, { value: '1', label: 'Né ou adopté à l’étranger' }] : [{ value: '0', label: 'Born in Canada or naturalized' }, { value: '1', label: 'Born or adopted abroad' }] },
      { id: 'd', label: lang === 'fr' ? 'Jours du parent au Canada avant la naissance' : 'Parent’s days in Canada before the birth', def: 900, max: 20000, unit: lang === 'fr' ? 'j' : 'days' },
    ],
    run: (v) => {
      const fr = lang === 'fr', need = P.ca.c3.parentDays, d = v.d ?? 0;
      let head: string, why: string;
      if (!v.when) { head = fr ? 'Canadien dans la plupart des cas' : 'Canadian in most cases'; why = fr ? 'règle pour les naissances avant le 15 décembre 2025' : 'rule for births before December 15, 2025'; }
      else if (!v.par) { head = fr ? 'Probablement canadien' : 'Likely Canadian'; why = fr ? 'parent né au Canada ou naturalisé' : 'parent born in Canada or naturalized'; }
      else if (d >= need) { head = fr ? 'Probablement canadien' : 'Likely Canadian'; why = fr ? `le parent a ${N(need, lang)} jours au Canada avant la naissance` : `the parent has ${N(need, lang)} days in Canada before the birth`; }
      else { head = fr ? 'Pas par filiation' : 'Not by descent'; why = fr ? `il manque ${N(need - d, lang)} jours au parent` : `the parent is ${N(need - d, lang)} days short`; }
      return { head: [fr ? 'Résultat indicatif' : 'Indicative result', head], rows: [[fr ? 'Pourquoi' : 'Why', why], [fr ? 'Pour en être sûr' : 'To know for sure', fr ? `certificat de citoyenneté, ${cad(F.certificate, lang)}` : `citizenship certificate, ${cad(F.certificate, lang)}`]], note: fr ? 'Seul IRCC tranche, à la demande de certificat.' : 'Only IRCC decides, on a certificate application.' };
    },
  }),
  caceremony: (lang) => ({
    title: lang === 'fr' ? 'Qui prête serment à la cérémonie ?' : 'Who takes the oath at the ceremony?',
    cta: lang === 'fr' ? 'Faire un dernier examen blanc' : 'Sit one more mock test', ctaPage: 'home',
    inputs: [{ id: 'a', label: lang === 'fr' ? 'Adultes dans la famille' : 'Adults in the family', def: 2, max: 10 }, { id: 't', label: lang === 'fr' ? 'Enfants de 14 à 17 ans' : 'Children aged 14 to 17', def: 1, max: 10 }, { id: 'k', label: lang === 'fr' ? 'Enfants de moins de 14 ans' : 'Children under 14', def: 1, max: 10 }],
    run: (v) => {
      const fr = lang === 'fr', a = clamp(v.a ?? 0, 0, 10), t = clamp(v.t ?? 0, 0, 10), k = clamp(v.k ?? 0, 0, 10);
      return { head: [fr ? 'Personnes qui prêtent serment' : 'People taking the oath', N(a + t, lang)], rows: [[fr ? 'Pièces d’identité à apporter' : 'Pieces of ID to bring', N((a + t + k) * 2, lang)], [fr ? 'Enfants présents sans serment' : 'Children attending without the oath', N(k, lang)], [fr ? 'Délai pour reporter' : 'Time to ask for a new date', fr ? `${P.ca.ceremony.rescheduleDays} jours avant la cérémonie` : `within ${P.ca.ceremony.rescheduleDays} days of the ceremony`]], note: fr ? 'Deux pièces par personne, dont une avec photo et signature pour les adultes.' : 'Two pieces each; for adults, at least one with photo and signature.' };
    },
  }),
  cadays: (lang) => ({
    title: lang === 'fr' ? 'Combien de jours me manque-t-il ?' : 'How many days am I short?',
    cta: lang === 'fr' ? 'Trouver ma date jour par jour' : 'Find my date day by day', ctaPage: 'ca-presence',
    inputs: [{ id: 'pr', label: lang === 'fr' ? 'Jours au Canada comme RP (5 dernières années)' : 'Days in Canada as a PR (last 5 years)', def: 900, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }, { id: 'pre', label: lang === 'fr' ? 'Jours au Canada avant la RP' : 'Days in Canada before PR', def: 300, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }],
    run: (v) => {
      const pre = Math.min(C.preprMaxCredit, (v.pre ?? 0) * C.preprFactor), prd = v.pr ?? 0, tot = prd + pre, miss = Math.max(0, Math.ceil(C.requiredDays - tot)), prMiss = Math.max(0, C.minPrDays - prd), gap = Math.max(miss, prMiss);
      return lang === 'fr'
        ? { head: ['Jours manquants', gap ? N(gap, lang) : 'Aucun'], rows: [['Jours crédités', N(Math.floor(tot), lang)], ['Crédit avant la RP (moitié, plafond 365)', N(Math.floor(pre), lang)], [`Minimum de ${N(C.minPrDays, lang)} jours comme RP`, prMiss ? `il en manque ${N(prMiss, lang)}` : 'atteint']] }
        : { head: ['Days short', gap ? N(gap, lang) : 'None'], rows: [['Days credited', N(Math.floor(tot), lang)], ['Credit before PR (half, max 365)', N(Math.floor(pre), lang)], [`At least ${N(C.minPrDays, lang)} days as a PR`, prMiss ? `${N(prMiss, lang)} to go` : 'met']] };
    },
  }),
  caprdays: (lang) => ({
    title: lang === 'fr' ? 'Mes jours comme résident permanent suffisent-ils ?' : 'Are my days as a permanent resident enough?',
    cta: lang === 'fr' ? 'Calculer avec mes voyages' : 'Count them with my trips', ctaPage: 'ca-presence',
    inputs: [{ id: 'since', label: lang === 'fr' ? 'Jours depuis l’établissement comme RP' : 'Days since you became a PR', def: 800, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }, { id: 'away', label: lang === 'fr' ? 'Jours entiers hors du Canada depuis' : 'Whole days outside Canada since then', def: 60, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }],
    run: (v) => {
      const since = clamp(v.since ?? 0, 0, 1826), away = clamp(v.away ?? 0, 0, since), here = since - away, minus = Math.max(0, C.minPrDays - here), full = Math.max(0, C.requiredDays - here);
      return lang === 'fr'
        ? { head: ['Jours comme RP au Canada', N(here, lang)], rows: [[`Minimum de ${N(C.minPrDays, lang)} jours`, minus ? `il en manque ${N(minus, lang)}` : 'atteint'], [`Sans séjour avant la RP, pour ${N(C.requiredDays, lang)} jours`, full ? `il en manque ${N(full, lang)}` : 'atteint'], ['Crédit maximal du séjour antérieur', `${N(C.preprMaxCredit, lang)} jours`]] }
        : { head: ['Days in Canada as a PR', N(here, lang)], rows: [[`Minimum of ${N(C.minPrDays, lang)} days`, minus ? `${N(minus, lang)} to go` : 'met'], [`With no earlier stay, for ${N(C.requiredDays, lang)} days`, full ? `${N(full, lang)} to go` : 'met'], ['Most credit an earlier stay can add', `${N(C.preprMaxCredit, lang)} days`]] };
    },
  }),
  caelig: (lang) => ({
    title: lang === 'fr' ? 'Puis-je déposer ma demande ?' : 'Can I apply for citizenship yet?',
    cta: lang === 'fr' ? 'Vérifier mes jours avec mes voyages' : 'Check my days with my trips', ctaPage: 'ca-presence',
    inputs: [
      { id: 'days', label: lang === 'fr' ? 'Jours crédités sur 5 ans' : 'Days credited in 5 years', def: 1100, max: 1826, unit: lang === 'fr' ? 'j' : 'days' },
      { id: 'tax', label: lang === 'fr' ? 'Années d’impôt produites sur 5' : 'Tax years filed out of 5', def: 3, max: 5 },
      { id: 'age', label: lang === 'fr' ? 'Âge à la signature' : 'Age when you sign', def: 35, max: 120, unit: lang === 'fr' ? 'ans' : 'yrs' },
      { id: 'lang', label: lang === 'fr' ? 'Preuve de langue NCLC/CLB 4 en main' : 'CLB/NCLC 4 language proof in hand', def: 1, options: yn(lang) },
    ],
    run: (v) => {
      const fr = lang === 'fr', age = v.age ?? 0, needLang = age >= C.languageAges[0] && age <= C.languageAges[1];
      const checks: Array<[string, boolean]> = [
        [fr ? `${N(C.requiredDays, lang)} jours de présence` : `${N(C.requiredDays, lang)} days of presence`, (v.days ?? 0) >= C.requiredDays],
        [fr ? `Impôts produits ${C.taxYearsRequired} années sur 5 (si exigé)` : `Taxes filed ${C.taxYearsRequired} years of 5 (if required)`, (v.tax ?? 0) >= C.taxYearsRequired],
        [fr ? 'Preuve de langue' : 'Language proof', !needLang || !!v.lang],
      ];
      const ok = checks.every((c) => c[1]);
      return { head: [fr ? 'Conditions chiffrées' : 'Measurable conditions', ok ? (fr ? 'Remplies' : 'Met') : (fr ? 'Pas encore' : 'Not yet')], rows: checks.map(([k, b]) => [k, b ? (fr ? 'oui' : 'yes') : (fr ? 'non' : 'no')] as [string, string]), note: fr ? 'Il faut aussi être résident permanent sans obligation en suspens et ne pas être frappé d’une interdiction.' : 'You must also hold PR status with no outstanding issues and not be under a prohibition.' };
    },
  }),
  cafee: (lang) => ({
    title: lang === 'fr' ? 'Frais de citoyenneté pour ma famille' : 'Citizenship fees for my family',
    cta: lang === 'fr' ? 'Voir chaque poste' : 'See every line', ctaPage: 'ca-cost',
    inputs: [{ id: 'a', label: lang === 'fr' ? 'Adultes (18 ans ou plus)' : 'Adults (18 or over)', def: 2, max: 10 }, { id: 'm', label: lang === 'fr' ? 'Mineurs' : 'Minors', def: 1, max: 10 }],
    run: (v) => {
      const c = caCost({ adults: clamp(v.a ?? 0, 0, 10), minors: clamp(v.m ?? 0, 0, 10), other: 0 });
      return { head: [lang === 'fr' ? 'Total des frais' : 'Total fees', cad(c.total, lang)], rows: [[lang === 'fr' ? 'Par adulte' : 'Per adult', cad(F.adult, lang)], [lang === 'fr' ? 'Par mineur' : 'Per minor', cad(F.minor, lang)]] };
    },
  }),
  catestage: (lang) => ({
    title: lang === 'fr' ? 'Dois-je passer l’examen ?' : 'Do I have to take the test?',
    cta: lang === 'fr' ? 'Faire l’examen blanc' : 'Take the mock test', ctaPage: 'home',
    inputs: [{ id: 'age', label: lang === 'fr' ? 'Âge à la signature de la demande' : 'Age when you sign the application', def: 56, max: 120, unit: lang === 'fr' ? 'ans' : 'yrs' }],
    run: (v) => {
      const [lo, hi] = T.ages, a = v.age ?? 0, need = a >= lo && a <= hi;
      return lang === 'fr'
        ? { head: ['Examen et preuve de langue', need ? 'Oui, les deux' : 'Non exigés'], rows: [['Âges visés', `${lo} à ${hi} ans`], [need ? 'Années avant de sortir de la tranche' : 'Raison', need ? N(hi + 1 - a, lang) : a < lo ? `moins de ${lo} ans` : `${hi + 1} ans ou plus`], ['Restent exigés', `${N(C.requiredDays, lang)} jours, impôts, casier`]] }
        : { head: ['Test and language proof', need ? 'Yes, both' : 'Not required'], rows: [['Ages concerned', `${lo} to ${hi}`], [need ? 'Years before you leave the band' : 'Why', need ? N(hi + 1 - a, lang) : a < lo ? `under ${lo}` : `${hi + 1} or over`], ['Still required', `${N(C.requiredDays, lang)} days, taxes, record`]] };
    },
  }),
  calang: (lang) => ({
    title: lang === 'fr' ? 'Ma preuve de langue suffit-elle ?' : 'Is my language result enough?',
    cta: lang === 'fr' ? 'Vérifier toutes les conditions' : 'Check every condition', ctaPage: 'ca-apply',
    inputs: [{ id: 'age', label: lang === 'fr' ? 'Âge à la signature' : 'Age when you sign', def: 30, max: 120, unit: lang === 'fr' ? 'ans' : 'yrs' }, { id: 's', label: lang === 'fr' ? 'Niveau à l’oral (expression)' : 'Speaking level (CLB/NCLC)', def: 5, max: 12 }, { id: 'l', label: lang === 'fr' ? 'Niveau à l’écoute (compréhension)' : 'Listening level (CLB/NCLC)', def: 4, max: 12 }],
    run: (v) => {
      const fr = lang === 'fr', age = v.age ?? 0, need = age >= C.languageAges[0] && age <= C.languageAges[1], s = clamp(v.s ?? 0, 0, 12), l = clamp(v.l ?? 0, 0, 12), ok = !need || (s >= 4 && l >= 4);
      return { head: [fr ? 'Exigence de langue' : 'Language requirement', !need ? (fr ? 'Pas exigée à cet âge' : 'Not required at this age') : ok ? (fr ? 'Remplie' : 'Met') : (fr ? 'Pas remplie' : 'Not met')], rows: [[fr ? 'Niveau exigé' : 'Level needed', `${C.languageLevel} ${fr ? 'à l’oral et à l’écoute' : 'in speaking and listening'}`], [fr ? 'Expression orale' : 'Speaking', s >= 4 ? (fr ? 'suffisant' : 'enough') : (fr ? `${4 - s} niveau(x) de moins` : `${4 - s} level(s) short`)], [fr ? 'Compréhension orale' : 'Listening', l >= 4 ? (fr ? 'suffisant' : 'enough') : (fr ? `${4 - l} niveau(x) de moins` : `${4 - l} level(s) short`)]], note: fr ? 'La lecture et l’écriture ne sont pas évaluées pour la citoyenneté.' : 'Reading and writing are not assessed for citizenship.' };
    },
  }),
  caminor: (lang) => ({
    title: lang === 'fr' ? 'Ce que la demande de mon enfant exige' : 'What my child’s application involves',
    cta: lang === 'fr' ? 'Additionner les frais de la famille' : 'Add up the family’s fees', ctaPage: 'ca-cost',
    inputs: [{ id: 'age', label: lang === 'fr' ? 'Âge de l’enfant' : 'Child’s age', def: 15, max: 17, unit: lang === 'fr' ? 'ans' : 'yrs' }, { id: 'par', label: lang === 'fr' ? 'Un parent demande en même temps ou est citoyen' : 'A parent applies at the same time or is a citizen', def: 1, options: yn(lang) }],
    run: (v) => {
      const fr = lang === 'fr', a = clamp(v.age ?? 0, 0, 17), interview = a >= 14 && !v.par;
      return { head: [fr ? 'Frais' : 'Fee', cad(F.minor, lang)], rows: [[fr ? 'Examen de citoyenneté' : 'Citizenship test', fr ? 'non, réservé aux 18 à 54 ans' : 'no, only for ages 18 to 54'], [fr ? 'Preuve de langue' : 'Language proof', fr ? 'non' : 'no'], [fr ? 'Entrevue possible' : 'Possible interview', interview ? (fr ? 'oui, de 14 à 17 ans sans parent demandeur' : 'yes, aged 14 to 17 with no parent applying') : (fr ? 'non prévue' : 'not expected')]] };
    },
  }),
  caspouse: (lang) => ({
    title: lang === 'fr' ? 'Qui peut déposer en premier dans le couple ?' : 'Which of us can apply first?',
    cta: lang === 'fr' ? 'Calculer chaque date exacte' : 'Work out each exact date', ctaPage: 'ca-presence',
    inputs: [{ id: 'a', label: lang === 'fr' ? 'Mes jours crédités' : 'My days credited', def: 1050, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }, { id: 'b', label: lang === 'fr' ? 'Jours crédités de mon conjoint' : 'My partner’s days credited', def: 980, max: 1826, unit: lang === 'fr' ? 'j' : 'days' }],
    run: (v) => {
      const fr = lang === 'fr', ma = Math.max(0, C.requiredDays - (v.a ?? 0)), mb = Math.max(0, C.requiredDays - (v.b ?? 0)), first = ma === mb ? (fr ? 'en même temps' : 'together') : ma < mb ? (fr ? 'vous' : 'you') : (fr ? 'votre conjoint' : 'your partner');
      return { head: [fr ? 'Premier à pouvoir déposer' : 'First able to apply', first], rows: [[fr ? 'Il vous manque' : 'You are short by', fr ? `${N(ma, lang)} jours` : `${N(ma, lang)} days`], [fr ? 'Il manque à votre conjoint' : 'Your partner is short by', fr ? `${N(mb, lang)} jours` : `${N(mb, lang)} days`], [fr ? 'Écart en jours au Canada' : 'Gap in days in Canada', N(Math.abs(ma - mb), lang)]], note: fr ? 'Chaque époux compte ses propres jours : aucun crédit n’est partagé.' : 'Each spouse counts their own days: no credit is shared.' };
    },
  }),
  catax: (lang) => ({
    title: lang === 'fr' ? 'Mes années d’impôt suffisent-elles ?' : 'Have I filed enough tax years?',
    cta: lang === 'fr' ? 'Vérifier toutes les conditions' : 'Check every condition', ctaPage: 'ca-apply',
    inputs: [{ id: 'f', label: lang === 'fr' ? 'Déclarations produites sur les 5 dernières années' : 'Returns filed in the last 5 years', def: 2, max: 5 }, { id: 'req', label: lang === 'fr' ? 'Années où une déclaration était exigée' : 'Years a return was required', def: 4, max: 5 }],
    run: (v) => {
      const fr = lang === 'fr', f = clamp(v.f ?? 0, 0, 5), req = clamp(v.req ?? 0, 0, 5), target = Math.min(C.taxYearsRequired, req), ok = f >= target;
      return { head: [fr ? 'Condition fiscale' : 'Tax condition', ok ? (fr ? 'Remplie' : 'Met') : (fr ? 'Pas remplie' : 'Not met')], rows: [[fr ? 'Années à produire' : 'Years to file', `${target} ${fr ? 'sur 5' : 'of 5'}`], [fr ? 'Il manque' : 'Missing', N(Math.max(0, target - f), lang)], [fr ? 'Règle' : 'Rule', fr ? `${C.taxYearsRequired} années sur 5 si la Loi de l’impôt l’exige` : `${C.taxYearsRequired} years of 5 when the Income Tax Act requires it`]] };
    },
  }),
  carenounce: (lang) => ({
    title: lang === 'fr' ? 'Combien coûte la renonciation ?' : 'What does renouncing cost?',
    cta: lang === 'fr' ? 'Voir les autres frais d’IRCC' : 'See the other IRCC fees', ctaPage: 'ca-cost',
    inputs: [{ id: 'n', label: lang === 'fr' ? 'Personnes qui renoncent' : 'People renouncing', def: 1, max: 10 }, { id: 'auto', label: lang === 'fr' ? 'Devenu citoyen automatiquement (2009, 2015 ou 2025)' : 'Became a citizen automatically (2009, 2015 or 2025)', def: 0, options: yn(lang) }],
    run: (v) => {
      const fr = lang === 'fr', n = clamp(v.n ?? 1, 1, 10), each = v.auto ? 0 : F.renounce;
      return { head: [fr ? 'Frais à payer' : 'Fees to pay', cad(each * n, lang)], rows: [[fr ? 'Par personne' : 'Per person', cad(each, lang)], [fr ? 'Pour vivre de nouveau au Canada' : 'To live in Canada again', fr ? 'un visa de résident permanent est nécessaire' : 'you would need a permanent resident visa']] };
    },
  }),
  cacert: (lang) => ({
    title: lang === 'fr' ? 'Frais de certificats de citoyenneté' : 'Citizenship certificate fees',
    cta: lang === 'fr' ? 'Voir le détail des frais' : 'See every fee', ctaPage: 'ca-cost',
    inputs: [{ id: 'c', label: lang === 'fr' ? 'Certificats demandés' : 'Certificates requested', def: 2, max: 10 }, { id: 'r', label: lang === 'fr' ? 'Recherches de dossier' : 'Record searches', def: 0, max: 10 }],
    run: (v) => {
      const fr = lang === 'fr', c = clamp(v.c ?? 0, 0, 10), r = clamp(v.r ?? 0, 0, 10);
      return { head: [fr ? 'Total' : 'Total', cad(c * F.certificate + r * F.recordSearch, lang)], rows: [[fr ? 'Certificat (preuve)' : 'Certificate (proof)', `${cad(F.certificate, lang)} × ${c}`], [fr ? 'Recherche de dossier' : 'Record search', `${cad(F.recordSearch, lang)} × ${r}`]] };
    },
  }),
  caresume: (lang) => ({
    title: lang === 'fr' ? 'Frais de réintégration dans la citoyenneté' : 'Fees to resume Canadian citizenship',
    cta: lang === 'fr' ? 'Voir le détail des frais' : 'See every fee', ctaPage: 'ca-cost',
    inputs: [{ id: 'a', label: lang === 'fr' ? 'Adultes' : 'Adults', def: 1, max: 10 }, { id: 'm', label: lang === 'fr' ? 'Mineurs' : 'Minors', def: 0, max: 10 }],
    run: (v) => {
      const fr = lang === 'fr', a = clamp(v.a ?? 0, 0, 10), m = clamp(v.m ?? 0, 0, 10);
      return { head: [fr ? 'Total' : 'Total', cad(a * F.resumeAdult + m * F.resumeMinor, lang)], rows: [[fr ? 'Par adulte' : 'Per adult', cad(F.resumeAdult, lang)], [fr ? 'Par mineur' : 'Per minor', cad(F.resumeMinor, lang)], [fr ? 'Comparé à une première demande' : 'Against a first application', fr ? `${cad(F.adult - F.resumeAdult, lang)} de moins par adulte` : `${cad(F.adult - F.resumeAdult, lang)} less per adult`]] };
    },
  }),
};
export function getSpec(kind: string, lang: L): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f(lang);
}
export const SPEC_KINDS = Object.keys(SPECS);
