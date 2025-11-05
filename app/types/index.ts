export interface DocumentData {
    vendorName: string;
    totalAmount: string;
    invoiceDate: string;
    category: string;
  }
  
  export interface ProcessedDocument {
    documentId: string;
    status: string;
    processedAt: string;
    data: DocumentData;
  }
  
  export interface ChatMessage {
    type: 'user' | 'ai';
    text: string;
  }