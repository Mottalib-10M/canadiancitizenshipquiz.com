import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-seniors',
  group: 'apply',
  order: 260,
  tool: { kind: 'mini:catestage' },
  related: ['ca-language', 'ca-apply', 'ca-minors', 'ca-oath', 'home'],
  sources: ['ca_eligibility', 'ca_test', 'ca_language'],
  en: {
    slug: 'canadian-citizenship/age-exemptions',
    nav: 'Age exemptions',
    card: 'From 55, and under 18, no test and no language proof; waivers on request for others. What still applies.',
    title: 'Citizenship test age exemption: 55 and over, minors, waivers',
    description: 'Age exemptions for Canadian citizenship: no test and no language proof at 55 or over or under 18, measured on the day you sign, plus waivers on request.',
    h1: 'Citizenship test age exemption: do you still have to sit it?',
    intro: 'Enter your age on the day you will sign the application: you see whether the test and the language proof apply and how long before you leave the age band.',
    resume: (h) => {
      const T = h.P.ca.test, C = h.P.ca.presence;
      return `The Canadian citizenship test and the language proof are required only from applicants aged ${T.ages[0]} to ${T.ages[1]} on the day they sign the application. An adult who is ${T.ages[1] + 1} or older on that day sends no language proof and takes no knowledge test; a child under ${T.ages[0]} does neither. The age that counts is your age on the signature date, not on the day IRCC receives the file and not on the day you would have been invited to the test. Everything else stays the same: ${h.num(C.requiredDays)} days of physical presence in ${C.windowYears} years, tax filing for ${C.taxYearsRequired} years when required, permanent resident status and no prohibition. Adults of every age still take the oath at the ceremony. For applicants inside the age band who cannot meet a requirement, IRCC allows a waiver to be requested for the language proof, the test or the oath; it is a request, decided case by case, not an automatic exemption. Teenagers aged ${h.P.ca.ceremony.oathFromAge} to 17 may ask to be excused from the oath only.`;
    },
    faqs: (h) => [
      { q: 'If I turn 55 soon, should I wait to sign my citizenship application?', a: `The rule looks at your age on the day you sign. Signing after your ${h.P.ca.test.ages[1] + 1}th birthday removes the test and the language proof; signing the day before keeps both. If you meet the ${h.num(h.P.ca.presence.requiredDays)} days already and the birthday is close, compare the delay with the effort of preparing a language proof and the test. The calculator shows how many years remain in the band.` },
      { q: 'Does a 60-year-old applicant still go to the citizenship ceremony?', a: 'Yes. The age exemption covers the knowledge test and the language proof, not the oath. Every adult takes the oath of citizenship at the ceremony, virtual or in person, and brings the documents listed in the invitation. A waiver of the oath can be requested like the other waivers, but age alone never removes it.' },
      { q: 'How do I ask for a waiver of the citizenship test?', a: 'You make the request in your application and support it with documents, which IRCC lists among the items to include when they apply. IRCC can waive the language proof, the test or the oath on request; the decision belongs to IRCC. Since the waiver may be refused, prepare as if you will sit the test, using the practice tools of this site.' },
    ],
    body: (h) => {
      const T = h.P.ca.test, C = h.P.ca.presence;
      return `
<h2>Three age groups, three situations</h2>
${h.table(['Age on the signing day', 'Knowledge test', 'Language proof', 'Oath'], [[`under ${T.ages[0]}`, 'no', 'no', `from ${h.P.ca.ceremony.oathFromAge}, waiver possible`], [`${T.ages[0]} to ${T.ages[1]}`, `yes, ${h.need} of ${T.questions}`, `yes, ${C.languageLevel}`, 'yes'], [`${T.ages[1] + 1} or over`, 'no', 'no', 'yes']], 'From IRCC’s eligibility and test pages.', ['l', 'l', 'l', 'l'])}
<p>The calculator above reads the same table from your age. If you fall inside the band, it tells you how many years remain before your ${T.ages[1] + 1}th birthday; outside it, it gives the reason no test applies. The last line of its result recalls what every adult must still meet.</p>
<h2>Why the signing date matters so much here</h2>
<p>For a person aged ${T.ages[1]}, the choice of the signing day can change the whole preparation. IRCC measures the age on the date you sign, and that date also starts the physical presence calculation. A person who reaches the ${h.num(C.requiredDays)} days a few weeks before turning ${T.ages[1] + 1} has a real choice: sign now and take the test and language proof, or sign after the birthday without them. Neither option is wrong. Waiting delays the citizenship by the same number of days; signing early means studying ${h.src('ca_test', 'Discover Canada for the test')} and gathering a ${h.a('ca-language', 'language proof')}. Before choosing, check that your days still reach the threshold on the later date, because a trip in the meantime can move it; the ${h.a('ca-presence', 'days calculator')} shows both dates.</p>
<h2>What age does not change</h2>
<ul>
<li>Permanent resident status with no unfulfilled conditions.</li>
<li>${h.num(C.requiredDays)} days of physical presence in the ${C.windowYears} years before signing, at least ${h.num(C.minPrDays)} of them as a permanent resident.</li>
<li>Tax returns for ${C.taxYearsRequired} of those years if the law required them.</li>
<li>No prohibition, such as a recent conviction or a removal order.</li>
<li>The adult fee of ${h.cad(h.P.ca.fees.adult)}.</li>
<li>The oath at the ceremony.</li>
</ul>
<p>An older applicant without a test therefore goes through the same ${h.a('ca-apply', 'eligibility check')} and the same ${h.a('ca-application', 'application file')} as anyone else, minus two documents.</p>
<h2>Waivers inside the age band</h2>
<p>Between ${T.ages[0]} and ${T.ages[1]}, an applicant can ask IRCC to waive the language proof, the test or the oath. The eligibility page presents this as a request, and the document checklist mentions supporting documents for it. We do not list grounds or chances of success, because IRCC does not publish them in the pages this site relies on. What is safe to say: within the band nothing is waived automatically, and preparing for the test in parallel costs little. The ${h.a('home', 'timed mock test')} and the chapter practice sets let you measure where you stand.</p>
<h2>Children</h2>
<p>Under ${T.ages[0]}, there is never a test or language proof. Teenagers of ${h.P.ca.ceremony.oathFromAge} to 17 take the oath and may ask to be excused from it, which is the only waiver that concerns them. Younger children are welcome at the ceremony without taking the oath. The ${h.a('ca-minors', 'page on minors')} covers the forms and the fee of ${h.cad(h.P.ca.fees.minor)}.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/exemptions-age',
    nav: 'Exemptions selon l’âge',
    card: 'À partir de 55 ans et avant 18 ans, ni examen ni preuve de langue ; dispenses sur demande pour les autres.',
    title: 'Exemption d’examen de citoyenneté : 55 ans et plus, mineurs',
    description: 'Exemptions liées à l’âge pour la citoyenneté canadienne : ni examen ni preuve de langue à 55 ans ou plus et avant 18 ans, âge à la signature, dispenses.',
    h1: 'Exemption d’examen : devez-vous encore le passer ?',
    intro: 'Indiquez l’âge que vous aurez le jour de la signature : vous voyez si l’examen et la preuve de langue s’appliquent et combien de temps il vous reste dans la tranche.',
    resume: (h) => {
      const T = h.P.ca.test, C = h.P.ca.presence;
      return `L’examen de citoyenneté canadienne et la preuve de langue ne sont exigés que des demandeurs âgés de ${T.ages[0]} à ${T.ages[1]} ans le jour où ils signent leur demande. L’adulte qui a ${T.ages[1] + 1} ans ou plus ce jour-là ne fournit pas de preuve linguistique et ne passe pas d’examen de connaissances ; l’enfant de moins de ${T.ages[0]} ans non plus. Seul compte l’âge à la date de signature, ni celui du jour de réception par IRCC, ni celui de l’éventuelle convocation. Le reste ne change pas : ${h.num(C.requiredDays)} jours de présence effective en ${C.windowYears} ans, déclarations de revenus pour ${C.taxYearsRequired} années si elles étaient exigées, statut de résident permanent, absence d’interdiction. Tous les adultes, quel que soit leur âge, prêtent serment à la cérémonie. Dans la tranche d’âge visée, un demandeur qui ne peut pas satisfaire à une exigence peut demander une dispense de la preuve de langue, de l’examen ou du serment ; c’est une demande examinée au cas par cas, pas une exemption automatique. Les jeunes de ${h.P.ca.ceremony.oathFromAge} à 17 ans peuvent seulement demander à être dispensés du serment.`;
    },
    faqs: (h) => [
      { q: 'J’aurai 55 ans bientôt : vaut-il mieux attendre pour signer ?', a: `La règle retient l’âge le jour de la signature. Signer après votre ${h.P.ca.test.ages[1] + 1}e anniversaire supprime l’examen et la preuve de langue ; signer la veille les maintient. Si vous avez déjà les ${h.num(h.P.ca.presence.requiredDays)} jours et que l’anniversaire approche, comparez ce délai avec l’effort de préparation. L’outil indique le nombre d’années restant dans la tranche.` },
      { q: 'Un demandeur de 60 ans doit-il assister à la cérémonie ?', a: 'Oui. L’exemption liée à l’âge porte sur l’examen de connaissances et la preuve de langue, pas sur le serment. Chaque adulte prête serment à la cérémonie, virtuelle ou en personne, avec les documents indiqués dans la convocation. Une dispense du serment peut être demandée comme les autres, mais l’âge seul ne la procure jamais.' },
      { q: 'Comment demander une dispense de l’examen de citoyenneté ?', a: 'La demande se fait dans le dossier, avec des justificatifs qu’IRCC range parmi les pièces à joindre le cas échéant. IRCC peut dispenser de la preuve de langue, de l’examen ou du serment ; la décision lui revient. Comme la dispense peut être refusée, préparez-vous comme si vous deviez passer l’examen, avec les outils d’entraînement du site.' },
    ],
    body: (h) => {
      const T = h.P.ca.test, C = h.P.ca.presence;
      return `
<h2>Trois tranches d’âge</h2>
${h.table(['Âge à la signature', 'Examen', 'Preuve de langue', 'Serment'], [[`moins de ${T.ages[0]} ans`, 'non', 'non', `dès ${h.P.ca.ceremony.oathFromAge} ans, dispense possible`], [`${T.ages[0]} à ${T.ages[1]} ans`, `oui, ${h.need} sur ${T.questions}`, `oui, ${C.languageLevel}`, 'oui'], [`${T.ages[1] + 1} ans ou plus`, 'non', 'non', 'oui']], 'D’après les pages d’IRCC sur l’admissibilité et l’examen.', ['l', 'l', 'l', 'l'])}
<p>L’outil ci-dessus applique ce tableau à votre âge. Dans la tranche, il compte les années qui vous séparent de vos ${T.ages[1] + 1} ans ; en dehors, il donne la raison de l’exemption. La dernière ligne rappelle ce que tout adulte doit encore remplir.</p>
<h2>Le choix de la date de signature</h2>
<p>À ${T.ages[1]} ans, le jour choisi pour signer peut changer toute la préparation. IRCC retient l’âge à cette date, qui sert aussi de point de départ au calcul de présence. Quelqu’un qui atteint les ${h.num(C.requiredDays)} jours quelques semaines avant ses ${T.ages[1] + 1} ans a donc le choix : signer tout de suite, avec examen et preuve de langue, ou attendre l’anniversaire et s’en passer. Aucune option n’est mauvaise. Attendre retarde la citoyenneté d’autant ; signer plus tôt suppose de réviser ${h.src('ca_test', 'Découvrir le Canada pour l’examen')} et de réunir une ${h.a('ca-language', 'preuve de langue')}. Avant de trancher, assurez-vous que vos jours atteignent encore le seuil à la date plus lointaine, car un voyage entre-temps peut la déplacer ; le ${h.a('ca-presence', 'calcul des jours')} donne les deux dates.</p>
<h2>Ce que l’âge ne change pas</h2>
<ul>
<li>Le statut de résident permanent, sans obligation en suspens.</li>
<li>${h.num(C.requiredDays)} jours de présence effective sur ${C.windowYears} ans, dont au moins ${h.num(C.minPrDays)} comme résident permanent.</li>
<li>Les déclarations de revenus de ${C.taxYearsRequired} de ces années, si la loi les exigeait.</li>
<li>L’absence d’interdiction, comme une condamnation récente ou une mesure de renvoi.</li>
<li>Les frais adulte de ${h.cad(h.P.ca.fees.adult)}.</li>
<li>Le serment à la cérémonie.</li>
</ul>
<p>Le demandeur exempté passe donc par la même ${h.a('ca-apply', 'vérification d’admissibilité')} et le même ${h.a('ca-application', 'dossier de demande')} que les autres, deux pièces en moins.</p>
<h2>Les dispenses dans la tranche d’âge</h2>
<p>De ${T.ages[0]} à ${T.ages[1]} ans, on peut demander à IRCC une dispense de la preuve de langue, de l’examen ou du serment. La page d’admissibilité la présente comme une demande, et la liste des pièces prévoit des justificatifs à cet effet. Nous ne détaillons ni motifs ni chances de succès, qu’IRCC ne publie pas dans les pages sur lesquelles repose ce site. On peut seulement affirmer que, dans la tranche, rien n’est dispensé d’office, et que se préparer en parallèle coûte peu : l’${h.a('home', 'examen blanc chronométré')} et l’entraînement par chapitre mesurent votre niveau.</p>
<h2>Les enfants</h2>
<p>Avant ${T.ages[0]} ans, jamais d’examen ni de preuve de langue. De ${h.P.ca.ceremony.oathFromAge} à 17 ans, le jeune prête serment et peut demander à en être dispensé : c’est la seule dispense qui le concerne. Les plus jeunes assistent à la cérémonie sans prêter serment. La page ${h.a('ca-minors', 'enfants mineurs')} détaille les formulaires et les frais de ${h.cad(h.P.ca.fees.minor)}.</p>`;
    },
  },
});
