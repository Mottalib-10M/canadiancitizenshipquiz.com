import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-citizenship',
  group: 'apply',
  order: 200,
  tool: { kind: 'mini:caroute' },
  mini: { kind: 'mini:cadays' },
  related: ['ca-apply', 'ca-presence', 'ca-application', 'ca-cost', 'ca-oath', 'home'],
  sources: ['ca_eligibility', 'ca_how', 'ca_fees', 'ca_proof_elig'],
  en: {
    slug: 'canadian-citizenship',
    nav: 'Canadian citizenship',
    card: 'Grant, minor, proof, resumption or renunciation: the five routes, their fee and the key condition.',
    title: 'Canadian citizenship: routes, conditions and steps in 2026',
    description: 'Canadian citizenship in 2026: the grant for permanent residents, minors, proof by descent, resumption and renunciation, with fees, forms and the steps in order.',
    h1: 'Canadian citizenship: which route is yours?',
    intro: 'Pick the situation that matches yours: the route, the IRCC form, the fee per person and the condition that decides it appear right away.',
    resume: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees, T = h.P.ca.test;
      return `Canadian citizenship is not one procedure but several, and the right one depends on where you start. A permanent resident aged 18 or over asks for a grant: ${h.num(C.requiredDays)} days of physical presence in the ${C.windowYears} years before signing the application, at least ${h.num(C.minPrDays)} of them as a permanent resident, tax returns for ${C.taxYearsRequired} of those ${C.windowYears} years when the law required them, ${C.languageLevel} in English or French and a ${T.questions}-question test between ${T.ages[0]} and ${T.ages[1]}, and no prohibition. The adult fee is ${h.cad(F.adult)}. A child who is a permanent resident applies for ${h.cad(F.minor)}, with no test and no language proof. Someone born abroad to a Canadian parent is often a citizen already and confirms it with a certificate at ${h.cad(F.certificate)}. A former citizen who became a permanent resident again can resume citizenship for ${h.cad(F.resumeAdult)} after ${h.num(h.P.ca.resume.presenceDays)} days in Canada within ${h.P.ca.resume.windowYears} years, and a citizen living abroad with another nationality can renounce for ${h.cad(F.renounce)} in most cases.`;
    },
    faqs: (h) => [
      { q: 'Am I Canadian if I was born in Canada?', a: 'IRCC treats a provincial birth certificate as generally enough to show citizenship for people born in Canada, so most never need another document. A citizenship certificate is mainly for those who became citizens another way or who were born abroad to a Canadian parent and want written confirmation.' },
      { q: 'Which citizenship route has a test?', a: `Only the grant does, and only for applicants aged ${h.P.ca.test.ages[0]} to ${h.P.ca.test.ages[1]} on the day they sign. Children, applicants aged ${h.P.ca.test.ages[1] + 1} and over, people asking for a certificate and people renouncing do not sit it. For resumption, the IRCC page does not mention a test either way, so check the application guide before you rely on that.` },
      { q: 'Can I hold Canadian citizenship and another nationality?', a: 'Renunciation rules assume it: to renounce, IRCC requires that you already hold, or will obtain, another citizenship. Whether your other country lets you keep its nationality after becoming Canadian is a question for that country, not for IRCC, so read its own rules before the ceremony.' },
      { q: 'Do days spent abroad count toward Canadian citizenship?', a: `Physical presence is counted in Canada, so time abroad reduces your ${h.num(h.P.ca.presence.requiredDays)} days unless you are a Crown servant or a family member of one serving abroad. Those days count in full, but only through a paper application with an extra form, as the eligibility page explains.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees, T = h.P.ca.test, R = h.P.ca.resume;
      return `
<h2>Five routes, five forms</h2>
${h.table(['Route', 'For whom', 'IRCC form', 'Fee'], [['Grant, adult', 'permanent resident aged 18 or over', 'CIT 0002', h.cad(F.adult)], ['Grant, minor', 'child under 18 with permanent resident status', 'CIT 0003 or CIT 0403', h.cad(F.minor)], ['Proof of citizenship', 'person who may already be a citizen', 'CIT 0001', h.cad(F.certificate)], ['Resumption', 'former citizen who is a permanent resident again', 'CIT 0301', h.cad(F.resumeAdult)], ['Renunciation', 'citizen with another nationality, living abroad', 'CIT 0302', h.cad(F.renounce)]], `Forms and fees as listed by IRCC; a child resuming citizenship pays ${h.cad(F.resumeMinor)}.`, ['l', 'l', 'l', 'r'])}
<p>Most visitors of this site follow the first line: they came as immigrants, hold permanent resident status and want to become citizens. The other four routes matter for families, for people born outside the country and for those whose link with Canada was broken or is about to be. The calculator at the top of the page sorts them in one click.</p>
<h2>The grant step by step</h2>
<ol>
<li><strong>Count your days.</strong> ${h.num(C.requiredDays)} days present in the ${C.windowYears} years before the day you sign, of which ${h.num(C.minPrDays)} as a permanent resident; time spent here before permanent residence counts half, up to ${h.num(C.preprMaxCredit)} days. Our ${h.a('ca-presence', 'day-by-day calculator')} finds the first date that works with your trips.</li>
<li><strong>Check the other conditions.</strong> Tax filing, language level, absence of prohibitions: the ${h.a('ca-apply', 'eligibility page')} goes through each one.</li>
<li><strong>Prepare and send the application.</strong> Most people apply online; paper stays mandatory in a few cases. The ${h.a('ca-application', 'application page')} lists the documents.</li>
<li><strong>Pay.</strong> ${h.cad(F.adult)} per adult and ${h.cad(F.minor)} per child; the ${h.a('ca-cost', 'fee calculator')} adds them up for a household.</li>
<li><strong>Pass the test.</strong> ${T.questions} questions, ${h.need} correct answers to pass, for applicants aged ${T.ages[0]} to ${T.ages[1]}. Our ${h.a('home', 'timed mock test')} follows the same format.</li>
<li><strong>Take the oath.</strong> The ${h.a('ca-oath', 'citizenship ceremony')} closes the process, and new citizens receive their certificate there.</li>
</ol>
<h2>When you may already be a citizen</h2>
<p>Birth in Canada generally settles the question, and a provincial birth certificate is the usual proof. Birth abroad is less simple. Since Bill C-3 came into force on ${h.date(h.P.ca.c3.inForce)}, most people born outside Canada to a Canadian parent before that date are citizens automatically, and later births depend on the parent's own time in Canada. IRCC's advice is direct: apply for a certificate to find out for sure. The ${h.a('ca-descent', 'page on citizenship by descent')} explains the rule and the ${h.a('ca-certificate', 'certificate page')} covers the application.</p>
<h2>What does not make you a citizen</h2>
<p>Marriage does not. IRCC states that marrying a Canadian does not make you a citizen automatically, and a spouse meets exactly the same conditions as any other applicant; see the ${h.a('ca-spouse', 'page for spouses')}. Years spent in Canada on a permit are not enough on their own either: you need permanent resident status first, and that earlier time only counts at half value.</p>
<h2>Leaving or coming back</h2>
<p>Citizenship can be given up and, in some cases, taken back. ${h.a('ca-renounce', 'Renunciation')} requires another nationality and residence outside Canada for adults in the general case. ${h.a('ca-resume', 'Resumption')} is for former citizens who returned as permanent residents and spent ${h.num(R.presenceDays)} days in Canada in the ${R.windowYears} years before applying. The conditions and fees are on ${h.src('ca_eligibility', 'IRCC’s eligibility page')} and the ${h.src('ca_fees', 'IRCC fee list')}.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne',
    nav: 'Citoyenneté canadienne',
    card: 'Attribution, mineur, preuve, réintégration ou répudiation : les cinq démarches, leurs frais et leur condition.',
    title: 'Citoyenneté canadienne : démarches, conditions et étapes',
    description: 'Citoyenneté canadienne en 2026 : attribution aux résidents permanents, enfants, preuve par filiation, réintégration et répudiation, frais, formulaires, étapes.',
    h1: 'Citoyenneté canadienne : quelle démarche vous concerne ?',
    intro: 'Choisissez votre situation : la démarche, le formulaire d’IRCC, les frais par personne et la condition déterminante s’affichent aussitôt.',
    resume: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees, T = h.P.ca.test;
      return `On ne devient pas citoyen canadien par une seule voie : tout dépend du point de départ. Le résident permanent de 18 ans ou plus demande l’attribution de la citoyenneté. Il lui faut ${h.num(C.requiredDays)} jours de présence effective au cours des ${C.windowYears} ans précédant la signature de sa demande, dont au moins ${h.num(C.minPrDays)} comme résident permanent, des déclarations de revenus pour ${C.taxYearsRequired} de ces années lorsque la loi les exigeait, le niveau ${C.languageLevel} en français ou en anglais et la réussite d’un examen de ${T.questions} questions s’il a de ${T.ages[0]} à ${T.ages[1]} ans, sans aucune interdiction. Les frais atteignent ${h.cad(F.adult)} par adulte. Pour un enfant résident permanent, comptez ${h.cad(F.minor)}, sans examen ni preuve de langue. La personne née à l’étranger d’un parent canadien est souvent déjà citoyenne et le fait confirmer par un certificat à ${h.cad(F.certificate)}. L’ancien citoyen redevenu résident permanent peut être réintégré pour ${h.cad(F.resumeAdult)} après ${h.num(h.P.ca.resume.presenceDays)} jours au Canada en ${h.P.ca.resume.windowYears} ans. Enfin, le citoyen qui vit à l’étranger et possède une autre nationalité peut répudier la sienne, pour ${h.cad(F.renounce)} dans la plupart des cas.`;
    },
    faqs: (h) => [
      { q: 'Suis-je canadien si je suis né au Canada ?', a: 'Pour IRCC, le certificat de naissance provincial suffit en général à établir la citoyenneté d’une personne née au pays. Le certificat de citoyenneté sert surtout aux personnes naturalisées et à celles nées à l’étranger d’un parent canadien qui veulent une confirmation écrite.' },
      { q: 'Quelles démarches de citoyenneté comportent un examen ?', a: `Seule l’attribution, et seulement pour les demandeurs de ${h.P.ca.test.ages[0]} à ${h.P.ca.test.ages[1]} ans le jour de la signature. Les enfants, les personnes de ${h.P.ca.test.ages[1] + 1} ans et plus, les demandes de certificat et les répudiations n’en ont pas. La page d’IRCC sur la réintégration ne dit rien de l’examen : vérifiez le guide de demande avant de conclure.` },
      { q: 'Peut-on garder sa nationalité d’origine en devenant canadien ?', a: 'Les règles de répudiation le supposent, puisqu’IRCC exige alors une autre citoyenneté, déjà acquise ou à venir. Reste à savoir si votre pays d’origine vous laisse conserver la sienne : la réponse relève de ses propres lois, pas d’IRCC. Renseignez-vous auprès de lui avant la cérémonie.' },
      { q: 'Le séjour à l’étranger d’un fonctionnaire compte-t-il comme présence ?', a: `Oui, dans un cas précis : les fonctionnaires de l’État affectés hors du Canada, par exemple dans les Forces armées canadiennes, et les membres de leur famille comptent chaque jour à l’étranger comme un jour entier pour atteindre les ${h.num(h.P.ca.presence.requiredDays)} jours. Il faut alors une demande papier accompagnée du formulaire CIT 0177.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, F = h.P.ca.fees, T = h.P.ca.test, R = h.P.ca.resume;
      return `
<h2>Cinq démarches, cinq formulaires</h2>
${h.table(['Démarche', 'Pour qui', 'Formulaire', 'Frais'], [['Attribution, adulte', 'résident permanent de 18 ans ou plus', 'CIT 0002', h.cad(F.adult)], ['Attribution, mineur', 'enfant de moins de 18 ans résident permanent', 'CIT 0003 ou CIT 0403', h.cad(F.minor)], ['Preuve de citoyenneté', 'personne peut-être déjà citoyenne', 'CIT 0001', h.cad(F.certificate)], ['Réintégration', 'ancien citoyen redevenu résident permanent', 'CIT 0301', h.cad(F.resumeAdult)], ['Répudiation', 'citoyen doté d’une autre nationalité, établi à l’étranger', 'CIT 0302', h.cad(F.renounce)]], `Formulaires et frais publiés par IRCC ; un mineur réintégré paie ${h.cad(F.resumeMinor)}.`, ['l', 'l', 'l', 'r'])}
<p>La première ligne concerne la grande majorité des lecteurs : arrivés comme immigrants, ils ont obtenu la résidence permanente et veulent franchir l’étape suivante. Les quatre autres touchent les familles, les Canadiens nés hors du pays et ceux dont le lien avec le Canada a été rompu ou va l’être. L’outil en haut de page les départage.</p>
<h2>L’attribution, dans l’ordre</h2>
<ol>
<li><strong>Compter ses jours.</strong> Il en faut ${h.num(C.requiredDays)} sur les ${C.windowYears} ans qui précèdent la signature, dont ${h.num(C.minPrDays)} comme résident permanent ; le séjour antérieur compte pour moitié, au plus ${h.num(C.preprMaxCredit)} jours. Le ${h.a('ca-presence', 'calcul des jours')} donne la première date possible, voyages compris.</li>
<li><strong>Vérifier le reste.</strong> Impôts, langue, interdictions : la page ${h.a('ca-apply', 'admissibilité')} les passe en revue.</li>
<li><strong>Monter le dossier.</strong> La plupart des demandes se font en ligne, le papier reste obligatoire dans quelques cas ; voir la page ${h.a('ca-application', 'demande de citoyenneté')}.</li>
<li><strong>Payer.</strong> ${h.cad(F.adult)} par adulte, ${h.cad(F.minor)} par enfant ; le ${h.a('ca-cost', 'calcul des frais')} fait le total du ménage.</li>
<li><strong>Réussir l’examen.</strong> ${T.questions} questions, ${h.need} bonnes réponses, de ${T.ages[0]} à ${T.ages[1]} ans ; notre ${h.a('home', 'examen blanc chronométré')} reprend ce format.</li>
<li><strong>Prêter serment.</strong> La ${h.a('ca-oath', 'cérémonie de citoyenneté')} conclut la démarche ; le certificat y est remis.</li>
</ol>
<h2>Déjà citoyen sans le savoir ?</h2>
<p>Une naissance au Canada règle presque toujours la question. Une naissance à l’étranger demande plus d’attention. Depuis l’entrée en vigueur du projet de loi C-3, le ${h.date(h.P.ca.c3.inForce)}, la plupart des personnes nées hors du Canada d’un parent canadien avant cette date sont citoyennes d’office ; pour les naissances postérieures, tout dépend du temps passé au Canada par le parent. IRCC le dit simplement : pour en être certain, il faut demander un certificat. Voir la page ${h.a('ca-descent', 'citoyenneté par filiation')} et celle du ${h.a('ca-certificate', 'certificat de citoyenneté')}.</p>
<h2>Ce qui ne rend pas citoyen</h2>
<p>Le mariage, d’abord. Épouser un Canadien ne confère pas la citoyenneté, rappelle IRCC, et le conjoint remplit les mêmes conditions que tout autre demandeur (page ${h.a('ca-spouse', 'conjoint')}). Des années passées au pays avec un permis ne suffisent pas non plus : la résidence permanente vient d’abord, et ce séjour antérieur ne compte qu’à moitié.</p>
<h2>Partir ou revenir</h2>
<p>On peut renoncer à la citoyenneté et, dans certains cas, la retrouver. La ${h.a('ca-renounce', 'répudiation')} exige, dans le cas général, une autre nationalité et une résidence hors du Canada. La ${h.a('ca-resume', 'réintégration')} s’adresse aux anciens citoyens revenus comme résidents permanents, avec ${h.num(R.presenceDays)} jours au Canada dans les ${R.windowYears} ans précédant la demande. Le détail figure sur la ${h.src('ca_eligibility', 'page d’admissibilité d’IRCC')} et dans la ${h.src('ca_fees', 'liste des frais d’IRCC')}.</p>`;
    },
  },
});
