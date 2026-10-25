import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-minors',
  group: 'apply',
  order: 270,
  tool: { kind: 'mini:caminor' },
  mini: { kind: 'mini:cafee' },
  related: ['ca-application', 'ca-cost', 'ca-seniors', 'ca-oath', 'ca-descent'],
  sources: ['ca_eligibility', 'ca_how', 'ca_fees', 'ca_ceremony'],
  en: {
    slug: 'canadian-citizenship/minors',
    nav: 'Children and minors',
    card: 'Two routes for children under 18, a $100 fee, no test, the oath from 14: who applies and which form.',
    title: 'Citizenship for minors: forms, $100 fee, oath from age 14',
    description: 'Canadian citizenship for children under 18: the route with a Canadian or co-applying parent, the route alone, forms, the $100 fee and the oath from 14.',
    h1: 'Citizenship for minors: how a child becomes Canadian',
    intro: 'Enter the child’s age and whether a parent is a citizen or applies at the same time: the fee, the test, the language proof and a possible interview are shown.',
    resume: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.application, C = h.P.ca.presence;
      return `A child under 18 who is a permanent resident becomes a Canadian citizen through one of two routes, and the fee is ${h.cad(F.minor)} in both, with no right of citizenship fee. The usual route, under section 5(2) of the Citizenship Act, is for a minor whose parent is already a citizen or applies at the same time: the parent or legal guardian files the application (form CIT 0003 with checklist CIT 0008), and IRCC’s eligibility page lists no physical presence or tax condition for it. The second route, under section 5(1), is for a minor with no Canadian or co-applying parent: the person with custody applies, or the minor applies alone by ticking the waiver box, with form CIT 0403 and checklist CIT 0560, and the adult rules on presence apply: ${h.num(C.requiredDays)} days in ${C.windowYears} years, ${h.num(C.minPrDays)} of them as a permanent resident. In both routes no minor takes the citizenship test or sends language proof. From age ${A.minorSignAge}, the child signs the application and takes the oath at the ceremony.`;
    },
    faqs: (h) => [
      { q: 'Does my child need to live in Canada for 1,095 days to become a citizen?', a: `Not if you are a citizen or apply together. For a child applying alongside a parent, or whose parent is already Canadian, IRCC lists no physical presence requirement. The ${h.num(h.P.ca.presence.requiredDays)}-day rule only applies to a minor applying without such a parent, counted over the ${h.P.ca.presence.windowYears} years before the parent or guardian signs.` },
      { q: 'Can a 16-year-old be interviewed by a citizenship officer?', a: `Yes, in one situation. IRCC may interview minors aged ${h.P.ca.application.minorSignAge} to 17 when no parent is applying with them. A teenager who applies with a parent is not in that group. If an interview comes, the minor brings original documents and the passports or travel documents used in the period, like an adult applicant.` },
      { q: 'How many children can be added to one online citizenship account?', a: `Up to ${h.P.ca.application.groupMinorsMax}. A parent can include that many minors in the same online account, and the family's adults can also apply as a group. Each child still has an individual application and an individual fee of ${h.cad(h.P.ca.fees.minor)}; the group only keeps the files together.` },
      { q: 'Do young children attend the citizenship ceremony?', a: `They are welcome to. Children under ${h.P.ca.ceremony.oathFromAge} do not take the oath, but they can be present when their parents and older siblings do. Each child, whatever the age, needs two pieces of identification at the ceremony, along with the permanent resident document that the invitation asks for.` },
    ],
    body: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.application, C = h.P.ca.presence;
      return `
<h2>Two routes for children</h2>
${h.table(['', 'Section 5(2)', 'Section 5(1)'], [['Situation', 'a parent is Canadian or applies at the same time', 'no Canadian or co-applying parent'], ['Who files', 'parent or legal guardian', 'person with custody, or the minor alone with the waiver box'], ['Forms', 'CIT 0003 and checklist CIT 0008', 'CIT 0403 and checklist CIT 0560'], ['Physical presence', 'none listed', `${h.num(C.requiredDays)} days in ${C.windowYears} years, ${h.num(C.minPrDays)} as a PR`], ['Taxes', 'none listed', 'if a return was required'], ['Test and language', 'no', 'no'], ['Oath', `ages ${h.P.ca.ceremony.oathFromAge} to 17`, `ages ${h.P.ca.ceremony.oathFromAge} to 17`], ['Fee', h.cad(F.minor), h.cad(F.minor)]], 'Conditions for minors on IRCC’s eligibility page.', ['l', 'l', 'l'])}
<p>Both routes require permanent resident status and the absence of any prohibition. The first matches the usual family situation: the children become citizens in the same round as their parents, on the strength of the parent's application. The second covers children whose parents cannot or do not apply, for example because a parent does not yet meet the days or is not a permanent resident.</p>
<h2>Applying as a family</h2>
<p>Online, the parents can submit their own applications together, and one parent can attach up to ${A.groupMinorsMax} children to the same account. Each person is still a separate file with a separate fee. For two parents and two children, IRCC’s fees come to ${h.cad(2 * F.adult + 2 * F.minor)}: ${h.cad(F.adult)} for each adult and ${h.cad(F.minor)} for each child. The second calculator on this page adds up any household, and the ${h.a('ca-cost', 'fee page')} breaks the adult amount into its two parts.</p>
<p>A child under 18 at the date of signature applies as a minor. Since minors never take the test, what matters for the family's timing is usually the parents' days, which the ${h.a('ca-presence', 'days calculator')} works out.</p>
<h2>Signatures and the oath from age ${A.minorSignAge}</h2>
<p>Teenagers aged ${A.minorSignAge} to 17 sign their own application, even when a parent files it. At the ceremony they take the oath with the adults; they are the only minors who do, and they may ask to be excused from it, the one waiver open to them. Younger children attend if the family wishes, without taking the oath. Each child brings two pieces of identification and the permanent resident document requested in the invitation. The ${h.a('ca-oath', 'ceremony page')} lists the documents in detail.</p>
<h2>What a child never has to do</h2>
<p>IRCC is explicit: all minors under 18 are exempt from proving language skills and from the citizenship test. A teenager curious about the test can still try our ${h.a('home', 'mock test')}: it is a good way to learn the country’s history with the family, without anything riding on it.</p>
<h2>Children born abroad to a Canadian</h2>
<p>None of this applies to a child who is already Canadian. A child born outside Canada to a Canadian parent may be a citizen by descent, and the process is then a certificate, not a grant. The ${h.a('ca-descent', 'page on citizenship by descent')} explains the rules since Bill C-3, and ${h.src('ca_eligibility', 'IRCC’s eligibility page')} sets out both routes for minors who are permanent residents.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/enfants-mineurs',
    nav: 'Enfants mineurs',
    card: 'Deux voies pour les moins de 18 ans, 100 $ de frais, pas d’examen, serment dès 14 ans : qui dépose et comment.',
    title: 'Citoyenneté d’un enfant mineur : formulaires, 100 $, serment',
    description: 'Citoyenneté canadienne d’un enfant de moins de 18 ans : la voie avec un parent canadien ou demandeur, la voie seule, frais de 100 $, serment dès 14 ans.',
    h1: 'Enfants mineurs : comment un enfant devient canadien',
    intro: 'Indiquez l’âge de l’enfant et si un parent est citoyen ou demande en même temps : frais, examen, preuve de langue et entrevue possible s’affichent.',
    resume: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.application, C = h.P.ca.presence;
      return `L’enfant de moins de 18 ans qui est résident permanent devient citoyen canadien par l’une de deux voies, et les frais sont de ${h.cad(F.minor)} dans les deux cas, sans droit de citoyenneté. La voie habituelle, prévue au paragraphe 5(2) de la Loi sur la citoyenneté, vise le mineur dont un parent est déjà citoyen ou dépose sa demande en même temps : le parent ou le tuteur légal présente la demande (formulaire CIT 0003 et liste de contrôle CIT 0008), et la page d’admissibilité d’IRCC n’y mentionne aucune condition de présence ni d’impôts. La seconde, au paragraphe 5(1), concerne le mineur sans parent canadien ni parent demandeur : la personne qui en a la garde dépose, ou le mineur dépose seul en cochant la case de dispense, avec le formulaire CIT 0403 et la liste CIT 0560 ; les règles de présence des adultes s’appliquent alors, soit ${h.num(C.requiredDays)} jours en ${C.windowYears} ans, dont ${h.num(C.minPrDays)} comme résident permanent. Dans les deux voies, aucun mineur ne passe l’examen ni ne fournit de preuve de langue. Dès ${A.minorSignAge} ans, l’enfant signe la demande et prête serment à la cérémonie.`;
    },
    faqs: (h) => [
      { q: 'Mon enfant doit-il avoir 1 095 jours au Canada pour devenir citoyen ?', a: `Pas si vous êtes citoyen ou si vous déposez ensemble. Pour l’enfant qui demande avec un parent, ou dont un parent est déjà canadien, IRCC ne mentionne aucune exigence de présence. La règle des ${h.num(h.P.ca.presence.requiredDays)} jours ne vise que le mineur sans un tel parent, comptée sur les ${h.P.ca.presence.windowYears} ans précédant la signature du parent ou du tuteur.` },
      { q: 'Un jeune de 16 ans peut-il être convoqué en entrevue ?', a: `Oui, dans un cas : IRCC peut convoquer les mineurs de ${h.P.ca.application.minorSignAge} à 17 ans qui demandent sans parent. L’adolescent qui dépose avec un parent n’est pas concerné. En cas d’entrevue, il apporte ses documents originaux ainsi que les passeports ou titres de voyage utilisés pendant la période, comme un adulte.` },
      { q: 'Combien d’enfants peut-on ajouter à un même compte en ligne ?', a: `Jusqu’à ${h.P.ca.application.groupMinorsMax}. Un parent peut inclure ce nombre de mineurs dans son compte, et les adultes de la famille peuvent aussi déposer en groupe. Chaque enfant garde néanmoins sa propre demande et ses propres frais de ${h.cad(h.P.ca.fees.minor)} ; le groupe sert seulement à réunir les dossiers.` },
      { q: 'Les jeunes enfants assistent-ils à la cérémonie de citoyenneté ?', a: `Ils y sont les bienvenus. Les enfants de moins de ${h.P.ca.ceremony.oathFromAge} ans ne prêtent pas serment, mais peuvent être présents pendant que leurs parents et leurs aînés le font. Chaque enfant, quel que soit son âge, apporte deux pièces d’identité, en plus du document de résident permanent demandé dans la convocation.` },
    ],
    body: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.application, C = h.P.ca.presence;
      return `
