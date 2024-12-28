import React from 'react';
import { Download } from 'lucide-react';
import { useFileExport } from './hooks/useFileExport';

interface FileExportProps {
  content: string;
  settings: Record<string, any>;
}

export default function FileExport({ content, settings }: FileExportProps) {
  const { exportToFile, isExporting, error } = useFileExport();

  const handleExport = async () => {
    const data = {
      content,
      settings,
      version: '1.0',
      timestamp: new Date().toISOString(),
    };
    
    await exportToFile(data, 'teleprompter-script');
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="btn-secondary"
        title="ייצא טקסט"
      >
        <Download className="w-4 h-4" />
        <span>ייצא</span>
      </button>

      {error && (
        <div className="absolute top-full mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
}