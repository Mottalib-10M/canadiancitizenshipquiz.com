import { definePage } from '../../lib/guide-types';

const CH = ['ca-ch-rights', 'ca-ch-who', 'ca-ch-history', 'ca-ch-modern', 'ca-ch-government', 'ca-ch-elections', 'ca-ch-justice', 'ca-ch-symbols', 'ca-ch-economy', 'ca-ch-regions'];

export default definePage({
  id: 'ca-questions',
  group: 'test',
  order: 20,
  tool: { kind: 'bank', props: { chapter: 0 } },
  related: ['home', 'ca-practice', 'ca-study-guide', 'ca-pass-mark', 'ca-ch-government'],
  sources: ['ca_study', 'ca_test', 'ca_guide'],
  en: {
    slug: 'canadian-citizenship-test/questions-and-answers',
    nav: 'Questions and answers',
    card: 'Every question of our bank with its answer and explanation, sorted by chapter of Discover Canada.',
    title: 'Citizenship test questions and answers, chapter by chapter',
    description: 'All our Canadian citizenship test questions with answers and explanations, sorted by the ten chapters of Discover Canada. Pick a chapter and test yourself.',
    h1: 'Citizenship test questions and answers',
    intro: 'Choose a chapter of the guide: its questions appear with the answer hidden until you open it, and a short explanation that tells you why. Nothing to sign up for.',
    resume: (h) => `Our question bank holds ${h.count} questions for the Canadian citizenship test, ${h.inChapter(0)} for each of the ${h.chapters.length} chapters of Discover Canada, each with the correct answer and a short explanation. Pick a chapter from the list and read through its questions, opening the answer only after you have chosen yours. The questions follow the format IRCC describes for the real test, multiple choice or true or false, and cover the facts of the official guide: rights and responsibilities, the peoples of Canada, history, modern Canada, government, elections, justice, symbols, the economy and the regions. They are not IRCC's own questions, which are not published; Radif Partners writes them from the facts of the guide, in its own words, because Discover Canada is under Crown copyright. Reading questions is a fast way to learn what the test considers important. On the day, you will face ${h.n} questions in ${h.P.ca.test.minutes} minutes and need ${h.need} right, so once a chapter reads easily here, check yourself with the practice sets and a timed mock test.`,
    faqs: (h) => [
      { q: 'How many questions are in the bank and how are they split?', a: `${h.count} questions, divided evenly across the ${h.chapters.length} chapters of Discover Canada, so ${h.inChapter(0)} per chapter. The real test draws ${h.n} questions from the whole guide, and IRCC does not say how many come from each chapter, so an even spread is the safest way to prepare: no chapter can be skipped.` },
      { q: 'Should I memorize answers or understand them?', a: 'Understand the fact behind each answer. The real test words its questions differently, and distractors change. If you know that the Charter dates from 1982 and Confederation from 1867, you will answer any phrasing correctly; if you only remember that “the third option” was right, you will not. The explanation under each answer is there for that reason.' },
      { q: 'Can I print the questions or read them offline?', a: 'Each chapter loads as a normal web page, with every question and its answer present in the page itself, so your browser’s print or save function works. The answers stay folded until you open them. For self-testing with automatic scoring, the practice sets and the mock test are better suited than a printout.' },
    ],
    body: (h) => {
      const ex = h.q('ca-en-070');
      const exq = ex ? `<blockquote><p><strong>${ex.q}</strong><br>${ex.options.map((o, i) => (i === ex.answer ? `<strong>${o}</strong>` : o)).join(' · ')}</p></blockquote>` : '';
      return `
<h2>What a question looks like</h2>
<p>Every question in the bank follows the same pattern: a short stem, four options or a true-or-false choice, one correct answer, and an explanation that restates the fact and adds context. Here is one from the government chapter, with the correct option in bold:</p>
${exq}
<p>The explanation under this question in the bank adds that a bill needs approval from all three parts, votes in both chambers plus royal assent, to become law. That extra sentence often answers a second question you will meet later, which is why reading the explanations pays off even when your own answer was right.</p>
<h2>The bank, chapter by chapter</h2>
${h.table(['Chapter of Discover Canada', 'Questions', 'Revision page'], h.chapters.map((c, i) => [c, h.inChapter(i), h.a(CH[i], 'key facts')]), `${h.count} questions in total.`, ['l', 'r', 'l'])}
<p>Each revision page sums up what the test tends to ask on its chapter, the notions that are easy to confuse, and a table of dates or names, with a ten-question quiz drawn from that chapter only.</p>
<h2>How to use the bank well</h2>
<p>Read a chapter of questions before you read the chapter itself in the guide: you will know which details matter and read with purpose. Then read the guide, and come back to the questions a day later without looking at the answers. Mark the ones you miss and return to them at the end of the week. When a chapter no longer gives you trouble, move to ${h.a('ca-practice', 'practice sets')}, which hide the answers and score you, and finally to the ${h.a('home', 'timed mock test')}, which mixes all chapters under the real ${h.P.ca.test.minutes}-minute limit.</p>
<h2>About the source</h2>
<p>IRCC names ${h.src('ca_study', 'Discover Canada')} as the only official guide for the test and describes the format on its ${h.src('ca_test', 'test page')}. The guide is under Crown copyright, so we do not copy its text: every question and explanation is written by Radif Partners from its facts. Some of its pages predate recent changes, such as the accession of King Charles III; our questions stick to institutions ("the Sovereign") rather than to the person when that matters. To plan your study around the ten chapters, try the ${h.a('ca-study-guide', 'study plan')}; to understand the score you need, see the ${h.a('ca-pass-mark', 'pass mark page')}.</p>`;
    },
  },
  fr: {
    slug: 'examen-citoyennete/questions-reponses',
    nav: 'Questions et réponses',
    card: 'Toutes les questions de notre banque avec réponse et explication, classées par chapitre de Découvrir le Canada.',
    title: 'Questions et réponses de l’examen de citoyenneté canadienne',
    description: 'Toutes nos questions pour l’examen de citoyenneté canadienne, avec réponses et explications, classées selon les dix chapitres de Découvrir le Canada. Gratuit.',
    h1: 'Questions et réponses de l’examen de citoyenneté',
    intro: 'Choisissez un chapitre du guide : ses questions s’affichent, la réponse cachée jusqu’à ce que vous l’ouvriez, avec une courte explication. Aucune inscription.',
    resume: (h) => `Notre banque compte ${h.count} questions pour l’examen de citoyenneté canadienne, ${h.inChapter(0)} pour chacun des ${h.chapters.length} chapitres de Découvrir le Canada, chacune avec sa bonne réponse et une explication. Choisissez un chapitre dans la liste et parcourez ses questions en ouvrant la réponse seulement après avoir choisi la vôtre. Les questions suivent le format qu’IRCC décrit pour l’examen réel, à choix multiples ou de type vrai ou faux, et portent sur les faits du guide officiel : droits et responsabilités, peuples du Canada, histoire, Canada moderne, gouvernement, élections, justice, symboles, économie et régions. Ce ne sont pas les questions d’IRCC, qui ne sont pas publiées : Radif Partners les rédige à partir des faits du guide, dans ses propres mots, puisque Découvrir le Canada est protégé par le droit d’auteur de la Couronne. Lire des questions permet de repérer vite ce que l’examen juge important. Le jour venu, il faudra répondre à ${h.n} questions en ${h.P.ca.test.minutes} minutes et en réussir ${h.need} : quand un chapitre se lit sans peine ici, passez aux séries d’entraînement et à l’examen blanc.`,
    faqs: (h) => [
      { q: 'Combien de questions compte la banque et comment sont-elles réparties ?', a: `${h.count} questions, réparties également entre les ${h.chapters.length} chapitres de Découvrir le Canada, soit ${h.inChapter(0)} par chapitre. L’examen réel tire ${h.n} questions de l’ensemble du guide, et IRCC ne précise pas combien viennent de chaque chapitre : une préparation équilibrée reste la plus sûre, aucun chapitre ne peut être sauté.` },
      { q: 'Faut-il apprendre les réponses par cœur ?', a: 'Mieux vaut comprendre le fait derrière chaque réponse. L’examen réel formule ses questions autrement et les leurres changent. Si vous savez que la Charte date de 1982 et la Confédération de 1867, vous répondrez juste quelle que soit la formulation ; si vous retenez seulement que « la troisième option » était bonne, non. C’est le rôle de l’explication.' },
      { q: 'Peut-on imprimer les questions ou les lire hors ligne ?', a: 'Chaque chapitre se charge comme une page web ordinaire, avec toutes les questions et leurs réponses présentes dans la page : la fonction d’impression ou d’enregistrement du navigateur fonctionne. Les réponses restent repliées tant qu’on ne les ouvre pas. Pour vous tester avec une note automatique, l’entraînement et l’examen blanc conviennent mieux.' },
    ],
    body: (h) => {
      const ex = h.q('ca-fr-065');
      const exq = ex ? `<blockquote><p><strong>${ex.q}</strong><br>${ex.options.map((o, i) => (i === ex.answer ? `<strong>${o}</strong>` : o)).join(' · ')}</p></blockquote>` : '';
      return `
<h2>À quoi ressemble une question</h2>
<p>Toutes les questions de la banque suivent le même modèle : un énoncé court, quatre options ou un choix vrai ou faux, une seule bonne réponse et une explication qui reprend le fait et le replace dans son contexte. En voici une, tirée du chapitre sur le gouvernement, la bonne réponse en gras :</p>
${exq}
<p>L’explication qui accompagne cette question rappelle qu’un projet de loi doit être adopté par les deux chambres puis recevoir la sanction royale pour devenir loi. Cette phrase de plus répond souvent à une autre question que vous croiserez plus tard.</p>
<h2>La banque, chapitre par chapitre</h2>
${h.table(['Chapitre de Découvrir le Canada', 'Questions', 'Fiche de révision'], h.chapters.map((c, i) => [c, h.inChapter(i), h.a(CH[i], 'notions clés')]), `${h.count} questions au total.`, ['l', 'r', 'l'])}
<p>Chaque fiche résume ce que l’examen demande sur son chapitre, les notions faciles à confondre et un tableau de dates ou de noms, avec un quiz de dix questions tirées de ce seul chapitre.</p>
<h2>Bien se servir de la banque</h2>
<p>Lisez les questions d’un chapitre avant le chapitre lui-même : vous saurez quels détails comptent et lirez le guide avec un but. Lisez ensuite le guide, puis revenez aux questions le lendemain sans regarder les réponses. Notez celles que vous ratez et reprenez-les en fin de semaine. Quand un chapitre ne vous pose plus de difficulté, passez à l’${h.a('ca-practice', 'entraînement')}, qui cache les réponses et vous note, puis à l’${h.a('home', 'examen blanc chronométré')}, qui mélange les chapitres sous la vraie limite de ${h.P.ca.test.minutes} minutes.</p>
<h2>À propos de la source</h2>
<p>IRCC désigne ${h.src('ca_study', 'Découvrir le Canada')} comme seul guide officiel et décrit le format sur sa ${h.src('ca_test', 'page consacrée à l’examen')}. Le guide est protégé par le droit d’auteur de la Couronne : nous n’en copions pas le texte, et chaque question comme chaque explication est rédigée par Radif Partners à partir de ses faits. Certaines pages du guide sont antérieures à des changements récents, comme l’accession au trône du roi Charles III ; nos questions parlent alors de l’institution, « le souverain », plutôt que de la personne. Pour organiser vos révisions, essayez le ${h.a('ca-study-guide', 'plan d’étude')} ; pour la note à atteindre, voyez la page sur la ${h.a('ca-pass-mark', 'note de passage')}.</p>`;
    },
  },
});
