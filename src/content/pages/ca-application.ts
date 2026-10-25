import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-application',
  group: 'apply',
  order: 220,
  tool: { kind: 'mini:cadocs' },
  mini: { kind: 'mini:cafee' },
  related: ['ca-apply', 'ca-presence', 'ca-cost', 'ca-language', 'ca-minors', 'ca-citizenship'],
  sources: ['ca_how', 'ca_docs', 'ca_calc_page', 'ca_fees'],
  en: {
    slug: 'canadian-citizenship-application',
    nav: 'The application',
    card: 'Online or on paper, the adult form, the documents, the photos and the date you sign: the file, piece by piece.',
    title: 'Citizenship application: documents, photos and signing date',
    description: 'Canadian citizenship application in 2026: online or paper, form CIT 0002, the document checklist, 50 x 70 mm photos, police certificates and the date you sign.',
    h1: 'Citizenship application: what goes into the file',
    intro: 'Give your age, the countries that need a police certificate, your passports and whether you file on paper: your personal list of documents is counted for you.',
    resume: (h) => {
      const A = h.P.ca.application, C = h.P.ca.presence;
      return `A Canadian citizenship application for an adult is now filed online in most cases; paper is still required when you claim days abroad as a Crown servant or family member, or when a representative submits the application for you. The adult form is CIT 0002, with the checklist CIT 0007. The core documents are colour copies of every passport and travel document covering the eligibility period, the printout or result of your physical presence calculation, proof of ${C.languageLevel} if you are ${C.languageAges[0]} to ${C.languageAges[1]}, copies of two pieces of personal identification and the receipt for the fee. Add police certificates for each country where you spent ${A.policeCertDaysInRow} days or more in a row during the last ${A.policeCertYears} years since turning 18, and translations of any document in another language. Paper applicants also send two identical colour photos of ${A.photosMm[0]} by ${A.photosMm[1]} mm. The date on the form must be the day you actually sign: that date is the application date used in the presence calculation, and a paper file received more than ${A.returnAfterDays} days after it is sent back.`;
    },
    faqs: (h) => [
      { q: 'Can unrelated adults file one online citizenship application together?', a: `Yes. IRCC lets adults apply online as a group, even when they are not related, and one parent can add up to ${h.P.ca.application.groupMinorsMax} minors from the same account. Each person still meets the conditions alone and pays their own fee; grouping only saves time on the submission and keeps the family's files together.` },
      { q: 'Are passport photos accepted for citizenship?', a: `Not automatically. IRCC warns that citizenship photo specifications differ from passport ones. On paper you send two identical colour prints of ${h.P.ca.application.photosMm[0]} by ${h.P.ca.application.photosMm[1]} mm with the face measuring ${h.P.ca.application.faceMm[0]} to ${h.P.ca.application.faceMm[1]} mm from chin to crown. Show the specification sheet to the photographer rather than asking for passport photos.` },
      { q: 'What happens if a paper application arrives too late after signing?', a: `It is returned. IRCC sends back a paper application received more than ${h.P.ca.application.returnAfterDays} days after the date written on the form. Because that date also anchors your physical presence count, simply re-dating an old form is not a fix: recalculate your days for the new signing date, then sign and mail promptly.` },
      { q: 'Who must sign a child’s citizenship form?', a: `Children aged ${h.P.ca.application.minorSignAge} to 17 sign their own application. For younger children, a parent or legal guardian applies on their behalf. Either way, the adult who applies for the child gathers the documents, and the child pays the minor fee of ${h.cad(h.P.ca.fees.minor)} rather than the adult amount.` },
    ],
    body: (h) => {
      const A = h.P.ca.application, C = h.P.ca.presence, F = h.P.ca.fees;
      return `
<h2>Online or on paper</h2>
<p>IRCC now states that most applicants can apply online, through an account where you fill in the form, upload scans and pay. Two situations still require paper: you count days abroad as a Crown servant (or as the spouse, partner or child of one), which needs form CIT 0177, or a representative files the application on your behalf, which needs form IMM 5476. Everything else on this page applies to both channels, with small differences on photos and receipts.</p>
${h.table(['Point', 'Online', 'Paper'], [['Fee receipt', 'uploaded', 'printed and enclosed'], ['Photos', 'as the account asks', `two identical colour prints, ${A.photosMm[0]} × ${A.photosMm[1]} mm`], ['Presence calculation', 'the calculator inside your IRCC account', 'printed presence calculation'], ['Date on the form', 'day you sign', `day you sign; returned if received after ${A.returnAfterDays} days`]], 'How the two channels differ, from IRCC’s instructions.', ['l', 'l', 'l'])}
<h2>Documents for an adult</h2>
<p>The adult form is CIT 0002 and the document checklist is CIT 0007. Every applicant includes:</p>
<ul>
<li>colour copies of all passports and travel documents held during the eligibility period;</li>
<li>the physical presence calculation (see our ${h.a('ca-presence', 'day-by-day calculator')} to prepare it);</li>
<li>proof of language if you are ${C.languageAges[0]} to ${C.languageAges[1]} on the day you sign (${h.a('ca-language', 'accepted proof')});</li>
<li>copies of two pieces of personal identification;</li>
<li>the fee receipt.</li>
</ul>
<p>Some files need more: a police certificate from each country where you lived ${A.policeCertDaysInRow} days or more in a row in the last ${A.policeCertYears} years, counting only time since your 18th birthday; translations of documents not in English or French; form CIT 0177 for Crown service abroad; IMM 5476 for a representative; and supporting papers when you ask for a waiver. The calculator at the top counts how many items your own situation adds up to.</p>
<h2>The date you sign</h2>
<p>This is where most avoidable problems start. The form must carry the date on which you sign it, neither earlier nor later. That same date is the "application date" of the presence calculation, and you must be eligible on the day before it. In practice: finish the calculation, check that the ${h.num(C.requiredDays)} days are reached the day before, then sign and date the form that day. On paper, mail it quickly, because a file reaching IRCC more than ${A.returnAfterDays} days after the date on the form comes back to you.</p>
<h2>Families</h2>
<p>A couple or a group of adults can file online together, and a parent can add up to ${A.groupMinorsMax} minors to one account. Children aged ${A.minorSignAge} to 17 sign their own application. A child pays ${h.cad(F.minor)}, an adult ${h.cad(F.adult)}; the second calculator on this page totals a household, and the ${h.a('ca-minors', 'page on minors')} explains which child form applies.</p>
<h2>Before you press submit</h2>
<p>Compare the passport copies with the trips you declared: a stamp missing from the list is the kind of gap an officer notices. Keep a copy of everything you send, including the calculation, because you will bring originals and travel documents to any interview later. The full instructions are on ${h.src('ca_how', 'IRCC’s how-to-apply page')} and the ${h.src('ca_docs', 'adult forms and documents page')}.</p>`;
    },
  },
  fr: {
    slug: 'demande-de-citoyennete',
    nav: 'La demande',
    card: 'En ligne ou sur papier, formulaire adulte, pièces, photos et date de signature : le dossier pièce par pièce.',
    title: 'Demande de citoyenneté : pièces, photos et date de signature',
    description: 'Demande de citoyenneté canadienne en 2026 : en ligne ou papier, formulaire CIT 0002, pièces, photos de 50 x 70 mm, certificats de police et date de signature.',
    h1: 'Demande de citoyenneté : ce que contient le dossier',
    intro: 'Indiquez votre âge, les pays qui exigent un certificat de police, vos passeports et le mode de dépôt : la liste de vos pièces se calcule toute seule.',
    resume: (h) => {
      const A = h.P.ca.application, C = h.P.ca.presence;
      return `La demande de citoyenneté canadienne d’un adulte se dépose désormais en ligne dans la plupart des cas. Le papier reste obligatoire si vous faites valoir des jours à l’étranger comme fonctionnaire de l’État ou membre de sa famille, ou si un représentant dépose la demande à votre place. Le formulaire adulte porte le numéro CIT 0002 et la liste de contrôle, CIT 0007. Le dossier comprend des copies couleur de tous les passeports et titres de voyage de la période d’admissibilité, le résultat du calcul de présence effective, la preuve du niveau ${C.languageLevel} si vous avez de ${C.languageAges[0]} à ${C.languageAges[1]} ans, la copie de deux pièces d’identité et le reçu des frais. S’y ajoutent un certificat de police pour chaque pays où vous avez vécu ${A.policeCertDaysInRow} jours de suite ou plus au cours des ${A.policeCertYears} dernières années depuis vos 18 ans, ainsi que la traduction des documents rédigés dans une autre langue. Sur papier, joignez deux photos couleur identiques de ${A.photosMm[0]} sur ${A.photosMm[1]} mm. Le formulaire porte la date réelle de signature : c’est la date de demande retenue pour le calcul des jours, et un dossier papier reçu plus de ${A.returnAfterDays} jours après cette date est renvoyé.`;
    },
    faqs: (h) => [
      { q: 'Des adultes sans lien de parenté peuvent-ils déposer ensemble en ligne ?', a: `Oui. IRCC accepte les demandes de groupe en ligne entre adultes, même sans lien familial, et un parent peut ajouter jusqu’à ${h.P.ca.application.groupMinorsMax} mineurs au même compte. Chacun remplit toutefois les conditions pour lui-même et paie ses propres frais : le groupe simplifie l’envoi et garde les dossiers de la famille ensemble.` },
      { q: 'Les photos de passeport conviennent-elles à la demande de citoyenneté ?', a: `Pas forcément. IRCC prévient que les normes des photos de citoyenneté diffèrent de celles du passeport. Sur papier, il faut deux tirages couleur identiques de ${h.P.ca.application.photosMm[0]} sur ${h.P.ca.application.photosMm[1]} mm, le visage mesurant de ${h.P.ca.application.faceMm[0]} à ${h.P.ca.application.faceMm[1]} mm du menton au sommet du crâne. Montrez la fiche technique au photographe.` },
      { q: 'Que devient une demande papier reçue trop tard après la signature ?', a: `Elle vous est renvoyée si elle arrive plus de ${h.P.ca.application.returnAfterDays} jours après la date inscrite sur le formulaire. Cette date sert aussi de point de départ au calcul de présence : il ne suffit donc pas de redater un vieux formulaire. Refaites le calcul pour la nouvelle date, signez, puis postez sans tarder.` },
      { q: 'Qui signe le formulaire de citoyenneté d’un enfant ?', a: `L’enfant de ${h.P.ca.application.minorSignAge} à 17 ans signe lui-même sa demande ; pour un enfant plus jeune, le parent ou le tuteur légal présente la demande en son nom. Dans tous les cas, l’adulte qui présente la demande réunit les pièces, et l’enfant paie le tarif mineur de ${h.cad(h.P.ca.fees.minor)}, non le tarif adulte.` },
    ],
    body: (h) => {
      const A = h.P.ca.application, C = h.P.ca.presence, F = h.P.ca.fees;
      return `
<h2>En ligne ou sur papier</h2>
<p>Selon IRCC, la plupart des demandeurs peuvent maintenant passer par un compte en ligne : on y remplit le formulaire, on téléverse les pièces numérisées et on paie. Le papier s’impose dans deux cas : vous comptez des jours à l’étranger comme fonctionnaire de l’État ou comme époux, conjoint ou enfant d’un tel fonctionnaire (formulaire CIT 0177), ou un représentant dépose pour vous (formulaire IMM 5476). Le reste de cette page vaut pour les deux voies, à quelques détails près.</p>
${h.table(['Point', 'En ligne', 'Papier'], [['Reçu des frais', 'téléversé', 'imprimé et joint'], ['Photos', 'selon les consignes du compte', `deux tirages couleur identiques, ${A.photosMm[0]} × ${A.photosMm[1]} mm`], ['Calcul de présence', 'calculatrice du compte IRCC', 'calcul de présence imprimé'], ['Date du formulaire', 'jour de la signature', `jour de la signature ; renvoi après ${A.returnAfterDays} jours`]], 'Ce qui distingue les deux voies, d’après IRCC.', ['l', 'l', 'l'])}
<h2>Les pièces d’un adulte</h2>
<p>Le formulaire CIT 0002 s’accompagne de la liste de contrôle CIT 0007. Chacun fournit :</p>
<ul>
<li>la copie couleur de tous les passeports et titres de voyage détenus pendant la période d’admissibilité ;</li>
<li>le calcul de présence effective (notre ${h.a('ca-presence', 'calcul jour par jour')} aide à le préparer) ;</li>
<li>une preuve de langue entre ${C.languageAges[0]} et ${C.languageAges[1]} ans le jour de la signature (${h.a('ca-language', 'preuves admises')}) ;</li>
<li>la copie de deux pièces d’identité ;</li>
<li>le reçu de paiement.</li>
</ul>
<p>Certains dossiers en demandent davantage. Un certificat de police pour chaque pays où vous avez séjourné ${A.policeCertDaysInRow} jours d’affilée ou plus ces ${A.policeCertYears} dernières années, en ne comptant que la période postérieure à vos 18 ans. Des traductions pour les documents qui ne sont ni en français ni en anglais. Le CIT 0177 pour le service de l’État à l’étranger, l’IMM 5476 pour un représentant, et les justificatifs d’une éventuelle demande de dispense. L’outil en haut de page fait le compte pour votre cas.</p>
<h2>La date de signature, point sensible</h2>
<p>Le formulaire doit être daté du jour où vous le signez, sans avance ni retard. Cette date devient la « date de la demande » du calcul de présence, et c’est la veille qu’il faut remplir la condition. Méthode simple : terminez le calcul, assurez-vous que le seuil est atteint la veille, puis signez et datez le jour même. Sur papier, postez vite : au-delà de ${A.returnAfterDays} jours entre la date du formulaire et la réception, IRCC renvoie le dossier.</p>
<h2>En famille</h2>
<p>Un couple ou plusieurs adultes peuvent déposer ensemble en ligne, et un parent peut rattacher jusqu’à ${A.groupMinorsMax} mineurs à son compte. De ${A.minorSignAge} à 17 ans, l’enfant signe lui-même. Comptez ${h.cad(F.minor)} par enfant et ${h.cad(F.adult)} par adulte : le second outil de la page additionne les montants, et la page ${h.a('ca-minors', 'enfants mineurs')} précise le formulaire de l’enfant.</p>
<h2>Avant l’envoi</h2>
<p>Comparez les tampons de vos passeports avec les voyages déclarés : un séjour oublié saute aux yeux d’un agent. Gardez une copie complète, calcul compris, car une entrevue peut suivre l’examen, avec originaux et titres de voyage à l’appui. Les consignes complètes figurent sur la page d’IRCC ${h.src('ca_how', 'Comment présenter une demande')} et sur celle des ${h.src('ca_docs', 'formulaires et documents pour adultes')}.</p>`;
    },
  },
});
