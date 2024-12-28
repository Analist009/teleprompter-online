import React from 'react';
import { Download, Upload } from 'lucide-react';
import { useFileOperations } from './hooks/useFileOperations';

interface FileOperationsProps {
  content: string;
  onContentChange: (content: string) => void;
  className?: string;
}

export default function FileOperations({ content, onContentChange, className }: FileOperationsProps) {
  const { handleExport, handleImport, isLoading, error } = useFileOperations({
    content,
    onContentChange
  });

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={handleImport}
        disabled={isLoading}
        className="btn-secondary"
        title="ייבא טקסט"
      >
        <Upload className="w-4 h-4" />
        <span>ייבא</span>
      </button>

      <button
        onClick={handleExport}
        disabled={isLoading}
        className="btn-secondary"
        title="ייצא טקסט"
      >
        <Download className="w-4 h-4" />
        <span>ייצא</span>
      </button>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
    </div>
  );
}