import React from 'react';

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  return (
    <div className="w-full">
      <header className="flex flex-col gap-xs overflow-hidden sm:py-rg">
        <div className="flex items-center gap-sm sm:gap-lg">
          <div className="flex items-center gap-1 uppercase font-neuebit text-2xl sm:text-4xl font-bold">
            <span className="text-primary">DocuExtract</span>
            <span className="text-tertiary">AI</span>
          </div>
          <div className="flex items-center gap-sm md:gap-lg flex-1 justify-end">
            <button 
              onClick={onUploadClick}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-3xs shadow-sm font-neue-montreal font-large text-lg transition-colors bg-tertiary/90 text-black hover:bg-tertiary h-9 px-4 py-2" 
              type="button"
            >
              Upload File
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;