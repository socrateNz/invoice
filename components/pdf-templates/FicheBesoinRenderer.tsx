import React from 'react';
import { FicheBesoinData } from '@/types/fiche-besoin';
import FicheBesoinPDF from './FicheBesoinPDF';
import FicheBesoinModernePDF from './FicheBesoinModernePDF';
import FicheBesoinPrestigePDF from './FicheBesoinPrestigePDF';

export default function FicheBesoinRenderer({ data }: { data: FicheBesoinData }) {
  switch (data.template) {
    case 'moderne':  return <FicheBesoinModernePDF data={data} />;
    case 'prestige': return <FicheBesoinPrestigePDF data={data} />;
    case 'classique':
    default:         return <FicheBesoinPDF data={data} />;
  }
}
