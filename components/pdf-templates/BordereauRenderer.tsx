import React from 'react';
import { BordereauData } from '@/types/bordereau';
import BordereauPDF from './BordereauPDF';
import BordereauModernePDF from './BordereauModernePDF';
import BordereauPrestigePDF from './BordereauPrestigePDF';

export default function BordereauRenderer({ data }: { data: BordereauData }) {
  switch (data.template) {
    case 'moderne':  return <BordereauModernePDF data={data} />;
    case 'prestige': return <BordereauPrestigePDF data={data} />;
    case 'classique':
    default:         return <BordereauPDF data={data} />;
  }
}
