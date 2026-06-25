import React from 'react';
import { BonCommandeData } from '@/types/bon-commande';
import BonCommandePDF from './BonCommandePDF';
import BonCommandeModernePDF from './BonCommandeModernePDF';
import BonCommandePrestigePDF from './BonCommandePrestigePDF';

export default function BonCommandeRenderer({ data }: { data: BonCommandeData }) {
  switch (data.template) {
    case 'moderne':  return <BonCommandeModernePDF data={data} />;
    case 'prestige': return <BonCommandePrestigePDF data={data} />;
    case 'classique':
    default:         return <BonCommandePDF data={data} />;
  }
}
