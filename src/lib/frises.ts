/**
 * Steps of the two timelines shown with the Frise component (RECETTE §17.6). Every duration comes from
 * params-2026.json and an IRCC page; a step whose date IRCC sets without a published delay is `unknown`
 * (no processing time is ever estimated here: that subject belongs to another site of the portfolio).
 */
import P from '../data/params-2026.json';
import type { FriseStep, FriseLabels } from '../components/ui/Frise';

type L = 'en' | 'fr';
const src = (k: keyof typeof P.sources, lang: L) => {
  const s = P.sources[k] as { url: string; urlFr?: string; label: Record<string, string> };
  return { label: s.label[lang], href: lang === 'fr' && s.urlFr ? s.urlFr : s.url };
};
const A = P.ca.application, T = P.ca.test, CE = P.ca.ceremony, C = P.ca.presence;
const n = (v: number, lang: L) => new Intl.NumberFormat(lang === 'fr' ? 'fr-CA' : 'en-CA').format(v);

export function labels(lang: L, kind: 'timeline' | 'ceremony'): FriseLabels {
  return lang === 'fr'
    ? { start: kind === 'timeline' ? 'Jour de la signature de la demande' : 'Jour où l’invitation à la cérémonie arrive', startHelp: kind === 'timeline' ? 'C’est aussi la date de demande du calcul de présence.' : 'Elle arrive au moins une semaine avant la cérémonie.', end: 'Fin du parcours', between: 'entre le', and: 'et le', today: 'Aujourd’hui', done: 'Passé', current: 'En cours', upcoming: 'À venir', day: 'jour', days: 'jours', week: 'semaine', weeks: 'semaines', month: 'mois', months: 'mois', milestone: 'jalon', unknown: 'date fixée par IRCC', endUnknown: 'fixée par IRCC, aucun délai estimé', caption: kind === 'timeline' ? 'Frise des étapes de la demande de citoyenneté canadienne, de la signature au serment : seules les dates fixées par une règle d’IRCC sont calculées, les autres étapes sont hachurées.' : 'Frise de la fin du parcours, de l’invitation à la cérémonie au passeport : la cérémonie a lieu au plus tôt une semaine après l’invitation, les étapes hachurées dépendent d’IRCC.' }
    : { start: kind === 'timeline' ? 'Day you sign the application' : 'Day the ceremony invitation arrives', startHelp: kind === 'timeline' ? 'It is also the application date of the presence calculation.' : 'It comes at least one week before the ceremony.', end: 'End of the path', between: 'between', and: 'and', today: 'Today', done: 'Past', current: 'In progress', upcoming: 'Ahead', day: 'day', days: 'days', week: 'week', weeks: 'weeks', month: 'month', months: 'months', milestone: 'milestone', unknown: 'date set by IRCC', endUnknown: 'set by IRCC, no delay estimated', caption: kind === 'timeline' ? 'Timeline of a Canadian citizenship application, from signature to oath: only the dates an IRCC rule fixes are computed; hatched steps are dated by IRCC.' : 'Timeline of the last stretch, from the ceremony invitation to the passport: the ceremony is at the earliest one week after the invitation; hatched steps depend on IRCC.' };
}

