'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import PDFRenderer from './PDFRenderer';

interface PDFPreviewProps {
  data: InvoiceData;
  isGenerating?: boolean; // For compatibility if page.tsx still tracks it
}

export default function PDFPreview({ data }: PDFPreviewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement de la prévisualisation PDF...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="w-full h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <PDFViewer width="100%" height="100%" className="border-none">
          <PDFRenderer data={data} />
        </PDFViewer>
      </div>
    </div>
  );
}
