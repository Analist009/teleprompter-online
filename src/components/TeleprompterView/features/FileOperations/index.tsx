import React from 'react';
import FileImport from './FileImport';
import FileExport from './FileExport';

interface FileOperationsProps {
  content: string;
  settings: Record<string, any>;
  onImport: (content: string) => void;
}

export default function FileOperations({
  content,
  settings,
  onImport,
}: FileOperationsProps) {
  return (
    <div className="flex items-center gap-2">
      <FileImport onImport={onImport} />
      <FileExport content={content} settings={settings} />
    </div>
  );
}