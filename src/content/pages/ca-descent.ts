import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-descent',
  group: 'apply',
  order: 300,
  tool: { kind: 'mini:cadescent' },
  related: ['ca-certificate', 'ca-renounce', 'ca-minors', 'ca-citizenship', 'ca-cost'],
  sources: ['ca_c3', 'ca_rules2025', 'ca_proof_elig', 'ca_proof_apply'],
  en: {
    slug: 'canadian-citizenship/by-descent',
    nav: 'Citizenship by descent',
    card: 'Born abroad to a Canadian parent: what Bill C-3 changed on December 15, 2025, and how to confirm your status.',
    title: 'Canadian citizenship by descent: Bill C-3 rules since 2025',
    description: 'Citizenship by descent after Bill C-3: who is a citizen when born abroad to a Canadian, the 1,095-day rule for parents born abroad, and the certificate.',
    h1: 'Citizenship by descent: are you or your child Canadian?',
    intro: 'Say when the child was born or adopted, where the Canadian parent was born and the parent’s days in Canada before the birth: an indicative answer appears.',
    resume: (h) => {
      const K = h.P.ca.c3, F = h.P.ca.fees;
      return `Canadian citizenship by descent follows new rules since Bill C-3 came into force on ${h.date(K.inForce)}, after royal assent on ${h.date(K.royalAssent)}. For people born outside Canada to a Canadian parent before that date, IRCC’s answer is that in most cases they are now automatically Canadian citizens; the same applies to children of people who became citizens through these changes. Children adopted abroad by a Canadian before that date use the direct grant route instead. For a child born or adopted abroad on or after ${h.date(K.inForce)}, the question depends on the Canadian parent. If that parent was born in Canada or naturalized, the new day test does not concern them. If the parent was also born or adopted abroad, the parent must have spent at least ${h.num(K.parentDays)} days, added up over any period, physically present in Canada before the child’s birth or adoption. None of this is decided by a calculator: IRCC states that you must apply for a citizenship certificate, at ${h.cad(F.certificate)}, to find out for sure. People who became citizens automatically and do not want to be can use a simplified renunciation.`;
    },
    faqs: (h) => [
      { q: 'Why did Canada change the rules on citizenship by descent?', a: `The change follows a decision of the Ontario Superior Court of Justice dated ${h.date('2023-12-19')} on the earlier limits to citizenship by descent. Parliament then passed Bill C-3, introduced on ${h.date('2025-06-05')}, which received royal assent on ${h.date(h.P.ca.c3.royalAssent)} and came into force on ${h.date(h.P.ca.c3.inForce)}.` },
      { q: 'Do the 1,095 days of a parent born abroad have to be within five years?', a: `No. For a child born or adopted abroad on or after ${h.date(h.P.ca.c3.inForce)}, IRCC asks that the Canadian parent born or adopted abroad has ${h.num(h.P.ca.c3.parentDays)} days of cumulative physical presence in Canada before the birth or adoption. Cumulative means the days are added up over the parent’s whole life before that date, not within a fixed window.` },
      { q: 'I became Canadian automatically through Bill C-3 but do not want it: what can I do?', a: 'IRCC offers a simplified way to renounce for people who became citizens automatically through changes to the Citizenship Act in 2009, 2015 or 2025. It asks only that you hold another citizenship and can understand what renouncing means; there is no age or residence condition and no fee. The renunciation page gives the forms.' },
    ],
    body: (h) => {
      const K = h.P.ca.c3, F = h.P.ca.fees;
      return `
<h2>The three situations after Bill C-3</h2>
${h.table(['Child born or adopted abroad', 'Canadian parent', 'Indicative status'], [[`before ${h.date(K.inForce)}, born`, 'any Canadian parent', 'Canadian in most cases, automatically'], [`before ${h.date(K.inForce)}, adopted`, 'Canadian parent', 'direct grant route'], [`on or after ${h.date(K.inForce)}`, 'born in Canada or naturalized', 'parent day test does not apply'], [`on or after ${h.date(K.inForce)}`, 'born or adopted abroad', `citizen if the parent had ${h.num(K.parentDays)} days in Canada before the birth or adoption`]], 'Summary of IRCC’s explanation of the 2025 rules; only a certificate confirms a case.', ['l', 'l', 'l'])}
<p>The calculator above follows this table. It is deliberately labelled indicative: family histories have many branches, and IRCC itself says “in most cases” for births before the change. The decision belongs to IRCC, on an application for a certificate.</p>
<h2>The ${h.num(K.parentDays)}-day test for a parent born abroad</h2>
<p>For births and adoptions abroad from ${h.date(K.inForce)}, the new condition looks at the parent, not at the child. A Canadian parent who was also born or adopted outside Canada passes citizenship to the child only if that parent spent ${h.num(K.parentDays)} days physically present in Canada before the birth or adoption. The days are cumulative: childhood years in Canada, studies, work periods all add up, whenever they happened. A parent who has this many days can show them with form CIT 0555, the Canadian parent’s physical presence form, which goes with the certificate application.</p>
<p>A practical example: a mother born in France to a Canadian father lived in Montréal for two years of university and later worked eighteen months in Calgary. If those stays add up to at least ${h.num(K.parentDays)} days before her child’s birth abroad in 2026, the child is a citizen by descent. If they fall short, the child is not a citizen by descent. The calculator shows how many days are missing.</p>
<h2>Confirming citizenship: the certificate</h2>
<p>IRCC’s guidance is identical for every case: to know for sure, apply for a citizenship certificate. It costs ${h.cad(F.certificate)} per person and is the document that proves Canadian citizenship; it is not a travel document. The application uses form CIT 0001 with checklist CIT 0014. Some applicants can apply online, with ${h.P.ca.proof.onlineDays} days to submit once they start; others must apply on paper, for example a guardian applying for a minor or a family applying for four or more children. The ${h.a('ca-certificate', 'certificate page')} covers the forms, the urgent cases and the record search.</p>
<h2>Children adopted abroad</h2>
<p>For a child adopted outside Canada by a Canadian before ${h.date(K.inForce)}, IRCC points to the direct grant route rather than automatic citizenship. For adoptions on or after that date, the same parent test applies as for births: a parent who was born or adopted abroad needs the ${h.num(K.parentDays)} days before the adoption. See ${h.src('ca_rules2025', 'IRCC’s page on the citizenship rules since 2025')} for the details of each situation.</p>
<h2>If you would rather not be Canadian</h2>
<p>Automatic citizenship can come as a surprise, for instance to adults who have never lived in Canada and whose other country limits dual nationality. IRCC provides a simplified renunciation for people who became citizens through the 2009, 2015 or 2025 changes: no age or residence condition and no fee, only another citizenship and the capacity to understand the decision. The ${h.a('ca-renounce', 'renunciation page')} sets out both procedures. The announcement of the law is on ${h.src('ca_c3', 'IRCC’s news release on Bill C-3')}.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/par-filiation',
    nav: 'Citoyenneté par filiation',
    card: 'Né à l’étranger d’un parent canadien : ce que le projet C-3 a changé le 15 décembre 2025, et comment le confirmer.',
    title: 'Citoyenneté canadienne par filiation : règles du projet C-3',
    description: 'Citoyenneté par filiation après le projet C-3 : qui est citoyen quand il est né à l’étranger d’un Canadien, la règle des 1 095 jours du parent, le certificat.',
    h1: 'Citoyenneté par filiation : vous ou votre enfant êtes-vous canadiens ?',
    intro: 'Indiquez la date de naissance ou d’adoption, le lieu de naissance du parent canadien et ses jours au Canada avant la naissance : une réponse indicative s’affiche.',
    resume: (h) => {
      const K = h.P.ca.c3, F = h.P.ca.fees;
      return `La citoyenneté canadienne par filiation obéit à de nouvelles règles depuis l’entrée en vigueur du projet de loi C-3, le ${h.date(K.inForce)}, après la sanction royale du ${h.date(K.royalAssent)}. Pour les personnes nées hors du Canada d’un parent canadien avant cette date, IRCC répond que, dans la plupart des cas, elles sont désormais citoyennes d’office ; il en va de même des enfants des personnes devenues citoyennes grâce à ces changements. Les enfants adoptés à l’étranger par un Canadien avant cette date passent plutôt par l’attribution directe. Pour un enfant né ou adopté à l’étranger à partir du ${h.date(K.inForce)}, tout dépend du parent canadien. S’il est né au Canada ou naturalisé, la nouvelle règle des jours ne le vise pas. S’il est lui-même né ou adopté à l’étranger, il doit avoir passé au moins ${h.num(K.parentDays)} jours au Canada, cumulés sur n’importe quelle période, avant la naissance ou l’adoption de l’enfant. Aucun outil ne tranche à la place d’IRCC, qui l’écrit : il faut demander un certificat de citoyenneté, à ${h.cad(F.certificate)}, pour en avoir le cœur net. Les personnes devenues citoyennes d’office sans le souhaiter disposent d’une répudiation simplifiée.`;
    },
    faqs: (h) => [
      { q: 'Pourquoi les règles de citoyenneté par filiation ont-elles changé ?', a: `Le changement fait suite à une décision de la Cour supérieure de justice de l’Ontario du ${h.date('2023-12-19')} sur les anciennes limites de la citoyenneté par filiation. Le Parlement a ensuite adopté le projet de loi C-3, déposé le ${h.date('2025-06-05')}, sanctionné le ${h.date(h.P.ca.c3.royalAssent)} et entré en vigueur le ${h.date(h.P.ca.c3.inForce)}.` },
      { q: 'Les 1 095 jours du parent né à l’étranger doivent-ils tenir en cinq ans ?', a: `Non. Pour un enfant né ou adopté à l’étranger à partir du ${h.date(h.P.ca.c3.inForce)}, IRCC demande que le parent canadien né ou adopté à l’étranger cumule ${h.num(h.P.ca.c3.parentDays)} jours de présence effective au Canada avant la naissance ou l’adoption. Cumulés veut dire additionnés sur toute la vie du parent avant cette date, sans période fixe.` },
      { q: 'Je suis devenu canadien d’office par le projet C-3 sans le vouloir : que faire ?', a: 'IRCC prévoit une répudiation simplifiée pour les personnes devenues citoyennes d’office par les modifications de la Loi sur la citoyenneté de 2009, 2015 ou 2025. Il suffit d’avoir une autre citoyenneté et d’être en mesure de comprendre la portée de la démarche ; aucune condition d’âge ni de résidence, aucun frais. La page sur la répudiation donne les formulaires.' },
    ],
    body: (h) => {
      const K = h.P.ca.c3, F = h.P.ca.fees;
      return `
<h2>Trois situations depuis le projet de loi C-3</h2>
${h.table(['Enfant né ou adopté à l’étranger', 'Parent canadien', 'Statut indicatif'], [[`avant le ${h.date(K.inForce)}, né`, 'tout parent canadien', 'canadien d’office dans la plupart des cas'], [`avant le ${h.date(K.inForce)}, adopté`, 'parent canadien', 'attribution directe'], [`à partir du ${h.date(K.inForce)}`, 'né au Canada ou naturalisé', 'règle des jours non applicable'], [`à partir du ${h.date(K.inForce)}`, 'né ou adopté à l’étranger', `citoyen si le parent a ${h.num(K.parentDays)} jours au Canada avant la naissance ou l’adoption`]], 'Synthèse des explications d’IRCC sur les règles de 2025 ; seul un certificat confirme un cas.', ['l', 'l', 'l'])}
<p>L’outil ci-dessus reprend ce tableau. Il se dit indicatif à dessein : les histoires familiales ont bien des ramifications, et IRCC parle lui-même de « la plupart des cas » pour les naissances antérieures. La décision revient à IRCC, sur demande de certificat.</p>
<h2>La règle des ${h.num(K.parentDays)} jours du parent né à l’étranger</h2>
<p>Pour les naissances et adoptions à l’étranger depuis le ${h.date(K.inForce)}, la nouvelle condition porte sur le parent, pas sur l’enfant. Le parent canadien lui-même né ou adopté hors du Canada ne transmet la citoyenneté que s’il a été présent au Canada ${h.num(K.parentDays)} jours avant la naissance ou l’adoption. Ces jours se cumulent : enfance au Canada, études, périodes de travail, peu importe quand. Le parent les établit avec le formulaire CIT 0555, sur la présence effective du parent canadien, joint à la demande de certificat.</p>
<p>Un exemple : une mère née en Belgique d’un père canadien a fait deux ans d’université à Québec, puis travaillé dix-huit mois à Ottawa. Si ces séjours atteignent ${h.num(K.parentDays)} jours avant la naissance de son enfant à l’étranger en 2026, l’enfant est citoyen par filiation. Sinon, il ne l’est pas. L’outil indique les jours manquants.</p>
<h2>Confirmer la citoyenneté : le certificat</h2>
<p>La consigne d’IRCC est la même dans tous les cas : pour être fixé, demandez un certificat de citoyenneté. Il coûte ${h.cad(F.certificate)} par personne et prouve la citoyenneté canadienne ; ce n’est pas un titre de voyage. La demande se fait avec le formulaire CIT 0001 et la liste de contrôle CIT 0014. Certains peuvent la remplir en ligne, avec ${h.P.ca.proof.onlineDays} jours pour l’envoyer une fois commencée ; d’autres doivent passer par le papier, par exemple un tuteur qui demande pour un mineur ou une famille qui demande pour quatre enfants ou plus. La page ${h.a('ca-certificate', 'certificat de citoyenneté')} détaille formulaires, cas urgents et recherche de dossier.</p>
<h2>Les enfants adoptés à l’étranger</h2>
<p>Pour l’enfant adopté hors du Canada par un Canadien avant le ${h.date(K.inForce)}, IRCC renvoie à l’attribution directe plutôt qu’à la citoyenneté d’office. Pour les adoptions à partir de cette date, la même règle parentale s’applique qu’aux naissances : le parent né ou adopté à l’étranger doit avoir ses ${h.num(K.parentDays)} jours avant l’adoption. La page d’IRCC sur les ${h.src('ca_rules2025', 'règles de citoyenneté depuis 2025')} précise chaque situation.</p>
<h2>Si vous préférez ne pas être canadien</h2>
<p>La citoyenneté d’office peut surprendre, par exemple des adultes qui n’ont jamais vécu au Canada et dont l’autre pays encadre la double nationalité. IRCC prévoit une répudiation simplifiée pour les personnes devenues citoyennes par les changements de 2009, 2015 ou 2025 : ni âge ni résidence exigés, aucun frais, seulement une autre citoyenneté et la capacité de comprendre la décision. La page ${h.a('ca-renounce', 'renoncer à la citoyenneté')} présente les deux procédures. L’annonce de la loi figure dans le ${h.src('ca_c3', 'communiqué d’IRCC sur le projet de loi C-3')}.</p>`;
    },
  },
});
