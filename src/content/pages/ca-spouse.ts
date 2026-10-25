import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-spouse',
  group: 'apply',
  order: 290,
  tool: { kind: 'mini:caspouse' },
  mini: { kind: 'mini:cafee' },
  related: ['ca-presence', 'ca-pr', 'ca-apply', 'ca-application', 'ca-minors'],
  sources: ['ca_eligibility', 'ca_how', 'ca_fees'],
  en: {
    slug: 'canadian-citizenship/spouse',
    nav: 'Spouses and partners',
    card: 'Marriage to a Canadian gives no shortcut: each spouse counts their own days. Who can apply first, and filing together.',
    title: 'Citizenship for the spouse of a Canadian: no shortcut, 2026',
    description: 'Married to a Canadian? Citizenship still takes 1,095 days in 5 years and the usual conditions. Who can apply first, filing together, and the single exception.',
    h1: 'Citizenship for spouses: does marriage change anything?',
    intro: 'Enter the days each of you has credited: you see who reaches 1,095 first, how far apart you are and whether filing together makes sense.',
    resume: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees;
      return `Marrying a Canadian does not make you a Canadian citizen, and it does not shorten the path either. IRCC says so plainly: you do not automatically become a citizen when you marry a Canadian, and a spouse or common-law partner meets the same requirements as any other adult. That means permanent resident status, ${h.num(C.requiredDays)} days of physical presence in the ${C.windowYears} years before signing with at least ${h.num(C.minPrDays)} as a permanent resident, tax filing for ${C.taxYearsRequired} years when required, language proof and the test between ${C.languageAges[0]} and ${C.languageAges[1]}, and no prohibition. Each partner counts only their own days; nothing is shared or transferred. The single exception concerns the family of a Crown servant: the spouse, common-law partner or child of a member of the Canadian Armed Forces or of the federal or a provincial public service posted abroad can count those days abroad in full, on a paper application with form CIT 0177. When both partners are permanent residents, they can file online together as a group, but each still pays ${h.cad(F.adult)}.`;
    },
    faqs: (h) => [
      { q: 'Can my Canadian spouse’s years in Canada count toward my 1,095 days?', a: `No. Physical presence is personal: only the days you yourself spent in Canada count, at full value as a permanent resident and at half value before. Your spouse's citizenship, however long they have lived here, adds nothing to your total of ${h.num(h.P.ca.presence.requiredDays)} days.` },
      { q: 'Should a couple wait to apply for citizenship together?', a: 'It is a choice, not a rule. Each partner can sign as soon as they personally qualify, and the other follows later. Filing together online keeps the files side by side and suits couples whose dates are close. When the gap runs to months, the partner who qualifies first often prefers not to wait; the calculator above shows the gap in days.' },
      { q: 'Does living abroad with a Canadian spouse count as presence?', a: 'In general no: days outside Canada are absences, whoever you live with. The exception is narrow. If your spouse or partner is a Crown servant posted abroad, such as a member of the Canadian Armed Forces, your days abroad with them count in full, through a paper application with form CIT 0177. Living abroad with a Canadian in private employment does not qualify.' },
    ],
    body: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees;
      return `
<h2>Same rules for every adult</h2>
<p>Many couples assume that the partner of a citizen has an easier path to citizenship. In Canada that is not the case. A spouse or common-law partner applies as an adult permanent resident like any other, with the same ${h.a('ca-apply', 'eligibility conditions')}, the same ${h.a('ca-application', 'application file')} and the same fee of ${h.cad(F.adult)}. Whatever role the relationship played before, citizenship is assessed on your own record alone.</p>
<h2>Who can apply first?</h2>
<p>The calculator at the top compares two credited totals and names the partner closer to ${h.num(C.requiredDays)}. Credited means days as a permanent resident plus half of the earlier days, up to the ${h.num(C.preprMaxCredit)}-day cap. For the exact date of each partner, run the ${h.a('ca-presence', 'day-by-day calculator')} twice, once per person, with each person's own trips.</p>
<p>An example shows how far apart two partners can be. They both became permanent residents on ${h.date('2022-09-01')}. One had been studying in Canada since ${h.date('2020-09-01')}; the other arrived on the landing day and later spent ${h.num(40)} whole days abroad on a work assignment in spring 2023.</p>
${h.table(['', 'Partner A', 'Partner B'], [['Days in Canada before PR', h.num(730), '0'], ['Credit (half, capped)', h.num(C.preprMaxCredit), '0'], ['Whole days abroad since PR', '0', h.num(40)], ['Days needed as a PR', h.num(C.minPrDays), h.num(C.requiredDays)], ['First signing date', h.date('2024-08-31'), h.date('2025-10-10')]], 'Worked example; the dates come from the day-by-day calculator.', ['l', 'r', 'r'])}
<p>Partner A can sign more than a year before partner B. The study period earned the maximum credit, and partner A spent no whole day abroad. Partner B needs the full ${h.num(C.requiredDays)} days as a permanent resident, plus the ${h.num(40)} days lost abroad. Neither partner's situation helps the other.</p>
<h2>Filing together, or one after the other</h2>
<p>IRCC lets adults apply online as a group, related or not, and a parent can add up to ${h.P.ca.application.groupMinorsMax} children to the same account. For a couple whose dates are close, a joint submission keeps the two files together and lets the children go with them. For a couple far apart, the partner who qualifies can go ahead, and children can be included with that parent's application: a minor whose parent applies at the same time follows the simpler route described on the ${h.a('ca-minors', 'page on minors')}. Fees are per person in every case; the second calculator on this page adds them up.</p>
<h2>The Crown servant exception</h2>
<p>The only family rule in the eligibility conditions concerns Crown servants. When a member of the Canadian Armed Forces, of the federal public administration or of a provincial or territorial public service is posted outside Canada (not as locally engaged staff), each day abroad counts as a full day of presence for that person and for the spouse, common-law partner or child living with them abroad. The application must then be filed on paper, with form CIT 0177. A posting abroad by a private employer, even a Canadian one, does not count. The full text is on ${h.src('ca_eligibility', 'IRCC’s eligibility page')}.</p>
<h2>Preparing for the test as a couple</h2>
<p>If both partners are between ${h.P.ca.test.ages[0]} and ${h.P.ca.test.ages[1]}, both will sit the ${h.P.ca.test.questions}-question test. Studying together works well: one asks, the other answers. Then each partner can sit our ${h.a('home', 'timed mock test')} alone, under the real time limit, and compare the chapters where points were lost.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/conjoint',
    nav: 'Conjoints',
    card: 'Épouser un Canadien ne raccourcit rien : chaque conjoint compte ses propres jours. Qui dépose en premier, et à deux.',
    title: 'Citoyenneté du conjoint d’un Canadien : aucun raccourci',
    description: 'Marié à un Canadien ? La citoyenneté exige toujours 1 095 jours en 5 ans et les conditions habituelles. Qui dépose en premier, la demande à deux, l’exception.',
    h1: 'Conjoints : le mariage change-t-il quelque chose ?',
    intro: 'Indiquez les jours crédités de chacun : vous voyez qui atteint 1 095 en premier, l’écart entre vous et l’intérêt de déposer ensemble.',
    resume: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees;
      return `Épouser un Canadien ne rend pas citoyen, et n’abrège pas non plus le parcours. IRCC l’affirme sans détour : on ne devient pas automatiquement citoyen en se mariant avec un Canadien, et l’époux ou le conjoint de fait remplit les mêmes conditions que tout autre adulte. Il lui faut donc le statut de résident permanent, ${h.num(C.requiredDays)} jours de présence effective sur les ${C.windowYears} ans précédant la signature, dont au moins ${h.num(C.minPrDays)} comme résident permanent, les déclarations de revenus de ${C.taxYearsRequired} années si elles étaient exigées, une preuve de langue et l’examen entre ${C.languageAges[0]} et ${C.languageAges[1]} ans, et aucune interdiction. Chaque conjoint ne compte que ses propres jours ; rien ne se partage ni ne se transfère. Une seule exception touche la famille d’un fonctionnaire de l’État : l’époux, le conjoint de fait ou l’enfant d’un membre des Forces armées canadiennes ou de la fonction publique fédérale ou provinciale en poste à l’étranger compte ces jours à l’étranger en entier, par une demande papier avec le formulaire CIT 0177. Deux conjoints résidents permanents peuvent déposer ensemble en ligne, mais chacun paie ${h.cad(F.adult)}.`;
    },
    faqs: (h) => [
      { q: 'Les années de mon conjoint canadien comptent-elles dans mes 1 095 jours ?', a: `Non. La présence effective est personnelle : seuls comptent les jours que vous avez vous-même passés au Canada, en entier comme résident permanent et à moitié auparavant. La citoyenneté de votre conjoint, aussi ancienne soit sa présence au pays, n’ajoute rien à vos ${h.num(h.P.ca.presence.requiredDays)} jours.` },
      { q: 'Un couple a-t-il intérêt à attendre pour déposer ensemble ?', a: 'C’est un choix, pas une règle. Chacun peut signer dès qu’il remplit les conditions, l’autre suivant plus tard. Déposer ensemble en ligne garde les dossiers côte à côte et convient aux couples dont les dates sont proches. Quand l’écart se compte en mois, le premier admissible préfère souvent ne pas attendre ; l’outil ci-dessus chiffre cet écart.' },
      { q: 'Vivre à l’étranger avec un conjoint canadien compte-t-il comme présence ?', a: 'En règle générale, non : les jours hors du Canada sont des absences, quel que soit le conjoint. L’exception est étroite : si votre conjoint est un fonctionnaire de l’État en poste à l’étranger, par exemple dans les Forces armées canadiennes, vos jours à ses côtés comptent en entier, par demande papier avec le CIT 0177. Un emploi privé à l’étranger ne donne pas ce droit.' },
    ],
    body: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees;
      return `
