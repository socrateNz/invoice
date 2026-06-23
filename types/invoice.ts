export interface InvoiceItem {
  id: string;
  designation: string;
  description: string;
  quantity: string;
  price: number;
}

export interface InvoiceData {
  senderName: string;
  senderSlogan: string;
  senderEmail: string;
  senderPhone: string;
  
  recipientName: string;
  recipientAddress: string;
  
  invoiceNumber: string;
  invoiceDate: string;
  invoiceValidity: string;
  
  subject: string;
  fontFamily?: string;
  template: 'classic' | 'modern' | 'minimalist' | 'creative' | 'elegant' | 'startup' | 'corporate' | 'eco' | 'retro' | 'futuristic';
  
  items: InvoiceItem[];
  
  // Pagination
  isFirstPage?: boolean;
  isLastPage?: boolean;
  pageIndex?: number;
  totalPages?: number;
  grandTotal?: number;
}
