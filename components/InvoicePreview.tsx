import { InvoiceData } from "@/types/invoice";
import { forwardRef } from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ElegantTemplate from "./templates/ElegantTemplate";
import StartupTemplate from "./templates/StartupTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import EcoTemplate from "./templates/EcoTemplate";
import RetroTemplate from "./templates/RetroTemplate";
import FuturisticTemplate from "./templates/FuturisticTemplate";

interface InvoicePreviewProps {
  data: InvoiceData;
}

const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ data }, ref) => {
  switch (data.template) {
    case 'modern':
      return <ModernTemplate data={data} ref={ref} />;
    case 'minimalist':
      return <MinimalistTemplate data={data} ref={ref} />;
    case 'creative':
      return <CreativeTemplate data={data} ref={ref} />;
    case 'elegant':
      return <ElegantTemplate data={data} ref={ref} />;
    case 'startup':
      return <StartupTemplate data={data} ref={ref} />;
    case 'corporate':
      return <CorporateTemplate data={data} ref={ref} />;
    case 'eco':
      return <EcoTemplate data={data} ref={ref} />;
    case 'retro':
      return <RetroTemplate data={data} ref={ref} />;
    case 'futuristic':
      return <FuturisticTemplate data={data} ref={ref} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} ref={ref} />;
  }
});

InvoicePreview.displayName = "InvoicePreview";
export default InvoicePreview;
