export type DevisTemplate = 'classique' | 'moderne' | 'prestige';

export interface DevisItem {
  id: string;
  designation: string;
  quantite: number;
  prixUnitaire: number;
}

export interface DevisData {
  template?: DevisTemplate;

  // En-tête
  numeroDevis: string;
  dateDevis: string;
  dateValidite: string;

  // Institution (Émetteur)
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
  institutionAcronym: string;
  footerText: string;

  // Client
  clientNom: string;
  clientAdresse: string;
  clientContact: string;

  // Contenu
  objet: string;
  items: DevisItem[];
  conditions: string;

  // Signatures
  demandeurNom: string;
  demandeurFonction: string;
  directeurNom: string;
  directeurFonction: string;
  dateSignature: string;

  /** Ephemeral, per-session digital signatures (slot key -> PNG data URL) — never persisted. */
  signatures?: Record<string, string>;
}
