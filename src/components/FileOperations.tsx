import React, { useState } from 'react';
import { Upload, Download, AlertCircle } from 'lucide-react';
import { exportText, importText } from '../utils/fileOperations';

interface FileOperationsProps {
  content: string;
  onContentChange: (content: string) => void;
}

export default function FileOperations({ content, onContentChange }: FileOperationsProps) {
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      await exportText(content, 'teleprompter-text');
      setError(null);
    } catch (err) {
      setError('שגיאה בייצוא הקובץ');
    }
  };

  const handleImport = async () => {
    try {
      const text = await importText();
      onContentChange(text);
      setError(null);
    } catch (err) {
      setError('שגיאה בייבוא הקובץ');
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <button
          onClick={handleImport}
          className="btn-secondary"
          title="ייבא טקסט"
        >
          <Upload className="w-4 h-4" />
          <span>ייבא</span>
        </button>

        <button
          onClick={handleExport}
          className="btn-secondary"
          title="ייצא טקסט"
        >
          <Download className="w-4 h-4" />
          <span>ייצא</span>
        </button>
      </div>

      {error && (
        <div className="absolute top-full mt-2 right-0 bg-red-500 text-white 
                       text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}