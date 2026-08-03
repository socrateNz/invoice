export type NoteFraisTemplate = 'classique' | 'moderne' | 'prestige';

export interface DepenseItem {
  id: string;
  date: string;
  motif: string;
  categorie: string;
  montant: number;
}

export interface NoteFraisData {
  template?: NoteFraisTemplate;

  // En-tête
  numeroNote: string;
  dateNote: string;
  numeroOrdreMission: string;

  // Institution
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
  institutionAcronym: string;
  footerText: string;

  // Employé
  employeNom: string;
  employeFonction: string;
  employeDepartement: string;

  // Dépenses
  depenses: DepenseItem[];
  avanceRecue: number;
  devise: string;
  observations: string;

  // Signatures
  dateSignatureEmploye: string;
  valideurNom: string;
  valideurFonction: string;
  dateSignatureValideur: string;
  directeurNom: string;
  directeurFonction: string;
  dateSignatureDirecteur: string;

  /** Ephemeral, per-session digital signatures (slot key -> PNG data URL) — never persisted. */
  signatures?: Record<string, string>;
}
