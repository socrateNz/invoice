export type BonLivraisonTemplate = 'classique' | 'moderne' | 'prestige';

export interface BonLivraisonItem {
  id: string;
  designation: string;
  unite: string;
  quantiteCommandee: number;
  quantiteLivree: number;
}

export interface BonLivraisonData {
  template?: BonLivraisonTemplate;

  // En-tête
  numeroBL: string;
  dateLivraison: string;
  numeroBonCommande: string;

  // Institution (Destinataire)
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
  institutionAcronym: string;
  footerText: string;

  // Fournisseur
  fournisseurNom: string;
  fournisseurAdresse: string;
  fournisseurContact: string;

  // Livraison
  items: BonLivraisonItem[];
  transporteur: string;
  observations: string;

  // Signatures
  livreurNom: string;
  dateSignatureLivreur: string;
  receptionnaireNom: string;
  receptionnaireFonction: string;
  dateSignatureReceptionnaire: string;

  /** Ephemeral, per-session digital signatures (slot key -> PNG data URL) — never persisted. */
  signatures?: Record<string, string>;
}
