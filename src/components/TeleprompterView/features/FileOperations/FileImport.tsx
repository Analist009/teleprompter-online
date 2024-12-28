import React from 'react';
import { Upload } from 'lucide-react';
import { useFileImport } from './hooks/useFileImport';

interface FileImportProps {
  onImport: (content: string) => void;
}

export default function FileImport({ onImport }: FileImportProps) {
  const { importFile, isLoading, error } = useFileImport();

  const handleImport = async () => {
    const content = await importFile();
    if (content) {
      onImport(content);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleImport}
        disabled={isLoading}
        className="btn-secondary"
        title="ייבא טקסט"
      >
        <Upload className="w-4 h-4" />
        <span>ייבא</span>
      </button>
      
      {error && (
        <div className="absolute top-full mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}