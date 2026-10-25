import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-language',
  group: 'apply',
  order: 250,
  tool: { kind: 'mini:calang' },
  mini: { kind: 'mini:catestage' },
  related: ['ca-apply', 'ca-application', 'ca-seniors', 'ca-cost', 'home'],
  sources: ['ca_language', 'ca_language_tests', 'ca_eligibility'],
  en: {
    slug: 'canadian-citizenship/language-requirement',
    nav: 'Language proof',
    card: 'CLB 4 in speaking and listening at ages 18 to 54: diplomas, approved tests and training that count as proof.',
    title: 'Citizenship language requirement: CLB 4 and accepted proof',
    description: 'Language requirement for Canadian citizenship: CLB 4 in speaking and listening at ages 18 to 54, proven by a diploma, a test such as CELPIP or TEF, or training.',
    h1: 'Citizenship language requirement: is your proof enough?',
    intro: 'Enter your age when you sign and your speaking and listening levels: you see at once whether the requirement applies and whether you meet it.',
    resume: (h) => {
      const C = h.P.ca.presence, L = h.P.ca.languageTests;
      return `For Canadian citizenship, applicants aged ${C.languageAges[0]} to ${C.languageAges[1]} on the day they sign must show they can speak and understand English or French at ${C.languageLevel} or higher. Only speaking and listening are assessed; reading and writing are not. The proof goes in with the application, and IRCC accepts four kinds. A secondary or post-secondary diploma, certificate or transcript from a program taught in English or French, in Canada or abroad, is often the simplest. An approved test works too, with these minimum results for listening and speaking: CELPIP-General ${L['CELPIP-G']}, IELTS General Training ${L['IELTS General Training']}, PTE Core ${L['PTE Core']}, TEF Canada ${L['TEF Canada']} and TCF Canada ${L['TCF Canada']}. Government-funded language training (LINC or CLIC) completed at CLB 4 or above is accepted, as are certain provincial programs. Applicants under ${C.languageAges[0]} and those aged ${C.languageAges[1] + 1} or over send no language proof. In other words, the proof is a document you gather before signing, not an exam set by IRCC.`;
    },
    faqs: (h) => [
      { q: 'Does an IELTS Academic result count for citizenship?', a: `No. IRCC accepts only IELTS General Training for citizenship, with at least ${h.P.ca.languageTests['IELTS General Training']} for listening and speaking. An Academic result, however high, is not on the list. If your only IELTS is Academic, check first whether a diploma or a training certificate already gives you the proof before you book another test.` },
      { q: 'Is an old CELPIP or TEF result still valid for citizenship?', a: `IRCC sets a start date rather than an expiry: CELPIP-General results count for tests taken on or after ${h.date('2014-04-01')}, and TEF Canada results for tests taken on or after ${h.date('2012-07-01')}. A result older than those dates is not accepted. Keep the official result document, since that is what goes into the application.` },
      { q: 'Can a degree from outside Canada prove my language level?', a: 'Yes, if the program was taught in English or French. IRCC accepts a diploma, certificate or transcript from secondary or post-secondary education completed in either language, whether in Canada or abroad. A program taught in another language does not count, even if you studied in Canada.' },
      { q: 'I took LINC classes before 2012: what do I send?', a: `For federally funded training taken between January 2008 and October 2012, you tick the box on the application and IRCC checks the result electronically, so no certificate is needed. For training on or after ${h.date('2012-11-01')}, you send the certificate showing CLB 4 or higher in speaking and listening.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, L = h.P.ca.languageTests;
      return `
<h2>Who needs to prove it</h2>
<p>The requirement depends on your age on the day you sign the application. Between ${C.languageAges[0]} and ${C.languageAges[1]}, proof is part of the file. Outside that band, no proof is asked: children apply without it, and so do adults aged ${C.languageAges[1] + 1} or over. The same age band applies to the citizenship test, as the second calculator on this page shows. The level is ${C.languageLevel} in speaking and listening, on the Canadian Language Benchmarks or their French counterpart, the Niveaux de compétence linguistique canadiens.</p>
<h2>Four ways to prove your level</h2>
<ol>
<li><strong>Education in English or French.</strong> A secondary or post-secondary diploma, certificate or transcript from a program taught in one of the two languages, in Canada or abroad.</li>
<li><strong>An approved test.</strong> One of the five tests in the table below, with at least the scores shown.</li>
<li><strong>Government-funded language training.</strong> LINC (in English) or CLIC (in French) at CLB 4 or above. A certificate is needed for training on or after ${h.date('2012-11-01')}; for January 2008 to October 2012, a box on the form lets IRCC check it electronically.</li>
<li><strong>Provincial programs.</strong> British Columbia ELSA, Saskatchewan EAL, Manitoba programs, Nova Scotia PENS, Ontario ESL or FSL certificates dated December 2013 or later, and Quebec MIFI or MEES training at level 4 of the Échelle québécoise.</li>
</ol>
<h2>Approved tests and minimum results</h2>
${h.table(['Test', 'Listening / speaking needed', 'Note'], [['CELPIP-General', L['CELPIP-G'], `tests from ${h.date('2014-04-01')}`], ['IELTS General Training', L['IELTS General Training'], 'Academic not accepted'], ['PTE Core', L['PTE Core'], ''], ['TEF Canada', L['TEF Canada'], `tests from ${h.date('2012-07-01')}`], ['TCF Canada', L['TCF Canada'], '']], 'Minimum results published by IRCC for citizenship.', ['l', 'l', 'l'])}
<p>Only listening and speaking scores matter here. A weak reading or writing score in the same test does not stop you, because those skills are not assessed for citizenship. A test you passed for permanent residence may already be enough, provided it is one of the five and meets the dates above.</p>
<h2>Choosing the cheapest valid proof</h2>
<p>Before paying for a test, look at what you already have. A diploma from a program taught in English or French, even from your home country, settles the question without a new exam. So does a LINC or CLIC certificate, or one of the provincial certificates. A test makes sense when none of these apply, and then any of the five will do: pick the one offered closest to you, in the language you are strongest in. Costs of a test are not IRCC fees; the ${h.a('ca-cost', 'fee calculator')} lets you add yours to the household total.</p>
<h2>Language and the citizenship test</h2>
<p>The language proof and the knowledge test are separate. The proof shows you can communicate; the test checks what you know about Canada. ${h.src('ca_language', 'IRCC’s language rules')} concern only the first. Applicants who fail the test three times meet a citizenship official at a hearing, where language is assessed again with spoken questions. Practising with our ${h.a('home', 'mock test')} in the language you will use on the day helps on both fronts. The full list of accepted proof is on ${h.src('ca_language_tests', 'IRCC’s page of approved tests')}, and the ${h.a('ca-seniors', 'page on age exemptions')} explains what changes at ${C.languageAges[1] + 1}.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/preuve-de-langue',
    nav: 'Preuve de langue',
    card: 'NCLC 4 à l’oral de 18 à 54 ans : diplômes, tests approuvés et formations qui servent de preuve.',
    title: 'Preuve de langue pour la citoyenneté : NCLC 4 et documents',
    description: 'Preuve de langue pour la citoyenneté canadienne : NCLC/CLB 4 à l’oral de 18 à 54 ans, par un diplôme, un test comme le TEF Canada ou CELPIP, ou des cours.',
    h1: 'Preuve de langue : votre document suffit-il ?',
    intro: 'Indiquez votre âge à la signature et vos niveaux en expression et en compréhension orales : vous voyez tout de suite si l’exigence s’applique et si elle est remplie.',
    resume: (h) => {
      const C = h.P.ca.presence, L = h.P.ca.languageTests;
      return `Pour obtenir la citoyenneté canadienne, les demandeurs qui ont entre ${C.languageAges[0]} et ${C.languageAges[1]} ans le jour de la signature doivent prouver qu’ils parlent et comprennent le français ou l’anglais au niveau ${C.languageLevel} ou plus. Seules l’expression et la compréhension orales comptent ; ni la lecture ni l’écriture ne sont évaluées. La preuve accompagne la demande, sous l’une de quatre formes admises par IRCC. Un diplôme, certificat ou relevé de notes d’études secondaires ou postsecondaires suivies en français ou en anglais, au Canada ou ailleurs, suffit souvent. Un test approuvé convient aussi, avec ces résultats minimaux en compréhension et en expression orales : TEF Canada ${L['TEF Canada']}, TCF Canada ${L['TCF Canada']}, CELPIP-General ${L['CELPIP-G']}, IELTS General Training ${L['IELTS General Training']} et PTE Core ${L['PTE Core']}. Les cours de langue financés par l’État (CLIC ou LINC) terminés au niveau 4 ou plus sont acceptés, tout comme certains programmes provinciaux. Avant ${C.languageAges[0]} ans et à partir de ${C.languageAges[1] + 1} ans, aucune preuve n’est demandée. Autrement dit, la preuve est un document à réunir avant de signer, pas un examen organisé par IRCC.`;
    },
    faqs: (h) => [
      { q: 'Un résultat IELTS Academic est-il accepté pour la citoyenneté ?', a: `Non. Pour la citoyenneté, IRCC n’accepte que l’IELTS General Training, avec au moins ${h.P.ca.languageTests['IELTS General Training']} en compréhension et en expression orales. Un résultat Academic, même excellent, n’entre pas dans la liste. Avant de repasser un test, regardez si un diplôme ou une attestation de cours ne fait pas déjà l’affaire.` },
      { q: 'Un ancien résultat au TEF Canada ou au CELPIP est-il encore valable ?', a: `IRCC fixe une date de départ plutôt qu’une date d’expiration : le TEF Canada compte pour les tests passés à partir du ${h.date('2012-07-01')}, le CELPIP-General pour ceux passés à partir du ${h.date('2014-04-01')}. Un résultat antérieur est refusé. Gardez le relevé officiel : c’est lui qui accompagne la demande.` },
      { q: 'Un diplôme obtenu hors du Canada peut-il prouver mon niveau ?', a: 'Oui, si la formation était donnée en français ou en anglais. IRCC accepte un diplôme, un certificat ou un relevé de notes d’études secondaires ou postsecondaires suivies dans l’une de ces langues, au Canada comme à l’étranger. Une formation suivie dans une autre langue ne compte pas, même au Canada.' },
      { q: 'J’ai suivi des cours CLIC avant 2012 : que fournir ?', a: `Pour une formation financée par le fédéral suivie entre janvier 2008 et octobre 2012, il suffit de cocher la case prévue sur la demande : IRCC vérifie le résultat par voie électronique. Pour une formation suivie à partir du ${h.date('2012-11-01')}, joignez l’attestation indiquant un niveau 4 ou plus à l’oral.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, L = h.P.ca.languageTests;
      return `
<h2>Qui doit fournir une preuve</h2>
<p>Tout se joue sur votre âge le jour de la signature. De ${C.languageAges[0]} à ${C.languageAges[1]} ans, la preuve fait partie du dossier ; en dehors de cette tranche, rien n’est exigé, ni pour les enfants ni pour les adultes de ${C.languageAges[1] + 1} ans et plus. La même tranche d’âge vaut pour l’examen de citoyenneté, comme le montre le second outil de la page. Le seuil est le niveau ${C.languageLevel} à l’oral, selon les Niveaux de compétence linguistique canadiens ou leur équivalent anglais, les Canadian Language Benchmarks.</p>
<h2>Quatre façons d’établir son niveau</h2>
<ol>
<li><strong>Des études en français ou en anglais.</strong> Diplôme, certificat ou relevé de notes d’un programme secondaire ou postsecondaire donné dans l’une des deux langues, au Canada ou à l’étranger.</li>
<li><strong>Un test approuvé.</strong> L’un des cinq tests du tableau ci-dessous, avec au moins les résultats indiqués.</li>
<li><strong>Des cours financés par l’État.</strong> CLIC (en français) ou LINC (en anglais), niveau 4 ou plus. Attestation exigée pour une formation suivie depuis le ${h.date('2012-11-01')} ; de janvier 2008 à octobre 2012, une case du formulaire permet à IRCC de vérifier en ligne.</li>
<li><strong>Des programmes provinciaux.</strong> ELSA en Colombie-Britannique, EAL en Saskatchewan, programmes du Manitoba, PENS en Nouvelle-Écosse, attestations ESL ou FSL de l’Ontario datées de décembre 2013 ou après, et, au Québec, la francisation du MIFI ou du MEES au niveau 4 de l’Échelle québécoise.</li>
</ol>
<h2>Tests approuvés et résultats minimaux</h2>
${h.table(['Test', 'Compréhension / expression orales', 'Remarque'], [['TEF Canada', L['TEF Canada'], `tests depuis le ${h.date('2012-07-01')}`], ['TCF Canada', L['TCF Canada'], ''], ['CELPIP-General', L['CELPIP-G'], `tests depuis le ${h.date('2014-04-01')}`], ['IELTS General Training', L['IELTS General Training'], 'Academic refusé'], ['PTE Core', L['PTE Core'], '']], 'Résultats minimaux publiés par IRCC pour la citoyenneté.', ['l', 'l', 'l'])}
<p>Seules les notes d’oral comptent. Une note faible en lecture ou en écriture dans le même test n’est pas un obstacle, puisque ces compétences ne sont pas évaluées pour la citoyenneté. Le test passé pour la résidence permanente peut donc suffire, s’il figure parmi les cinq et respecte les dates ci-dessus.</p>
<h2>La preuve la moins coûteuse</h2>
<p>Avant de vous inscrire à un test, faites l’inventaire. Un diplôme d’un programme donné en français ou en anglais, même obtenu dans votre pays d’origine, règle la question sans nouvel examen. Une attestation CLIC ou LINC, ou un certificat provincial, aussi. Le test se justifie quand rien de cela n’existe ; les cinq se valent alors, choisissez celui qui se passe près de chez vous, dans votre meilleure langue. Son prix n’est pas un frais d’IRCC ; le ${h.a('ca-cost', 'calcul des frais')} vous permet de l’ajouter au total du ménage.</p>
<h2>Langue et examen, deux choses distinctes</h2>
<p>La preuve de langue montre que vous communiquez ; l’examen vérifie vos connaissances sur le Canada. Les ${h.src('ca_language', 'règles d’IRCC sur la preuve linguistique')} ne concernent que la première. Après trois échecs à l’examen, une audience avec un agent de citoyenneté évalue de nouveau la langue, par des questions orales. S’entraîner avec notre ${h.a('home', 'examen blanc')} dans la langue choisie pour le jour J aide sur les deux plans. La liste complète figure sur la ${h.src('ca_language_tests', 'page d’IRCC des tests approuvés')}, et la page ${h.a('ca-seniors', 'exemptions selon l’âge')} explique ce qui change à ${C.languageAges[1] + 1} ans.</p>`;
    },
  },
});
