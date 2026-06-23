import React from 'react';
import { InvoiceData } from '@/types/invoice';
import ClassicPDF from './pdf-templates/ClassicPDF';
import ModernPDF from './pdf-templates/ModernPDF';
import MinimalistPDF from './pdf-templates/MinimalistPDF';
import CreativePDF from './pdf-templates/CreativePDF';
import ElegantPDF from './pdf-templates/ElegantPDF';
import StartupPDF from './pdf-templates/StartupPDF';
import CorporatePDF from './pdf-templates/CorporatePDF';
import EcoPDF from './pdf-templates/EcoPDF';
import RetroPDF from './pdf-templates/RetroPDF';
import FuturisticPDF from './pdf-templates/FuturisticPDF';

interface PDFRendererProps {
  data: InvoiceData;
}

const PDFRenderer: React.FC<PDFRendererProps> = ({ data }) => {
  switch (data.template) {
    case 'modern': return <ModernPDF data={data} />;
    case 'minimalist': return <MinimalistPDF data={data} />;
    case 'creative': return <CreativePDF data={data} />;
    case 'elegant': return <ElegantPDF data={data} />;
    case 'startup': return <StartupPDF data={data} />;
    case 'corporate': return <CorporatePDF data={data} />;
    case 'eco': return <EcoPDF data={data} />;
    case 'retro': return <RetroPDF data={data} />;
    case 'futuristic': return <FuturisticPDF data={data} />;
    case 'classic':
    default: return <ClassicPDF data={data} />;
  }
};

export default PDFRenderer;
