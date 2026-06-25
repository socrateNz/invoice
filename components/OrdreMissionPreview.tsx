'use client';
import React, { useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { OrdreMissionData } from '@/types/ordre-mission';
import OrdreMissionRenderer from './pdf-templates/OrdreMissionRenderer';

export default function OrdreMissionPreview({ data }: { data: OrdreMissionData }) {
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
        <OrdreMissionRenderer data={data} />
      </PDFViewer>
    </div>
  );
}
