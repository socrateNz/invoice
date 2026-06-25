import React from 'react';
import { OrdreMissionData } from '@/types/ordre-mission';
import OrdreMissionPDF from './OrdreMissionPDF';
import OrdreMissionModernePDF from './OrdreMissionModernePDF';
import OrdreMissionPrestigePDF from './OrdreMissionPrestigePDF';

export default function OrdreMissionRenderer({ data }: { data: OrdreMissionData }) {
  switch (data.template) {
    case 'moderne':  return <OrdreMissionModernePDF data={data} />;
    case 'prestige': return <OrdreMissionPrestigePDF data={data} />;
    case 'classique':
    default:         return <OrdreMissionPDF data={data} />;
  }
}
