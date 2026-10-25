import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-oath',
  group: 'apply',
  order: 320,
  tool: { kind: 'frise', props: { preset: 'ceremony' } },
  mini: { kind: 'mini:caceremony' },
  related: ['ca-certificate', 'ca-pr', 'ca-minors', 'ca-cost', 'home'],
  sources: ['ca_ceremony', 'ca_ceremony_when', 'ca_ceremony_bring', 'ca_ceremony_expect'],
  en: {
    slug: 'canadian-citizenship-ceremony',
    nav: 'Ceremony and oath',
    card: 'Invitation, documents to bring, virtual or in person, the oath from age 14 and what happens if you miss it.',
    title: 'Canadian citizenship ceremony and oath: what to bring',
    description: 'The Canadian citizenship ceremony: the invitation, virtual or in person, documents to bring, the oath from age 14, rescheduling and a missed ceremony.',
    h1: 'Canadian citizenship ceremony: the oath and the final step',
    intro: 'Enter the day your invitation arrives: the timeline shows the earliest ceremony date and what follows, up to the passport. Below it, count who takes the oath in your family.',
    resume: (h) => {
      const K = h.P.ca.ceremony;
      return `The citizenship ceremony is the final step of a grant: you take the oath of citizenship there and sign the oath form the same day. IRCC sends the invitation at least ${K.noticeWeeks} week before the date. Ceremonies are held either by video conference or in person, and switching from one to the other counts as rescheduling. Adults aged 18 or over take the oath, and so do teenagers aged ${K.oathFromAge} to 17; children under ${K.oathFromAge} do not, but they are welcome to attend. A request to reschedule must reach IRCC within ${K.rescheduleDays} days of the ceremony date; the first request is generally approved and leads to a final invitation. Missing a ceremony once leads to an automatic final invitation; missing it a second time closes the application as abandoned, adults get the right of citizenship fee of ${h.cad(h.P.ca.fees.rightOfCitizenship)} refunded, and a new application is needed. Bring the invitation, your permanent resident card (even expired) or confirmation of permanent residence, two pieces of identification and the signed release and consent form. The card is destroyed or collected during the ceremony.`;
    },
    faqs: (h) => [
      { q: 'Can I swear or affirm the oath of citizenship?', a: 'Either. The text published by IRCC begins with “I swear (or affirm)”, so you choose the form of words that suits your convictions. The rest of the oath is the same for everyone: allegiance to the King of Canada and his heirs and successors, faithful observance of the laws, including the Constitution, and the duties of a citizen.' },
      { q: 'Why does the oath name King Charles when the Act names Queen Elizabeth?', a: `IRCC’s ceremony pages show the oath naming His Majesty King Charles the Third, King of Canada. The Schedule of the Citizenship Act, in the consolidated version current to ${h.date('2026-09-30')}, still names Queen Elizabeth the Second. The words you say at the ceremony are the ones IRCC gives you there.` },
      { q: 'What do I need for a virtual citizenship ceremony?', a: 'Beyond the usual documents, IRCC asks virtual participants to have scissors ready to cut their permanent resident card, their seat number, and a computer or device with a camera running Chrome, Edge or Firefox. Test the camera and the browser in advance in the room you will use, with good lighting on your face.' },
      { q: 'When can I apply for a Canadian passport after the ceremony?', a: 'After you have your citizenship certificate. IRCC states that the passport comes only once you get the certificate, which new citizens receive at the ceremony, either as an electronic certificate or on paper. Keep the certificate safe: it is the proof you will use for the passport and many later steps.' },
    ],
    body: (h) => {
      const K = h.P.ca.ceremony;
      return `
<h2>From the invitation to the ceremony</h2>
<p>After the test, any interview and the final checks, IRCC invites you to a ceremony at least ${K.noticeWeeks} week in advance. The invitation states the format, virtual or in person, the date and time, and what to bring. Read it on the day it arrives: if the date does not work, you must ask for a new one within ${K.rescheduleDays} days of the ceremony date. The first rescheduling request is generally approved and produces a final invitation. Asking to switch from virtual to in person, or the reverse, is treated the same way as a rescheduling request.</p>
<h2>What to bring</h2>
${h.table(['Item', 'Who', 'Note'], [['The invitation', 'everyone', ''], ['Permanent resident card, or confirmation of permanent residence', 'everyone becoming a citizen', `the card even if expired; record of landing if PR before ${h.date('2002-06-28')}`], ['Two pieces of identification', 'adults', 'at least one with photo and signature'], ['Two pieces of identification', 'minors', ''], ['Signed release and consent form', 'as the invitation asks', ''], ['Scissors, seat number, device with camera', 'virtual ceremony', 'Chrome, Edge or Firefox']], 'From IRCC’s list of what to bring.', ['l', 'l', 'l'])}
<p>The family calculator under the summary counts the pieces of identification for a family and separates the people who take the oath from the children who attend without it. The confirmation of permanent residence can be form IMM 5292 or IMM 5688; the record of landing is form IMM 1000.</p>
<h2>The oath</h2>
<p>The oath is short. In the version shown by IRCC, you swear or affirm faithful allegiance to His Majesty King Charles the Third, King of Canada, his heirs and successors; you promise to observe the laws of Canada faithfully, including the Constitution, which recognizes and affirms the Aboriginal and treaty rights of First Nations, Inuit and Métis peoples; and you promise to fulfil your duties as a Canadian citizen. You say it aloud with the other candidates, then sign the oath form the same day. The ${h.src('ca_act', 'Citizenship Act')} keeps its own text in a Schedule, which still names Queen Elizabeth the Second in the consolidation current to ${h.date('2026-09-30')}.</p>
<h2>Who takes it</h2>
<p>Adults aged 18 or over take the oath, and so do minors aged ${K.oathFromAge} to 17. Teenagers in that age group can request a waiver of the oath; it is the only waiver they can ask for. Children under ${K.oathFromAge} do not take it and are welcome to attend with their family. Adults inside the test age band can request waivers too, as explained on the ${h.a('ca-seniors', 'age exemptions page')}, but the oath is otherwise part of every grant.</p>
<h2>If you miss it</h2>
<p>A first missed ceremony is not the end: IRCC reschedules automatically and sends a final invitation. A second miss closes the application as abandoned. Adults then receive a refund of the right of citizenship fee, ${h.cad(h.P.ca.fees.rightOfCitizenship)}, the only refund IRCC describes, and becoming a citizen means applying again from the start. The ${h.a('ca-cost', 'fee page')} sets out what that costs. The detail is on ${h.src('ca_ceremony_when', 'IRCC’s page about the ceremony date')}.</p>
<h2>After the ceremony</h2>
<p>Your permanent resident card is destroyed or collected during the ceremony, since you no longer need it. You leave with your citizenship certificate, electronic or on paper, and only with that certificate can you apply for a Canadian passport. IRCC’s pages do not state the exact legal moment at which you become a citizen, so we do not claim one. The ${h.a('ca-certificate', 'certificate page')} explains replacements and corrections. Practical details about the day are on ${h.src('ca_ceremony_expect', 'IRCC’s page on what to expect')}.</p>`;
    },
  },
  fr: {
    slug: 'ceremonie-citoyennete',
    nav: 'Cérémonie et serment',
    card: 'Convocation, documents à apporter, virtuelle ou en personne, serment dès 14 ans et absence à la cérémonie.',
    title: 'Cérémonie de citoyenneté et serment : documents à apporter',
    description: 'La cérémonie de citoyenneté canadienne : convocation, format virtuel ou en personne, documents, serment dès 14 ans, demande de report et cérémonie manquée.',
    h1: 'Cérémonie de citoyenneté : le serment, dernière étape',
    intro: 'Indiquez le jour où l’invitation arrive : la frise montre la date de cérémonie la plus proche possible et la suite, jusqu’au passeport. Plus bas, comptez qui prête serment dans la famille.',
    resume: (h) => {
      const K = h.P.ca.ceremony;
      return `La cérémonie de citoyenneté conclut l’attribution : on y prête le serment de citoyenneté et on signe le formulaire de serment le jour même. IRCC envoie la convocation au moins ${K.noticeWeeks} semaine à l’avance. La cérémonie se tient par vidéoconférence ou en personne, et changer de format équivaut à demander un report. Les adultes de 18 ans ou plus prêtent serment, de même que les jeunes de ${K.oathFromAge} à 17 ans ; les enfants de moins de ${K.oathFromAge} ans ne le prêtent pas mais sont les bienvenus. Une demande de report doit parvenir à IRCC dans les ${K.rescheduleDays} jours suivant la date de la cérémonie ; la première est généralement acceptée et donne lieu à une convocation définitive. Une première absence entraîne d’office une convocation définitive ; une seconde ferme la demande, considérée comme abandonnée : les adultes récupèrent les ${h.cad(h.P.ca.fees.rightOfCitizenship)} du droit de citoyenneté et doivent présenter une nouvelle demande. Apportez la convocation, votre carte de résident permanent (même expirée) ou votre confirmation de résidence permanente, deux pièces d’identité et le formulaire de décharge et de consentement signé. La carte est détruite ou récupérée pendant la cérémonie.`;
    },
    faqs: (h) => [
      { q: 'Peut-on jurer ou affirmer solennellement le serment ?', a: 'Au choix. Le texte publié par IRCC commence par « Je jure (ou j’affirme solennellement) » : chacun retient la formule qui convient à ses convictions. Le reste est identique pour tous : fidélité au Roi du Canada, à ses héritiers et successeurs, respect loyal des lois, y compris la Constitution, et devoirs du citoyen.' },
      { q: 'Pourquoi le serment nomme-t-il le roi Charles alors que la Loi nomme la reine Elizabeth ?', a: `Les pages d’IRCC sur la cérémonie présentent un serment qui nomme Sa Majesté le Roi Charles Trois, Roi du Canada. L’annexe de la Loi sur la citoyenneté, dans sa version codifiée à jour au ${h.date('2026-09-30')}, nomme encore la Reine Elizabeth Deux. Les mots prononcés à la cérémonie sont ceux qu’IRCC vous donne sur place.` },
      { q: 'Que faut-il pour une cérémonie de citoyenneté virtuelle ?', a: 'En plus des documents habituels, IRCC demande d’avoir des ciseaux pour couper la carte de résident permanent, votre numéro de siège et un ordinateur ou appareil muni d’une caméra, avec Chrome, Edge ou Firefox. Testez la caméra et le navigateur à l’avance, dans la pièce prévue, avec un bon éclairage du visage.' },
      { q: 'Quand demander un passeport canadien après la cérémonie ?', a: 'Une fois le certificat de citoyenneté en main. IRCC précise que le passeport ne vient qu’après le certificat, remis aux nouveaux citoyens à la cérémonie, sous forme électronique ou papier. Conservez-le précieusement : c’est la preuve que vous présenterez pour le passeport et bien d’autres démarches.' },
    ],
    body: (h) => {
      const K = h.P.ca.ceremony;
      return `
<h2>De la convocation à la cérémonie</h2>
<p>Après l’examen, une éventuelle entrevue et les dernières vérifications, IRCC vous convoque au moins ${K.noticeWeeks} semaine à l’avance. La convocation précise le format, virtuel ou en personne, la date, l’heure et les documents à apporter. Lisez-la dès réception : si la date ne convient pas, la demande de report doit être faite dans les ${K.rescheduleDays} jours suivant la date de la cérémonie. La première demande est généralement acceptée et aboutit à une convocation définitive. Passer du virtuel au présentiel, ou l’inverse, est traité comme un report.</p>
<h2>Les documents à apporter</h2>
${h.table(['Document', 'Pour qui', 'Remarque'], [['La convocation', 'tous', ''], ['Carte de résident permanent ou confirmation de résidence permanente', 'chaque futur citoyen', `carte même expirée ; fiche d’établissement si RP avant le ${h.date('2002-06-28')}`], ['Deux pièces d’identité', 'adultes', 'au moins une avec photo et signature'], ['Deux pièces d’identité', 'mineurs', ''], ['Formulaire de décharge et de consentement signé', 'selon la convocation', ''], ['Ciseaux, numéro de siège, appareil avec caméra', 'cérémonie virtuelle', 'Chrome, Edge ou Firefox']], 'D’après la liste d’IRCC des documents à apporter.', ['l', 'l', 'l'])}
<p>Le calcul familial placé sous le résumé compte les pièces d’identité d’une famille et distingue ceux qui prêtent serment des enfants présents sans le prêter. La confirmation de résidence permanente peut être le formulaire IMM 5292 ou IMM 5688 ; la fiche relative au droit d’établissement est l’IMM 1000.</p>
<h2>Le serment</h2>
<p>Le serment est bref. Dans la version présentée par IRCC, vous jurez ou affirmez solennellement fidélité et sincère allégeance à Sa Majesté le Roi Charles Trois, Roi du Canada, à ses héritiers et successeurs ; vous vous engagez à observer fidèlement les lois du Canada, y compris la Constitution, qui reconnaît et confirme les droits ancestraux et issus de traités des Premières Nations, des Inuit et des Métis ; et à remplir vos devoirs de citoyen canadien. Vous le prononcez à voix haute avec les autres candidats, puis signez le formulaire de serment le jour même. La ${h.src('ca_act', 'Loi sur la citoyenneté')} garde son propre texte en annexe, qui nomme encore la Reine Elizabeth Deux dans la version à jour au ${h.date('2026-09-30')}.</p>
<h2>Qui le prête</h2>
<p>Les adultes de 18 ans ou plus prêtent serment, ainsi que les mineurs de ${K.oathFromAge} à 17 ans. Ces derniers peuvent demander une dispense du serment, la seule qui leur soit ouverte. Les enfants de moins de ${K.oathFromAge} ans ne le prêtent pas et peuvent accompagner leur famille. Les adultes de la tranche d’âge de l’examen peuvent eux aussi demander des dispenses, comme l’explique la page ${h.a('ca-seniors', 'exemptions selon l’âge')}, mais le serment fait par ailleurs partie de toute attribution.</p>
<h2>En cas d’absence</h2>
<p>Une première absence n’est pas fatale : IRCC fixe d’office une nouvelle date et envoie une convocation définitive. Une seconde absence ferme la demande, considérée comme abandonnée. Les adultes se voient rembourser le droit de citoyenneté, ${h.cad(h.P.ca.fees.rightOfCitizenship)}, seul remboursement décrit par IRCC, et devenir citoyen suppose alors de tout recommencer. La page ${h.a('ca-cost', 'frais')} chiffre ce que cela coûte. Le détail figure sur la ${h.src('ca_ceremony_when', 'page d’IRCC sur la date de la cérémonie')}.</p>
<h2>Après la cérémonie</h2>
<p>La carte de résident permanent est détruite ou récupérée pendant la cérémonie : vous n’en avez plus l’usage. Vous repartez avec votre certificat de citoyenneté, électronique ou papier, et c’est seulement avec lui que vous pourrez demander un passeport canadien. Les pages d’IRCC ne précisent pas le moment juridique exact où l’on devient citoyen ; nous n’en affirmons donc aucun. La page ${h.a('ca-certificate', 'certificat de citoyenneté')} traite des remplacements et corrections. Le déroulement pratique est décrit sur la ${h.src('ca_ceremony_expect', 'page d’IRCC sur ce qui vous attend')}.</p>`;
    },
  },
});
