import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-resume',
  group: 'apply',
  order: 350,
  tool: { kind: 'mini:caresume' },
  related: ['ca-renounce', 'ca-tax', 'ca-oath', 'ca-cost', 'ca-citizenship'],
  sources: ['ca_resume', 'ca_resume_apply', 'ca_fees'],
  en: {
    slug: 'resume-canadian-citizenship',
    nav: 'Resume citizenship',
    card: 'Former citizens back as permanent residents: 365 days in 2 years, one tax year, a paper form and a $530 fee.',
    title: 'Resume Canadian citizenship: 365 days in 2 years, $530 fee',
    description: 'Resuming Canadian citizenship as a former citizen: permanent residence, 365 days in Canada in 2 years, one tax year, paper form CIT 0301, fees of $530 or $100.',
    h1: 'Resume Canadian citizenship: the way back for former citizens',
    intro: 'Enter the adults and children who want to resume citizenship: IRCC’s fees are added up and compared with a first application.',
    resume: (h) => {
      const R = h.P.ca.resume, F = h.P.ca.fees;
      return `Resuming Canadian citizenship is the route for people who were citizens, lost or gave up that citizenship, and later came back as permanent residents. IRCC sets four conditions: you have been a Canadian citizen; you became a permanent resident after losing citizenship and have no unfulfilled conditions on that status; you were physically present in Canada as a permanent resident for at least ${h.num(R.presenceDays)} days during the ${R.windowYears} years before applying; and you met any obligation to file income tax for the taxation year immediately before applying. Members of the Canadian Armed Forces can count ${h.num(R.cafDays)} days of service in those ${R.windowYears} years instead of the ${h.num(R.presenceDays)} days. You cannot resume if your citizenship was revoked, if you are under a removal order or if a prohibition applies. The application is on paper only, with form CIT 0301, mailed to the Case Processing Centre in Sydney, Nova Scotia; a form signed more than three months before IRCC receives it is returned. The fee is ${h.cad(F.resumeAdult)} for an adult and ${h.cad(F.resumeMinor)} for a minor. Once approved, you are invited to take the oath, and a certificate follows.`;
    },
    faqs: (h) => [
      { q: 'Is resuming citizenship faster to qualify for than a first grant?', a: `On days, yes. Resumption asks for ${h.num(h.P.ca.resume.presenceDays)} days as a permanent resident within ${h.P.ca.resume.windowYears} years, against ${h.num(h.P.ca.presence.requiredDays)} days within ${h.P.ca.presence.windowYears} years for a first grant. The tax condition is lighter too: one taxation year instead of ${h.P.ca.presence.taxYearsRequired} of ${h.P.ca.presence.windowYears}. You still need permanent resident status first, and that condition has no shortcut.` },
      { q: 'Can someone whose citizenship was revoked apply to resume it?', a: `No. Resumption is closed to people whose citizenship was revoked. That is different from having renounced it or lost it in another way. For people revoked for fraud, the grant route is also barred for ${h.P.ca.prohibitions.fraudRevocationYears} years under the prohibitions that apply to all citizenship applications.` },
      { q: 'Do former citizens need to take the citizenship test to resume?', a: 'IRCC’s eligibility page for resumption does not mention the knowledge test or language proof, so this site does not claim either way. Read the instruction guide that comes with form CIT 0301 for your own case. If a test is asked of you, the practice tools here follow the official format.' },
    ],
    body: (h) => {
      const R = h.P.ca.resume, F = h.P.ca.fees;
      return `
<h2>Resumption against a first grant</h2>
${h.table(['', 'Resumption', 'First grant (adult)'], [['Starting point', 'former citizen, permanent resident again', 'permanent resident'], ['Physical presence', `${h.num(R.presenceDays)} days as a PR in ${R.windowYears} years`, `${h.num(h.P.ca.presence.requiredDays)} days in ${h.P.ca.presence.windowYears} years`], ['Armed Forces alternative', `${h.num(R.cafDays)} days of service in ${R.windowYears} years`, 'Crown service abroad counts in full'], ['Taxes', 'the taxation year just before applying', `${h.P.ca.presence.taxYearsRequired} of ${h.P.ca.presence.windowYears} years`], ['Channel', 'paper only', 'online for most'], ['Adult fee', h.cad(F.resumeAdult), h.cad(F.adult)], ['Minor fee', h.cad(F.resumeMinor), h.cad(F.minor)]], 'From IRCC’s resumption and eligibility pages.', ['l', 'l', 'l'])}
<p>The calculator above adds up the resumption fees for a family and shows the difference with a first adult application: ${h.cad(F.adult - F.resumeAdult)} less per adult.</p>
<h2>Who it is for</h2>
<p>People lose Canadian citizenship for different reasons, for example by renouncing it, as the ${h.a('ca-renounce', 'renunciation page')} describes. Renouncing ends the right to live in Canada, and the way back starts with immigration: permanent resident status, obtained like any other foreign national. Only then does resumption open. Revocation is the exception: a person whose citizenship was revoked cannot use this route.</p>
<h2>The ${h.num(R.presenceDays)} days</h2>
<p>The presence condition is counted in days as a permanent resident, inside the ${R.windowYears} years before you apply. Days before you regained permanent residence do not help here, unlike the half-day credit of a first grant. ${h.num(R.presenceDays)} days within ${R.windowYears} years leaves room for travel: in a window of about ${h.num(R.windowYears * 365)} days, you can spend a substantial part abroad and still qualify, provided the days after your new landing reach the threshold. For members of the Canadian Armed Forces, ${h.num(R.cafDays)} days of service in the same period replace the ${h.num(R.presenceDays)} days; if you claim that, form CIT 0177 goes with the application.</p>
<h2>Taxes and prohibitions</h2>
<p>The tax condition is limited to the taxation year immediately before you apply, and only if the Income Tax Act required a return; the ${h.a('ca-tax', 'tax filing page')} explains how that obligation works. The prohibitions are the same as for any citizenship application, and a removal order also rules out resumption.</p>
<h2>The paper application</h2>
<p>Resumption has no online channel. You fill in form CIT 0301, add CIT 0177 if you claim Armed Forces service, pay the fee and mail the package to the Case Processing Centre in Sydney, Nova Scotia. Watch the date: an application signed more than three months before IRCC receives it is returned. Sign it when everything else is ready, and mail it the same week. The full list of documents is on ${h.src('ca_resume_apply', 'IRCC’s page on applying to resume')}.</p>
<h2>After approval</h2>
<p>An approved application leads to an invitation to take the oath, then to a citizenship certificate, the same closing steps as a first grant. The ${h.a('ca-oath', 'ceremony page')} explains what to bring and what happens if you cannot attend. The conditions are set out in full on ${h.src('ca_resume', 'IRCC’s resumption eligibility page')}.</p>`;
    },
  },
  fr: {
    slug: 'reintegration-citoyennete',
    nav: 'Réintégration',
    card: 'Anciens citoyens redevenus résidents permanents : 365 jours en 2 ans, une année d’impôt, demande papier, 530 $.',
    title: 'Réintégration dans la citoyenneté : 365 jours sur 2 ans',
    description: 'Réintégrer la citoyenneté canadienne : résidence permanente, 365 jours au Canada en 2 ans, une année d’impôt, formulaire CIT 0301, frais de 530 $ ou 100 $.',
    h1: 'Réintégration : le retour à la citoyenneté canadienne',
    intro: 'Indiquez les adultes et les enfants qui demandent la réintégration : les frais d’IRCC sont additionnés et comparés à une première demande.',
    resume: (h) => {
      const R = h.P.ca.resume, F = h.P.ca.fees;
      return `La réintégration dans la citoyenneté canadienne s’adresse aux personnes qui ont été citoyennes, ont perdu ou abandonné cette citoyenneté, puis sont revenues comme résidentes permanentes. IRCC pose quatre conditions : avoir été citoyen canadien ; être devenu résident permanent après la perte de la citoyenneté, sans obligation non remplie ; avoir été effectivement présent au Canada comme résident permanent au moins ${h.num(R.presenceDays)} jours au cours des ${R.windowYears} ans précédant la demande ; avoir rempli toute obligation de déclarer ses revenus pour l’année d’imposition précédant immédiatement la demande. Les membres des Forces armées canadiennes peuvent faire valoir ${h.num(R.cafDays)} jours de service sur ces ${R.windowYears} ans au lieu des ${h.num(R.presenceDays)} jours. La réintégration est fermée à qui a vu sa citoyenneté révoquée, fait l’objet d’une mesure de renvoi ou tombe sous le coup d’une interdiction. La demande se fait uniquement sur papier, avec le formulaire CIT 0301, envoyé au Centre de traitement des demandes de Sydney, en Nouvelle-Écosse ; un formulaire signé plus de trois mois avant sa réception par IRCC est renvoyé. Les frais sont de ${h.cad(F.resumeAdult)} par adulte et de ${h.cad(F.resumeMinor)} par mineur. Une fois la demande approuvée, vous êtes invité à prêter serment, puis vient le certificat.`;
    },
    faqs: (h) => [
      { q: 'La réintégration est-elle plus accessible qu’une première attribution ?', a: `Pour les jours, oui : ${h.num(h.P.ca.resume.presenceDays)} jours comme résident permanent en ${h.P.ca.resume.windowYears} ans, contre ${h.num(h.P.ca.presence.requiredDays)} jours en ${h.P.ca.presence.windowYears} ans pour une première demande. La condition fiscale est plus légère aussi : une année d’imposition au lieu de ${h.P.ca.presence.taxYearsRequired} sur ${h.P.ca.presence.windowYears}. Il faut toutefois redevenir résident permanent d’abord, condition sans raccourci.` },
      { q: 'Une personne dont la citoyenneté a été révoquée peut-elle être réintégrée ?', a: `Non. La réintégration est fermée aux personnes dont la citoyenneté a été révoquée, ce qui diffère d’une répudiation ou d’une autre perte. En cas de révocation pour fraude, l’attribution est en outre exclue pendant ${h.P.ca.prohibitions.fraudRevocationYears} ans, au titre des interdictions communes à toutes les demandes de citoyenneté.` },
      { q: 'Faut-il repasser l’examen de citoyenneté pour être réintégré ?', a: 'La page d’admissibilité d’IRCC sur la réintégration ne mentionne ni l’examen de connaissances ni la preuve de langue ; ce site ne tranche donc pas la question. Lisez le guide qui accompagne le formulaire CIT 0301 pour votre situation. Si un examen vous est demandé, les outils d’entraînement du site suivent le format officiel.' },
    ],
    body: (h) => {
      const R = h.P.ca.resume, F = h.P.ca.fees;
      return `
<h2>Réintégration ou première attribution</h2>
${h.table(['', 'Réintégration', 'Première attribution (adulte)'], [['Point de départ', 'ancien citoyen redevenu résident permanent', 'résident permanent'], ['Présence effective', `${h.num(R.presenceDays)} jours comme RP en ${R.windowYears} ans`, `${h.num(h.P.ca.presence.requiredDays)} jours en ${h.P.ca.presence.windowYears} ans`], ['Forces armées', `${h.num(R.cafDays)} jours de service en ${R.windowYears} ans`, 'service de l’État à l’étranger compté en entier'], ['Impôts', 'l’année d’imposition précédant la demande', `${h.P.ca.presence.taxYearsRequired} années sur ${h.P.ca.presence.windowYears}`], ['Mode de dépôt', 'papier seulement', 'en ligne pour la plupart'], ['Frais adulte', h.cad(F.resumeAdult), h.cad(F.adult)], ['Frais mineur', h.cad(F.resumeMinor), h.cad(F.minor)]], 'D’après les pages d’IRCC sur la réintégration et l’admissibilité.', ['l', 'l', 'l'])}
<p>L’outil ci-dessus additionne les frais de réintégration d’une famille et indique l’écart avec une première demande adulte : ${h.cad(F.adult - F.resumeAdult)} de moins par adulte.</p>
<h2>Pour qui</h2>
<p>On perd la citoyenneté canadienne pour diverses raisons, par exemple par répudiation, comme l’explique la page ${h.a('ca-renounce', 'renoncer à la citoyenneté')}. Répudier fait perdre le droit de vivre au Canada, et le retour commence par l’immigration : la résidence permanente, obtenue comme pour tout ressortissant étranger. La réintégration ne s’ouvre qu’ensuite. La révocation fait exception : la personne dont la citoyenneté a été révoquée ne peut pas emprunter cette voie.</p>
<h2>Les ${h.num(R.presenceDays)} jours</h2>
<p>La condition de présence se compte en jours de résident permanent, dans les ${R.windowYears} ans qui précèdent la demande. Les jours antérieurs au retour à la résidence permanente n’aident pas ici, contrairement au demi-crédit d’une première attribution. ${h.num(R.presenceDays)} jours sur ${R.windowYears} ans laissent de la marge pour voyager : sur une période d’environ ${h.num(R.windowYears * 365)} jours, une bonne part peut se passer à l’étranger, tant que les jours suivant le nouvel établissement atteignent le seuil. Pour les membres des Forces armées canadiennes, ${h.num(R.cafDays)} jours de service sur la même période remplacent les ${h.num(R.presenceDays)} jours ; il faut alors joindre le formulaire CIT 0177.</p>
<h2>Impôts et interdictions</h2>
<p>La condition fiscale se limite à l’année d’imposition qui précède immédiatement la demande, et seulement si la Loi de l’impôt sur le revenu exigeait une déclaration ; la page ${h.a('ca-tax', 'déclarations d’impôts')} explique cette obligation. Les interdictions sont celles de toute demande de citoyenneté, et une mesure de renvoi exclut aussi la réintégration.</p>
<h2>La demande papier</h2>
<p>La réintégration n’a pas de voie en ligne. Vous remplissez le formulaire CIT 0301, ajoutez le CIT 0177 si vous faites valoir un service dans les Forces armées, payez les frais et postez le tout au Centre de traitement des demandes de Sydney, en Nouvelle-Écosse. Attention à la date : une demande signée plus de trois mois avant sa réception par IRCC est renvoyée. Signez quand tout est prêt et postez dans la semaine. La liste complète des pièces figure sur la ${h.src('ca_resume_apply', 'page d’IRCC sur la demande de réintégration')}.</p>
<h2>Après l’approbation</h2>
<p>Une demande approuvée mène à une invitation à prêter serment, puis au certificat de citoyenneté, comme pour une première attribution. La page ${h.a('ca-oath', 'cérémonie de citoyenneté')} précise quoi apporter et ce qui se passe en cas d’absence. Les conditions complètes figurent sur la ${h.src('ca_resume', 'page d’admissibilité d’IRCC sur la réintégration')}.</p>`;
    },
  },
});
