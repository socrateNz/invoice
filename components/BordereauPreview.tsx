'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { BordereauData } from '@/types/bordereau';
import BordereauRenderer from './pdf-templates/BordereauRenderer';

interface BordereauPreviewProps {
  data: BordereauData;
}

export default function BordereauPreview({ data }: BordereauPreviewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement de la prévisualisation...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="w-full h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
        <PDFViewer width="100%" height="100%" className="border-none">
          <BordereauRenderer data={data} />
        </PDFViewer>
      </div>
    </div>
  );
}
