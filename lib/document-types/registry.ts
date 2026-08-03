import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { FileText, ClipboardList, Navigation, Receipt, ShoppingCart, FileSignature, Truck, Wallet, Banknote } from "lucide-react";

import { OrgDefaults } from "@/lib/document-defaults";
import { todayStr, nowTime, uid } from "./helpers";

import InvoiceForm from "@/components/InvoiceForm";
import PDFRenderer from "@/components/PDFRenderer";
import { InvoiceData } from "@/types/invoice";

import BonCommandeForm from "@/components/BonCommandeForm";
import BonCommandeDocument from "@/components/pdf-templates/BonCommandeDocument";
import { BonCommandeData } from "@/types/bon-commande";

import BordereauForm from "@/components/BordereauForm";
import BordereauDocument from "@/components/pdf-templates/BordereauDocument";
import { BordereauData } from "@/types/bordereau";

import OrdreMissionForm from "@/components/OrdreMissionForm";
import OrdreMissionDocument from "@/components/pdf-templates/OrdreMissionDocument";
import { OrdreMissionData } from "@/types/ordre-mission";

import FicheBesoinForm from "@/components/FicheBesoinForm";
import FicheBesoinDocument from "@/components/pdf-templates/FicheBesoinDocument";
import { FicheBesoinData } from "@/types/fiche-besoin";

import RecuPaiementForm from "@/components/RecuPaiementForm";
import RecuPaiementDocument from "@/components/pdf-templates/RecuPaiementDocument";
import { RecuPaiementData } from "@/types/recu-paiement";

import DevisForm from "@/components/DevisForm";
import DevisDocument from "@/components/pdf-templates/DevisDocument";
import { DevisData } from "@/types/devis";

import BonLivraisonForm from "@/components/BonLivraisonForm";
import BonLivraisonDocument from "@/components/pdf-templates/BonLivraisonDocument";
import { BonLivraisonData } from "@/types/bon-livraison";

import NoteFraisForm from "@/components/NoteFraisForm";
import NoteFraisDocument from "@/components/pdf-templates/NoteFraisDocument";
import { NoteFraisData } from "@/types/note-frais";

import BonCaisseForm from "@/components/BonCaisseForm";
import BonCaisseDocument from "@/components/pdf-templates/BonCaisseDocument";
import { BonCaisseData } from "@/types/bon-caisse";

export type DocumentCategory = 'commercial' | 'achats' | 'rh' | 'finance';

export interface DocumentTypeConfig<T = any> {
  id: string;
  label: string;
  icon: LucideIcon;
  activeColor: string;
  description: string;
  category: DocumentCategory;
  Form: ComponentType<{
    initialData: T;
    onDataChange: (data: T) => void;
    /** Ephemeral, per-session digital signatures (slot key -> PNG data URL) — never persisted. */
    signatures?: Record<string, string>;
    onSignatureChange?: (slot: string, dataUrl: string | null) => void;
  }>;
  Document: ComponentType<{ data: T }>;
  createInitialData: (org: OrgDefaults) => T;
  getNumero: (data: T) => string | undefined;
  filenamePrefix: string;
}

function defineDocumentType<T>(config: DocumentTypeConfig<T>): DocumentTypeConfig<T> {
  return config;
}

/** The institution fields every non-invoice document type prefills identically. */
function inst(org: OrgDefaults) {
  return {
    institutionName: org.institutionName,
    institutionSubtitle: org.institutionSubtitle,
    institutionLocation: org.institutionLocation,
    institutionDepartment: org.institutionDepartment,
    institutionAcronym: org.institutionAcronym,
    footerText: org.footerText,
  };
}

export const DOCUMENT_TYPES: DocumentTypeConfig<any>[] = [
  defineDocumentType<InvoiceData>({
    id: 'invoice',
    label: 'Factures',
    icon: FileText,
    activeColor: 'bg-blue-600',
    description: 'Créez vos factures proforma',
    category: 'commercial',
    Form: InvoiceForm,
    Document: PDFRenderer,
    filenamePrefix: 'Facture',
    getNumero: (data) => data.invoiceNumber,
    createInitialData: (org) => ({
      senderName: org.institutionName,
      senderSlogan: "Solutions Numériques & Développement Web",
      senderEmail: org.email,
      senderPhone: org.phone,
      recipientName: "Recepteur de la facture",
      recipientAddress: "Ville, Région — Pays",
      invoiceNumber: `${new Date().getFullYear()}-${String(Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)).padStart(3, '0')}`,
      invoiceDate: `${org.institutionLocation || "Ville"}, le xx/xx/xxxx`,
      invoiceValidity: "30 jours",
      subject: "Objet de la facture",
      fontFamily: "Arial, Helvetica, sans-serif",
      template: "classic",
      items: [
        { id: "1", designation: "Description du service", description: "Détails complémentaires", quantity: "1", price: 150000 },
      ],
    }),
  }),

  defineDocumentType<DevisData>({
    id: 'devis',
    label: 'Devis',
    icon: FileSignature,
    activeColor: 'bg-[#2563eb]',
    description: 'Proposez un devis avant facturation',
    category: 'commercial',
    Form: DevisForm,
    Document: DevisDocument,
    filenamePrefix: 'Devis',
    getNumero: (data) => data.numeroDevis,
    createInitialData: (org) => ({
      ...inst(org),
      numeroDevis: `DV-${new Date().getFullYear()}-${uid()}`,
      dateDevis: todayStr(),
      dateValidite: "",
      clientNom: "", clientAdresse: "", clientContact: "",
      objet: "",
      items: [
        { id: "1", designation: "", quantite: 1, prixUnitaire: 0 },
      ],
      conditions: "",
      demandeurNom: "", demandeurFonction: "",
      directeurNom: "", directeurFonction: "Directeur Général",
      dateSignature: todayStr(),
    }),
  }),

  defineDocumentType<BonCommandeData>({
    id: 'bon-commande',
    label: 'Bons de Commande',
    icon: ShoppingCart,
    activeColor: 'bg-[#7c3aed]',
    description: 'Commandez du matériel auprès des fournisseurs',
    category: 'achats',
    Form: BonCommandeForm,
    Document: BonCommandeDocument,
    filenamePrefix: 'BonCommande',
    getNumero: (data) => data.numeroBon,
    createInitialData: (org) => ({
      ...inst(org),
      numeroBon: `BC-${new Date().getFullYear()}-${uid()}`,
      dateCommande: todayStr(),
      fournisseurNom: "", fournisseurAdresse: "", fournisseurContact: "",
      items: [
        { id: "1", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
        { id: "2", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
        { id: "3", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
      ],
      delaiLivraison: "", lieuLivraison: org.defaultAddress, modePaiement: "Virement bancaire", conditions: "",
      demandeurNom: "", demandeurFonction: "", validateurNom: "", validateurFonction: "", directeurNom: "", directeurFonction: "Directeur Général", dateSignature: todayStr(),
    }),
  }),

  defineDocumentType<BonLivraisonData>({
    id: 'bon-livraison',
    label: 'Bons de Livraison',
    icon: Truck,
    activeColor: 'bg-[#ea580c]',
    description: 'Confirmez la livraison des articles commandés',
    category: 'achats',
    Form: BonLivraisonForm,
    Document: BonLivraisonDocument,
    filenamePrefix: 'BonLivraison',
    getNumero: (data) => data.numeroBL,
    createInitialData: (org) => ({
      ...inst(org),
      numeroBL: `BL-${new Date().getFullYear()}-${uid()}`,
      dateLivraison: todayStr(),
      numeroBonCommande: "",
      fournisseurNom: "", fournisseurAdresse: "", fournisseurContact: "",
      items: [
        { id: "1", designation: "", unite: "pcs", quantiteCommandee: 1, quantiteLivree: 1 },
        { id: "2", designation: "", unite: "pcs", quantiteCommandee: 1, quantiteLivree: 1 },
      ],
      transporteur: "", observations: "",
      livreurNom: "", dateSignatureLivreur: todayStr(),
      receptionnaireNom: "", receptionnaireFonction: "", dateSignatureReceptionnaire: todayStr(),
    }),
  }),

  defineDocumentType<BordereauData>({
    id: 'bordereau',
    label: 'Bordereaux',
    icon: ClipboardList,
    activeColor: 'bg-[#1a2e5a]',
    description: 'Bordereaux de réception de dossier',
    category: 'achats',
    Form: BordereauForm,
    Document: BordereauDocument,
    filenamePrefix: 'Bordereau',
    getNumero: (data) => data.numeroBordereau,
    createInitialData: (org) => ({
      ...inst(org),
      numeroBordereau: `BRD-${new Date().getFullYear()}-${uid()}`,
      dateReception: todayStr(), heure: nowTime(),
      serviceDepartement: org.institutionDepartment, dateEnvoi: "", nomAgent: "", fonction: "", contactPoste: "",
      intituleObjet: "", referenceInterne: "",
      natureDossier: { administratif: false, technique: false, pedagogique: false, financier: false, autreNature: false, autreNatureTexte: "" },
      support: { papier: false, numerique: false, courriel: false, autreSupport: false, autreSupportTexte: "" },
      documents: [{ id: "1", designation: "", nombrePages: "", observations: "" }, { id: "2", designation: "", nombrePages: "", observations: "" }, { id: "3", designation: "", nombrePages: "", observations: "" }],
      degreeUrgence: "normal", delaiTraitement: "", transmisA: "", instructionsParticulieres: "",
      etatDossier: { complet: false, incomplet: false, endommage: false }, observationsEtat: "",
      nomPrenomEmetteur: "", dateSignatureEmetteur: "", nomPrenomReceptionniste: "", dateSignatureReceptionniste: "",
    }),
  }),

  defineDocumentType<OrdreMissionData>({
    id: 'ordre-mission',
    label: 'Ordres de Mission',
    icon: Navigation,
    activeColor: 'bg-[#1a2e5a]',
    description: 'Autorisez les déplacements officiels',
    category: 'rh',
    Form: OrdreMissionForm,
    Document: OrdreMissionDocument,
    filenamePrefix: 'OrdreMission',
    getNumero: (data) => data.numeroOrdre,
    createInitialData: (org) => ({
      ...inst(org),
      numeroOrdre: `OM-${new Date().getFullYear()}-${uid()}`, dateEmission: todayStr(),
      nomPrenom: "", grade: "", fonction: "", departement: org.institutionDepartment, matricule: "",
      objetMission: "", destination: "", dateDepart: "", dateRetour: "", duree: "1",
      moyenTransport: { vehiculeService: false, vehiculePersonnel: false, transport_commun: false, avion: false, autre: false, autreTexte: "" },
      perDiemJournalier: 0, fraisTransport: 0, autresFrais: 0, devise: "FCFA",
      observations: "", autorisePar: "", titreAutorisateur: "Directeur Général", dateSignature: todayStr(), lieuSignature: org.institutionLocation?.split(',')[0] || "Bafang",
    }),
  }),

  defineDocumentType<NoteFraisData>({
    id: 'note-frais',
    label: 'Notes de Frais',
    icon: Wallet,
    activeColor: 'bg-[#be123c]',
    description: 'Justifiez les dépenses engagées en mission',
    category: 'rh',
    Form: NoteFraisForm,
    Document: NoteFraisDocument,
    filenamePrefix: 'NoteFrais',
    getNumero: (data) => data.numeroNote,
    createInitialData: (org) => ({
      ...inst(org),
      numeroNote: `NF-${new Date().getFullYear()}-${uid()}`,
      dateNote: todayStr(),
      numeroOrdreMission: "",
      employeNom: "", employeFonction: "", employeDepartement: org.institutionDepartment,
      depenses: [
        { id: "1", date: todayStr(), motif: "", categorie: "", montant: 0 },
      ],
      avanceRecue: 0, devise: "FCFA", observations: "",
      dateSignatureEmploye: todayStr(),
      valideurNom: "", valideurFonction: "", dateSignatureValideur: "",
      directeurNom: "", directeurFonction: "Directeur Général", dateSignatureDirecteur: "",
    }),
  }),

  defineDocumentType<FicheBesoinData>({
    id: 'fiche-besoin',
    label: 'Fiches de Besoin',
    icon: ClipboardList,
    activeColor: 'bg-teal-700',
    description: 'Exprimez vos besoins matériels',
    category: 'achats',
    Form: FicheBesoinForm,
    Document: FicheBesoinDocument,
    filenamePrefix: 'FicheBesoin',
    getNumero: (data) => data.numeroFiche,
    createInitialData: (org) => ({
      ...inst(org),
      numeroFiche: `FB-${new Date().getFullYear()}-${uid()}`, dateDemande: todayStr(),
      demandeurNom: "", demandeurFonction: "", departementDemandeur: org.institutionDepartment,
      motifBesoin: "", dateSouhaitee: "",
      items: [
        { id: "1", designation: "", unite: "pcs", quantite: 1, estimationPrix: 0 },
      ],
      dateSignatureDemandeur: todayStr(), responsableNom: "", responsableFonction: "", dateSignatureResponsable: "", directionNom: "", directionFonction: "Directeur Général", dateSignatureDirection: "",
    }),
  }),

  defineDocumentType<RecuPaiementData>({
    id: 'recu-paiement',
    label: 'Reçus de Paiement',
    icon: Receipt,
    activeColor: 'bg-green-700',
    description: 'Attestez les paiements reçus',
    category: 'finance',
    Form: RecuPaiementForm,
    Document: RecuPaiementDocument,
    filenamePrefix: 'Recu',
    getNumero: (data) => data.numeroRecu,
    createInitialData: (org) => ({
      ...inst(org),
      numeroRecu: `RCP-${new Date().getFullYear()}-${uid()}`, dateRecu: todayStr(), heure: nowTime(),
      recuDe: "", adressePayeur: "", sommeChiffres: 0,
      motif: "", reference: "",
      modePaiement: { especes: false, mobileMoney: false, virement: false, cheque: false, autre: false, autreTexte: "" },
      operateur: "", numeroTransaction: "", nomCaissier: "", dateSignature: todayStr(),
    }),
  }),

  defineDocumentType<BonCaisseData>({
    id: 'bon-caisse',
    label: 'Bons de Caisse',
    icon: Banknote,
    activeColor: 'bg-[#059669]',
    description: 'Enregistrez les mouvements de caisse',
    category: 'finance',
    Form: BonCaisseForm,
    Document: BonCaisseDocument,
    filenamePrefix: 'BonCaisse',
    getNumero: (data) => data.numeroBonCaisse,
    createInitialData: (org) => ({
      ...inst(org),
      numeroBonCaisse: `BX-${new Date().getFullYear()}-${uid()}`,
      dateOperation: todayStr(),
      typeMouvement: 'sortie',
      beneficiaire: "", motif: "", montant: 0,
      modePaiement: { especes: false, mobileMoney: false, virement: false, cheque: false, autre: false, autreTexte: "" },
      soldeAvant: 0, soldeApres: 0,
      caissierNom: "", dateSignatureCaissier: todayStr(),
      autorisateurNom: "", autorisateurFonction: "", dateSignatureAutorisateur: "",
    }),
  }),
];

export function getDocumentType(id: string): DocumentTypeConfig | undefined {
  return DOCUMENT_TYPES.find((t) => t.id === id);
}
