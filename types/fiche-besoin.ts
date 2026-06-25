export type FicheBesoinTemplate = 'classique' | 'moderne' | 'prestige';

export interface FicheBesoinItem {
  id: string;
  designation: string;
  unite: string;
  quantite: number;
  estimationPrix: number; // Optionnel, estimation du coût
}

export interface FicheBesoinData {
  template?: FicheBesoinTemplate;

  // En-tête
  numeroFiche: string;
  dateDemande: string;

  // Institution
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;

  // Demandeur
  demandeurNom: string;
  demandeurFonction: string;
  departementDemandeur: string;

  // Détails de la demande
  motifBesoin: string;
  dateSouhaitee: string;
  
  // Articles
  items: FicheBesoinItem[];

  // Signatures
  dateSignatureDemandeur: string;
  responsableNom: string;
  responsableFonction: string;
  dateSignatureResponsable: string;
  directionNom: string;
  directionFonction: string;
  dateSignatureDirection: string;
}
