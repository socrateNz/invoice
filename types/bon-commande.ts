export type BonCommandeTemplate = 'classique' | 'moderne' | 'prestige';

export interface BonCommandeItem {
  id: string;
  designation: string;
  unite: string;
  quantite: number;
  prixUnitaire: number;
}

export interface BonCommandeData {
  template?: BonCommandeTemplate;

  // En-tête
  numeroBon: string;
  dateCommande: string;

  // Institution (Acheteur)
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;

  // Fournisseur
  fournisseurNom: string;
  fournisseurAdresse: string;
  fournisseurContact: string;

  // Articles
  items: BonCommandeItem[];

  // Conditions
  delaiLivraison: string;
  lieuLivraison: string;
  modePaiement: string;
  conditions: string;

  // Signataires
  demandeurNom: string;
  demandeurFonction: string;
  validateurNom: string;
  validateurFonction: string;
  directeurNom: string;
  directeurFonction: string;
  dateSignature: string;
}
