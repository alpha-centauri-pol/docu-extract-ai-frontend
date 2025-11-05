'use client';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { API_BASE_URL } from '@/utils/api';
import { ChatMessage } from '@/app/types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ type: 'ai', text: 'Hi! Ask me anything about your documents.' }]);
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    const userMsg: ChatMessage = { type: 'user', text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion('');
    setIsReplying(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuestion: question }),
      });
      const { answer }: { answer: string } = await response.json();
      const aiMsg: ChatMessage = { type: 'ai', text: answer };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = { type: 'ai', text: 'Sorry, I had trouble answering that.' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsReplying(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AI Finance Assistant">
      <div className="h-64 overflow-y-auto mb-4 p-2 bg-primary-dark/50 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <span className={`inline-block p-2 rounded-lg max-w-xs font-neue-montreal ${
              msg.type === 'user' ? 'bg-secondary text-primary' : 'bg-primary-dark text-primary-inactive'
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
        {isReplying && (
          <div className="justify-start flex"><span className="inline-block p-2 rounded-lg bg-primary-dark text-primary-inactive italic">AI is typing...</span></div>
        )}
      </div>
      
      <div className="flex">
        <input
          type="text"
          value={question}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuestion(e.target.value)}
          placeholder="e.g., How much did I spend on food?"
          className="flex-grow bg-primary-dark/50 border border-tertiary/30 rounded-l-3xs p-2 text-primary font-neue-montreal focus:outline-none focus:ring-1 focus:ring-tertiary"
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && !isReplying && handleSend()}
        />
        <button onClick={handleSend} disabled={isReplying} className="inline-flex items-center justify-center rounded-r-3xs font-neue-montreal font-medium text-sm transition-colors bg-tertiary/90 text-[#000000] hover:bg-tertiary px-4 disabled:opacity-50">
          Send
        </button>
      </div>
    </Modal>
  );
};

export default ChatModal;