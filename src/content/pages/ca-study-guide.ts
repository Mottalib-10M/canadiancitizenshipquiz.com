import { definePage } from '../../lib/guide-types';

const CH = ['ca-ch-rights', 'ca-ch-who', 'ca-ch-history', 'ca-ch-modern', 'ca-ch-government', 'ca-ch-elections', 'ca-ch-justice', 'ca-ch-symbols', 'ca-ch-economy', 'ca-ch-regions'];

/** Same arithmetic as the castudy mini tool, for the worked example in the text. */
const plan = (d: number, m: number) => {
  const mocks = Math.min(3, Math.floor(d / 4));
  return { hours: (d * m) / 60, mocks, perCh: Math.max(1, Math.floor((d - mocks) / 10)), perDay: Math.ceil(100 / Math.max(1, d - mocks)) };
};

export default definePage({
  id: 'ca-study-guide',
  group: 'test',
  order: 40,
  tool: { kind: 'mini:castudy' },
  related: ['home', 'ca-practice', 'ca-questions', 'ca-ch-rights', 'ca-pass-mark'],
  sources: ['ca_study', 'ca_guide', 'ca_test'],
  en: {
    slug: 'discover-canada-study-guide',
    nav: 'Discover Canada study guide',
    card: 'The only official guide for the test, its ten chapters, and a study plan sized to the days you have left.',
    title: 'Discover Canada study guide: 10 chapters and a study plan',
    description: 'Discover Canada is the only official guide for the citizenship test. See its ten chapters, what each covers, and build a study plan from the days you have left.',
    h1: 'Discover Canada study guide: plan your revision',
    intro: 'Enter the days left before your test and the minutes you can give each day: the plan shows your total study time, days per chapter and how many mock tests to keep for the end.',
    resume: (h) => `Discover Canada: The Rights and Responsibilities of Citizenship is the only study guide IRCC names for the citizenship test, and every test question is drawn from its facts. It has ${h.chapters.length} chapters: rights and responsibilities, who we are, history, modern Canada, how Canadians govern themselves, federal elections, the justice system, symbols, the economy and the regions. IRCC adds a warning that third-party guides are used at your own risk, so treat any practice material, ours included, as a way to check what you learned from the guide, not as a replacement. The test asks ${h.n} questions in ${h.P.ca.test.minutes} minutes and you need ${h.need} correct answers, so no chapter can be left out. The planner above divides the days you have left between the chapters, keeps up to three days at the end for full mock tests, and tells you how many practice questions to answer each day to cover the ${h.chapters.length} chapters once. With three weeks and half an hour a day, for example, you get a little over ten hours of study, which is enough for most applicants who work steadily.`,
    faqs: (h) => [
      { q: 'Is Discover Canada the only book I need?', a: `For content, yes: IRCC states that it is the only official study guide and that test questions come from it. Practice questions help you check what you retained and get used to the format of ${h.n} questions in ${h.P.ca.test.minutes} minutes, but they do not replace reading the guide. IRCC warns that third-party guides are used at your own risk.` },
      { q: 'Which chapters of Discover Canada are hardest?', a: 'Most applicants find history and government the heaviest: history because of the number of dates and names, government because of offices that sound alike, such as Governor General and Lieutenant Governor. Symbols and regions are lighter but full of small facts. The chapter pages on this site list the traps of each one.' },
      { q: 'Is the guide up to date?', a: 'Not on every point. Discover Canada was written during the reign of Queen Elizabeth II, while the oath IRCC publishes today names King Charles III. Questions about the monarchy are best answered with the office, the Sovereign, rather than a name. Avoid relying on any figure in the guide that changes over time, such as the holders of public offices.' },
      { q: 'How long should I study for the citizenship test?', a: 'There is no official figure. Ten to fifteen hours spread over two to four weeks suits many people, but the right measure is results: when several timed mock tests in a row land well above the pass mark, you are ready. The planner on this page turns your own calendar into daily targets.' },
    ],
    body: (h) => {
      const ex = plan(21, 30);
      return `
<h2>What the planner calculates</h2>
<p>The tool takes two numbers: days before the test and minutes a day. It multiplies them to give your total study time in hours. It keeps up to three days at the end for full mock tests (one for every four days available, never more than three). It spreads the remaining days over the ${h.chapters.length} chapters to give days per chapter; with fewer than ten days, it tells you to cover several chapters a day. Finally, it divides one hundred practice questions, ten per chapter, by the study days left, to give a daily practice target. With 21 days and 30 minutes, for instance, that is ${h.num(ex.hours, 1)} hours in all, ${ex.perCh} day per chapter, ${ex.mocks} mock tests kept for the end and ${ex.perDay} practice questions a day.</p>
<h2>The ten chapters</h2>
${h.table(['Chapter', 'Main content', 'Questions in our bank'], [
        [h.a(CH[0], h.chapters[0]), 'Charter of 1982, freedoms, duties such as jury service and voting', h.inChapter(0)],
        [h.a(CH[1], h.chapters[1]), 'First Nations, Inuit, Métis, Acadians, Québécois, official languages', h.inChapter(1)],
        [h.a(CH[2], h.chapters[2]), 'explorers, New France, British rule, Confederation, world wars', h.inChapter(2)],
        [h.a(CH[3], h.chapters[3]), 'postwar Canada, Quiet Revolution, arts, science and sport', h.inChapter(3)],
        [h.a(CH[4], h.chapters[4]), 'monarchy, Parliament, federal and provincial powers', h.inChapter(4)],
        [h.a(CH[5], h.chapters[5]), 'who votes, ridings, majority and minority governments', h.inChapter(5)],
        [h.a(CH[6], h.chapters[6]), 'presumption of innocence, courts, police', h.inChapter(6)],
        [h.a(CH[7], h.chapters[7]), 'flag, anthem, motto, honours, national sports', h.inChapter(7)],
        [h.a(CH[8], h.chapters[8]), 'three sectors, trade with the United States, regional products', h.inChapter(8)],
        [h.a(CH[9], h.chapters[9]), 'five regions, provinces, territories and capitals', h.inChapter(9)],
      ], 'Chapters of Discover Canada, with a link to our revision page for each.', ['l', 'l', 'r'])}
<h2>A study method in four steps</h2>
<p>First, skim a chapter of questions in the ${h.a('ca-questions', 'question bank')} to see what matters. Second, read the same chapter in the guide, slowly, noting dates and names. Third, take a ten-question ${h.a('ca-practice', 'practice set')} on that chapter and reread only what you missed. Fourth, after the last chapter, use the days the planner keeps aside for the ${h.a('home', 'timed mock test')}, which follows the real format. If a mock test falls below the pass mark, go back to the weakest chapter before trying again.</p>
<h2>Reading the guide wisely</h2>
<p>The guide is available to read online on ${h.src('ca_guide', 'canada.ca')}, and IRCC links to it from its ${h.src('ca_study', 'study page')}. It is under Crown copyright, which is why no practice site may simply reproduce it. A few passages are dated. The most visible is the monarchy: the guide speaks of Queen Elizabeth II, while the current oath names King Charles III. When you meet such a point, answer by the office rather than the name. Skip any number that changes over time, such as the people currently in office; the test is built on the stable facts.</p>
<h2>When you are ready</h2>
<p>Readiness is measured, not felt. When three timed mock tests on different days all reach at least ${h.need} out of ${h.n}, and preferably two or three more, you are ready. The ${h.a('ca-pass-mark', 'pass mark page')} explains what each score means and what happens after a failed attempt.</p>`;
    },
  },
  fr: {
    slug: 'guide-decouvrir-le-canada',
    nav: 'Guide Découvrir le Canada',
    card: 'Le seul guide officiel de l’examen, ses dix chapitres, et un plan de révision calé sur les jours qui restent.',
    title: 'Guide Découvrir le Canada : 10 chapitres et plan de révision',
    description: 'Découvrir le Canada est le seul guide officiel de l’examen de citoyenneté. Voyez ses dix chapitres et bâtissez un plan de révision selon vos jours restants.',
    h1: 'Découvrir le Canada : organiser ses révisions',
    intro: 'Indiquez les jours qui restent avant l’examen et les minutes disponibles par jour : le plan affiche le temps total, les jours par chapitre et les examens blancs à garder pour la fin.',
    resume: (h) => `Découvrir le Canada : les droits et responsabilités liés à la citoyenneté est le seul guide d’étude qu’IRCC désigne pour l’examen de citoyenneté, et toutes les questions de l’examen reposent sur ses faits. Il compte ${h.chapters.length} chapitres : droits et responsabilités, qui sommes-nous, histoire, Canada moderne, mode de gouvernement, élections fédérales, système judiciaire, symboles, économie et régions. IRCC précise que les guides produits par des tiers s’utilisent à vos risques : tout matériel d’entraînement, le nôtre compris, sert à vérifier ce que vous avez retenu du guide, pas à le remplacer. L’examen comporte ${h.n} questions en ${h.P.ca.test.minutes} minutes et il faut ${h.need} bonnes réponses : aucun chapitre ne peut être négligé. Le planificateur ci-dessus répartit vos jours entre les chapitres, garde jusqu’à trois jours à la fin pour des examens blancs complets et fixe un nombre de questions d’entraînement par jour pour couvrir les ${h.chapters.length} chapitres une fois. Avec trois semaines et une demi-heure par jour, par exemple, on obtient un peu plus de dix heures de révision, ce qui suffit à la plupart des candidats réguliers.`,
    faqs: (h) => [
      { q: 'Découvrir le Canada suffit-il pour se préparer ?', a: `Pour le contenu, oui : IRCC indique que c’est le seul guide officiel et que les questions en sont tirées. Les questions d’entraînement aident à vérifier ce que vous avez retenu et à vous habituer au format de ${h.n} questions en ${h.P.ca.test.minutes} minutes, mais elles ne remplacent pas la lecture. IRCC prévient que les guides de tiers s’utilisent à vos risques.` },
      { q: 'Quels chapitres du guide sont les plus difficiles ?', a: 'L’histoire et le gouvernement, pour la plupart des candidats : l’histoire à cause du nombre de dates et de noms, le gouvernement à cause des fonctions qui se ressemblent, comme gouverneur général et lieutenant-gouverneur. Les symboles et les régions sont plus légers mais remplis de petits faits. Nos fiches par chapitre en listent les pièges.' },
      { q: 'Le guide est-il à jour ?', a: 'Pas sur tous les points. Découvrir le Canada a été rédigé sous le règne d’Élisabeth II, alors que le serment publié aujourd’hui par IRCC nomme le roi Charles III. Pour les questions sur la monarchie, répondez par la fonction, le souverain, plutôt que par un nom. Ne vous fiez pas aux données qui changent avec le temps, comme les titulaires des charges publiques.' },
      { q: 'Combien de temps réviser pour l’examen de citoyenneté ?', a: 'Il n’y a pas de durée officielle. Dix à quinze heures étalées sur deux à quatre semaines conviennent à beaucoup de gens, mais le vrai critère, ce sont les résultats : quand plusieurs examens blancs chronométrés d’affilée dépassent nettement la note de passage, vous êtes prêt. Le planificateur transforme votre calendrier en objectifs quotidiens.' },
    ],
    body: (h) => {
      const ex = plan(21, 30);
      return `
<h2>Ce que calcule le planificateur</h2>
<p>L’outil prend deux nombres : les jours avant l’examen et les minutes par jour. Il les multiplie pour donner le temps total de révision, en heures. Il réserve jusqu’à trois jours à la fin pour des examens blancs complets, à raison d’un par tranche de quatre jours disponibles, jamais plus de trois. Il répartit les jours restants entre les ${h.chapters.length} chapitres pour donner un nombre de jours par chapitre ; sous dix jours, il vous indique de traiter plusieurs chapitres par jour. Enfin, il divise cent questions d’entraînement, dix par chapitre, par les jours d’étude restants. Avec 21 jours et 30 minutes, par exemple : ${h.num(ex.hours, 1)} heures au total, ${ex.perCh} jour par chapitre, ${ex.mocks} examens blancs pour la fin et ${ex.perDay} questions d’entraînement par jour.</p>
<h2>Les dix chapitres</h2>
${h.table(['Chapitre', 'Contenu principal', 'Questions dans notre banque'], [
        [h.a(CH[0], h.chapters[0]), 'Charte de 1982, libertés, devoirs comme le jury et le vote', h.inChapter(0)],
        [h.a(CH[1], h.chapters[1]), 'Premières Nations, Inuits, Métis, Acadiens, Québécois, langues officielles', h.inChapter(1)],
        [h.a(CH[2], h.chapters[2]), 'explorateurs, Nouvelle-France, régime britannique, Confédération, guerres mondiales', h.inChapter(2)],
        [h.a(CH[3], h.chapters[3]), 'après-guerre, Révolution tranquille, arts, sciences et sport', h.inChapter(3)],
        [h.a(CH[4], h.chapters[4]), 'monarchie, Parlement, compétences fédérales et provinciales', h.inChapter(4)],
        [h.a(CH[5], h.chapters[5]), 'qui vote, circonscriptions, gouvernements majoritaire et minoritaire', h.inChapter(5)],
        [h.a(CH[6], h.chapters[6]), 'présomption d’innocence, tribunaux, police', h.inChapter(6)],
        [h.a(CH[7], h.chapters[7]), 'drapeau, hymne, devise, distinctions, sports nationaux', h.inChapter(7)],
        [h.a(CH[8], h.chapters[8]), 'trois secteurs, commerce avec les États-Unis, productions régionales', h.inChapter(8)],
        [h.a(CH[9], h.chapters[9]), 'cinq régions, provinces, territoires et capitales', h.inChapter(9)],
      ], 'Chapitres de Découvrir le Canada, avec un lien vers notre fiche pour chacun.', ['l', 'l', 'r'])}
<h2>Une méthode en quatre temps</h2>
<p>Parcourez d’abord les questions d’un chapitre dans la ${h.a('ca-questions', 'banque de questions')} pour repérer ce qui compte. Lisez ensuite ce chapitre dans le guide, lentement, en notant dates et noms. Faites une ${h.a('ca-practice', 'série d’entraînement')} de dix questions sur ce chapitre et relisez seulement ce que vous avez manqué. Après le dernier chapitre, consacrez les jours mis de côté par le planificateur à l’${h.a('home', 'examen blanc chronométré')}, au format réel. Si un examen blanc tombe sous la note de passage, revenez au chapitre le plus faible avant de recommencer.</p>
<h2>Lire le guide avec discernement</h2>
<p>Le guide se lit en ligne sur ${h.src('ca_guide', 'canada.ca')}, et IRCC y renvoie depuis sa ${h.src('ca_study', 'page sur la préparation')}. Il est protégé par le droit d’auteur de la Couronne, raison pour laquelle aucun site d’entraînement ne peut le reproduire tel quel. Quelques passages ont vieilli, à commencer par la monarchie : le guide parle d’Élisabeth II, alors que le serment actuel nomme le roi Charles III. Devant un tel point, répondez par la fonction plutôt que par le nom, et laissez de côté les données qui changent, comme les titulaires actuels des charges ; l’examen repose sur les faits stables.</p>
<h2>Quand êtes-vous prêt ?</h2>
<p>Cela se mesure. Quand trois examens blancs chronométrés, passés des jours différents, atteignent tous au moins ${h.need} sur ${h.n}, et idéalement deux ou trois de plus, vous êtes prêt. La page sur la ${h.a('ca-pass-mark', 'note de passage')} explique chaque résultat et la suite d’un échec.</p>`;
    },
  },
});
