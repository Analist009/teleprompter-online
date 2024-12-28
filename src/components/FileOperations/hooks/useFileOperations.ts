import { useState } from 'react';

interface UseFileOperationsProps {
  content: string;
  onContentChange: (content: string) => void;
}

export function useFileOperations({ content, onContentChange }: UseFileOperationsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `teleprompter-text-${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      setError('שגיאה בייצוא הקובץ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setIsLoading(true);
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const text = await file.text();
          onContentChange(text);
        }
      };
      
      input.click();
    } catch (err) {
      setError('שגיאה בייבוא הקובץ');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleExport,
    handleImport,
    isLoading,
    error
  };
}