<h2>Deux voies pour les enfants</h2>
${h.table(['', 'Paragraphe 5(2)', 'Paragraphe 5(1)'], [['Situation', 'un parent est canadien ou demande en même temps', 'aucun parent canadien ni demandeur'], ['Qui dépose', 'parent ou tuteur légal', 'personne qui a la garde, ou le mineur seul avec la case de dispense'], ['Formulaires', 'CIT 0003 et liste CIT 0008', 'CIT 0403 et liste CIT 0560'], ['Présence effective', 'aucune mentionnée', `${h.num(C.requiredDays)} jours en ${C.windowYears} ans, dont ${h.num(C.minPrDays)} comme RP`], ['Impôts', 'aucune mention', 'si une déclaration était exigée'], ['Examen et langue', 'non', 'non'], ['Serment', `de ${h.P.ca.ceremony.oathFromAge} à 17 ans`, `de ${h.P.ca.ceremony.oathFromAge} à 17 ans`], ['Frais', h.cad(F.minor), h.cad(F.minor)]], 'Conditions applicables aux mineurs, page d’admissibilité d’IRCC.', ['l', 'l', 'l'])}
<p>Les deux voies exigent le statut de résident permanent et l’absence d’interdiction. La première correspond à la situation familiale habituelle : l’enfant devient citoyen en même temps que ses parents, sur la base de leur démarche. La seconde vise les enfants dont les parents ne peuvent pas ou ne veulent pas demander, par exemple parce qu’un parent n’a pas encore ses jours ou n’est pas résident permanent.</p>
<h2>Déposer en famille</h2>
<p>En ligne, les parents peuvent envoyer leurs demandes ensemble, et l’un d’eux peut rattacher jusqu’à ${A.groupMinorsMax} enfants à son compte. Chaque personne reste un dossier distinct, avec ses propres frais. Pour deux parents et deux enfants, IRCC perçoit ${h.cad(2 * F.adult + 2 * F.minor)} : ${h.cad(F.adult)} par adulte et ${h.cad(F.minor)} par enfant. Le second outil de la page additionne n’importe quel ménage, et la page ${h.a('ca-cost', 'frais')} décompose le montant adulte.</p>
<p>L’enfant qui a moins de 18 ans à la date de signature dépose comme mineur. Puisqu’aucun mineur ne passe l’examen, le calendrier familial dépend surtout des jours des parents, que le ${h.a('ca-presence', 'calcul des jours')} établit.</p>
<h2>Signature et serment dès ${A.minorSignAge} ans</h2>
<p>De ${A.minorSignAge} à 17 ans, l’adolescent signe lui-même sa demande, même si un parent la dépose. À la cérémonie, il prête serment avec les adultes ; ce sont les seuls mineurs à le faire, et ils peuvent demander à en être dispensés, unique dispense qui les concerne. Les plus jeunes assistent si la famille le souhaite, sans prêter serment. Chaque enfant apporte deux pièces d’identité et le document de résident permanent demandé. La page ${h.a('ca-oath', 'cérémonie de citoyenneté')} dresse la liste complète.</p>
<h2>Ce qu’un enfant n’a jamais à faire</h2>
<p>IRCC l’écrit noir sur blanc : aucun mineur de moins de 18 ans ne doit prouver ses compétences linguistiques ni passer l’examen de citoyenneté. Un adolescent curieux peut tout de même essayer notre ${h.a('home', 'examen blanc')} : une façon de parcourir l’histoire du pays en famille, sans aucun enjeu.</p>
<h2>Enfant né à l’étranger d’un parent canadien</h2>
<p>Rien de ce qui précède ne concerne l’enfant déjà canadien. Né hors du Canada d’un parent canadien, il peut être citoyen par filiation : la démarche est alors un certificat, pas une attribution. La page ${h.a('ca-descent', 'citoyenneté par filiation')} explique les règles depuis le projet de loi C-3, et la ${h.src('ca_eligibility', 'page d’admissibilité d’IRCC')} décrit les deux voies offertes aux mineurs résidents permanents.</p>`;
    },
  },
});
