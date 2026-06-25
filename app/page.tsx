"use client";

import { useState } from "react";
import { Download, FileText, ClipboardList, Navigation, Receipt, ShoppingCart } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';

// Facture
import InvoiceForm from "@/components/InvoiceForm";
import PDFPreview from "@/components/PDFPreview";
import PDFRenderer from '@/components/PDFRenderer';
import { InvoiceData } from "@/types/invoice";

// Bordereau
import BordereauForm from "@/components/BordereauForm";
import BordereauPreview from "@/components/BordereauPreview";
import BordereauRenderer from '@/components/pdf-templates/BordereauRenderer';
import { BordereauData } from "@/types/bordereau";

// Ordre de Mission
import OrdreMissionForm from "@/components/OrdreMissionForm";
import OrdreMissionPreview from "@/components/OrdreMissionPreview";
import OrdreMissionRenderer from '@/components/pdf-templates/OrdreMissionRenderer';
import { OrdreMissionData } from "@/types/ordre-mission";

// Reçu de Paiement
import RecuPaiementForm from "@/components/RecuPaiementForm";
import RecuPaiementPreview from "@/components/RecuPaiementPreview";
import RecuPaiementRenderer from '@/components/pdf-templates/RecuPaiementRenderer';
import { RecuPaiementData } from "@/types/recu-paiement";

// Bon de Commande
import BonCommandeForm from "@/components/BonCommandeForm";
import BonCommandePreview from "@/components/BonCommandePreview";
import BonCommandeRenderer from '@/components/pdf-templates/BonCommandeRenderer';
import { BonCommandeData } from "@/types/bon-commande";

// Fiche de Besoin
import FicheBesoinForm from "@/components/FicheBesoinForm";
import FicheBesoinPreview from "@/components/FicheBesoinPreview";
import FicheBesoinRenderer from '@/components/pdf-templates/FicheBesoinRenderer';
import { FicheBesoinData } from "@/types/fiche-besoin";

// ─── Helpers ────────────────────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split('T')[0];
const nowTime = () => { const n = new Date(); return `${String(n.getHours()).padStart(2,'0')}:${String(n.getMinutes()).padStart(2,'0')}`; };
const uid = () => Math.random().toString(36).slice(2, 8).toUpperCase();

// ─── Initial data ────────────────────────────────────────────────────────────

const initialInvoiceData: InvoiceData = {
  senderName: "Emetteur",
  senderSlogan: "Solutions Numériques & Développement Web",
  senderEmail: "etarcos3@gmail.com",
  senderPhone: "+(237) 656 954 474",
  recipientName: "Recepteur de la facture",
  recipientAddress: "Ville, Région — Pays",
  invoiceNumber: `${new Date().getFullYear()}-${String(Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime())/86400000)).padStart(3,'0')}`,
  invoiceDate: "Ville, le xx/xx/xxxx",
  invoiceValidity: "30 jours",
  subject: "Objet de la facture",
  fontFamily: "Arial, Helvetica, sans-serif",
  template: "classic",
  items: [
    { id: "1", designation: "Renouvellement de l'hébergement web", description: "Reconduction annuelle de l'hébergement du site institutionnel sur serveur dédié sécurisé.", quantity: "1 an", price: 150000 },
    { id: "2", designation: "Augmentation de la base de données", description: "Extension de la capacité de stockage de la base de données.", quantity: "1 forfait", price: 100000 },
    { id: "3", designation: "Mise à jour technique et optimisation de la plateforme", description: "Mise à niveau des dépendances, optimisation des performances et ajustements SEO.", quantity: "1 forfait", price: 150000 },
  ]
};

const INST = { institutionName: "UNIVERSITE INTERNATIONALE", institutionSubtitle: "JEAN PAUL II DE BAFANG", institutionLocation: "Bafang, Cameroun", institutionDepartment: "Cellule Informatique" };

const initialBordereauData: BordereauData = {
  ...INST, numeroBordereau: `BRD-${new Date().getFullYear()}-${uid()}`,
  dateReception: todayStr(), heure: nowTime(),
  serviceDepartement: "", dateEnvoi: "", nomAgent: "", fonction: "", contactPoste: "",
  intituleObjet: "", referenceInterne: "",
  natureDossier: { administratif: false, technique: false, pedagogique: false, financier: false, autreNature: false, autreNatureTexte: "" },
  support: { papier: false, numerique: false, courriel: false, autreSupport: false, autreSupportTexte: "" },
  documents: [{ id: "1", designation: "", nombrePages: "", observations: "" }, { id: "2", designation: "", nombrePages: "", observations: "" }, { id: "3", designation: "", nombrePages: "", observations: "" }],
  degreeUrgence: "normal", delaiTraitement: "", transmisA: "", instructionsParticulieres: "",
  etatDossier: { complet: false, incomplet: false, endommage: false }, observationsEtat: "",
  nomPrenomEmetteur: "", dateSignatureEmetteur: "", nomPrenomReceptionniste: "", dateSignatureReceptionniste: "",
};

