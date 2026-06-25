export type RecuPaiementTemplate = 'classique' | 'moderne' | 'prestige';

export interface RecuPaiementData {
  template?: RecuPaiementTemplate;

  // En-tête
  numeroRecu: string;
  dateRecu: string;
  heure: string;

  // Institution / Émetteur
  institutionName: string;
  institutionSubtitle: string;
  institutionLocation: string;
  institutionDepartment: string;

  // Paiement
  recuDe: string;           // Nom du payeur
  adressePayeur: string;
  sommeChiffres: number;
  motif: string;            // Objet du paiement
  reference: string;        // Référence du dossier/facture

  // Mode de paiement
  modePaiement: {
    especes: boolean;
    mobileMoney: boolean;
    virement: boolean;
    cheque: boolean;
    autre: boolean;
    autreTexte: string;
  };
  operateur: string;        // Pour Mobile Money: MTN, Orange...
  numeroTransaction: string;

  // Caissier / Signature
  nomCaissier: string;
  dateSignature: string;
}
