'use client';
import React, { useState, useEffect } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ChatModal from './chat/ChatModal';
import UploadModal from './Dashboard/UploadModal';
import StatCard from './Dashboard/StatCard';
import DocumentTable from './Dashboard/DocumentTable';
import DashboardCharts from './Dashboard/DashboardCharts'; // <-- 1. IMPORT
import { API_BASE_URL } from '../utils/api';
import { ProcessedDocument } from '../app/types';
import CategoryProgressCard from './Dashboard/CategoryProgressCard';
import CategoryDonutCard from './Dashboard/CategoryDonusCard';
interface ChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<ChatButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 right-6 bg-secondary/90 text-primary-darker w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary"
    title="Open AI Assistant"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  </button>
);

const DashboardPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [needsRefetch, setNeedsRefetch] = useState<boolean>(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (needsRefetch) {
        try {
          const response = await fetch(`${API_BASE_URL}/documents`);
          const data = (await response.json()) as ProcessedDocument[];
          setDocuments(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch documents:", error);
          setDocuments([]);
        } finally {
          setNeedsRefetch(false);
        }
      }
    };
    fetchDocuments();
  }, [needsRefetch]);

  const handleUploadSuccess = () => {
    setIsUploadOpen(false);
    setNeedsRefetch(true);
  };

  const totalAmount = documents.reduce((acc, doc) => acc + parseFloat(doc.data.totalAmount || '0'), 0);
  const totalDocs = documents.length;
  const avgSpend = totalDocs > 0 ? totalAmount / totalDocs : 0;
  
  const spendingByCategory = documents.reduce((acc, doc) => {
    const category = doc.data.category || 'Other';
    const amount = parseFloat(doc.data.totalAmount || '0');
    
    const existing = acc.find(item => item.name === category);
    if (existing) {
      existing.amount += amount;
    } else {
      acc.push({ name: category, amount: amount });
    }
    return acc;
  }, [] as { name: string; amount: number; }[]).sort((a, b) => b.amount - a.amount);

  const topCategory = spendingByCategory[0] || { name: 'N/A', amount: 0 };

  return (
    <div className="flex min-h-screen flex-col gap-16 p-sm sm:p-md items-center">
      
      
      <main className="flex grow items-center justify-between w-full lg:w-4/5 flex-col gap-16">
        <div className="flex flex-col items-stretch gap-16 overflow-hidden w-full">
        <Header onUploadClick={() => setIsUploadOpen(true)} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <CategoryProgressCard
              category={topCategory.name}
              amount={topCategory.amount}
              total={totalAmount}
            />
            
            <StatCard 
              title="Total Documents" 
              value={totalDocs} 
              subtext="PROCESSED FILES" 
            />
            
            <CategoryDonutCard 
              topCategoryName={topCategory.name}
              topCategoryAmount={topCategory.amount}
              totalAmount={totalAmount}
            />
            
            <StatCard 
              title="Total Spending" 
              prefix="₹"
              value={totalAmount.toFixed(0)} 
              subtext="ACROSS ALL DOCUMENTS" 
            />
            
            <StatCard 
              title="Avg. Spend" 
              prefix="₹"
              value={avgSpend.toFixed(0)} 
              subtext="PER DOCUMENT" 
            />
          </div>

          <DocumentTable documents={documents} />
        </div>
      </main>
      
      

      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default DashboardPage;