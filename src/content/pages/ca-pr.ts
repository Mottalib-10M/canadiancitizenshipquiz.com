import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'ca-pr',
  group: 'apply',
  order: 280,
  tool: { kind: 'mini:caprdays' },
  mini: { kind: 'mini:cadays' },
  related: ['ca-presence', 'ca-apply', 'ca-spouse', 'ca-oath', 'ca-citizenship'],
  sources: ['ca_eligibility', 'ca_bulletin', 'ca_ceremony_bring'],
  en: {
    slug: 'canadian-citizenship/permanent-resident-days',
    nav: 'Days as a permanent resident',
    card: 'At least 730 days as a PR, up to 365 days of credit for earlier stays: the floor and the ceiling explained.',
    title: 'Permanent resident days for citizenship: 730 and the credit',
    description: 'Permanent resident days for Canadian citizenship: at least 730 days as a PR within the 1,095, half credit for earlier stays up to 365 days, and the PR card.',
    h1: 'Permanent resident days: are 730 enough?',
    intro: 'Enter how many days ago you became a permanent resident and the whole days you have spent abroad since: the days you hold as a PR and what is still missing appear.',
    resume: (h) => {
      const C = h.P.ca.presence;
      return `Of the ${h.num(C.requiredDays)} days of physical presence needed for Canadian citizenship, at least ${h.num(C.minPrDays)} must be days spent in Canada as a permanent resident, inside the ${C.windowYears} years before you sign. The rest can come from time spent in Canada before permanent residence, as a temporary resident (worker, student, visitor) or as a protected person: each such day is worth half a day, and the credit stops at ${h.num(C.preprMaxCredit)} days, which takes ${h.num(C.preprMaxCredit * 2)} days of earlier stay to earn. The arithmetic follows: ${h.num(C.minPrDays)} days as a permanent resident plus the maximum ${h.num(C.preprMaxCredit)} days of credit make exactly ${h.num(C.requiredDays)}, so no one can apply sooner than about two years after landing, and someone who arrived directly as a permanent resident needs the full ${h.num(C.requiredDays)} days in that status. For a protected person, the earlier time counts only from the day protection was granted. Your permanent resident status must be valid, with no unfulfilled conditions, but the card itself does not need to be current: an expired card is still accepted as identification for the online test and at the ceremony.`;
    },
    faqs: (h) => [
      { q: 'Can I apply for citizenship exactly two years after landing?', a: `Only with the full credit. ${h.num(h.P.ca.presence.minPrDays)} days as a permanent resident is the floor; reaching ${h.num(h.P.ca.presence.requiredDays)} that early needs ${h.num(h.P.ca.presence.preprMaxCredit)} days of credit, which means at least ${h.num(h.P.ca.presence.preprMaxCredit * 2)} days in Canada on a permit or as a protected person within the window, and no whole day abroad since landing. Any trip after landing pushes the date back day for day.` },
      { q: 'Does an expired PR card stop a citizenship application?', a: 'The card is a document, the status is what counts. IRCC accepts a permanent resident card even if expired as identification for the online test, and lists it, expired or not, among the documents for the ceremony. At the ceremony the card is destroyed or collected, since you will no longer need it as a citizen.' },
      { q: 'Why does more time on a work permit stop shortening my wait?', a: `Because of the cap. Earlier days count half, but the credit never exceeds ${h.num(h.P.ca.presence.preprMaxCredit)} days, reached after ${h.num(h.P.ca.presence.preprMaxCredit * 2)} days in Canada before permanent residence. Beyond that, extra permit years add nothing, and very old ones may even fall outside the ${h.P.ca.presence.windowYears}-year window. From then on, only days as a permanent resident move your date closer.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence;
      return `
<h2>The floor and the ceiling</h2>
<p>Two numbers frame the calculation. The floor is ${h.num(C.minPrDays)} days as a permanent resident: below it, no amount of earlier time helps. The ceiling is ${h.num(C.preprMaxCredit)} days of credit from the earlier stay: above it, extra years on a permit change nothing. Between the two, every day counts at its own value, one for a permanent resident day, one half for an earlier one. The calculator at the top checks the floor from your own figures and shows how many days would be missing with no earlier stay at all.</p>
${h.table(['Days in Canada before PR (in the window)', 'Credit', 'Days needed as a PR'], [[0, 0, h.num(C.requiredDays)], [h.num(200), h.num(100), h.num(C.requiredDays - 100)], [h.num(500), h.num(250), h.num(C.requiredDays - 250)], [h.num(C.preprMaxCredit * 2), h.num(C.preprMaxCredit), h.num(C.minPrDays)], [h.num(1200), `${h.num(C.preprMaxCredit)} (cap)`, h.num(C.minPrDays)]], 'Half-day credit, capped; figures before any trip after landing.', ['r', 'r', 'r'])}
<h2>Two newcomers, same landing day</h2>
<p>Both became permanent residents on ${h.date('2024-01-15')} and have not left Canada since. The first had held a work permit since ${h.date('2021-01-04')}. On the earliest candidate date, ${h.date('2026-01-14')}, the window starts on ${h.date('2021-01-14')} and holds ${h.num(1096)} days of earlier stay, worth ${h.num(548)} at half value but capped at ${h.num(C.preprMaxCredit)}, plus ${h.num(C.minPrDays)} days as a permanent resident: exactly ${h.num(C.requiredDays)}. She can sign that day.</p>
<p>The second arrived on a work permit on ${h.date('2023-01-16')}, so only ${h.num(364)} days preceded permanent residence, a credit of ${h.num(182)}. He needs ${h.num(913)} days as a permanent resident and reaches the total for a signing date of ${h.date('2026-07-16')}, six months after his colleague. The ${h.a('ca-presence', 'day-by-day calculator')} gives these dates directly once you type the landing day, the start of the earlier stay and your trips.</p>
<h2>Earlier time that falls out of the window</h2>
<p>The credit only uses days inside the ${C.windowYears}-year window that ends the day before you sign. If you studied in Canada long ago and became a permanent resident years later, that early period may have slipped outside the window by the time you apply, and it no longer counts. In the same way, waiting longer does not always add credit: as the window moves forward, old days drop out at the back while new permanent resident days come in at the front.</p>
<h2>What counts as a permanent resident day</h2>
<p>Any day from your landing date on which you spent at least part of the day in Canada, as set out in ${h.src('ca_bulletin', 'IRCC’s physical presence instructions')}. A day spent in prison, on parole or on probation does not count, whatever your status. A day abroad is lost, unless you were abroad as a Crown servant or as the spouse, common-law partner or child of one, which is the only case where days outside Canada count in full; it needs a paper application and form CIT 0177. The full list is on ${h.src('ca_eligibility', 'IRCC’s eligibility page')}, and the ${h.a('ca-apply', 'eligibility checklist')} covers the conditions beyond days.</p>
<h2>The card at the end of the process</h2>
<p>For the ceremony, IRCC asks for your permanent resident card, even if expired, or your confirmation of permanent residence; people who became permanent residents before ${h.date('2002-06-28')} can bring their record of landing instead. The card is destroyed or collected at the ceremony; for a virtual ceremony you are asked to have scissors ready to cut it. The ${h.a('ca-oath', 'ceremony page')} and ${h.src('ca_ceremony_bring', 'IRCC’s list of what to bring')} have the details.</p>`;
    },
  },
  fr: {
    slug: 'citoyennete-canadienne/jours-resident-permanent',
    nav: 'Jours de résident permanent',
    card: 'Au moins 730 jours comme RP, jusqu’à 365 jours de crédit pour le séjour antérieur : le plancher et le plafond.',
    title: 'Jours de résident permanent : 730 et le crédit avant la RP',
    description: 'Jours de résident permanent pour la citoyenneté canadienne : au moins 730 jours comme RP sur 1 095, demi-crédit du séjour antérieur jusqu’à 365 jours.',
    h1: 'Jours de résident permanent : 730 suffisent-ils ?',
    intro: 'Indiquez depuis combien de jours vous êtes résident permanent et les jours entiers passés à l’étranger depuis : vos jours comme RP et ce qui manque s’affichent.',
    resume: (h) => {
      const C = h.P.ca.presence;
      return `Sur les ${h.num(C.requiredDays)} jours de présence effective exigés pour la citoyenneté canadienne, au moins ${h.num(C.minPrDays)} doivent avoir été passés au Canada comme résident permanent, dans les ${C.windowYears} ans qui précèdent la signature. Le reste peut provenir du séjour antérieur à la résidence permanente, comme résident temporaire (travailleur, étudiant, visiteur) ou comme personne protégée : chacun de ces jours vaut une demi-journée, et le crédit plafonne à ${h.num(C.preprMaxCredit)} jours, ce qui demande ${h.num(C.preprMaxCredit * 2)} jours de séjour antérieur. Le calcul est simple : ${h.num(C.minPrDays)} jours comme résident permanent et ${h.num(C.preprMaxCredit)} jours de crédit maximal font exactement ${h.num(C.requiredDays)}. Personne ne peut donc déposer moins de deux ans environ après son établissement, et celui qui est arrivé directement comme résident permanent doit cumuler les ${h.num(C.requiredDays)} jours sous ce statut. Pour la personne protégée, le séjour antérieur ne compte qu’à partir de l’octroi de la protection. Le statut doit être valide, sans obligation non remplie, mais la carte n’a pas besoin d’être à jour : une carte expirée reste acceptée comme pièce d’identité à l’examen en ligne et à la cérémonie.`;
    },
    faqs: (h) => [
      { q: 'Peut-on demander la citoyenneté deux ans pile après l’établissement ?', a: `Seulement avec le crédit complet. Le plancher est de ${h.num(h.P.ca.presence.minPrDays)} jours comme résident permanent ; atteindre ${h.num(h.P.ca.presence.requiredDays)} aussi tôt exige ${h.num(h.P.ca.presence.preprMaxCredit)} jours de crédit, donc au moins ${h.num(h.P.ca.presence.preprMaxCredit * 2)} jours au Canada avec un permis ou comme personne protégée dans la période, et aucune journée entière à l’étranger depuis l’établissement.` },
      { q: 'Une carte de RP expirée bloque-t-elle la demande de citoyenneté ?', a: 'C’est le statut qui compte, pas la carte. IRCC accepte la carte de résident permanent, même expirée, comme pièce d’identité à l’examen en ligne, et la cite, expirée ou non, parmi les documents à apporter à la cérémonie. Là, elle est détruite ou récupérée, puisque le nouveau citoyen n’en a plus besoin.' },
      { q: 'Pourquoi un permis de travail plus long ne raccourcit-il plus l’attente ?', a: `À cause du plafond. Les jours antérieurs comptent pour moitié, mais le crédit ne dépasse jamais ${h.num(h.P.ca.presence.preprMaxCredit)} jours, atteints après ${h.num(h.P.ca.presence.preprMaxCredit * 2)} jours au Canada avant la résidence permanente. Au-delà, des années de permis supplémentaires n’ajoutent rien, et les plus anciennes peuvent même sortir de la période de ${h.P.ca.presence.windowYears} ans. Seuls les jours de résident permanent rapprochent alors la date.` },
    ],
    body: (h) => {
      const C = h.P.ca.presence;
      return `
<h2>Le plancher et le plafond</h2>
<p>Deux nombres encadrent le calcul. Le plancher : ${h.num(C.minPrDays)} jours comme résident permanent, en dessous desquels aucun séjour antérieur ne compense. Le plafond : ${h.num(C.preprMaxCredit)} jours de crédit pour ce séjour, au-delà desquels des années supplémentaires de permis ne changent rien. Entre les deux, chaque jour compte pour sa valeur : un pour un jour de résident permanent, un demi pour un jour antérieur. L’outil en haut de page vérifie le plancher à partir de vos chiffres et indique ce qui manquerait sans aucun séjour antérieur.</p>
${h.table(['Jours au Canada avant la RP (dans la période)', 'Crédit', 'Jours exigés comme RP'], [[0, 0, h.num(C.requiredDays)], [h.num(200), h.num(100), h.num(C.requiredDays - 100)], [h.num(500), h.num(250), h.num(C.requiredDays - 250)], [h.num(C.preprMaxCredit * 2), h.num(C.preprMaxCredit), h.num(C.minPrDays)], [h.num(1200), `${h.num(C.preprMaxCredit)} (plafond)`, h.num(C.minPrDays)]], 'Demi-crédit plafonné ; chiffres avant tout voyage postérieur à l’établissement.', ['r', 'r', 'r'])}
<h2>Deux résidents établis le même jour</h2>
<p>Tous deux sont devenus résidents permanents le ${h.date('2024-01-15')} et n’ont pas quitté le pays depuis. La première travaillait au Canada avec un permis depuis le ${h.date('2021-01-04')}. À la date la plus précoce envisageable, le ${h.date('2026-01-14')}, la période commence le ${h.date('2021-01-14')} et contient ${h.num(1096)} jours de séjour antérieur, soit ${h.num(548)} à demi-valeur ramenés au plafond de ${h.num(C.preprMaxCredit)}, plus ${h.num(C.minPrDays)} jours comme résidente permanente : exactement ${h.num(C.requiredDays)}. Elle peut signer ce jour-là.</p>
<p>Le second est arrivé avec un permis de travail le ${h.date('2023-01-16')} : ${h.num(364)} jours seulement avant la résidence permanente, soit ${h.num(182)} jours de crédit. Il lui faut ${h.num(913)} jours comme résident permanent et atteint le total pour une signature le ${h.date('2026-07-16')}, six mois après sa collègue. Le ${h.a('ca-presence', 'calcul jour par jour')} donne directement ces dates à partir de la date d’établissement, du début du séjour antérieur et des voyages.</p>
<h2>Quand le séjour antérieur sort de la période</h2>
<p>Le crédit ne retient que les jours situés dans la période de ${C.windowYears} ans qui s’achève la veille de la signature. Des études faites au Canada il y a longtemps, suivies d’une résidence permanente bien plus tard, peuvent être sorties de la période au moment du dépôt et ne plus rien rapporter. Attendre n’ajoute donc pas toujours du crédit : à mesure que la période avance, d’anciens jours en sortent pendant que de nouveaux jours de résident permanent y entrent.</p>
<h2>Ce qui fait un jour de résident permanent</h2>
<p>Tout jour, depuis la date d’établissement, où vous avez passé au moins une partie de la journée au Canada, selon les ${h.src('ca_bulletin', 'instructions d’IRCC sur la présence effective')}. Un jour en prison, en libération conditionnelle ou en probation ne compte pas, quel que soit le statut. Un jour à l’étranger est perdu, sauf pour le fonctionnaire de l’État en poste hors du Canada et son époux, conjoint de fait ou enfant, seul cas où ces jours comptent en entier, par demande papier avec le formulaire CIT 0177. La liste complète figure sur la ${h.src('ca_eligibility', 'page d’admissibilité d’IRCC')}, et la page ${h.a('ca-apply', 'conditions pour demander')} couvre le reste.</p>
<h2>La carte, à la fin du parcours</h2>
<p>Pour la cérémonie, IRCC demande la carte de résident permanent, même expirée, ou la confirmation de résidence permanente ; les personnes devenues résidentes permanentes avant le ${h.date('2002-06-28')} peuvent apporter leur fiche relative au droit d’établissement. La carte est détruite ou récupérée sur place ; pour une cérémonie virtuelle, prévoyez des ciseaux pour la couper. La page ${h.a('ca-oath', 'cérémonie de citoyenneté')} et la ${h.src('ca_ceremony_bring', 'liste d’IRCC des documents à apporter')} donnent le détail.</p>`;
    },
  },
});
