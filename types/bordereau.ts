export interface BordereauDocument {
  id: string;
  designation: string;
  nombrePages: string;
  observations: string;
}

export type BordereauTemplate = 'classique' | 'moderne' | 'prestige';


export interface BordereauData {
  template?: BordereauTemplate;
  // En-tête
  numeroBordereau: string;
  dateReception: string;
  heure: string;

  // 1. Identification du service émetteur
  serviceDepartement: string;
  dateEnvoi: string;
  nomAgent: string;
  fonction: string;
  contactPoste: string;

  // 2. Description du dossier reçu
  intituleObjet: string;
  referenceInterne: string;
  natureDossier: {
    administratif: boolean;
    technique: boolean;
    pedagogique: boolean;
    financier: boolean;
    autreNature: boolean;
    autreNatureTexte: string;
  };
  support: {
    papier: boolean;
    numerique: boolean;
    courriel: boolean;
    autreSupport: boolean;
    autreSupportTexte: string;
  };

  // 3. Liste des documents / pièces jointes
  documents: BordereauDocument[];

  // 4. Priorité et traitement
  degreeUrgence: 'normal' | 'urgent' | 'tres_urgent';
  delaiTraitement: string;
  transmisA: string;
  instructionsParticulieres: string;

  // 5. État du dossier
  etatDossier: {
    complet: boolean;
    incomplet: boolean;
    endommage: boolean;
  };
  observationsEtat: string;

  // 6. Signatures
  // Émetteur
  nomPrenomEmetteur: string;
  dateSignatureEmetteur: string;
  // Réceptionniste
  nomPrenomReceptionniste: string;
  dateSignatureReceptionniste: string;

  // Institution info (pré-remplie)
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;
}
