import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const schema = (h: Helpers) => {
  const fr = h.lang === 'fr', C = h.P.ca.presence;
  const t = fr
    ? { aria: `Schéma : la période de ${C.windowYears} ans avant la signature, les jours avant la résidence permanente comptés pour moitié jusqu’à ${C.preprMaxCredit}, les jours comme résident permanent comptés en entier, les jours entiers à l’étranger retirés, le jour de la signature exclu.`, win: `Période comptée : les ${C.windowYears} ans qui précèdent la signature`, pre: 'Avant la RP : ½ jour', preSub: `crédit plafonné à ${h.num(C.preprMaxCredit)} jours`, pr: 'Résident permanent : 1 jour = 1 jour', prSub: `au moins ${h.num(C.minPrDays)} jours exigés`, trip: 'Voyage', tripSub: 'jours entiers retirés', sign: 'Signature', signSub: 'jour non compté', total: `Total exigé : ${h.num(C.requiredDays)} jours`, cap: `Comment IRCC compte les ${h.num(C.requiredDays)} jours : demi-crédit avant la résidence permanente, crédit entier ensuite, seules les journées passées entièrement hors du Canada sont retirées.` }
    : { aria: `Diagram: the ${C.windowYears}-year window before signing, days before permanent residence counted as half up to ${C.preprMaxCredit}, days as a permanent resident counted in full, whole days abroad removed, the signing day excluded.`, win: `Window counted: the ${C.windowYears} years before you sign`, pre: 'Before PR: ½ day', preSub: `credit capped at ${h.num(C.preprMaxCredit)} days`, pr: 'Permanent resident: 1 day = 1 day', prSub: `at least ${h.num(C.minPrDays)} days required`, trip: 'Trip', tripSub: 'whole days removed', sign: 'Signing', signSub: 'day not counted', total: `Total required: ${h.num(C.requiredDays)} days`, cap: `How IRCC counts the ${h.num(C.requiredDays)} days: half credit before permanent residence, full credit after it, and only days spent entirely outside Canada are removed.` };
  return `<figure class="not-prose my-8 rounded-2xl border border-navy-200 bg-white p-4 sm:p-6">
<svg viewBox="0 0 800 230" class="h-auto w-full" role="img" aria-label="${t.aria}" font-family="inherit">
<defs><pattern id="pp-half" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" style="fill:var(--color-accent-50)"/><line x1="0" y1="0" x2="0" y2="8" style="stroke:var(--color-accent-300)" stroke-width="4"/></pattern></defs>
<text x="20" y="28" font-size="15" font-weight="700" style="fill:var(--color-navy-900)">${t.win}</text>
<line x1="20" y1="44" x2="740" y2="44" style="stroke:var(--color-navy-300)" stroke-width="2"/>
<line x1="20" y1="38" x2="20" y2="50" style="stroke:var(--color-navy-300)" stroke-width="2"/><line x1="740" y1="38" x2="740" y2="50" style="stroke:var(--color-navy-300)" stroke-width="2"/>
<rect x="20" y="70" width="250" height="44" rx="6" style="fill:url(#pp-half);stroke:var(--color-accent-300)"/>
<rect x="274" y="70" width="230" height="44" rx="6" style="fill:var(--color-accent-700)"/>
<rect x="508" y="70" width="40" height="44" rx="6" style="fill:var(--color-white,#fff);stroke:var(--color-navy-400)" stroke-dasharray="4 3"/>
<rect x="552" y="70" width="188" height="44" rx="6" style="fill:var(--color-accent-700)"/>
<line x1="752" y1="60" x2="752" y2="124" style="stroke:var(--color-navy-900)" stroke-width="3"/>
<text x="20" y="140" font-size="14" font-weight="600" style="fill:var(--color-navy-900)">${t.pre}</text><text x="20" y="160" font-size="13" style="fill:var(--color-navy-600)">${t.preSub}</text>
<text x="274" y="140" font-size="14" font-weight="600" style="fill:var(--color-navy-900)">${t.pr}</text><text x="274" y="160" font-size="13" style="fill:var(--color-navy-600)">${t.prSub}</text>
<text x="528" y="182" font-size="14" font-weight="600" text-anchor="middle" style="fill:var(--color-navy-900)">${t.trip}</text><text x="528" y="200" font-size="13" text-anchor="middle" style="fill:var(--color-navy-600)">${t.tripSub}</text>
<line x1="528" y1="118" x2="528" y2="166" style="stroke:var(--color-navy-400)" stroke-width="1.5"/>
<text x="780" y="140" font-size="14" font-weight="600" text-anchor="end" style="fill:var(--color-navy-900)">${t.sign}</text><text x="780" y="160" font-size="13" text-anchor="end" style="fill:var(--color-navy-600)">${t.signSub}</text>
<text x="20" y="222" font-size="14" font-weight="700" style="fill:var(--color-accent-800)">${t.total}</text>
</svg>
<figcaption class="mt-3 text-sm text-navy-600">${t.cap}</figcaption>
</figure>`;
};


