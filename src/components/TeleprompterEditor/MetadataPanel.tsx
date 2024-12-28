import React from 'react';
import { TextMetadata } from '../../types';

interface MetadataPanelProps {
  metadata: TextMetadata;
}

const MetadataPanel = React.memo(({ metadata }: MetadataPanelProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">פרטי טקסט</h2>
      <div className="space-y-2">
        <p>מילים: {metadata.wordsCount}</p>
        <p>תווים: {metadata.charsCount}</p>
        <p>שורות: {metadata.linesCount}</p>
        <p>זמן קריאה משוער: {metadata.estimatedReadTime} דקות</p>
      </div>
    </div>
  );
});

export default MetadataPanel;