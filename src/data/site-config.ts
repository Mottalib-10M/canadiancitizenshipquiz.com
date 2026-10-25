/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://canadiancitizenshipquiz.com";
export const SITE_NAMES: Record<string, string> = {"en": "Canadian Citizenship Quiz", "fr": "Quiz citoyenneté canadienne"};
export const LANG_TAGS: Record<string, string> = {"en": "en-CA", "fr": "fr-CA"};
export const OG_LOCALES: Record<string, string> = {"en": "en_CA", "fr": "fr_CA"};
export const LOCALE_TAG = 'en-CA';
export const CURRENCY = 'CAD';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-25';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"en": "Independent publisher of Canadian citizenship test practice and of the day-by-day count behind an application", "fr": "Éditeur indépendant d'entraînement à l'examen de citoyenneté canadienne et du décompte jour par jour d'une demande"};
export const AUTHOR_DESC: Record<string, string> = {"en": "Radif Partners writes the practice questions from the facts of Discover Canada and reads every rule and fee on the IRCC website; it is not linked to the Government of Canada.", "fr": "Radif Partners rédige les questions d’entraînement à partir des faits de Découvrir le Canada et lit chaque règle et chaque frais sur le site d’IRCC ; il n’est pas lié au gouvernement du Canada."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"en": ["Canadian citizenship test", "Discover Canada study guide", "Canadian citizenship physical presence", "Canadian citizenship application", "Canadian citizenship fees", "Canadian citizenship by descent"], "fr": ["Examen pour la citoyenneté canadienne", "Guide Découvrir le Canada", "Présence effective pour la citoyenneté canadienne", "Demande de citoyenneté canadienne", "Frais de citoyenneté", "Citoyenneté canadienne par filiation"]};
export const CONTACT_EMAIL = "contact@canadiancitizenshipquiz.com";
export const THEME_COLOR = '#9E1B32';
export const LOGO_SYMBOL = '?';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau ; Clarity chargé en mode sans cookie (consentv2 denied) ; GA4 avec cookies si GA4_ID.
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
/** Propriété Google Analytics 4 (décision de l'éditeur du 2026-10-17, RECETTE §15.6) : GA4 normal,
 *  avec cookies _ga / _ga_<ID> (390 jours), sans bandeau, publicité refusée. Créée par
 *  `seo-platform/scripts/create-ga4.ts accounts/372759688` (RECETTE §15.3, étape 15), puis
 *  pages légales régénérées : `python3 scripts/gen-legal-pages.py .`. Vide = pas de GA4. */
export const GA4_ID = '';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = '37edb0dddf10e9dddb21a9cfa4ae4869';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',            // raison sociale ou nom commercial exploité
  legalForm: '',             // ex. entreprise individuelle, SASU, GmbH, eenmanszaak
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city']; // legalForm vide à dessein, comme sur les autres sites du portefeuille (check-legal échoue sinon, contournement signalé)

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