export default definePage({
  id: 'ca-presence',
  group: 'apply',
  order: 230,
  tool: { kind: 'date' },
  mini: { kind: 'mini:cadays' },
  related: ['ca-pr', 'ca-apply', 'ca-application', 'ca-spouse', 'ca-citizenship'],
  sources: ['ca_bulletin', 'ca_rescalc', 'ca_calc_page', 'ca_eligibility'],
  en: {
    slug: 'canadian-citizenship/days-calculator',
    nav: 'Days calculator',
    card: 'Your landing date and every trip, past or planned: the first day the 1,095 days are reached, counted day by day.',
    title: 'Citizenship days calculator: your 1,095th day, trip by trip',
    description: 'Find the first date you meet the 1,095 days of physical presence for Canadian citizenship: trips counted day by day, half credit before PR, window shown.',
    h1: 'Citizenship days calculator: when do you reach 1,095 days?',
    intro: 'Enter the day you became a permanent resident, any earlier stay in Canada and each trip abroad, taken or planned: the first date that works appears with the full count.',
    resume: (h) => {
      const C = h.P.ca.presence;
      return `The physical presence rule for Canadian citizenship asks for ${h.num(C.requiredDays)} days in Canada within the ${C.windowYears} years before the day you sign your application, and that signing day itself is left out of the count: the window closes the day before. Inside it, a day as a permanent resident is worth one day and a day spent here earlier as a temporary resident or protected person is worth ${h.num(C.preprFactor, 1)}, up to ${h.num(C.preprMaxCredit)} days of credit, with at least ${h.num(C.minPrDays)} days as a permanent resident in any case. An absence is only a day spent entirely outside Canada, so the day you leave and the day you return both count as present. February 29 is counted like any other day. The calculator above applies these rules to your own dates and searches forward, one day at a time, for the first signing date that reaches the total, including trips you have only planned. It is a planning tool: the count IRCC receives comes from its own calculator, inside your online account.`;
    },
    faqs: (h) => [
      { q: 'Does a same-day trip to the United States count as an absence?', a: 'No. IRCC calculates absences only for days on which you spent no time at all in Canada. If you cross in the morning and return the same evening, or leave late one day and return the next, there is no whole day outside the country, so nothing is deducted. Enter such trips in the calculator anyway: it will show zero days for them.' },
      { q: 'Why does the calculator stop the window the day before?', a: `Because IRCC’s instructions say the day the applicant applies is not counted. The ${h.P.ca.presence.windowYears}-year window therefore runs up to the day before you sign, and you must already have the ${h.num(h.P.ca.presence.requiredDays)} days on that day. Signing on the very day the total is first reached in your own head is one day too early.` },
      { q: 'Can I add trips I have not taken yet?', a: 'Yes, and it is the main reason to use this calculator rather than a simple total. Add the holiday you are planning with its departure and return dates: the first possible date moves accordingly. The official IRCC calculator is meant for the days you have already lived, so it cannot tell you whether a trip next summer pushes your date back.' },
      { q: 'How should a protected person enter the earlier stay?', a: 'As the start of the earlier stay, enter the date your protected person status was granted, not the date you arrived or made your claim. IRCC counts time as a protected person only from that approval until the day before you became a permanent resident, at the same half-day value as other temporary stays.' },
    ],
    body: (h) => {
      const C = h.P.ca.presence;
      return `
<h2>What the calculator shows</h2>
<p>You give three kinds of dates: the day you landed as a permanent resident, the start of any earlier legal stay in Canada (work or study permit, visitor, protected person), and the departure and return of each trip abroad. You can add as many trips as you need, including future ones. The result panel gives the first date on which you can sign, how many days away it is, and the breakdown of the ${C.windowYears}-year window on that date: days present as a permanent resident, credit for the earlier stay, whole days spent abroad, the credited total against ${h.num(C.requiredDays)} and the exact start and end of the window. When the total sits within five days of the threshold, a warning asks you to keep a margin, because a single wrong stamp could change the answer. The link in your address bar keeps your dates, so you can come back to them or share them with a partner.</p>
${schema(h)}
<h2>A worked example</h2>
<p>Take a newcomer who became a permanent resident on ${h.date('2021-06-01')}, arrived that day and never left. Each day from ${h.date('2021-06-01')} counts in full. The ${h.num(C.requiredDays)}th day falls on ${h.date('2024-05-30')}, so the first date she can sign is ${h.date('2024-05-31')}: the window then runs from ${h.date('2019-05-31')} to ${h.date('2024-05-30')}, and the signing day stays outside it. Note that ${h.date('2024-02-29')} is in the window and counts.</p>
<p>Now add one trip: she flies out on ${h.date('2023-08-04')} and comes back on ${h.date('2023-08-25')}. The departure and return days are days in Canada; only the ${h.num(20)} days in between are absences. Her first signing date moves by exactly those ${h.num(20)} days, to ${h.date('2024-06-20')}.</p>
<p>Last, suppose she had held a work permit from ${h.date('2020-11-16')} until she became a permanent resident. That gives ${h.num(197)} days before permanent residence, worth ${h.num(98.5, 1)} days of credit. With the trip, the first signing date comes forward to ${h.date('2024-03-14')}, where the window holds ${h.num(997)} days as a permanent resident plus that credit, ${h.num(1095.5, 1)} in total. The credit can never exceed ${h.num(C.preprMaxCredit)} days, so nobody can apply with fewer than ${h.num(C.minPrDays)} days as a permanent resident.</p>
${h.table(['Scenario', 'Whole days abroad', 'Credit before PR', 'First signing date'], [['No trip, no earlier stay', '0', '0', h.date('2024-05-31')], ['One trip of three weeks', h.num(20), '0', h.date('2024-06-20')], ['Same trip plus a work permit', h.num(20), h.num(98.5, 1), h.date('2024-03-14')]], 'Example only; your own dates give your own result.', ['l', 'r', 'r', 'r'])}
<h2>Why the signing day is left out</h2>
<p>IRCC’s ${h.src('ca_bulletin', 'program delivery instructions on physical presence')} state that the day of application is not counted and that the requirement must be met on the day before you sign. They also say absences are counted only for days with no time at all in Canada and that February 29 counts. These rules apply to applications received from ${h.date('2017-10-11')} onward. The date of signature on your form is the application date of the calculation, which is why the ${h.a('ca-application', 'application page')} insists on signing and dating the form the same day.</p>
<h2>Gathering your travel dates</h2>
<p>Work from documents, not memory. Lay out every passport and travel document you held during the window, since IRCC asks for colour copies of all of them; then use the entry and exit stamps, flight confirmations in your email and leave records from your employer to rebuild each trip. Write each trip as one departure and one return. If two trips overlap, the calculator says so and asks you to merge them. When a date is uncertain, choose the one that is less favourable to you and check whether your result still holds.</p>
<h2>This calculator and IRCC’s</h2>
<p>IRCC offers an ${h.src('ca_rescalc', 'official physical presence calculator')}, and online applicants must use the ${h.src('ca_calc_page', 'calculator inside their IRCC account')}; that result is the one that goes into your file. Our tool does not replace it. It answers a different question, the first date that works, and it handles planned trips. It does not handle the special cases: days in prison, on parole or on probation (which do not count), and days abroad as a Crown servant or a Crown servant’s family member (which count in full on a paper application). If one applies to you, use the official calculator. The ${h.a('ca-pr', 'page on permanent resident days')} goes deeper into the ${h.num(C.minPrDays)}-day floor, and the second calculator below the summary gives a quick total from day counts you already know.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/calcul-des-jours',
    nav: 'Calcul des jours',
    card: 'Votre date d’établissement et chaque voyage, passé ou prévu : le premier jour où les 1 095 jours sont atteints.',
    title: 'Jours de présence pour la citoyenneté : votre 1 095e jour',
    description: 'Trouvez la première date où vous atteignez les 1 095 jours de présence pour la citoyenneté canadienne : voyages comptés au jour près, demi-crédit avant la RP.',
    h1: 'Calcul des jours de présence : quand atteignez-vous 1 095 jours ?',
    intro: 'Saisissez le jour où vous êtes devenu résident permanent, l’éventuel séjour qui a précédé et chacun de vos voyages, passés ou à venir : la première date possible s’affiche avec le décompte complet.',
    resume: (h) => {
      const C = h.P.ca.presence;
      return `La règle de présence effective exige ${h.num(C.requiredDays)} jours au Canada pendant les ${C.windowYears} ans qui précèdent la signature de la demande de citoyenneté, et le jour même de la signature est exclu du calcul : la période s’arrête la veille. À l’intérieur de cette période, un jour comme résident permanent vaut un jour, tandis qu’un jour passé plus tôt au pays comme résident temporaire ou personne protégée vaut ${h.num(C.preprFactor, 1)} jour, jusqu’à ${h.num(C.preprMaxCredit)} jours de crédit ; il faut de toute façon au moins ${h.num(C.minPrDays)} jours comme résident permanent. N’est une absence qu’une journée passée entièrement hors du Canada : le jour du départ et celui du retour comptent donc comme présence. Le 29 février compte comme les autres jours. L’outil ci-dessus applique ces règles à vos propres dates et avance jour après jour jusqu’à la première date de signature qui atteint le total, en tenant compte des voyages seulement prévus. C’est un outil de planification : le calcul transmis à IRCC provient de sa propre calculatrice, dans votre compte en ligne.`;
    },
    faqs: (h) => [
      { q: 'Une journée de magasinage aux États-Unis est-elle une absence ?', a: 'Non. IRCC ne compte comme absence que les jours où vous n’avez passé aucun moment au Canada. Partir le matin et rentrer le soir, ou partir tard un jour et revenir le lendemain, ne crée aucune journée entière hors du pays : rien n’est déduit. Saisissez quand même ces voyages, l’outil leur attribuera zéro jour.' },
      { q: 'Pourquoi la période s’arrête-t-elle la veille de la signature ?', a: `Parce que les instructions d’IRCC excluent le jour de la demande. La période de ${h.P.ca.presence.windowYears} ans court donc jusqu’à la veille de la signature, et les ${h.num(h.P.ca.presence.requiredDays)} jours doivent être acquis ce jour-là. Signer le jour même où l’on croit atteindre le total, c’est signer un jour trop tôt.` },
      { q: 'Peut-on ajouter des voyages qui n’ont pas encore eu lieu ?', a: 'Oui, et c’est tout l’intérêt de l’outil par rapport à un simple total. Ajoutez les vacances que vous prévoyez avec leurs dates de départ et de retour : la première date possible se déplace d’autant. La calculatrice d’IRCC porte sur les jours déjà vécus et ne dit pas si un voyage l’été prochain repousse votre date.' },
      { q: 'Quelle date une personne protégée doit-elle saisir pour le séjour antérieur ?', a: 'La date à laquelle la qualité de personne protégée vous a été reconnue, et non celle de votre arrivée ou de votre demande d’asile. IRCC ne compte ce temps qu’à partir de cette décision et jusqu’à la veille de la résidence permanente, à raison d’une demi-journée par jour, comme les autres séjours temporaires.' },
    ],
    body: (h) => {
      const C = h.P.ca.presence;
      return `
<h2>Ce que l’outil calcule</h2>
<p>Trois sortes de dates suffisent : le jour de votre établissement comme résident permanent, le début d’un éventuel séjour légal antérieur (permis de travail ou d’études, visiteur, personne protégée) et le départ et le retour de chaque voyage. Les voyages s’ajoutent sans limite, y compris ceux à venir. Le résultat donne la première date de signature possible, le nombre de jours qui vous en séparent et le détail de la période de ${C.windowYears} ans à cette date : jours de présence comme résident permanent, crédit du séjour antérieur, jours entiers à l’étranger, total crédité face aux ${h.num(C.requiredDays)} jours exigés, dates exactes de début et de fin. Si le total se trouve à moins de cinq jours du seuil, un avertissement conseille de garder une marge. L’adresse de la page conserve vos dates : vous pouvez y revenir ou l’envoyer à votre conjoint.</p>
${schema(h)}
<h2>Un exemple chiffré</h2>
<p>Prenons un nouvel arrivant devenu résident permanent le ${h.date('2021-06-01')}, arrivé ce jour-là et resté au pays sans interruption. Chaque jour compte en entier à partir de cette date. Le ${h.num(C.requiredDays)}e jour tombe le ${h.date('2024-05-30')} : la première date de signature est donc le ${h.date('2024-05-31')}, avec une période allant du ${h.date('2019-05-31')} au ${h.date('2024-05-30')}, le jour de la signature restant en dehors. Le ${h.date('2024-02-29')} fait partie de la période et compte.</p>
<p>Ajoutons un voyage : départ le ${h.date('2023-08-04')}, retour le ${h.date('2023-08-25')}. Les jours de départ et de retour sont des jours au Canada ; seuls les ${h.num(20)} jours intermédiaires sont des absences. La première date de signature recule d’autant, au ${h.date('2024-06-20')}.</p>
<p>Supposons enfin qu’il ait travaillé avec un permis depuis le ${h.date('2020-11-16')} jusqu’à sa résidence permanente. Cela fait ${h.num(197)} jours antérieurs, soit ${h.num(98.5, 1)} jours de crédit. Voyage compris, la première date de signature avance au ${h.date('2024-03-14')} : la période contient alors ${h.num(997)} jours comme résident permanent plus ce crédit, ${h.num(1095.5, 1)} au total. Le crédit ne dépassant jamais ${h.num(C.preprMaxCredit)} jours, personne ne peut déposer avec moins de ${h.num(C.minPrDays)} jours comme résident permanent.</p>
${h.table(['Cas', 'Jours entiers à l’étranger', 'Crédit avant la RP', 'Première date de signature'], [['Ni voyage ni séjour antérieur', '0', '0', h.date('2024-05-31')], ['Un voyage de trois semaines', h.num(20), '0', h.date('2024-06-20')], ['Même voyage et permis de travail', h.num(20), h.num(98.5, 1), h.date('2024-03-14')]], 'Exemple seulement : vos dates donnent votre résultat.', ['l', 'r', 'r', 'r'])}
<h2>Pourquoi le jour de la signature ne compte pas</h2>
<p>Les ${h.src('ca_bulletin', 'instructions d’IRCC sur le calcul de la présence effective')} précisent que le jour de la demande n’est pas compté et que l’exigence doit être remplie la veille de la signature. Elles indiquent aussi que seules les journées sans aucun moment passé au Canada sont des absences et que le 29 février compte. Ces règles valent pour les demandes reçues depuis le ${h.date('2017-10-11')}. La date de signature du formulaire est la date de demande du calcul : d’où l’insistance de la page ${h.a('ca-application', 'demande de citoyenneté')} sur une signature et une date le même jour.</p>
<h2>Retrouver ses dates de voyage</h2>
<p>Fiez-vous aux documents plutôt qu’à la mémoire. Réunissez tous les passeports et titres de voyage de la période, puisqu’IRCC en demande une copie couleur intégrale ; servez-vous ensuite des tampons d’entrée et de sortie, des confirmations de vol reçues par courriel et des relevés de congés de votre employeur. Notez chaque voyage comme un départ et un retour. Si deux voyages se chevauchent, l’outil le signale et demande de les fusionner. En cas de doute sur une date, retenez la moins favorable et vérifiez que le résultat tient encore.</p>
<h2>Notre outil et celui d’IRCC</h2>
<p>IRCC propose une ${h.src('ca_rescalc', 'calculatrice officielle de présence effective')}, et les demandeurs en ligne doivent utiliser la ${h.src('ca_calc_page', 'calculatrice de leur compte IRCC')} : c’est ce résultat qui entre dans le dossier. Notre outil ne la remplace pas. Il répond à une autre question, la première date qui convient, et intègre les voyages prévus. Il ne traite pas les cas particuliers : les jours de prison, de libération conditionnelle ou de probation, qui ne comptent pas, et les jours à l’étranger d’un fonctionnaire de l’État ou de sa famille, qui comptent en entier sur demande papier. Si l’un d’eux vous concerne, passez par la calculatrice officielle. La page ${h.a('ca-pr', 'jours de résident permanent')} détaille le plancher de ${h.num(C.minPrDays)} jours, et le second outil sous le résumé donne un total rapide à partir de jours déjà comptés.</p>`;
    },
  },
});
