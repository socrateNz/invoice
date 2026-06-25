export type OrdreMissionTemplate = 'classique' | 'moderne' | 'prestige';

export interface OrdreMissionData {
  template?: OrdreMissionTemplate;

  // En-tête
  numeroOrdre: string;
  dateEmission: string;

  // Institution
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;

  // Agent
  nomPrenom: string;
  grade: string;
  fonction: string;
  departement: string;
  matricule: string;

  // Mission
  objetMission: string;
  destination: string;
  dateDepart: string;
  dateRetour: string;
  duree: string;

  // Transport
  moyenTransport: {
    vehiculeService: boolean;
    vehiculePersonnel: boolean;
    transport_commun: boolean;
    avion: boolean;
    autre: boolean;
    autreTexte: string;
  };

  // Frais
  perDiemJournalier: number;
  fraisTransport: number;
  autresFrais: number;
  devise: string;

  // Observations
  observations: string;

  // Signataires
  autorisePar: string;
  titreAutorisateur: string;
  dateSignature: string;
  lieuSignature: string;
}
