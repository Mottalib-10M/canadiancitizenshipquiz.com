import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-cost',
  group: 'apply',
  order: 240,
  tool: { kind: 'cost' },
  mini: { kind: 'mini:cacert' },
  related: ['ca-application', 'ca-minors', 'ca-oath', 'ca-resume', 'ca-renounce', 'ca-citizenship'],
  sources: ['ca_fees', 'ca_how', 'ca_ceremony_when'],
  en: {
    slug: 'canadian-citizenship/fees',
    nav: 'Fees',
    card: 'Adult and minor fees, the right of citizenship part and the other IRCC citizenship fees, totalled for a household.',
    title: 'Citizenship fees 2026: $653 per adult, $100 per child',
    description: 'Canadian citizenship fees in 2026: $653 per adult including the $123 right of citizenship fee, $100 per minor, plus certificate, resumption and other fees.',
    h1: 'Citizenship fees: what a household pays IRCC',
    intro: 'Enter the number of adults and children applying, and any costs of your own such as a language test or translations: the total and each line appear at once.',
    resume: (h) => {
      const F = h.P.ca.fees;
      return `The fee for a Canadian citizenship application is ${h.cad(F.adult)} for each applicant aged 18 or over and ${h.cad(F.minor)} for each child under 18, according to the IRCC fee list last modified on ${h.date(F.dateModified)}. The adult amount bundles two charges: the right of citizenship fee of ${h.cad(F.rightOfCitizenship)} and a processing part, which comes to ${h.cad(F.adultProcessing)} if you subtract one from the other (IRCC publishes the total and the right of citizenship fee; the subtraction is ours). Children pay no right of citizenship fee. A family of two adults and one child therefore pays ${h.cad(2 * F.adult + F.minor)}. The citizenship test has no fee of its own: it is part of the application. Other citizenship services are priced separately: ${h.cad(F.certificate)} for a citizenship certificate, ${h.cad(F.recordSearch)} for a record search, ${h.cad(F.resumeAdult)} for an adult to resume citizenship and ${h.cad(F.resumeMinor)} for a child, ${h.cad(F.renounce)} to renounce in most cases, and ${h.cad(F.statelessAdult)} for a stateless adult born to a Canadian parent. Costs such as language tests, translations or photos are not IRCC fees, so the calculator lets you type them in yourself.`;
    },
    faqs: (h) => [
      { q: 'Is any part of the citizenship fee refunded if I miss the ceremony?', a: `Only in one case described by IRCC. Missing the ceremony a second time closes the application as abandoned; adults then get the right of citizenship fee of ${h.cad(h.P.ca.fees.rightOfCitizenship)} back, and must apply again if they still want citizenship. A first missed ceremony is rescheduled automatically with a final invitation, so it does not trigger any refund.` },
      { q: 'Do I pay again if I fail the citizenship test?', a: `Not for the attempts themselves: the test is included in the application and you get ${h.P.ca.test.attempts} chances. The cost comes if the whole application fails, for instance after an unsuccessful hearing following three failed tests. The application is then refused, and a new one means paying the fee again, ${h.cad(h.P.ca.fees.adult)} for an adult.` },
      { q: 'Why does a stateless adult pay less for citizenship?', a: `IRCC lists a separate fee of ${h.cad(h.P.ca.fees.statelessAdult)} for a stateless adult born to a Canadian parent. That is the same amount as the right of citizenship fee alone, without the processing part that other adults pay. It concerns a narrow group; most adult applicants pay the full ${h.cad(h.P.ca.fees.adult)}.` },
      { q: 'How is the citizenship fee paid and proven?', a: 'Online, before you submit. IRCC asks online applicants to upload the receipt with their application and paper applicants to print the receipt and enclose it. Keep a copy either way: the receipt is on the document checklist, and having your own copy lets you prove the payment if a question comes up later.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees;
      return `
<h2>How the calculator adds it up</h2>
<p>The calculator above takes three numbers: adults aged 18 or over who apply, children under 18 who apply, and your own extra costs. For each adult it adds two lines, the processing part of ${h.cad(F.adultProcessing)} and the right of citizenship fee of ${h.cad(F.rightOfCitizenship)}, so each adult costs ${h.cad(F.adult)} in total. Each child adds ${h.cad(F.minor)}. Your extra costs, if any, appear on their own line. Every IRCC amount is read from the fee list stored with the site and checked each month; nothing is estimated. It opens with two adults and one child, which gives ${h.cad(2 * F.adult + F.minor)}. The site itself collects nothing: you pay IRCC directly when you apply.</p>
<h2>Every citizenship fee in one table</h2>
${h.table(['Service', 'Fee'], [['Grant of citizenship, adult 18+ (includes the right of citizenship fee)', h.cad(F.adult)], ['of which right of citizenship fee', h.cad(F.rightOfCitizenship)], ['Grant of citizenship, minor under 18', h.cad(F.minor)], ['Grant, stateless adult born to a Canadian parent', h.cad(F.statelessAdult)], ['Citizenship certificate (proof)', h.cad(F.certificate)], ['Search of citizenship records', h.cad(F.recordSearch)], ['Resumption, adult', h.cad(F.resumeAdult)], ['Resumption, minor', h.cad(F.resumeMinor)], ['Renunciation (most cases)', h.cad(F.renounce)]], `IRCC fee list, modified ${h.date(F.dateModified)}.`, ['l', 'r'])}
<p>The second calculator under the summary handles the two certificate-type fees: a certificate as proof of citizenship and a search of records, at ${h.cad(F.certificate)} each. They are separate requests with their own form, not add-ons to a grant.</p>
<h2>Households: three examples</h2>
${h.table(['Household', 'Adults', 'Minors', 'Total'], [['Single applicant', 1, 0, h.cad(F.adult)], ['Couple', 2, 0, h.cad(2 * F.adult)], ['Couple with two children', 2, 2, h.cad(2 * F.adult + 2 * F.minor)], ['Parent with three children', 1, 3, h.cad(F.adult + 3 * F.minor)]], 'Totals from the IRCC fee list; the same rule applies to any household size.', ['l', 'r', 'r', 'r'])}
<p>A family can apply online as a group, with up to ${h.P.ca.application.groupMinorsMax} minors on one parent's account, but every person still has a fee. Grouping saves effort, not money. The ${h.a('ca-minors', 'page on minors')} explains which children apply under which rule.</p>
<h2>What is not on the IRCC bill</h2>
<p>A citizenship application often carries outside costs: an approved language test if you need one (see the ${h.a('ca-language', 'language page')} for proof that costs nothing, such as a diploma), police certificates from other countries, translations of documents and, on paper, printed photos. Their prices depend on providers and countries, so we do not guess them: type your own figure in the third field and the calculator includes it in the total.</p>
<h2>When money is lost</h2>
<p>The fee is paid for an assessment, not for a result. If you apply too early, before the days are met, or while a prohibition applies, you risk paying for a refusal. Check the ${h.a('ca-apply', 'eligibility conditions')} and run the ${h.a('ca-presence', 'days calculator')} before you pay. The only refund described on IRCC’s ${h.src('ca_ceremony_when', 'ceremony page')} concerns adults whose application closes after a second missed ceremony: the right of citizenship fee is returned. The full list of amounts is on the ${h.src('ca_fees', 'IRCC fee list')}.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/frais',
    nav: 'Frais',
    card: 'Frais adulte et mineur, droit de citoyenneté et autres frais de citoyenneté d’IRCC, additionnés pour un ménage.',
    title: 'Frais de citoyenneté 2026 : 653 $ l’adulte, 100 $ l’enfant',
    description: 'Frais de citoyenneté canadienne en 2026 : 653 $ par adulte, dont 123 $ pour le droit de citoyenneté, 100 $ par mineur, plus les frais de certificat et autres.',
    h1: 'Frais de citoyenneté : ce qu’un ménage verse à IRCC',
    intro: 'Indiquez le nombre d’adultes et d’enfants qui demandent la citoyenneté, et vos autres frais éventuels : le total et chaque poste s’affichent aussitôt.',
    resume: (h) => {
      const F = h.P.ca.fees;
      return `Une demande de citoyenneté canadienne coûte ${h.cad(F.adult)} par demandeur de 18 ans ou plus et ${h.cad(F.minor)} par enfant de moins de 18 ans, selon la liste des frais d’IRCC modifiée le ${h.date(F.dateModified)}. Le montant adulte réunit deux frais : celui relatif au droit de citoyenneté, ${h.cad(F.rightOfCitizenship)}, et une part de traitement qui s’élève à ${h.cad(F.adultProcessing)} par soustraction (IRCC publie le total et le droit de citoyenneté ; la différence est calculée par nous). Les enfants ne paient pas le droit de citoyenneté. Deux adultes et un enfant versent ainsi ${h.cad(2 * F.adult + F.minor)}. L’examen de citoyenneté n’entraîne aucun frais distinct, il fait partie de la demande. D’autres services ont leur propre tarif : ${h.cad(F.certificate)} pour un certificat de citoyenneté, ${h.cad(F.recordSearch)} pour une recherche de dossier, ${h.cad(F.resumeAdult)} pour la réintégration d’un adulte et ${h.cad(F.resumeMinor)} pour celle d’un enfant, ${h.cad(F.renounce)} pour une répudiation dans la plupart des cas, et ${h.cad(F.statelessAdult)} pour un adulte apatride né d’un parent canadien. Test de langue, traductions et photos ne sont pas des frais d’IRCC : l’outil vous laisse les saisir vous-même.`;
    },
    faqs: (h) => [
      { q: 'Une partie des frais est-elle remboursée si je manque la cérémonie ?', a: `Dans un seul cas décrit par IRCC. Une seconde absence à la cérémonie entraîne la fermeture de la demande, considérée comme abandonnée ; les adultes récupèrent alors les ${h.cad(h.P.ca.fees.rightOfCitizenship)} du droit de citoyenneté et doivent redéposer une demande. La première absence donne lieu à une nouvelle convocation, définitive, sans aucun remboursement.` },
      { q: 'Faut-il repayer après un échec à l’examen de citoyenneté ?', a: `Pas pour les essais : l’examen est compris dans la demande et vous avez ${h.P.ca.test.attempts} chances. La dépense revient si la demande échoue en entier, par exemple après une audience ratée à la suite de trois échecs. La demande est alors refusée, et une nouvelle demande se paie de nouveau, ${h.cad(h.P.ca.fees.adult)} pour un adulte.` },
      { q: 'Pourquoi un adulte apatride paie-t-il moins cher ?', a: `IRCC prévoit un tarif distinct de ${h.cad(h.P.ca.fees.statelessAdult)} pour l’adulte apatride né d’un parent canadien. C’est exactement le montant du droit de citoyenneté, sans la part de traitement payée par les autres adultes. La mesure vise un groupe restreint ; la plupart des adultes acquittent les ${h.cad(h.P.ca.fees.adult)} complets.` },
      { q: 'Comment payer les frais de citoyenneté et le prouver ?', a: 'En ligne, avant l’envoi du dossier. IRCC demande aux demandeurs en ligne de téléverser le reçu et à ceux qui déposent sur papier de l’imprimer et de le joindre. Conservez-en une copie : le reçu figure sur la liste de contrôle, et votre exemplaire permet de prouver le paiement si une question se pose plus tard.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees;
      return `
<h2>Comment l’outil fait le total</h2>
<p>L’outil ci-dessus prend trois valeurs : le nombre d’adultes de 18 ans ou plus, le nombre d’enfants de moins de 18 ans et vos frais personnels. Pour chaque adulte, il inscrit deux postes, la part de traitement de ${h.cad(F.adultProcessing)} et le droit de citoyenneté de ${h.cad(F.rightOfCitizenship)}, soit ${h.cad(F.adult)} par personne. Chaque enfant ajoute ${h.cad(F.minor)}. Vos frais éventuels forment une ligne à part. Les montants d’IRCC proviennent de la liste des frais conservée avec le site et vérifiée chaque mois ; rien n’est estimé. À l’ouverture, deux adultes et un enfant donnent ${h.cad(2 * F.adult + F.minor)}. Le site ne perçoit rien : le paiement se fait directement auprès d’IRCC.</p>
<h2>Tous les frais de citoyenneté</h2>
${h.table(['Service', 'Frais'], [['Attribution, adulte de 18 ans ou plus (droit de citoyenneté compris)', h.cad(F.adult)], ['dont droit de citoyenneté', h.cad(F.rightOfCitizenship)], ['Attribution, mineur', h.cad(F.minor)], ['Attribution, adulte apatride né d’un parent canadien', h.cad(F.statelessAdult)], ['Certificat de citoyenneté (preuve)', h.cad(F.certificate)], ['Recherche de dossiers de citoyenneté', h.cad(F.recordSearch)], ['Réintégration, adulte', h.cad(F.resumeAdult)], ['Réintégration, mineur', h.cad(F.resumeMinor)], ['Répudiation (la plupart des cas)', h.cad(F.renounce)]], `Liste des frais d’IRCC, modifiée le ${h.date(F.dateModified)}.`, ['l', 'r'])}
<p>Le second outil, sous le résumé, chiffre les demandes de certificat et de recherche de dossier, à ${h.cad(F.certificate)} chacune. Ce sont des démarches distinctes, avec leur propre formulaire, et non des options de la demande de citoyenneté.</p>
<h2>Quelques ménages types</h2>
${h.table(['Ménage', 'Adultes', 'Mineurs', 'Total'], [['Personne seule', 1, 0, h.cad(F.adult)], ['Couple', 2, 0, h.cad(2 * F.adult)], ['Couple et deux enfants', 2, 2, h.cad(2 * F.adult + 2 * F.minor)], ['Parent seul et trois enfants', 1, 3, h.cad(F.adult + 3 * F.minor)]], 'Totaux tirés de la liste des frais d’IRCC ; la règle vaut pour toute taille de ménage.', ['l', 'r', 'r', 'r'])}
<p>Une famille peut déposer en groupe en ligne, avec jusqu’à ${h.P.ca.application.groupMinorsMax} mineurs sur le compte d’un parent, mais chacun paie ses frais : le groupe fait gagner du temps, pas de l’argent. La page ${h.a('ca-minors', 'enfants mineurs')} précise sous quelle règle chaque enfant demande.</p>
<h2>Ce qui ne figure pas sur la facture d’IRCC</h2>
<p>Un dossier entraîne souvent des dépenses extérieures : un test de langue approuvé si vous n’avez pas d’autre preuve (la page ${h.a('ca-language', 'preuve de langue')} cite des preuves gratuites, comme un diplôme), des certificats de police étrangers, des traductions et, sur papier, des photos imprimées. Leur prix dépend des prestataires et des pays ; nous ne l’inventons pas. Saisissez votre propre montant dans le troisième champ, il s’ajoute au total.</p>
<h2>Quand l’argent est perdu</h2>
<p>Les frais rémunèrent l’examen du dossier, pas son issue. Déposer trop tôt, avant d’avoir les jours, ou alors qu’une interdiction s’applique, c’est risquer de payer pour un refus. Vérifiez les ${h.a('ca-apply', 'conditions d’admissibilité')} et faites le ${h.a('ca-presence', 'calcul des jours')} avant de payer. Le seul remboursement décrit sur la ${h.src('ca_ceremony_when', 'page d’IRCC sur la date de la cérémonie')} vise les adultes dont la demande est fermée après une seconde absence : le droit de citoyenneté leur est rendu. Les montants complets figurent dans la ${h.src('ca_fees', 'liste des frais d’IRCC')}.</p>`;
    },
  },
});
