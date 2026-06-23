"use client";

import { useState, useRef } from "react";
import InvoiceForm from "@/components/InvoiceForm";
import InvoicePreview from "@/components/InvoicePreview";
import { InvoiceData } from "@/types/invoice";
import { Download, Printer } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const generateInvoiceNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return `${now.getFullYear()}-${dayOfYear}-${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}`;
};

const initialData: InvoiceData = {
  senderName: "ETARCOS DEV",
  senderSlogan: "Solutions Numériques & Développement Web",
  senderEmail: "etarcos3@gmail.com",
  senderPhone: "+(237) 656 954 474",
  
  recipientName: "Université Internationale Jean Paul 2 de Bafang",
  recipientAddress: "Bafang, Région de l'Ouest — Cameroun",
  
  invoiceNumber: generateInvoiceNumber(),
  invoiceDate: "Douala, le 22 juin 2026",
  invoiceValidity: "30 jours",
  
  subject: "Services d'hébergement, d'infrastructure et de maintenance du site web institutionnel",
  fontFamily: "Arial, Helvetica, sans-serif",
  
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

export default function Home() {
  const [data, setData] = useState<InvoiceData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!previewRef.current) return;
    
    setIsGenerating(true);
    try {
      // Use higher scale for better quality
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // A4 portrait
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`Facture_${data.invoiceNumber || 'Document'}.pdf`);
    } catch (error) {
      console.error("Erreur lors de la génération du PDF", error);
      alert("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Générateur de Factures PRO</h1>
              <p className="text-gray-500 text-sm">Créez et téléchargez vos factures au format PDF.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              <Printer size={18} /> Imprimer
            </button>
            <button 
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors shadow-sm"
            >
              <Download size={18} /> 
              {isGenerating ? 'Génération...' : 'Télécharger PDF'}
            </button>
          </div>
        </header>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Form section */}
          <div className="w-full xl:w-5/12 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar pr-2">
            <InvoiceForm initialData={data} onDataChange={setData} />
          </div>

          {/* Preview section */}
          <div className="w-full xl:w-7/12 bg-gray-200 p-8 rounded-lg overflow-x-auto flex justify-center items-start shadow-inner">
            <div className="scale-[0.6] sm:scale-[0.7] md:scale-[0.8] lg:scale-[0.9] xl:scale-[0.85] 2xl:scale-100 origin-top shadow-2xl transition-transform">
              <InvoicePreview ref={previewRef} data={data} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Print only styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          .custom-scrollbar {
             visibility: hidden;
          }
          /* We want to print ONLY the preview ref content */
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            box-shadow: none;
          }
        }
      `}} />
    </main>
  );
}
