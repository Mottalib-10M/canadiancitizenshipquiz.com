import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-tax',
  group: 'apply',
  order: 310,
  tool: { kind: 'mini:catax' },
  related: ['ca-apply', 'ca-presence', 'ca-application', 'ca-resume', 'ca-minors'],
  sources: ['ca_eligibility', 'ca_act', 'ca_resume'],
  en: {
    slug: 'canadian-citizenship/tax-filing',
    nav: 'Tax filing',
    card: 'Three tax years out of five, when the law required a return: how the condition works and how it is checked.',
    title: 'Tax filing for citizenship: 3 of 5 years if a return was due',
    description: 'Tax filing for Canadian citizenship: returns for 3 of the 5 years before you apply, only when the Income Tax Act required them. The form, and who is exempt.',
    h1: 'Tax filing for citizenship: have you filed enough years?',
    intro: 'Enter the returns you filed in the last five years and the years in which a return was required: the condition is checked and any missing year is shown.',
    resume: (h) => {
      const C = h.P.ca.presence, R = h.P.ca.resume;
      return `The tax condition for Canadian citizenship is narrower than many applicants fear. IRCC’s wording is that you may need to file taxes in Canada for at least ${C.taxYearsRequired} years during the ${C.windowYears} years right before the date you apply. The key word is need: the Citizenship Act, at paragraph 5(1)(c)(iii), ties the condition to the years in which the Income Tax Act required you to file a return. If the law required a return in at least ${C.taxYearsRequired} of those ${C.windowYears} years, you must have filed at least ${C.taxYearsRequired}. If it required fewer, for example because you arrived recently, the condition shrinks to the years in which a return was actually due. The application form asks two questions for each year: whether you had to file, and whether you did. The years run back from the date you sign, the same date that anchors the ${h.num(C.requiredDays)}-day presence count. Children applying with a parent under section 5(2) have no tax condition listed. Former citizens who resume citizenship face a shorter rule: tax filing for the single taxation year immediately before applying, if required.`;
    },
    faqs: (h) => [
      { q: 'Do I need to file a tax return for citizenship if I had no income?', a: `Only if the Income Tax Act required a return for that year. The citizenship condition is tied to that legal obligation, not to having income as such. The form asks, year by year, whether you had to file and whether you filed. If you are unsure whether a return was due for a given year, settle that question before you sign, since it changes how many of the ${h.P.ca.presence.windowYears} years count.` },
      { q: 'Can I file late tax returns before applying for citizenship?', a: `Nothing in the citizenship condition forbids it: what matters is whether you met your filing obligation for the required years by the time you apply. If one of your ${h.P.ca.presence.taxYearsRequired} required years is missing, the safest order is to file it first and sign the citizenship application afterwards, so that the answer on the form is true on the signing date.` },
      { q: 'Which five years does IRCC look at for taxes?', a: `The ${h.P.ca.presence.windowYears} years right before the date you apply, which is the date you sign the form. They follow the same calendar as the physical presence window, so the tax years shift if you sign later. Count the years that are fully or partly inside that span and check, for each, whether a return was required and filed.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, R = h.P.ca.resume;
      return `
<h2>How the condition reads</h2>
<p>Three elements make up the rule. A number: at least ${C.taxYearsRequired} years. A period: the ${C.windowYears} years right before you apply. A trigger: the Income Tax Act must have required you to file. The calculator above combines them. You enter how many returns you filed in the period and how many years a return was required; it sets the target at ${C.taxYearsRequired}, or at the number of required years if that is lower, and tells you whether anything is missing.</p>
${h.table(['Years a return was required', 'Returns filed', 'Target', 'Condition'], [[5, 3, C.taxYearsRequired, 'met'], [5, 2, C.taxYearsRequired, 'one year missing'], [4, 4, C.taxYearsRequired, 'met'], [2, 2, 2, 'met'], [2, 1, 2, 'one year missing'], [0, 0, 0, 'met (nothing required)']], 'How the target follows the legal obligation, as applied by the calculator.', ['r', 'r', 'r', 'l'])}
<h2>Why the obligation matters more than the count</h2>
<p>The Citizenship Act does not say "file three returns". It says, in paragraph 5(1)(c)(iii) of the ${h.src('ca_act', 'Citizenship Act')}, that the applicant must have met any obligation to file a return under the Income Tax Act for at least ${C.taxYearsRequired} of the years in the period. That is why the form asks two questions per year, not one. A year in which no return was required is not a failure, and a year in which a return was required but not filed is not neutral. Answer each year with care, from your own records.</p>
<h2>Recent arrivals</h2>
<p>Someone who became a permanent resident fairly recently, and whose earlier time in Canada was short, may have fewer than ${C.taxYearsRequired} years in which a Canadian return was due. In that case the target falls to those years. The reverse is also true: a person who worked here on permits for years before permanent residence may have had returns to file for those years too, and they belong to the count if they sit inside the ${C.windowYears}-year period. Your days and your tax years are separate conditions, but they share the same period, which the ${h.a('ca-presence', 'days calculator')} displays.</p>
<h2>Children and former citizens</h2>
<p>A minor who applies with a parent, or whose parent is already a citizen, has no tax condition listed on IRCC’s ${h.src('ca_eligibility', 'eligibility page')}. A minor applying under section 5(1), without such a parent, files taxes if needed, like an adult; the ${h.a('ca-minors', 'page on minors')} explains the two routes. Former citizens who ${h.a('ca-resume', 'resume citizenship')} meet a lighter version: the filing obligation for the one taxation year immediately before they apply, as described on ${h.src('ca_resume', 'IRCC’s resumption page')}.</p>
<h2>Before you sign</h2>
<p>Gather your notices or your own filing records for each of the ${C.windowYears} years, note which ones required a return, and check the total against the target. If one required year is unfiled, deal with it first; signing the citizenship application with a known gap only creates a problem you could have avoided. The ${h.a('ca-apply', 'eligibility checklist')} covers the other conditions, and the ${h.a('ca-application', 'application page')} explains the importance of the signing date that fixes the period.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/declarations-impots',
    nav: 'Déclarations d’impôts',
    card: 'Trois années d’impôt sur cinq, quand la loi exigeait une déclaration : la condition et sa vérification.',
    title: 'Impôts et citoyenneté : 3 déclarations sur 5 si exigées',
    description: 'Impôts et citoyenneté canadienne : déclarations pour 3 des 5 années avant la demande, si la loi les exigeait. Ce que demande le formulaire et qui est exempté.',
    h1: 'Impôts et citoyenneté : avez-vous produit assez de déclarations ?',
    intro: 'Indiquez les déclarations produites ces cinq dernières années et les années où une déclaration était exigée : la condition est vérifiée et les années manquantes s’affichent.',
    resume: (h) => {
      const C = h.P.ca.presence, R = h.P.ca.resume;
      return `La condition fiscale de la citoyenneté canadienne est plus étroite qu’on ne le croit souvent. IRCC indique que vous pourriez devoir produire des déclarations de revenus au Canada pour au moins ${C.taxYearsRequired} années au cours des ${C.windowYears} années précédant immédiatement la date de votre demande. Tout tient dans le conditionnel : la Loi sur la citoyenneté, à l’alinéa 5(1)c)(iii), rattache la condition aux années où la Loi de l’impôt sur le revenu vous obligeait à produire une déclaration. Si la loi en exigeait au moins ${C.taxYearsRequired} sur ces ${C.windowYears} années, il faut en avoir produit au moins ${C.taxYearsRequired}. Si elle en exigeait moins, par exemple après une arrivée récente, la condition se réduit aux années où une déclaration était due. Le formulaire pose deux questions pour chaque année : deviez-vous produire une déclaration, et l’avez-vous fait ? Les années se comptent à rebours depuis la date de signature, celle qui sert aussi au calcul des ${h.num(C.requiredDays)} jours de présence. Pour l’enfant qui demande avec un parent au titre du paragraphe 5(2), aucune condition fiscale n’est mentionnée. L’ancien citoyen qui demande sa réintégration a une règle plus courte : l’année d’imposition qui précède immédiatement la demande, si une déclaration était exigée.`;
    },
    faqs: (h) => [
      { q: 'Faut-il produire une déclaration pour la citoyenneté sans aucun revenu ?', a: `Seulement si la Loi de l’impôt sur le revenu exigeait une déclaration pour l’année en cause. La condition de citoyenneté suit cette obligation légale, non le simple fait d’avoir des revenus. Le formulaire demande, année par année, si vous deviez produire et si vous l’avez fait. En cas de doute, tranchez la question avant de signer : elle change le nombre d’années exigées sur ${h.P.ca.presence.windowYears}.` },
      { q: 'Peut-on produire des déclarations en retard avant de demander la citoyenneté ?', a: `La condition de citoyenneté ne l’interdit pas : ce qui compte, c’est d’avoir rempli l’obligation pour les années exigées au moment de la demande. S’il manque l’une de vos ${h.P.ca.presence.taxYearsRequired} années, l’ordre prudent consiste à produire d’abord la déclaration, puis à signer la demande, pour que la réponse inscrite soit vraie à la date de signature.` },
      { q: 'Quelles cinq années IRCC examine-t-il pour les impôts ?', a: `Les ${h.P.ca.presence.windowYears} années qui précèdent immédiatement la date de la demande, c’est-à-dire la date de signature. Elles suivent le même calendrier que la période de présence effective : signer plus tard les décale. Comptez les années comprises en tout ou en partie dans cet intervalle et vérifiez, pour chacune, si une déclaration était exigée et produite.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence, R = h.P.ca.resume;
      return `
<h2>Ce que dit la règle</h2>
<p>Trois éléments la composent. Un nombre : au moins ${C.taxYearsRequired} années. Une période : les ${C.windowYears} années qui précèdent la demande. Un déclencheur : l’obligation de produire une déclaration selon la Loi de l’impôt sur le revenu. L’outil ci-dessus les combine. Vous saisissez le nombre de déclarations produites et le nombre d’années où une déclaration était exigée ; il fixe l’objectif à ${C.taxYearsRequired}, ou au nombre d’années exigées s’il est inférieur, et indique ce qui manque.</p>
${h.table(['Années où une déclaration était exigée', 'Déclarations produites', 'Objectif', 'Condition'], [[5, 3, C.taxYearsRequired, 'remplie'], [5, 2, C.taxYearsRequired, 'une année manque'], [4, 4, C.taxYearsRequired, 'remplie'], [2, 2, 2, 'remplie'], [2, 1, 2, 'une année manque'], [0, 0, 0, 'remplie (rien d’exigé)']], 'L’objectif suit l’obligation légale, tel que l’applique l’outil.', ['r', 'r', 'r', 'l'])}
<h2>L’obligation compte plus que le nombre</h2>
<p>La ${h.src('ca_act', 'Loi sur la citoyenneté')} ne dit pas « produire trois déclarations ». Son alinéa 5(1)c)(iii) exige d’avoir rempli, pour au moins ${C.taxYearsRequired} des années de la période, toute obligation de produire une déclaration prévue par la Loi de l’impôt sur le revenu. D’où les deux questions par année du formulaire. Une année sans obligation n’est pas un manquement ; une année où la déclaration était due mais n’a pas été produite n’est pas neutre. Répondez avec soin, d’après vos propres relevés.</p>
<h2>Les arrivées récentes</h2>
<p>La personne devenue résidente permanente il y a peu, après un court séjour antérieur, peut compter moins de ${C.taxYearsRequired} années où une déclaration canadienne était due ; l’objectif descend alors à ces années. L’inverse existe aussi : qui a travaillé ici avec des permis pendant des années avant la résidence permanente a pu devoir produire des déclarations pour ces années-là, et elles entrent dans le compte si elles se situent dans la période de ${C.windowYears} ans. Jours de présence et années d’impôt sont deux conditions distinctes qui partagent la même période, affichée par le ${h.a('ca-presence', 'calcul des jours')}.</p>
<h2>Enfants et anciens citoyens</h2>
<p>Le mineur qui demande avec un parent, ou dont un parent est déjà citoyen, n’a aucune condition fiscale mentionnée sur la ${h.src('ca_eligibility', 'page d’admissibilité d’IRCC')}. Le mineur qui demande au titre du paragraphe 5(1), sans un tel parent, produit ses déclarations s’il le doit, comme un adulte ; la page ${h.a('ca-minors', 'enfants mineurs')} décrit les deux voies. L’ancien citoyen qui demande sa ${h.a('ca-resume', 'réintégration')} répond à une version allégée : l’obligation pour la seule année d’imposition qui précède immédiatement la demande, selon la ${h.src('ca_resume', 'page d’IRCC sur la réintégration')}.</p>
<h2>Avant de signer</h2>
<p>Réunissez vos avis de cotisation ou vos propres relevés pour chacune des ${C.windowYears} années, notez celles qui exigeaient une déclaration et comparez le total à l’objectif. S’il manque une année exigée, réglez-la d’abord : signer la demande de citoyenneté avec un manque connu crée un problème évitable. La page ${h.a('ca-apply', 'conditions pour demander')} couvre le reste, et la page ${h.a('ca-application', 'demande de citoyenneté')} explique l’importance de la date de signature, qui fixe la période.</p>`;
    },
  },
});
