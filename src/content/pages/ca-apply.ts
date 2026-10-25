import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-apply',
  group: 'apply',
  order: 210,
  tool: { kind: 'mini:caelig' },
  related: ['ca-presence', 'ca-application', 'ca-tax', 'ca-language', 'ca-pr', 'ca-citizenship'],
  sources: ['ca_eligibility', 'ca_prohibitions', 'ca_bulletin', 'ca_act'],
  en: {
    slug: 'apply-for-canadian-citizenship',
    nav: 'Eligibility to apply',
    card: 'Days of presence, taxes, language, test and prohibitions: every condition checked before you sign.',
    title: 'Apply for Canadian citizenship: eligibility checklist 2026',
    description: 'Before you apply for Canadian citizenship: 1,095 days in 5 years, 730 as a PR, 3 tax years, CLB 4 at ages 18 to 54, and the prohibitions that block a file.',
    h1: 'Apply for Canadian citizenship: do you meet every condition?',
    intro: 'Enter your credited days, the tax years you filed, your age and whether you hold a language result: the measurable conditions are checked at once.',
    resume: (h) => {
      const C = h.P.ca.presence, T = h.P.ca.test, X = h.P.ca.prohibitions;
      return `To apply for Canadian citizenship as an adult, you face six conditions, and all but the test must already be met on the day before you sign the application, not on the day IRCC opens it. First, valid permanent resident status with no unfulfilled conditions. Second, ${h.num(C.requiredDays)} days of physical presence in the ${C.windowYears} years before signing, including at least ${h.num(C.minPrDays)} days as a permanent resident; each earlier day as a temporary resident or protected person is worth half a day, capped at ${h.num(C.preprMaxCredit)} days of credit. Third, income tax returns for at least ${C.taxYearsRequired} of those ${C.windowYears} years if the Income Tax Act required you to file. Fourth, if you are ${C.languageAges[0]} to ${C.languageAges[1]}, proof of ${C.languageLevel} in speaking and listening. Fifth, at the same ages, a pass on the citizenship test after you apply. Sixth, no prohibition: no current sentence, parole or probation, no pending charge for an indictable offence, no such conviction in the past ${X.convictionYears} years, no removal order, and no refusal for misrepresentation in the past ${X.misrepresentationYears} years. Time in prison, on parole or on probation does not count as presence either.`;
    },
    faqs: (h) => [
      { q: 'On which day must I meet the citizenship conditions?', a: 'On the day before you sign. IRCC’s instructions on physical presence say the day you apply is not counted, and the form must carry the real date of signature, never an earlier or later one. If you are one day short, sign one day later: dating the form in advance is not allowed.' },
      { q: 'Does a criminal record abroad stop a citizenship application?', a: `It can. A conviction outside Canada for an offence that would be indictable here counts as a prohibition if it falls within the ${h.P.ca.prohibitions.convictionYears} years before you apply, and IRCC notes that a foreign equivalent counts even if you were pardoned. A charge or trial in progress abroad blocks the application in the same way as one in Canada.` },
      { q: 'Can a permanent resident under a removal order apply?', a: 'No. Being under a removal order, meaning an order from Canadian authorities to leave the country, is on IRCC’s list of situations that prevent citizenship. Separately, IRCC’s eligibility page requires valid permanent resident status with no unfulfilled conditions, so a status still under review is a problem in its own right.' },
      { q: 'Is a past refusal for misrepresentation a lasting bar?', a: `For ${h.P.ca.prohibitions.misrepresentationYears} years. An applicant refused citizenship because of misrepresentation cannot be granted citizenship during that period. Revocation for fraud has a longer effect: a person whose citizenship was taken away for fraud cannot obtain it again within ${h.P.ca.prohibitions.fraudRevocationYears} years.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, T = h.P.ca.test, X = h.P.ca.prohibitions;
      return `
<h2>The six conditions at a glance</h2>
${h.table(['Condition', 'Rule', 'Who'], [['Status', 'permanent resident, no unfulfilled conditions', 'everyone'], ['Physical presence', `${h.num(C.requiredDays)} days in ${C.windowYears} years, ${h.num(C.minPrDays)} as a PR`, 'adults'], ['Taxes', `${C.taxYearsRequired} years of ${C.windowYears}, if a return was required`, 'adults'], ['Language', `${C.languageLevel}, speaking and listening`, `ages ${C.languageAges[0]} to ${C.languageAges[1]}`], ['Test', `${T.questions} questions, ${h.need} to pass`, `ages ${T.ages[0]} to ${T.ages[1]}`], ['Prohibitions', 'none applies', 'everyone']], 'Conditions for adults, from IRCC’s eligibility page.', ['l', 'l', 'l'])}
<p>The calculator above checks the three conditions that can be counted. Status and prohibitions are questions of fact that only your own file answers, which is why the result always reminds you of them.</p>
<h2>Physical presence: the condition that decides the date</h2>
<p>For most people the date of application is set by the days, not by the rest. IRCC looks at the ${C.windowYears} years that end the day before you sign. Each day spent in Canada as a permanent resident counts as one. Each day spent here before that, with a work permit, a study permit, as a visitor or as a protected person, counts as half, with a ceiling of ${h.num(C.preprMaxCredit)} days of credit. For a protected person, that earlier time runs only from the day protection was granted. A day partly spent in Canada, such as the day you fly out or come back, is a day present.</p>
<p>Three kinds of days do not count at all: days in prison, on parole and on probation. The opposite exception concerns Crown servants posted abroad (Canadian Armed Forces, the federal public administration or a provincial public service, unless locally engaged) and their spouse, partner or child: each day abroad counts in full, through a paper application with form CIT 0177. The ${h.a('ca-presence', 'day-by-day calculator')} turns your trips into a date and the ${h.a('ca-pr', 'page on permanent resident days')} explains the ${h.num(C.minPrDays)}-day floor.</p>
<h2>Taxes, language and test</h2>
<p>The tax condition depends on whether the law obliged you to file; the ${h.a('ca-tax', 'tax filing page')} goes into it. Language proof is only asked of applicants aged ${C.languageAges[0]} to ${C.languageAges[1]} when they sign, and only for speaking and listening; the ${h.a('ca-language', 'language page')} lists the accepted proof. The test comes later, once IRCC has the application, and our ${h.a('home', 'mock test')} uses the same format.</p>
<h2>Situations that prevent citizenship</h2>
<ul>
<li>Serving a sentence in Canada (prison, parole, probation) or a sentence abroad.</li>
<li>Being charged with, on trial for or appealing an indictable offence or an offence under the Citizenship Act, in Canada or the foreign equivalent abroad.</li>
<li>A conviction for such an offence in the ${X.convictionYears} years before applying.</li>
<li>An investigation or conviction for war crimes or crimes against humanity.</li>
<li>As a permanent resident, a conviction for terrorism, treason, high treason or spying, or service in an armed force or group engaged in armed conflict with Canada.</li>
<li>A removal order.</li>
<li>A refusal for misrepresentation in the past ${X.misrepresentationYears} years, or citizenship revoked for fraud in the past ${X.fraudRevocationYears} years.</li>
</ul>
<p>The wording above summarizes ${h.src('ca_prohibitions', 'IRCC’s list of situations that may prevent citizenship')}; the legal text is in the ${h.src('ca_act', 'Citizenship Act')}. When one item applies, wait until it no longer does before you pay the fee, since an ineligible application is not a cheap way to find out.</p>
<h2>Next step</h2>
<p>When every line is green, move to the ${h.a('ca-application', 'application itself')}: forms, documents and the date you sign. Keep your presence calculation and your signature on the same day so the two match.</p>`;
    },
  },
  fr: {
    slug: 'demander-la-citoyennete',
    nav: 'Conditions pour demander',
    card: 'Jours de présence, impôts, langue, examen et interdictions : chaque condition vérifiée avant de signer.',
    title: 'Demander la citoyenneté canadienne : conditions en 2026',
    description: 'Avant de demander la citoyenneté canadienne : 1 095 jours en 5 ans dont 730 comme RP, 3 années d’impôt, NCLC 4 de 18 à 54 ans, et les interdictions à vérifier.',
    h1: 'Demander la citoyenneté : remplissez-vous toutes les conditions ?',
    intro: 'Indiquez vos jours crédités, vos années d’impôt produites, votre âge et votre preuve de langue : les conditions chiffrées sont vérifiées sur-le-champ.',
    resume: (h) => {
      const C = h.P.ca.presence, X = h.P.ca.prohibitions;
      return `Pour demander la citoyenneté canadienne à l’âge adulte, six conditions s’appliquent, et toutes sauf l’examen doivent être réunies la veille du jour où vous signez la demande, et non le jour où IRCC l’ouvre. D’abord le statut de résident permanent, sans obligation en suspens. Ensuite ${h.num(C.requiredDays)} jours de présence effective sur les ${C.windowYears} ans qui précèdent la signature, dont au moins ${h.num(C.minPrDays)} comme résident permanent ; chaque jour passé plus tôt au Canada comme résident temporaire ou personne protégée vaut une demi-journée, dans la limite de ${h.num(C.preprMaxCredit)} jours de crédit. Puis les déclarations de revenus d’au moins ${C.taxYearsRequired} de ces ${C.windowYears} années, si la Loi de l’impôt sur le revenu vous obligeait à les produire. Entre ${C.languageAges[0]} et ${C.languageAges[1]} ans, une preuve du niveau ${C.languageLevel} à l’oral et à l’écoute, et, aux mêmes âges, la réussite de l’examen après le dépôt. Enfin, aucune interdiction : pas de peine en cours, de libération conditionnelle ni de probation, pas d’accusation pendante pour un acte criminel, pas de condamnation de ce type dans les ${X.convictionYears} dernières années, pas de mesure de renvoi, pas de refus pour fausses déclarations depuis ${X.misrepresentationYears} ans. Le temps passé en prison, en libération conditionnelle ou en probation ne compte pas comme présence.`;
    },
    faqs: (h) => [
      { q: 'À quelle date les conditions de citoyenneté s’apprécient-elles ?', a: 'La veille de la signature. Les instructions d’IRCC sur la présence effective précisent que le jour de la demande n’est pas compté, et le formulaire doit porter la date réelle de signature, ni antérieure ni postérieure. S’il vous manque un jour, signez le lendemain : antidater ou postdater la demande est exclu.' },
      { q: 'Une condamnation à l’étranger empêche-t-elle la citoyenneté ?', a: `Elle le peut. Une condamnation hors du Canada pour une infraction qui serait ici un acte criminel constitue une interdiction si elle date de moins de ${h.P.ca.prohibitions.convictionYears} ans avant la demande, et IRCC précise que l’équivalent étranger compte même après un pardon. Une accusation ou un procès en cours à l’étranger bloque la demande comme au Canada.` },
      { q: 'Un résident permanent visé par une mesure de renvoi peut-il présenter une demande ?', a: 'Non. La mesure de renvoi, c’est-à-dire l’ordre des autorités canadiennes de quitter le pays, figure parmi les situations qui empêchent d’obtenir la citoyenneté. Par ailleurs, la page d’admissibilité d’IRCC exige un statut de résident permanent valide, sans obligation non remplie : un statut fragile pose donc problème à part entière.' },
      { q: 'Combien de temps dure l’effet d’un refus pour fausses déclarations ?', a: `${h.P.ca.prohibitions.misrepresentationYears} ans. La personne dont la demande a été refusée pour fausses déclarations ne peut pas obtenir la citoyenneté pendant cette période. La révocation pour fraude pèse plus longtemps : celui dont la citoyenneté a été retirée pour ce motif ne peut la recouvrer avant ${h.P.ca.prohibitions.fraudRevocationYears} ans.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, T = h.P.ca.test, X = h.P.ca.prohibitions;
      return `
<h2>Les six conditions en un tableau</h2>
${h.table(['Condition', 'Règle', 'Qui'], [['Statut', 'résident permanent, sans obligation en suspens', 'tous'], ['Présence effective', `${h.num(C.requiredDays)} jours en ${C.windowYears} ans, dont ${h.num(C.minPrDays)} comme RP`, 'adultes'], ['Impôts', `${C.taxYearsRequired} années sur ${C.windowYears}, si la déclaration était exigée`, 'adultes'], ['Langue', `${C.languageLevel}, expression et compréhension orales`, `${C.languageAges[0]} à ${C.languageAges[1]} ans`], ['Examen', `${T.questions} questions, ${h.need} pour réussir`, `${T.ages[0]} à ${T.ages[1]} ans`], ['Interdictions', 'aucune ne s’applique', 'tous']], 'Conditions pour les adultes, d’après la page d’admissibilité d’IRCC.', ['l', 'l', 'l'])}
<p>L’outil ci-dessus vérifie les trois conditions qui se comptent. Le statut et les interdictions relèvent des faits de votre dossier : seul celui-ci y répond, d’où le rappel affiché sous le résultat.</p>
<h2>La présence effective fixe la date</h2>
<p>Dans la plupart des cas, c’est le décompte des jours qui décide du moment du dépôt. IRCC examine les ${C.windowYears} ans qui se terminent la veille de la signature. Un jour au Canada comme résident permanent vaut un jour. Un jour antérieur, avec un permis de travail ou d’études, comme visiteur ou comme personne protégée, vaut une demi-journée, plafonnée à ${h.num(C.preprMaxCredit)} jours de crédit ; pour la personne protégée, ce temps ne court qu’à partir de l’octroi de la protection. Le jour où vous partez et celui où vous rentrez sont des jours de présence, puisque vous avez passé une partie de la journée au pays.</p>
<p>Trois catégories de jours ne comptent pas : la prison, la libération conditionnelle et la probation. À l’inverse, les fonctionnaires de l’État en poste à l’étranger (Forces armées canadiennes, administration publique fédérale ou fonction publique provinciale, hors personnel recruté sur place) et leur époux, conjoint de fait ou enfant comptent chaque jour à l’étranger en entier, par une demande papier avec le formulaire CIT 0177. Le ${h.a('ca-presence', 'calcul jour par jour')} tient compte de vos voyages et la page ${h.a('ca-pr', 'jours de résident permanent')} détaille le plancher de ${h.num(C.minPrDays)} jours.</p>
<h2>Impôts, langue et examen</h2>
<p>L’obligation fiscale dépend de ce que la loi exigeait de vous ; la page ${h.a('ca-tax', 'déclarations d’impôts')} l’explique. La preuve de langue ne concerne que les ${C.languageAges[0]} à ${C.languageAges[1]} ans au moment de la signature, et seulement l’oral ; la page ${h.a('ca-language', 'preuve de langue')} recense les documents admis. L’examen vient après le dépôt, et notre ${h.a('home', 'examen blanc')} en reprend la forme.</p>
<h2>Les situations qui ferment la porte</h2>
<ul>
<li>Purger une peine au Canada (prison, libération conditionnelle, probation) ou à l’étranger.</li>
<li>Être accusé, en procès ou en appel pour un acte criminel ou une infraction à la Loi sur la citoyenneté, au Canada ou pour l’équivalent à l’étranger.</li>
<li>Avoir été condamné pour une telle infraction dans les ${X.convictionYears} ans précédant la demande.</li>
<li>Faire l’objet d’une enquête ou d’une condamnation pour crimes de guerre ou crimes contre l’humanité.</li>
<li>Avoir été condamné, comme résident permanent, pour terrorisme, trahison, haute trahison ou espionnage, ou avoir servi dans une force armée ou un groupe en conflit armé avec le Canada.</li>
<li>Être visé par une mesure de renvoi.</li>
<li>Avoir essuyé un refus pour fausses déclarations depuis moins de ${X.misrepresentationYears} ans, ou une révocation pour fraude depuis moins de ${X.fraudRevocationYears} ans.</li>
</ul>
<p>Cette liste résume la page d’IRCC sur les ${h.src('ca_prohibitions', 'situations qui peuvent empêcher d’obtenir la citoyenneté')} ; le texte de référence reste la ${h.src('ca_act', 'Loi sur la citoyenneté')}. Si un point vous concerne, attendez qu’il soit levé avant de payer : une demande irrecevable coûte cher pour une simple vérification.</p>
<h2>Ensuite</h2>
<p>Quand tout est au vert, passez à la ${h.a('ca-application', 'demande elle-même')} : formulaires, pièces et date de signature. Faites votre calcul de présence le jour même où vous signez, pour que les deux concordent.</p>`;
    },
  },
});
