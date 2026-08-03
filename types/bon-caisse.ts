export type BonCaisseTemplate = 'classique' | 'moderne' | 'prestige';

export interface BonCaisseData {
  template?: BonCaisseTemplate;

  // En-tête
  numeroBonCaisse: string;
  dateOperation: string;
  typeMouvement: 'entree' | 'sortie';

  // Institution
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
  institutionAcronym: string;
  footerText: string;

  // Opération
  beneficiaire: string;
  motif: string;
  montant: number;
  modePaiement: {
    especes: boolean;
    mobileMoney: boolean;
    virement: boolean;
    cheque: boolean;
    autre: boolean;
    autreTexte: string;
  };
  soldeAvant: number;
  soldeApres: number;

  // Signatures
  caissierNom: string;
  dateSignatureCaissier: string;
  autorisateurNom: string;
  autorisateurFonction: string;
  dateSignatureAutorisateur: string;

  /** Ephemeral, per-session digital signatures (slot key -> PNG data URL) — never persisted. */
  signatures?: Record<string, string>;
}
