'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer, DocumentProps } from '@react-pdf/renderer';

/** Generic live PDF preview wrapper, replacing the near-identical `{X}Preview.tsx` files
 * that used to exist per document type. Takes the react-pdf `<Document>` element itself. */
export default function DocumentPreview({ document }: { document: React.ReactElement<DocumentProps> }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[800px] bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
      <PDFViewer width="100%" height="100%" className="border-none">
        {document}
      </PDFViewer>
    </div>
  );
}
