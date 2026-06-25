'use client';
import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { BonCommandeData } from '@/types/bon-commande';
import BonCommandeRenderer from './pdf-templates/BonCommandeRenderer';

export default function BonCommandePreview({ data }: { data: BonCommandeData }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return (
    <div className="w-full h-[800px] flex items-center justify-center bg-gray-100 rounded-lg">
      <p className="text-gray-500">Chargement...</p>
    </div>
  );
  return (
    <div className="w-full h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      <PDFViewer width="100%" height="100%" className="border-none">
        <BonCommandeRenderer data={data} />
      </PDFViewer>
    </div>
  );
}