<h2>Les mêmes règles pour tous les adultes</h2>
<p>Bien des couples pensent que le conjoint d’un citoyen bénéficie d’une voie plus courte vers la citoyenneté. Ce n’est pas le cas au Canada. L’époux ou le conjoint de fait demande la citoyenneté comme n’importe quel résident permanent adulte : mêmes ${h.a('ca-apply', 'conditions d’admissibilité')}, même ${h.a('ca-application', 'dossier de demande')}, mêmes frais de ${h.cad(F.adult)}. Quel qu’ait été le rôle du couple auparavant, la citoyenneté s’apprécie sur votre seul parcours.</p>
<h2>Qui peut déposer en premier ?</h2>
<p>L’outil en haut de page compare deux totaux crédités et désigne le conjoint le plus proche de ${h.num(C.requiredDays)}. Crédité signifie : jours comme résident permanent plus la moitié des jours antérieurs, dans la limite de ${h.num(C.preprMaxCredit)} jours. Pour la date exacte de chacun, faites deux fois le ${h.a('ca-presence', 'calcul jour par jour')}, une fois par personne, avec ses propres voyages.</p>
<p>Un exemple montre l’écart possible. Les deux conjoints sont devenus résidents permanents le ${h.date('2022-09-01')}. L’une étudiait au Canada depuis le ${h.date('2020-09-01')} ; l’autre est arrivé le jour de l’établissement et a passé ensuite ${h.num(40)} jours entiers à l’étranger pour une mission au printemps 2023.</p>
${h.table(['', 'Conjointe A', 'Conjoint B'], [['Jours au Canada avant la RP', h.num(730), '0'], ['Crédit (moitié, plafonné)', h.num(C.preprMaxCredit), '0'], ['Jours entiers à l’étranger depuis la RP', '0', h.num(40)], ['Jours exigés comme RP', h.num(C.minPrDays), h.num(C.requiredDays)], ['Première date de signature', h.date('2024-08-31'), h.date('2025-10-10')]], 'Exemple chiffré ; dates issues du calcul jour par jour.', ['l', 'r', 'r'])}
<p>La conjointe A peut signer plus d’un an avant le conjoint B. Ses études lui valent le crédit maximal, et elle n’a passé aucune journée entière à l’étranger. Le conjoint B doit réunir les ${h.num(C.requiredDays)} jours comme résident permanent, plus les ${h.num(40)} jours perdus en mission. La situation de l’un ne profite pas à l’autre.</p>
<h2>Ensemble ou l’un après l’autre</h2>
<p>IRCC permet aux adultes de déposer en groupe en ligne, avec ou sans lien de parenté, et à un parent d’ajouter jusqu’à ${h.P.ca.application.groupMinorsMax} enfants à son compte. Si les dates sont proches, un dépôt commun garde les deux dossiers ensemble et embarque les enfants. Si elles sont éloignées, le premier admissible peut partir seul, enfants compris : le mineur dont un parent demande en même temps suit la voie simplifiée décrite à la page ${h.a('ca-minors', 'enfants mineurs')}. Les frais restent individuels ; le second outil de la page en fait le total.</p>
<h2>L’exception des fonctionnaires de l’État</h2>
<p>La seule règle familiale des conditions d’admissibilité vise les fonctionnaires de l’État. Lorsqu’un membre des Forces armées canadiennes, de l’administration publique fédérale ou de la fonction publique d’une province ou d’un territoire est affecté hors du Canada, sans être recruté sur place, chaque jour à l’étranger compte comme un jour de présence pour lui et pour l’époux, le conjoint de fait ou l’enfant qui l’accompagne. La demande se fait alors sur papier, avec le CIT 0177. Une affectation par un employeur privé, même canadien, ne compte pas. Le texte complet figure sur la ${h.src('ca_eligibility', 'page d’admissibilité d’IRCC')}.</p>
<h2>Réviser l’examen à deux</h2>
<p>Si les deux conjoints ont entre ${h.P.ca.test.ages[0]} et ${h.P.ca.test.ages[1]} ans, chacun passera l’examen de ${h.P.ca.test.questions} questions. Réviser ensemble fonctionne bien : l’un interroge, l’autre répond. Chacun peut ensuite passer seul notre ${h.a('home', 'examen blanc chronométré')}, dans le temps réel de l’épreuve, puis comparer les chapitres où des points ont été perdus.</p>`;
    },
  },
});
