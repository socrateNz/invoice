"use client";

import { useState, useRef } from "react";
import { Download, FileText, ClipboardList } from 'lucide-react';
import InvoiceForm from "@/components/InvoiceForm";
import PDFPreview from "@/components/PDFPreview";
import BordereauForm from "@/components/BordereauForm";
import BordereauPreview from "@/components/BordereauPreview";
import { InvoiceData } from "@/types/invoice";
import { BordereauData } from "@/types/bordereau";
import { pdf } from '@react-pdf/renderer';
import PDFRenderer from '@/components/PDFRenderer';
import BordereauPDF from '@/components/pdf-templates/BordereauPDF';

// ─── Invoice helpers ────────────────────────────────────────────────────────
const generateInvoiceNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return `${now.getFullYear()}-${dayOfYear}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
};

const initialInvoiceData: InvoiceData = {
  senderName: "Emetteur",
  senderSlogan: "Solutions Numériques & Développement Web",
  senderEmail: "etarcos3@gmail.com",
  senderPhone: "+(237) 656 954 474",
  recipientName: "Recepteur de la facture",
  recipientAddress: "Ville, Région — Pays",
  invoiceNumber: generateInvoiceNumber(),
  invoiceDate: "Ville, le xx/xx/xxxx",
  invoiceValidity: "30 jours",
  subject: "Objet de la facture",
  fontFamily: "Arial, Helvetica, sans-serif",
  template: "classic",
  items: [
    {
      id: "1",
      designation: "Renouvellement de l'hébergement web",
      description: "Reconduction annuelle de l'hébergement du site institutionnel sur serveur dédié sécurisé, incluant la disponibilité 24h/24, la sauvegarde automatique et le support technique.",
      quantity: "1 an",
      price: 150000
    },
    {
      id: "2",
      designation: "Augmentation de la base de données",
      description: "Extension de la capacité de stockage de la base de données afin de répondre à la croissance des données académiques et administratives de l'université.",
      quantity: "1 forfait",
      price: 100000
    },
    {
      id: "3",
      designation: "Mise à jour technique et optimisation de la plateforme",
      description: "Périmètre des travaux inclus :\n• Mise à niveau des dépendances et composants du socle technique afin de garantir la compatibilité avec les standards actuels.\n• Optimisation des performances front-end et back-end pour réduire les temps de réponse et améliorer l'expérience utilisateur.\n• Implémentation d'optimisations SEO techniques et améliorations de l'indexabilité des contenus.\n• Ajustements de l'infrastructure numérique pour garantir une meilleure disponibilité et une montée en charge maîtrisée.",
      quantity: "1 forfait",
      price: 150000
    }
  ]
};

// ─── Bordereau helpers ───────────────────────────────────────────────────────
const generateBorderauNumber = () => {
  const now = new Date();
  return `BRD-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
};

const todayStr = () => new Date().toISOString().split('T')[0];
const nowTimeStr = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

const initialBordereauData: BordereauData = {
  numeroBordereau: generateBorderauNumber(),
  dateReception: todayStr(),
  heure: nowTimeStr(),

  institutionName: "UNIVERSITE INTERNATIONALE",
  institutionSubtitle: "JEAN PAUL II DE BAFANG",
  institutionLocation: "Bafang, Cameroun",
  institutionDepartment: "Cellule Informatique",

  serviceDepartement: "",
  dateEnvoi: "",
  nomAgent: "",
  fonction: "",
  contactPoste: "",

  intituleObjet: "",
  referenceInterne: "",
  natureDossier: {
    administratif: false,
    technique: false,
    pedagogique: false,
    financier: false,
    autreNature: false,
    autreNatureTexte: "",
  },
  support: {
    papier: false,
    numerique: false,
    courriel: false,
    autreSupport: false,
    autreSupportTexte: "",
  },

  documents: [
    { id: "1", designation: "", nombrePages: "", observations: "" },
    { id: "2", designation: "", nombrePages: "", observations: "" },
    { id: "3", designation: "", nombrePages: "", observations: "" },
  ],

  degreeUrgence: "normal",
  delaiTraitement: "",
  transmisA: "",
  instructionsParticulieres: "",

  etatDossier: {
    complet: false,
    incomplet: false,
    endommage: false,
  },
  observationsEtat: "",

  nomPrenomEmetteur: "",
  dateSignatureEmetteur: "",
  nomPrenomReceptionniste: "",
  dateSignatureReceptionniste: "",
};

