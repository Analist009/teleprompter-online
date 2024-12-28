import { useCallback } from 'react';
import { useFileOperations } from './useFileOperations';

interface UseEditorActionsProps {
  content: string;
  onContentChange: (content: string) => void;
  setShowSettings: (show: boolean) => void;
}

export function useEditorActions({
  content,
  onContentChange,
  setShowSettings
}: UseEditorActionsProps) {
  const { handleSave, handleImport, handleExport } = useFileOperations({
    content,
    onContentChange,
  });

  const toggleSettings = useCallback(() => {
    setShowSettings(prev => !prev);
  }, [setShowSettings]);

  return {
    handleSave,
    handleImport,
    handleExport,
    toggleSettings,
  };
}