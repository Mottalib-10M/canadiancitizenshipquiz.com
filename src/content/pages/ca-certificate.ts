import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-certificate',
  group: 'apply',
  order: 340,
  tool: { kind: 'mini:cacert' },
  related: ['ca-descent', 'ca-oath', 'ca-cost', 'ca-renounce', 'ca-citizenship'],
  sources: ['ca_proof', 'ca_proof_elig', 'ca_proof_apply', 'ca_records'],
  en: {
    slug: 'canadian-citizenship-certificate',
    nav: 'Citizenship certificate',
    card: 'Proof of citizenship for $75, who needs one, online or paper, urgent cases, and the record search.',
    title: 'Canadian citizenship certificate: $75 proof, forms, search',
    description: 'The Canadian citizenship certificate: what it proves, who needs one, the $75 fee, online or paper application, urgent processing and the separate record search.',
    h1: 'Citizenship certificate: getting proof that you are Canadian',
    intro: 'Enter how many certificates and record searches you need: the total of IRCC’s fees is calculated at once.',
    resume: (h) => {
      const F = h.P.ca.fees, R = h.P.ca.proof;
      return `A Canadian citizenship certificate is the document that proves you are a Canadian citizen. It costs ${h.cad(F.certificate)} per person and is not a travel document. Who needs one depends on how you became Canadian. If you were born in Canada, your provincial birth certificate is generally enough proof. If you were naturalized, you received a certificate at the ceremony, electronic or on paper, and only apply again for a replacement or an update. If you were born abroad to a Canadian parent, the certificate is how IRCC confirms whether you are a citizen, and some limits apply; since Bill C-3, IRCC tells people in that situation to apply for one to find out for sure. The application uses form CIT 0001 with checklist CIT 0014, plus form CIT 0555 on the Canadian parent’s physical presence where needed. Some people can apply online and then have ${R.onlineDays} days to submit once they start; others must use paper. Urgent processing exists for listed reasons. A record search, also ${h.cad(F.recordSearch)}, is a different service: it produces a letter about citizenship records, valid ${R.recordLetterValidYears} year, that cannot prove citizenship or support a passport application.`;
    },
    faqs: (h) => [
      { q: 'Who must apply for a citizenship certificate on paper?', a: `Several groups, among them people born in Canada on or before ${h.date(h.P.ca.proof.paperBornBefore)}, people naturalized on or before ${h.date(h.P.ca.proof.paperNaturalizedBefore)}, guardians applying for minors, anyone asking for a replacement or an update, and families applying for four or more children. Everyone else should check the online eligibility questions first.` },
      { q: 'Can a citizenship certificate be used to travel?', a: 'No. IRCC states plainly that the certificate is not a travel document. It is the proof of citizenship you use to apply for a Canadian passport, which is the document for travel. New citizens can only apply for a passport once they hold their certificate.' },
      { q: 'Can I search the citizenship records of a deceased relative?', a: `Yes. A record search can be requested for yourself or for someone else, at ${h.cad(h.P.ca.fees.recordSearch)}, with form CIT 0058. The letter you receive is normally valid for ${h.P.ca.proof.recordLetterValidYears} year, but it does not expire when the person is deceased. It documents the records found; it does not prove citizenship.` },
      { q: 'What counts as a reason for an urgent citizenship certificate?', a: 'IRCC lists reasons such as a job, school, access to a pension, health care or a social insurance number, travel because of a death or serious illness in the family, and statelessness. You must explain the reason in a letter and attach proof. Without such a reason, the application follows the normal route.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees, R = h.P.ca.proof;
      return `
<h2>Do you need a certificate at all?</h2>
${h.table(['How you are Canadian', 'Usual proof', 'When to apply'], [['Born in Canada', 'provincial birth certificate', 'generally not needed'], ['Naturalized (grant)', 'certificate received at the ceremony', 'replacement or update only'], ['Born abroad to a Canadian parent', 'citizenship certificate', 'to confirm citizenship; some limits apply'], ['Became a citizen automatically in 2025', 'citizenship certificate', 'to find out for sure, as IRCC advises']], 'From IRCC’s pages on proof of citizenship.', ['l', 'l', 'l'])}
<p>The certificate is above all the tool of people born abroad. Bill C-3, in force since ${h.date(h.P.ca.c3.inForce)}, made many of them citizens automatically, and the certificate application is where IRCC checks and records that status. The ${h.a('ca-descent', 'page on citizenship by descent')} explains the rules the officer applies.</p>
<h2>Online or on paper</h2>
<p>IRCC offers an online application to some applicants. Once started, it must be submitted within ${R.onlineDays} days. Paper remains mandatory in a list of cases, including:</p>
<ul>
<li>people born in Canada on or before ${h.date(R.paperBornBefore)};</li>
<li>people naturalized on or before ${h.date(R.paperNaturalizedBefore)};</li>
<li>guardians applying on behalf of minors;</li>
<li>replacements of a certificate and updates to it;</li>
<li>families applying for four or more children.</li>
</ul>
<p>The paper file uses form CIT 0001 with checklist CIT 0014. When the case rests on a Canadian parent who was also born abroad, form CIT 0555 documents that parent's physical presence in Canada, which matters for children born or adopted from ${h.date(h.P.ca.c3.inForce)} onward. The details are on ${h.src('ca_proof_apply', 'IRCC’s application page')}.</p>
<h2>Urgent processing</h2>
<p>IRCC accepts requests for urgent processing for listed reasons: a job offer or school admission that depends on proof of citizenship, access to a pension, health care or a social insurance number, travel because of a death or serious illness in the family, statelessness and a few others. The request needs a letter explaining the reason and documents that prove it. Without one of these reasons, ask early instead: plan the certificate well before the step that needs it.</p>
<h2>The record search, a different service</h2>
<p>A search of citizenship records costs ${h.cad(F.recordSearch)} and uses form CIT 0058. You can ask for one about yourself or about someone else, which makes it useful for family history or estate matters. The result is a letter describing what IRCC's records show; it stays valid for ${R.recordLetterValidYears} year, or without expiry if the person is deceased. It is not proof of citizenship and cannot be used for a passport. If what you need is proof, apply for the certificate. The calculator above adds up both fees for a family; the rules are on ${h.src('ca_records', 'IRCC’s record search page')}.</p>
<h2>For new citizens</h2>
<p>If you are on your way to citizenship through a grant, you do not apply separately: the certificate is handed over at the ${h.a('ca-oath', 'citizenship ceremony')}, and your passport application comes after it. Keep the certificate safe; a replacement later means a new application, on paper. The full list of citizenship fees is on the ${h.a('ca-cost', 'fees page')}, and ${h.src('ca_proof', 'IRCC’s certificate page')} describes the document itself.</p>`;
    },
  },
  fr: {
    slug: 'certificat-citoyennete',
    nav: 'Certificat de citoyenneté',
    card: 'La preuve de citoyenneté pour 75 $, qui en a besoin, en ligne ou papier, cas urgents et recherche de dossier.',
    title: 'Certificat de citoyenneté canadienne : la preuve pour 75 $',
    description: 'Le certificat de citoyenneté canadienne : ce qu’il prouve, qui en a besoin, 75 $ de frais, demande en ligne ou papier, traitement urgent, recherche de dossier.',
    h1: 'Certificat de citoyenneté : prouver que vous êtes canadien',
    intro: 'Indiquez le nombre de certificats et de recherches de dossier : le total des frais d’IRCC se calcule aussitôt.',
    resume: (h) => {
      const F = h.P.ca.fees, R = h.P.ca.proof;
      return `Le certificat de citoyenneté canadienne est le document qui prouve la citoyenneté. Il coûte ${h.cad(F.certificate)} par personne et n’est pas un titre de voyage. Le besoin dépend de la façon dont vous êtes devenu canadien. Né au Canada, vous disposez en général d’une preuve suffisante avec votre certificat de naissance provincial. Naturalisé, vous avez reçu un certificat à la cérémonie, électronique ou papier, et ne refaites une demande que pour un remplacement ou une mise à jour. Né à l’étranger d’un parent canadien, c’est par le certificat qu’IRCC confirme si vous êtes citoyen, avec certaines limites ; depuis le projet de loi C-3, IRCC invite les personnes dans ce cas à en demander un pour en être certaines. La demande se fait avec le formulaire CIT 0001 et la liste de contrôle CIT 0014, plus le formulaire CIT 0555 sur la présence effective du parent canadien s’il y a lieu. Certains peuvent la remplir en ligne et disposent alors de ${R.onlineDays} jours pour l’envoyer une fois commencée ; d’autres doivent passer par le papier. Un traitement urgent existe pour des motifs précis. La recherche de dossier, à ${h.cad(F.recordSearch)} elle aussi, est un autre service : elle produit une lettre sur les dossiers de citoyenneté, valable ${R.recordLetterValidYears} an, qui ne prouve pas la citoyenneté et ne permet pas d’obtenir un passeport.`;
    },
    faqs: (h) => [
      { q: 'Qui doit demander le certificat de citoyenneté sur papier ?', a: `Plusieurs groupes, dont les personnes nées au Canada le ${h.date(h.P.ca.proof.paperBornBefore)} ou avant, les personnes naturalisées le ${h.date(h.P.ca.proof.paperNaturalizedBefore)} ou avant, les tuteurs qui demandent pour des mineurs, toute demande de remplacement ou de mise à jour, et les familles qui demandent pour quatre enfants ou plus. Les autres vérifient d’abord l’admissibilité en ligne.` },
      { q: 'Le certificat de citoyenneté permet-il de voyager ?', a: 'Non. IRCC précise que le certificat n’est pas un titre de voyage. C’est la preuve de citoyenneté qui sert à demander un passeport canadien, lui-même document de voyage. Les nouveaux citoyens ne peuvent demander leur passeport qu’une fois le certificat en main.' },
      { q: 'Peut-on rechercher le dossier de citoyenneté d’un parent décédé ?', a: `Oui. La recherche de dossier peut viser vous-même ou une autre personne, pour ${h.cad(h.P.ca.fees.recordSearch)}, avec le formulaire CIT 0058. La lettre obtenue vaut normalement ${h.P.ca.proof.recordLetterValidYears} an, mais n’expire pas si la personne est décédée. Elle décrit les dossiers trouvés ; elle ne prouve pas la citoyenneté.` },
      { q: 'Quels motifs justifient un certificat de citoyenneté urgent ?', a: 'IRCC cite notamment un emploi, des études, l’accès à une pension, aux soins de santé ou à un numéro d’assurance sociale, un voyage pour un décès ou une maladie grave dans la famille, ou l’apatridie. Le motif s’explique dans une lettre, preuves à l’appui. Sans motif de ce type, la demande suit la voie normale.' },
    ],
    body: (h) => {
      const F = h.P.ca.fees, R = h.P.ca.proof;
      return `
<h2>Avez-vous besoin d’un certificat ?</h2>
${h.table(['Comment vous êtes canadien', 'Preuve habituelle', 'Quand demander'], [['Né au Canada', 'certificat de naissance provincial', 'en général inutile'], ['Naturalisé (attribution)', 'certificat reçu à la cérémonie', 'remplacement ou mise à jour seulement'], ['Né à l’étranger d’un parent canadien', 'certificat de citoyenneté', 'pour confirmer la citoyenneté ; certaines limites'], ['Devenu citoyen d’office en 2025', 'certificat de citoyenneté', 'pour en être certain, comme le conseille IRCC']], 'D’après les pages d’IRCC sur la preuve de citoyenneté.', ['l', 'l', 'l'])}
<p>Le certificat est d’abord l’outil des personnes nées à l’étranger. Le projet de loi C-3, en vigueur depuis le ${h.date(h.P.ca.c3.inForce)}, en a rendu beaucoup citoyennes d’office, et c’est la demande de certificat qui permet à IRCC de vérifier et de consigner ce statut. La page ${h.a('ca-descent', 'citoyenneté par filiation')} présente les règles appliquées par l’agent.</p>
<h2>En ligne ou sur papier</h2>
<p>IRCC propose une demande en ligne à une partie des demandeurs ; une fois commencée, elle doit être envoyée dans les ${R.onlineDays} jours. Le papier reste obligatoire dans plusieurs cas, notamment :</p>
<ul>
<li>personnes nées au Canada le ${h.date(R.paperBornBefore)} ou avant ;</li>
<li>personnes naturalisées le ${h.date(R.paperNaturalizedBefore)} ou avant ;</li>
<li>tuteurs qui présentent la demande d’un mineur ;</li>
<li>remplacement ou mise à jour d’un certificat ;</li>
<li>familles qui demandent pour quatre enfants ou plus.</li>
</ul>
<p>Le dossier papier comprend le formulaire CIT 0001 et la liste de contrôle CIT 0014. Quand la demande repose sur un parent canadien lui-même né à l’étranger, le formulaire CIT 0555 documente la présence effective de ce parent au Canada, élément décisif pour les enfants nés ou adoptés depuis le ${h.date(h.P.ca.c3.inForce)}. Le détail figure sur la ${h.src('ca_proof_apply', 'page de demande d’IRCC')}.</p>
<h2>Le traitement urgent</h2>
<p>IRCC accepte les demandes de traitement urgent pour des motifs définis : offre d’emploi ou admission scolaire subordonnée à une preuve de citoyenneté, accès à une pension, aux soins de santé ou à un numéro d’assurance sociale, voyage pour un décès ou une maladie grave dans la famille, apatridie, entre autres. Il faut une lettre exposant le motif et des pièces qui l’établissent. À défaut d’un tel motif, mieux vaut anticiper et demander le certificat bien avant l’étape qui l’exige.</p>
<h2>La recherche de dossier, un autre service</h2>
<p>La recherche dans les dossiers de citoyenneté coûte ${h.cad(F.recordSearch)} et passe par le formulaire CIT 0058. Elle peut porter sur vous ou sur une autre personne, ce qui la rend utile pour une généalogie ou une succession. Le résultat est une lettre décrivant ce que contiennent les dossiers d’IRCC ; elle vaut ${R.recordLetterValidYears} an, ou sans limite si la personne est décédée. Ce n’est pas une preuve de citoyenneté et elle ne sert pas pour un passeport. Si c’est une preuve qu’il vous faut, demandez le certificat. L’outil ci-dessus additionne les deux frais pour une famille ; les règles figurent sur la ${h.src('ca_records', 'page d’IRCC sur la recherche de dossiers')}.</p>
<h2>Pour les nouveaux citoyens</h2>
<p>Si vous devenez citoyen par attribution, aucune demande séparée n’est nécessaire : le certificat est remis à la ${h.a('ca-oath', 'cérémonie de citoyenneté')}, et la demande de passeport vient ensuite. Conservez-le soigneusement : un remplacement suppose une nouvelle demande, sur papier. La liste complète des frais figure à la page ${h.a('ca-cost', 'frais')}, et la ${h.src('ca_proof', 'page d’IRCC sur le certificat')} décrit le document lui-même.</p>`;
    },
  },
});