type TabId = 'invoice' | 'bordereau';

// ─── Page Component ──────────────────────────────────────────────────────────
export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('invoice');

  // Invoice state
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(initialInvoiceData);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  // Bordereau state
  const [bordereauData, setBordereauData] = useState<BordereauData>(initialBordereauData);
  const [isGeneratingBordereau, setIsGeneratingBordereau] = useState(false);

  const generateInvoicePDF = async () => {
    setIsGeneratingInvoice(true);
    try {
      const blob = await pdf(<PDFRenderer data={invoiceData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Facture_${invoiceData.invoiceNumber || 'Document'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGeneratingInvoice(false);
    }
  };

  const generateBordereauPDF = async () => {
    setIsGeneratingBordereau(true);
    try {
      const blob = await pdf(<BordereauPDF data={bordereauData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Bordereau_${bordereauData.numeroBordereau || 'Reception'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erreur lors de la génération du bordereau", error);
      alert("Une erreur est survenue lors de la génération du bordereau PDF.");
    } finally {
      setIsGeneratingBordereau(false);
    }
  };

  const tabs = [
    {
      id: 'invoice' as TabId,
      label: 'Factures',
      icon: FileText,
      description: 'Créez et téléchargez vos factures proforma',
    },
    {
      id: 'bordereau' as TabId,
      label: 'Bordereaux de Réception',
      icon: ClipboardList,
      description: 'Générez vos bordereaux de réception de dossier',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">

        {/* ── App Header ── */}
        <header className="mb-6 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ETARCOS BILL</h1>
              <p className="text-gray-500 text-sm">Créez et téléchargez vos documents officiels au format PDF.</p>
            </div>
          </div>
          <div className="flex gap-3">
            {activeTab === 'invoice' ? (
              <button
                onClick={generateInvoicePDF}
                disabled={isGeneratingInvoice}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors shadow-sm font-medium"
              >
                <Download size={18} />
                {isGeneratingInvoice ? 'Génération...' : 'Télécharger Facture'}
              </button>
            ) : (
              <button
                onClick={generateBordereauPDF}
                disabled={isGeneratingBordereau}
                className="flex items-center gap-2 px-4 py-2 bg-[#1a2e5a] hover:bg-[#243d78] disabled:bg-[#1a2e5a]/50 text-white rounded-lg transition-colors shadow-sm font-medium"
              >
                <Download size={18} />
                {isGeneratingBordereau ? 'Génération...' : 'Télécharger Bordereau'}
              </button>
            )}
          </div>
        </header>

        {/* ── Tabs Navigation ── */}
        <div className="mb-6">
          <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? tab.id === 'invoice'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-[#1a2e5a] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-500 mt-2 ml-1">
            {tabs.find(t => t.id === activeTab)?.description}
          </p>
        </div>

        {/* ── Tab Content: Factures ── */}
        {activeTab === 'invoice' && (
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="w-full xl:w-5/12 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar pr-2">
              <InvoiceForm initialData={invoiceData} onDataChange={setInvoiceData} />
            </div>
            <div className="w-full xl:w-7/12 bg-gray-200 p-8 rounded-lg flex justify-center items-start shadow-inner">
              <PDFPreview data={invoiceData} isGenerating={isGeneratingInvoice} />
            </div>
          </div>
        )}

        {/* ── Tab Content: Bordereaux ── */}
        {activeTab === 'bordereau' && (
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="w-full xl:w-5/12 overflow-y-auto max-h-[calc(100vh-220px)] custom-scrollbar pr-2">
              <BordereauForm initialData={bordereauData} onDataChange={setBordereauData} />
            </div>
            <div className="w-full xl:w-7/12 bg-gray-200 p-8 rounded-lg flex justify-center items-start shadow-inner">
              <BordereauPreview data={bordereauData} />
            </div>
          </div>
        )}
      </div>

      {/* Print only styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          body * { visibility: hidden; }
          .custom-scrollbar { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area {
            position: absolute; left: 0; top: 0;
            width: 100%; margin: 0; padding: 0; box-shadow: none;
          }
        }
      `}} />
    </main>
  );
}