const initialOrdreMissionData: OrdreMissionData = {
  ...INST, numeroOrdre: `OM-${new Date().getFullYear()}-${uid()}`, dateEmission: todayStr(),
  nomPrenom: "", grade: "", fonction: "", departement: "", matricule: "",
  objetMission: "", destination: "", dateDepart: "", dateRetour: "", duree: "1",
  moyenTransport: { vehiculeService: false, vehiculePersonnel: false, transport_commun: false, avion: false, autre: false, autreTexte: "" },
  perDiemJournalier: 0, fraisTransport: 0, autresFrais: 0, devise: "FCFA",
  observations: "", autorisePar: "", titreAutorisateur: "Directeur Général", dateSignature: todayStr(), lieuSignature: "Bafang",
};

const initialRecuData: RecuPaiementData = {
  ...INST, numeroRecu: `RCP-${new Date().getFullYear()}-${uid()}`, dateRecu: todayStr(), heure: nowTime(),
  recuDe: "", adressePayeur: "", sommeChiffres: 0,
  motif: "", reference: "",
  modePaiement: { especes: false, mobileMoney: false, virement: false, cheque: false, autre: false, autreTexte: "" },
  operateur: "", numeroTransaction: "", nomCaissier: "", dateSignature: todayStr(),
};

const initialBonCommandeData: BonCommandeData = {
  ...INST, numeroBon: `BC-${new Date().getFullYear()}-${uid()}`, dateCommande: todayStr(),
  fournisseurNom: "", fournisseurAdresse: "", fournisseurContact: "",
  items: [
    { id: "1", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
    { id: "2", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
    { id: "3", designation: "", unite: "pcs", quantite: 1, prixUnitaire: 0 },
  ],
  delaiLivraison: "", lieuLivraison: "Campus UIJPII, Bafang", modePaiement: "Virement bancaire", conditions: "",
  demandeurNom: "", demandeurFonction: "", validateurNom: "", validateurFonction: "", directeurNom: "", directeurFonction: "Directeur Général", dateSignature: todayStr(),
};

const initialFicheBesoinData: FicheBesoinData = {
  ...INST, numeroFiche: `FB-${new Date().getFullYear()}-${uid()}`, dateDemande: todayStr(),
  demandeurNom: "", demandeurFonction: "", departementDemandeur: "",
  motifBesoin: "", dateSouhaitee: "",
  items: [
    { id: "1", designation: "", unite: "pcs", quantite: 1, estimationPrix: 0 },
  ],
  dateSignatureDemandeur: todayStr(), responsableNom: "", responsableFonction: "", dateSignatureResponsable: "", directionNom: "", directionFonction: "Directeur Général", dateSignatureDirection: "",
};

// ─── Tab config ──────────────────────────────────────────────────────────────
type TabId = 'invoice' | 'bordereau' | 'ordre-mission' | 'recu-paiement' | 'bon-commande' | 'fiche-besoin';

const TABS = [
  { id: 'invoice' as TabId,        label: 'Factures',              icon: FileText,      activeColor: 'bg-blue-600',     desc: 'Créez vos factures proforma' },
  { id: 'bordereau' as TabId,      label: 'Bordereaux',            icon: ClipboardList, activeColor: 'bg-[#1a2e5a]',    desc: 'Bordereaux de réception de dossier' },
  { id: 'ordre-mission' as TabId,  label: 'Ordres de Mission',     icon: Navigation,    activeColor: 'bg-[#1a2e5a]',    desc: 'Autorisez les déplacements officiels' },
  { id: 'fiche-besoin' as TabId,   label: 'Fiches de Besoin',      icon: ClipboardList, activeColor: 'bg-teal-700',     desc: 'Exprimez vos besoins matériels' },
  { id: 'recu-paiement' as TabId,  label: 'Reçus de Paiement',    icon: Receipt,       activeColor: 'bg-green-700',    desc: 'Attestez les paiements reçus' },
  { id: 'bon-commande' as TabId,   label: 'Bons de Commande',      icon: ShoppingCart,  activeColor: 'bg-[#7c3aed]',    desc: 'Commandez du matériel auprès des fournisseurs' },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('invoice');

  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData);
  const [bordereauData, setBordereauData] = useState<BordereauData>(initialBordereauData);
  const [ordreMissionData, setOrdreMissionData] = useState<OrdreMissionData>(initialOrdreMissionData);
  const [recuData, setRecuData] = useState<RecuPaiementData>(initialRecuData);
  const [bonCommandeData, setBonCommandeData] = useState<BonCommandeData>(initialBonCommandeData);
  const [ficheBesoinData, setFicheBesoinData] = useState<FicheBesoinData>(initialFicheBesoinData);

  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      let blob: Blob;
      let filename: string;
      switch (activeTab) {
        case 'invoice':
          blob = await pdf(<PDFRenderer data={invoiceData} />).toBlob();
          filename = `Facture_${invoiceData.invoiceNumber || 'Document'}.pdf`; break;
        case 'bordereau':
          blob = await pdf(<BordereauRenderer data={bordereauData} />).toBlob();
          filename = `Bordereau_${bordereauData.numeroBordereau || 'Reception'}.pdf`; break;
        case 'ordre-mission':
          blob = await pdf(<OrdreMissionRenderer data={ordreMissionData} />).toBlob();
          filename = `OrdreMission_${ordreMissionData.numeroOrdre || 'OM'}.pdf`; break;
        case 'recu-paiement':
          blob = await pdf(<RecuPaiementRenderer data={recuData} />).toBlob();
          filename = `Recu_${recuData.numeroRecu || 'RCP'}.pdf`; break;
        case 'bon-commande':
          blob = await pdf(<BonCommandeRenderer data={bonCommandeData} />).toBlob();
          filename = `BonCommande_${bonCommandeData.numeroBon || 'BC'}.pdf`; break;
        case 'fiche-besoin':
          blob = await pdf(<FicheBesoinRenderer data={ficheBesoinData} />).toBlob();
          filename = `FicheBesoin_${ficheBesoinData.numeroFiche || 'FB'}.pdf`; break;
        default: return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = filename; link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const activeTabConfig = TABS.find(t => t.id === activeTab)!;

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-[1700px] mx-auto">

        {/* ── Header ── */}
        <header className="mb-5 flex justify-between items-center bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">ETARCOS BILL</h1>
              <p className="text-gray-500 text-xs">Créez et téléchargez vos documents officiels au format PDF.</p>
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className={`flex items-center gap-2 px-4 py-2 ${activeTabConfig.activeColor} hover:opacity-90 disabled:opacity-50 text-white rounded-lg transition-all shadow-sm font-medium text-sm`}
          >
            <Download size={16} />
            {isGenerating ? 'Génération...' : `Télécharger PDF`}
          </button>
        </header>

        {/* ── Tabs ── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive ? `${tab.activeColor} text-white shadow-sm` : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                  <Icon size={14} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-1">{activeTabConfig.desc}</p>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="w-full xl:w-5/12 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">
            {activeTab === 'invoice'        && <InvoiceForm      initialData={invoiceData}      onDataChange={setInvoiceData} />}
            {activeTab === 'bordereau'      && <BordereauForm    initialData={bordereauData}    onDataChange={setBordereauData} />}
            {activeTab === 'ordre-mission'  && <OrdreMissionForm initialData={ordreMissionData} onDataChange={setOrdreMissionData} />}
            {activeTab === 'fiche-besoin'   && <FicheBesoinForm  initialData={ficheBesoinData}  onDataChange={setFicheBesoinData} />}
            {activeTab === 'recu-paiement'  && <RecuPaiementForm initialData={recuData}         onDataChange={setRecuData} />}
            {activeTab === 'bon-commande'   && <BonCommandeForm  initialData={bonCommandeData}  onDataChange={setBonCommandeData} />}
          </div>
          <div className="w-full xl:w-7/12 bg-gray-200 p-6 rounded-xl flex justify-center items-start shadow-inner">
            {activeTab === 'invoice'        && <PDFPreview           data={invoiceData} />}
            {activeTab === 'bordereau'      && <BordereauPreview     data={bordereauData} />}
            {activeTab === 'ordre-mission'  && <OrdreMissionPreview  data={ordreMissionData} />}
            {activeTab === 'fiche-besoin'   && <FicheBesoinPreview   data={ficheBesoinData} />}
            {activeTab === 'recu-paiement'  && <RecuPaiementPreview  data={recuData} />}
            {activeTab === 'bon-commande'   && <BonCommandePreview   data={bonCommandeData} />}
          </div>
        </div>
      </div>
    </main>
  );
}
