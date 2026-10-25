import type { Locale } from './routes';
const en = {
  updatedOn: 'Rules and fees checked on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Questions, counts and fees by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'What applicants ask', relatedCalculators: 'Next steps', sourcesTitle: 'IRCC pages this page relies on', writtenBy: 'Written by',
  asOf: 'Canadian citizenship rules and fees for', lastUpdated: 'read on canada.ca and the IRCC fee list, last checked on',
  footerValidated: 'Every rule and fee links to the IRCC page it was read on',
  footerBrowser: 'Mock tests and day counts run in your browser · nothing you type is sent · free, no account, no email, no paid plan',
  footerDisclaimer: 'Canadian Citizenship Quiz is an independent site published by Radif Partners. It is not Immigration, Refugees and Citizenship Canada (IRCC) or any part of the Government of Canada: it takes no application, schedules no test and its practice questions are not the official ones. Applications are made only on the IRCC website. Dates and fees are for guidance: confirm them on canada.ca before you apply.',
  footerPopular: 'Practice',
  notFound: 'Nothing lives at this address. The free 20-question mock citizenship test is on the home page.',
  readMore: 'Read more', back: 'Home',
};
const fr: typeof en = {
  updatedOn: 'Règles et frais vérifiés le', editorialPolicy: 'Politique éditoriale', contactLabel: 'Contact', reviewedBy: 'Questions, décomptes et frais par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Ce que demandent les candidats', relatedCalculators: 'Étapes suivantes', sourcesTitle: 'Pages d’IRCC sur lesquelles repose cette page', writtenBy: 'Rédigé par',
  asOf: 'Règles et frais de la citoyenneté canadienne', lastUpdated: 'relus sur canada.ca et la liste des frais d’IRCC, dernière vérification le',
  footerValidated: 'Chaque règle et chaque frais renvoie à la page d’IRCC où il a été lu',
  footerBrowser: 'Examens blancs et décomptes faits dans votre navigateur · rien de ce que vous saisissez n’est transmis · gratuit, sans compte, sans courriel, sans abonnement',
  footerDisclaimer: 'Quiz citoyenneté canadienne est un site indépendant publié par Radif Partners. Ce n’est ni Immigration, Réfugiés et Citoyenneté Canada (IRCC) ni le gouvernement du Canada : il ne reçoit aucune demande, ne convoque à aucun examen et ses questions d’entraînement ne sont pas celles de l’examen officiel. La demande se fait uniquement sur le site d’IRCC. Dates et frais indicatifs : vérifiez-les sur canada.ca avant de présenter votre demande.',
  footerPopular: 'Entraînement',
  notFound: 'Aucune page à cette adresse. L’examen blanc gratuit de 20 questions est sur la page d’accueil.',
  readMore: 'Lire la suite', back: 'Accueil',
};
export function t(lang: Locale) { return lang === 'fr' ? fr : en; }
