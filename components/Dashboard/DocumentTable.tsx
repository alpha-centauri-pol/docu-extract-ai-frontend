import React, { useState } from 'react';
import { ProcessedDocument } from '@/app/types';

interface TableRowProps {
  doc: ProcessedDocument;
}

const TableRow: React.FC<TableRowProps> = ({ doc }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { vendorName, category, invoiceDate, totalAmount } = doc.data;

  return (
    <>
      <tr 
        className="transition-colors even:bg-[#121A27] not-[thead>&]:hover:bg-secondary/15 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <td className="px-lg py-md align-middle text-[18px] text-primary">{vendorName}</td>
        <td className="px-lg py-md align-middle text-[18px] text-primary">{category}</td>
        <td className="px-lg py-md align-middle text-[18px] text-primary">
            <div className="inline-flex items-center rounded-2xs border px-4 py-2 text-[16px] font-medium transition-colors shadow-sm focus:outline-hidden border-status-active bg-primary-dark text-status-active">
            Processed
            </div>
        </td>
        <td className="px-lg py-md align-middle text-[18px] text-primary">{invoiceDate}</td>
        <td className="px-lg py-md align-middle text-[18px] text-primary">
          <div className="flex items-center gap-1">
            <div className="inline-block font-neue-montreal font-normal text-[18px] leading-[1] text-primary">₹{totalAmount}</div>
            <div className="inline-block font-neue-montreal font-normal text-[18px] leading-[1] text-primary-inactive/50">INR</div>
          </div>
        </td>
        <td className="px-lg py-md align-middle text-[18px] text-primary">
          <div className="flex items-center justify-end">
            <button className={`p-1 ${isOpen ? 'bg-[#B67CE3]' : 'bg-[#36535A]'} rounded-full transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-tertiary">
                <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z" fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {isOpen && (
        <tr className="bg-primary-dark/50">
          <td colSpan={6} className="p-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-md bg-transparent p-lg">
              
              <div className="flex flex-col gap-md p-lg bg-card-dark rounded-lg border border-tertiary/80 items-center">
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-secondary">Status</div>
                <div className="inline-block font-neuebit font-bold text-4xl lg:text-5xl leading-[1] text-primary">{doc.status}</div>
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">Document Status</div>
              </div>

              <div className="flex flex-col gap-md p-lg bg-card-dark rounded-lg border border-tertiary/80 items-center">
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1G] text-secondary">Document ID</div>
                <div className="inline-block font-neuebit font-bold text-4xl lg:text-5xl leading-[1] text-primary truncate w-full text-center">{doc.documentId.split('/').pop()}</div>
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">File Name</div>
              </div>

              <div className="flex flex-col gap-md p-lg bg-card-dark rounded-lg border border-tertiary/80 items-center">
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-secondary">Processed At</div>
                <div className="inline-block font-neuebit font-bold text-4xl lg:text-5xl leading-[1] text-primary">{new Date(doc.processedAt).toLocaleDateString()}</div>
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">Date</div>
              </div>

              <div className="flex flex-col gap-md p-lg bg-card-dark rounded-lg border border-tertiary/80 items-center">
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1G] text-secondary">Vendor</div>
                <div className="inline-block font-neuebit font-bold text-4xl lg:text-5xl leading-[1] text-primary">{doc.data.vendorName}</div>
                <div className="inline-block font-neue-montreal font-medium uppercase text-sm leading-[1] text-primary-inactive/50">Vendor Name</div>
              </div>

            </div>
          </td>
        </tr>
      )}
    </>
  );
};

interface DocumentTableProps {
  documents: ProcessedDocument[];
}

const DocumentTable: React.FC<DocumentTableProps> = ({ documents }) => {
  return (
    <div>
      <div className="rounded-lg overflow-hidden w-full">
        <div className="relative w-full overflow-auto rounded-lg border-2 border-tertiary/80 bg-[#0B0F1D] max-h-[70vh]">
          <table className="w-full caption-bottom text-sm bg-[#0B0F1D] border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="bg-card-dark">
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm">Vendor</th>
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm">Category</th>
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm">Status</th>
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm">Date</th>
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm">Total</th>
                <th className="px-lg py-md text-left font-medium font-neue-montreal text-primary uppercase text-sm"></th>
              </tr>
            </thead>
            <tbody className="border-t border-tertiary/20">
              {documents.map((doc) => <TableRow key={doc.documentId} doc={doc} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentTable;