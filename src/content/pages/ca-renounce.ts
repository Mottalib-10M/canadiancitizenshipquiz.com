import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-renounce',
  group: 'apply',
  order: 330,
  tool: { kind: 'mini:carenounce' },
  related: ['ca-descent', 'ca-resume', 'ca-certificate', 'ca-cost', 'ca-citizenship'],
  sources: ['ca_renounce', 'ca_renounce_apply', 'ca_fees', 'ca_rules2025'],
  en: {
    slug: 'renounce-canadian-citizenship',
    nav: 'Renounce citizenship',
    card: 'Another nationality, life outside Canada, age 18: the conditions, the $100 fee, the free route for some.',
    title: 'Renounce Canadian citizenship: conditions, $100 fee, forms',
    description: 'How renouncing Canadian citizenship works: another citizenship, no residence in Canada, age 18, a $100 fee, and the free route for automatic citizens.',
    h1: 'Renounce Canadian citizenship: who can, and at what cost',
    intro: 'Enter how many people are renouncing and whether they became citizens automatically: the fee to pay is shown, with what giving up citizenship means for coming back.',
    resume: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.renounce;
      return `To renounce Canadian citizenship in the general case, under section 9(1) of the Citizenship Act, you must hold the citizenship of another country, or be about to obtain it if your renunciation is approved, and you must not live in Canada. You must be at least ${A.minAge}, not be a threat to Canada’s security or part of ongoing criminal activity, not be prevented by a mental disability from understanding what renouncing means, and not be the subject of revocation proceedings. The fee is ${h.cad(F.renounce)} in most cases, and it is not refunded once processing has started. The application uses form CIT 0302 with checklist CIT 0402, and urgent processing exists. A second, lighter route serves people who became citizens automatically through the changes to the Act in 2009, 2015 or 2025: under section 7.1 of the Regulations they only need another citizenship and the capacity to understand the decision, with no age or residence condition and no fee, using forms CIT 0496 and CIT 0501. If approved, you receive a renunciation certificate or a confirmation of renunciation. To live in Canada again later, you would need a permanent resident visa.`;
    },
    faqs: (h) => [
      { q: 'Can I renounce Canadian citizenship while living in Canada?', a: 'Not under the general route. One of the conditions in section 9(1) is that you do not live in Canada. The simplified route for people who became citizens automatically through the 2009, 2015 or 2025 changes has no residence condition, so for that group where they live does not matter.' },
      { q: 'Can a minor renounce Canadian citizenship?', a: `Under the general route, no: you must be at least ${h.P.ca.renounce.minAge}. The simplified route under section 7.1 of the Regulations, for people who became citizens automatically through changes to the Act, sets no age condition; it only requires another citizenship and the capacity to understand what renouncing means.` },
      { q: 'Is the renunciation fee refunded if I change my mind?', a: `IRCC states that the fee of ${h.cad(h.P.ca.fees.renounce)} is not refundable once processing has started. Think the decision through before you pay, and check how your other country treats your status, because a renunciation that goes through cannot be cancelled by asking for the money back.` },
      { q: 'Will a citizenship officer interview me before approving a renunciation?', a: 'It can happen. IRCC says an officer may interview you as part of the assessment. If the application is approved, you receive a renunciation certificate or a confirmation of renunciation, the document that shows you are no longer a Canadian citizen. Keep it with your other civil status papers.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.renounce;
      return `
<h2>Two routes, two sets of conditions</h2>
${h.table(['', 'General route, s. 9(1) of the Act', 'Automatic citizens, s. 7.1 of the Regulations'], [['Who', 'any citizen', 'people who became citizens automatically in 2009, 2015 or 2025'], ['Other citizenship', 'held, or obtained on approval', 'required'], ['Living outside Canada', 'required', 'no condition'], ['Minimum age', A.minAge, 'none'], ['Other conditions', 'no security threat, capacity to understand, no revocation proceedings', 'capacity to understand'], ['Forms', 'CIT 0302 and checklist CIT 0402', 'CIT 0496 and CIT 0501 (and CIT 0556)'], ['Fee', `${h.cad(F.renounce)} in most cases`, 'none']], 'From IRCC’s renunciation pages.', ['l', 'l', 'l'])}
<p>The calculator above follows this split: tick the box if the people renouncing became citizens automatically, and the fee drops to zero. Otherwise it multiplies ${h.cad(F.renounce)} by the number of people.</p>
<h2>Why the other citizenship comes first</h2>
<p>Both routes rest on the same starting point: you must have, or be about to have, another nationality. Under the general route, it is enough that you will obtain it if your renunciation is approved, which matters to anyone whose other naturalization depends on giving up Canadian citizenship first. Under the simplified route, you must already hold it. Keep proof of the other citizenship ready for the application.</p>
<h2>Who uses the simplified route</h2>
<p>Successive changes to the Citizenship Act, in 2009, 2015 and most recently with Bill C-3 in force since ${h.date(h.P.ca.c3.inForce)}, made some people citizens without any application, often people born abroad to a Canadian parent. Some may never have thought of themselves as Canadian, and some may have obligations in their other country that make dual nationality a problem. For them, IRCC created a route under section 7.1 of the Regulations with only two conditions and no fee. The ${h.a('ca-descent', 'page on citizenship by descent')} explains who became a citizen through the 2025 changes, and ${h.src('ca_rules2025', 'IRCC’s page on the rules since 2025')} gives the background.</p>
<h2>Applying</h2>
<p>The application is made with the forms listed above and the fee where one applies. IRCC offers urgent processing when there is a reason for it. An officer may interview you. If the application is approved, you receive either a renunciation certificate or a confirmation of renunciation. The fee, when due, is not refunded once processing has started, so the time to reconsider is before you pay. The steps are on ${h.src('ca_renounce_apply', 'IRCC’s page on how to renounce')}.</p>
<h2>What you give up</h2>
<p>Renouncing ends the rights of a citizen, including the right to live in Canada. IRCC’s eligibility page is clear on the consequence: to live in Canada again, you would need a permanent resident visa like any other foreign national. If you later regain permanent resident status, a path back exists, as the ${h.a('ca-resume', 'page on resuming citizenship')} explains, with ${h.num(h.P.ca.resume.presenceDays)} days of presence as a permanent resident in ${h.P.ca.resume.windowYears} years and a fee of ${h.cad(F.resumeAdult)} for an adult. That is a long way round, so weigh the decision with the full picture of ${h.src('ca_renounce', 'IRCC’s conditions')} in front of you.</p>`;
    },
  },
  fr: {
    slug: 'renoncer-citoyennete-canadienne',
    nav: 'Répudier la citoyenneté',
    card: 'Autre nationalité, vie hors du Canada, 18 ans : les conditions, les 100 $ de frais, la voie gratuite.',
    title: 'Renoncer à la citoyenneté canadienne : conditions et 100 $',
    description: 'Renoncer à la citoyenneté canadienne : autre citoyenneté, résidence hors du Canada, 18 ans, frais de 100 $, et la voie gratuite des citoyens d’office.',
    h1: 'Renoncer à la citoyenneté canadienne : qui le peut et à quel prix',
    intro: 'Indiquez le nombre de personnes qui renoncent et si elles sont devenues citoyennes d’office : les frais à payer s’affichent, avec la conséquence pour un retour au Canada.',
    resume: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.renounce;
      return `Pour répudier la citoyenneté canadienne dans le cas général, au titre du paragraphe 9(1) de la Loi sur la citoyenneté, il faut posséder la citoyenneté d’un autre pays, ou l’obtenir si la répudiation est approuvée, et ne pas résider au Canada. Il faut aussi avoir au moins ${A.minAge} ans, ne pas constituer une menace pour la sécurité du Canada ni participer à des activités criminelles en cours, ne pas être empêché par une déficience mentale de comprendre la portée de la démarche et ne pas faire l’objet d’une procédure de révocation. Les frais sont de ${h.cad(F.renounce)} dans la plupart des cas et ne sont pas remboursés une fois le traitement commencé. La demande se fait avec le formulaire CIT 0302 et la liste de contrôle CIT 0402 ; un traitement urgent existe. Une seconde voie, plus légère, vise les personnes devenues citoyennes d’office par les modifications de la Loi de 2009, 2015 ou 2025 : selon l’article 7.1 du Règlement, il leur suffit d’avoir une autre citoyenneté et la capacité de comprendre la décision, sans condition d’âge ni de résidence et sans frais, avec les formulaires CIT 0496 et CIT 0501. Si la demande est approuvée, vous recevez un certificat ou une confirmation de répudiation. Pour revivre au Canada, il faudrait ensuite un visa de résident permanent.`;
    },
    faqs: (h) => [
      { q: 'Peut-on répudier la citoyenneté canadienne en vivant au Canada ?', a: 'Pas par la voie générale : le paragraphe 9(1) exige de ne pas résider au Canada. La voie simplifiée réservée aux personnes devenues citoyennes d’office par les changements de 2009, 2015 ou 2025 ne comporte aucune condition de résidence ; pour elles, le lieu de vie importe peu.' },
      { q: 'Un mineur peut-il répudier la citoyenneté canadienne ?', a: `Pas par la voie générale, qui exige au moins ${h.P.ca.renounce.minAge} ans. La voie simplifiée de l’article 7.1 du Règlement, pour les personnes devenues citoyennes d’office par une modification de la Loi, ne fixe aucun âge ; elle demande seulement une autre citoyenneté et la capacité de comprendre la portée de la répudiation.` },
      { q: 'Les frais de répudiation sont-ils remboursés si je change d’avis ?', a: `IRCC précise que les ${h.cad(h.P.ca.fees.renounce)} ne sont pas remboursables une fois le traitement commencé. Mûrissez la décision avant de payer et vérifiez comment votre autre pays traite votre situation : une répudiation menée à terme ne s’annule pas par une demande de remboursement.` },
      { q: 'Un agent peut-il me convoquer avant d’approuver une répudiation ?', a: 'Oui, cela arrive : IRCC indique qu’un agent peut vous faire passer une entrevue pendant l’examen du dossier. Si la demande est approuvée, vous recevez un certificat de répudiation ou une confirmation de répudiation, document qui atteste que vous n’êtes plus citoyen canadien. Rangez-le avec vos papiers d’état civil.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees, A = h.P.ca.renounce;
      return `
<h2>Deux voies, deux séries de conditions</h2>
${h.table(['', 'Voie générale, par. 9(1) de la Loi', 'Citoyens d’office, art. 7.1 du Règlement'], [['Pour qui', 'tout citoyen', 'personnes devenues citoyennes d’office en 2009, 2015 ou 2025'], ['Autre citoyenneté', 'détenue, ou obtenue si la répudiation est approuvée', 'exigée'], ['Résidence hors du Canada', 'exigée', 'aucune condition'], ['Âge minimal', `${A.minAge} ans`, 'aucun'], ['Autres conditions', 'pas de menace pour la sécurité, capacité de comprendre, pas de procédure de révocation', 'capacité de comprendre'], ['Formulaires', 'CIT 0302 et liste CIT 0402', 'CIT 0496 et CIT 0501 (et CIT 0556)'], ['Frais', `${h.cad(F.renounce)} dans la plupart des cas`, 'aucun']], 'D’après les pages d’IRCC sur la répudiation.', ['l', 'l', 'l'])}
<p>L’outil ci-dessus suit ce partage : cochez la case si les personnes concernées sont devenues citoyennes d’office, et les frais tombent à zéro. Sinon, il multiplie ${h.cad(F.renounce)} par le nombre de personnes.</p>
<h2>L’autre citoyenneté d’abord</h2>
<p>Les deux voies partent du même point : avoir, ou être sur le point d’avoir, une autre nationalité. Dans la voie générale, il suffit de l’obtenir si la répudiation est approuvée, ce qui compte pour qui doit d’abord renoncer à la citoyenneté canadienne avant d’être naturalisé ailleurs. Dans la voie simplifiée, il faut déjà la posséder. Gardez la preuve de cette autre citoyenneté à portée de main.</p>
<h2>À qui sert la voie simplifiée</h2>
<p>Plusieurs modifications de la Loi sur la citoyenneté, en 2009, en 2015 et dernièrement avec le projet de loi C-3, en vigueur depuis le ${h.date(h.P.ca.c3.inForce)}, ont rendu certaines personnes citoyennes sans aucune demande, souvent des personnes nées à l’étranger d’un parent canadien. Certaines ne se sont peut-être jamais senties canadiennes, d’autres ont parfois dans leur autre pays des obligations qui rendent la double nationalité délicate. Pour elles, IRCC a prévu une voie fondée sur l’article 7.1 du Règlement, avec deux conditions seulement et sans frais. La page ${h.a('ca-descent', 'citoyenneté par filiation')} explique qui est devenu citoyen en 2025, et la page d’IRCC sur les ${h.src('ca_rules2025', 'règles depuis 2025')} donne le contexte.</p>
<h2>La demande</h2>
<p>La demande se fait avec les formulaires indiqués et, le cas échéant, les frais. IRCC propose un traitement urgent lorsqu’un motif le justifie. Un agent peut vous convoquer en entrevue. En cas d’approbation, vous recevez un certificat de répudiation ou une confirmation de répudiation. Les frais, s’ils sont dus, ne sont plus remboursés une fois le traitement commencé : c’est avant de payer qu’il faut réfléchir. Les étapes figurent sur la page d’IRCC ${h.src('ca_renounce_apply', 'Présenter une demande de répudiation')}.</p>
<h2>Ce que l’on abandonne</h2>
<p>Répudier met fin aux droits du citoyen, dont celui de vivre au Canada. La page d’admissibilité d’IRCC le dit nettement : pour revivre au Canada, il faudrait un visa de résident permanent, comme tout ressortissant étranger. Si vous redevenez un jour résident permanent, un retour est possible par la ${h.a('ca-resume', 'réintégration')}, avec ${h.num(h.P.ca.resume.presenceDays)} jours de présence comme résident permanent en ${h.P.ca.resume.windowYears} ans et des frais de ${h.cad(F.resumeAdult)} pour un adulte. Le détour est long : pesez la décision en ayant sous les yeux l’ensemble des ${h.src('ca_renounce', 'conditions d’IRCC')}.</p>`;
    },
  },
});
