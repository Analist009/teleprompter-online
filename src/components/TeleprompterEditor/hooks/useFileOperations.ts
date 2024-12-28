import { useCallback } from 'react';

interface UseFileOperationsProps {
  content: string;
  onContentChange: (content: string) => void;
}

export const useFileOperations = ({ content, onContentChange }: UseFileOperationsProps) => {
  const handleSave = useCallback(() => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teleprompter-text-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [content]);

  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result;
          if (typeof text === 'string') {
            onContentChange(text);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [onContentChange]);

  const handleExport = useCallback(() => {
    handleSave();
  }, [handleSave]);

  return {
    handleSave,
    handleImport,
    handleExport
  };
};