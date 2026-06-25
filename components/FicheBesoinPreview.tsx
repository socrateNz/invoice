'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { FicheBesoinData } from '@/types/fiche-besoin';
import FicheBesoinRenderer from './pdf-templates/FicheBesoinRenderer';

export default function FicheBesoinPreview({ data }: { data: FicheBesoinData }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[800px] bg-gray-100 flex items-center justify-center rounded-lg border border-gray-200">
        <div className="text-gray-400">Chargement de la prévisualisation...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      <PDFViewer width="100%" height="100%" className="border-none">
        <FicheBesoinRenderer data={data} />
      </PDFViewer>
    </div>
  );
}
