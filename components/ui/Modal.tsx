import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-card-dark rounded-sm shadow-xl w-full max-w-md mx-4 border border-tertiary/20">
        <div className="flex justify-between items-center p-md border-b border-tertiary/20">
          <h3 className="text-xl font-neue-montreal font-medium text-tertiary">{title}</h3>
          <button onClick={onClose} className="text-primary-inactive hover:text-primary text-2xl">&times;</button>
        </div>
        <div className="p-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;