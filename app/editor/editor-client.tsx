"use client";

import { useMemo, useState } from 'react';
import { Download, Navigation } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { toast } from 'sonner';
import Link from 'next/link';
import type { Organization } from '@prisma/client';

import { DOCUMENT_TYPES } from '@/lib/document-types/registry';
import { buildOrgDefaults } from '@/lib/document-defaults';
import DocumentPreview from '@/components/DocumentPreview';

export default function EditorClient({ organization }: { organization: Organization | null }) {
  const orgDefaults = useMemo(() => buildOrgDefaults(organization), [organization]);

  const [documentsData, setDocumentsData] = useState<Record<string, any>>(() =>
    Object.fromEntries(DOCUMENT_TYPES.map((t) => [t.id, t.createInitialData(orgDefaults)]))
  );
  // Ephemeral, per-session digital signatures (documentTypeId -> slot key -> PNG data URL).
  // Kept separate from documentsData on purpose: never merged into the payload sent to
  // /api/documents, so signatures are never persisted (for now — see SignatureField).
  const [signatures, setSignatures] = useState<Record<string, Record<string, string>>>({});
  const [activeTab, setActiveTab] = useState<string>(DOCUMENT_TYPES[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeType = DOCUMENT_TYPES.find((t) => t.id === activeTab) || DOCUMENT_TYPES[0];
  const activeData = documentsData[activeType.id];
  const activeSignatures = signatures[activeType.id] ?? {};
  const ActiveForm = activeType.Form;
  const ActiveDocument = activeType.Document;

  const updateActiveData = (data: any) => {
    setDocumentsData((prev) => ({ ...prev, [activeType.id]: data }));
  };

  const updateActiveSignature = (slot: string, dataUrl: string | null) => {
    setSignatures((prev) => {
      const next = { ...(prev[activeType.id] ?? {}) };
      if (dataUrl) next[slot] = dataUrl;
      else delete next[slot];
      return { ...prev, [activeType.id]: next };
    });
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<ActiveDocument data={{ ...activeData, signatures: activeSignatures }} />).toBlob();
      const numero = activeType.getNumero(activeData) || activeType.filenamePrefix;
      const filename = `${activeType.filenamePrefix}_${numero}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = filename; link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast.error("Une erreur est survenue lors de la génération du PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    try {
      const numero = activeType.getNumero(activeData);
      const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: activeType.id, numero, data: activeData }),
      });
      if (res.ok) toast.success("Document sauvegardé avec succès !");
      else toast.error("Erreur lors de la sauvegarde.");
    } catch (e) {
      console.error(e);
      toast.error("Erreur réseau lors de la sauvegarde.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-[1700px] mx-auto">

        {/* ── Header ── */}
        <header className="mb-5 flex justify-between items-center bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" title="Retour au tableau de bord">
              <Navigation size={20} className="text-gray-600 -rotate-90" />
            </Link>
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">Éditeur de Documents</h1>
              <p className="text-gray-500 text-xs">Créez, sauvegardez et téléchargez vos documents.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-all shadow-sm font-medium text-sm"
            >
              Sauvegarder
            </button>
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-4 py-2 ${activeType.activeColor} hover:opacity-90 disabled:opacity-50 text-white rounded-lg transition-all shadow-sm font-medium text-sm`}
            >
              <Download size={16} />
              {isGenerating ? 'Génération...' : 'Télécharger PDF'}
            </button>
          </div>
        </header>

        {/* ── Tabs ── */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
            {DOCUMENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isActive = activeType.id === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${isActive ? `${type.activeColor} text-white shadow-sm` : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'}`}
                >
                  <Icon size={14} />
                  {type.label}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-1">{activeType.description}</p>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col xl:flex-row gap-6">
          <div className="w-full xl:w-5/12 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar pr-2">
            <ActiveForm
              initialData={activeData}
              onDataChange={updateActiveData}
              signatures={activeSignatures}
              onSignatureChange={updateActiveSignature}
            />
          </div>
          <div className="w-full xl:w-7/12 bg-gray-200 p-6 rounded-xl flex justify-center items-start shadow-inner">
            <DocumentPreview document={<ActiveDocument data={{ ...activeData, signatures: activeSignatures }} />} />
          </div>
        </div>
      </div>
    </main>
  );
}
