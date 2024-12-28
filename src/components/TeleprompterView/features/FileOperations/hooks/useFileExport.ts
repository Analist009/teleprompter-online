import { useState } from 'react';
import { downloadFile } from '../utils/fileUtils';

export function useFileExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportToFile = async (data: any, filename: string) => {
    setIsExporting(true);
    setError(null);

    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      downloadFile(blob, `${filename}-${new Date().toISOString().slice(0, 10)}.json`);
    } catch (err) {
      setError('שגיאה בייצוא הקובץ');
    } finally {
      setIsExporting(false);
    }
  };

  return { exportToFile, isExporting, error };
}