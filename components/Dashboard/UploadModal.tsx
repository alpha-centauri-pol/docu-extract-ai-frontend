'use client';
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { API_BASE_URL } from '@/utils/api';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const responseStep1 = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: selectedFile.name }),
      });

      if (!responseStep1.ok) throw new Error('Failed to get upload URL');
      const { uploadUrl }: { uploadUrl: string } = await responseStep1.json();

      const responseStep2 = await fetch(uploadUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: { 'Content-Type': selectedFile.type },
      });

      if (!responseStep2.ok) throw new Error('Failed to upload file to S3');
      
      onUploadSuccess();
      setSelectedFile(null);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload New Document">
      <form onSubmit={handleSubmit} className="flex flex-col gap-md">
        <div className="flex flex-col gap-xs">
          <label htmlFor="file-upload" className="font-neue-montreal font-medium uppercase text-sm text-tertiary">Select File</label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-primary-inactive file:mr-4 file:py-2 file:px-4 file:rounded-3xs file:border-0 file:text-sm file:font-semibold file:bg-tertiary/90 file:text-primary-darker hover:file:bg-tertiary"
          />
        </div>
        
        <button type="submit" disabled={!selectedFile || isUploading} className="inline-flex items-center justify-center whitespace-nowrap rounded-3xs shadow-sm font-neue-montreal font-medium text-sm transition-colors bg-tertiary/90 text-primary-darker hover:bg-tertiary h-9 px-4 py-2 disabled:opacity-50">
          {isUploading ? 'Uploading...' : 'Upload and Process'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </Modal>
  );
};

export default UploadModal;