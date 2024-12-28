import { useState } from 'react';
import { readFileAsText } from '../utils/fileUtils';

export function useFileImport() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const importFile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt,.json';
      
      const file = await new Promise<File>((resolve) => {
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) resolve(file);
        };
        input.click();
      });

      const content = await readFileAsText(file);

      // Try parsing as JSON first (for exported files with settings)
      try {
        const data = JSON.parse(content);
        return data.content;
      } catch {
        // If not JSON, return raw content
        return content;
      }
    } catch (err) {
      setError('שגיאה בייבוא הקובץ');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { importFile, isLoading, error };
}