export function steps(lang: L, kind: 'timeline' | 'ceremony'): FriseStep[] {
  const fr = lang === 'fr';
  if (kind === 'ceremony') return [
    { id: 'inv', title: fr ? 'Invitation à la cérémonie' : 'Ceremony invitation', detail: fr ? `Elle indique la date, le format (en personne ou virtuel) et ce qu’il faut apporter. Un report se demande dans les ${CE.rescheduleDays} jours précédant la cérémonie.` : `It gives the date, the format (in person or virtual) and what to bring. A new date must be requested within ${CE.rescheduleDays} days of the ceremony.`, minDays: 0, maxDays: 0, source: src('ca_ceremony_when', lang) },
    { id: 'cer', title: fr ? 'Cérémonie et serment, au plus tôt' : 'Ceremony and oath, at the earliest', detail: fr ? `Au moins ${CE.noticeWeeks} semaine après l’invitation. Serment à partir de ${CE.oathFromAge} ans, formulaire signé le jour même.` : `At least ${CE.noticeWeeks} week after the invitation. Oath from age ${CE.oathFromAge}, form signed the same day.`, minDays: 7 * CE.noticeWeeks, maxDays: 7 * CE.noticeWeeks, source: src('ca_ceremony_expect', lang) },
    { id: 'card', title: fr ? 'Carte de résident permanent remise' : 'PR card handed in', detail: fr ? 'La carte est détruite ou récupérée pendant la cérémonie (à couper soi-même en virtuel).' : 'The card is destroyed or collected at the ceremony (you cut it yourself at a virtual one).', minDays: 0, maxDays: 0, source: src('ca_ceremony_bring', lang) },
    { id: 'cert', title: fr ? 'Certificat de citoyenneté' : 'Citizenship certificate', detail: fr ? 'Électronique ou papier : il prouve la citoyenneté, mais ce n’est pas un titre de voyage.' : 'Electronic or paper: it proves citizenship but is not a travel document.', minDays: 0, maxDays: 0, unknown: true, source: src('ca_proof', lang) },
    { id: 'pass', title: fr ? 'Demande de passeport possible' : 'Passport application possible', detail: fr ? 'Seulement une fois le certificat reçu.' : 'Only once you have the certificate.', minDays: 0, maxDays: 0, source: src('ca_ceremony', lang) },
  ];
  return [
    { id: 'sign', title: fr ? 'Signature et date de la demande' : 'Application signed and dated', detail: fr ? `Admissible la veille : ${n(C.requiredDays, lang)} jours dans les ${C.windowYears} ans qui précèdent.` : `Eligible the day before: ${n(C.requiredDays, lang)} days in the ${C.windowYears} years before.`, minDays: 0, maxDays: 0, source: src('ca_how', lang) },
    { id: 'recv', title: fr ? 'Réception par IRCC' : 'IRCC receives the file', detail: fr ? `En ligne : courriel de confirmation le jour même. Papier : retourné s’il arrive plus de ${A.returnAfterDays} jours après la date du formulaire.` : `Online: confirmation email the same day. Paper: returned if it arrives more than ${A.returnAfterDays} days after the date on the form.`, minDays: 0, maxDays: A.returnAfterDays, source: src('ca_how', lang) },
    { id: 'aor', title: fr ? 'Accusé de réception' : 'Acknowledgement of receipt', detail: fr ? 'Dossier jugé complet : le traitement commence. Numéro de demande et IUC.' : 'File found complete: processing starts. Application number and UCI.', minDays: 0, maxDays: 0, unknown: true, source: src('ca_after', lang) },
    { id: 'test', title: fr ? 'Examen de citoyenneté' : 'Citizenship test', detail: fr ? `De ${T.ages[0]} à ${T.ages[1]} ans : ${T.attempts} essais dans une période de ${T.onlineWindowDays} jours ouverte par l’invitation.` : `Ages ${T.ages[0]} to ${T.ages[1]}: ${T.attempts} attempts in a ${T.onlineWindowDays}-day period opened by the invitation.`, minDays: 0, maxDays: T.onlineWindowDays, source: src('ca_test', lang) },
    { id: 'int', title: fr ? 'Entrevue possible' : 'Possible interview', detail: fr ? 'Après l’examen, ou si le dossier est tiré au sort pour un contrôle de qualité.' : 'After the test, or if the file is picked for a quality review.', minDays: 0, maxDays: 0, unknown: true, source: src('ca_results', lang) },
    { id: 'oath', title: fr ? 'Cérémonie et serment' : 'Ceremony and oath', detail: fr ? `Invitation au moins ${CE.noticeWeeks} semaine avant. C’est la dernière étape.` : `Invitation at least ${CE.noticeWeeks} week ahead. This is the last step.`, minDays: 7 * CE.noticeWeeks, maxDays: 7 * CE.noticeWeeks, source: src('ca_ceremony', lang) },
  ];
}
