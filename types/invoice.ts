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
  
  items: InvoiceItem[];
}
