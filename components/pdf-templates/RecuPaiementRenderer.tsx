import React from 'react';
import { RecuPaiementData } from '@/types/recu-paiement';
import RecuPaiementPDF from './RecuPaiementPDF';
import RecuPaiementModernePDF from './RecuPaiementModernePDF';
import RecuPaiementPrestigePDF from './RecuPaiementPrestigePDF';

export default function RecuPaiementRenderer({ data }: { data: RecuPaiementData }) {
  switch (data.template) {
    case 'moderne':  return <RecuPaiementModernePDF data={data} />;
    case 'prestige': return <RecuPaiementPrestigePDF data={data} />;
    case 'classique':
    default:         return <RecuPaiementPDF data={data} />;
  }
}
