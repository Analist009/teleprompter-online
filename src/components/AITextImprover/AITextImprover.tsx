import React, { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { improveText, TextImprovementOptions } from '../../services/ai/geminiService';
import IndustrySelector from './IndustrySelector';
import StyleSelector from './StyleSelector';

interface AITextImproverProps {
  text: string;
  onImprovedText: (text: string) => void;
}

export default function AITextImprover({ text, onImprovedText }: AITextImproverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<TextImprovementOptions>({
    style: 'professional',
    industry: 'general',
    tone: 'formal',
    length: 'detailed'
  });

  const handleImprove = async () => {
    try {
      setIsLoading(true);
      const improvedText = await improveText(text, options);
      onImprovedText(improvedText);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to improve text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btn-secondary flex items-center gap-2"
        title="שפר טקסט עם AI"
      >
        <Wand2 className="w-4 h-4" />
        <span>שיפור AI</span>
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded-xl bg-gray-800 p-6 shadow-xl">
            <Dialog.Title className="text-xl font-semibold text-white mb-4">
              שיפור טקסט באמצעות AI
            </Dialog.Title>

            <div className="space-y-4">
              <IndustrySelector
                value={options.industry}
                onChange={(industry) => setOptions({ ...options, industry })}
              />

              <StyleSelector
                value={options.style}
                onChange={(style) => setOptions({ ...options, style })}
              />

              <div className="grid grid-cols-2 gap-4">
                <select
                  value={options.tone}
                  onChange={(e) => setOptions({ ...options, tone: e.target.value as any })}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                  <option value="formal">פורמלי</option>
                  <option value="friendly">ידידותי</option>
                  <option value="authoritative">סמכותי</option>
                </select>

                <select
                  value={options.length}
                  onChange={(e) => setOptions({ ...options, length: e.target.value as any })}
                  className="bg-gray-700 text-white rounded-lg px-4 py-2"
                >
                  <option value="concise">תמציתי</option>
                  <option value="detailed">מפורט</option>
                </select>
              </div>

              <button
                onClick={handleImprove}
                disabled={isLoading}
                className="w-full btn-primary justify-center"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    <span>שפר טקסט</span>
                  </>
                )}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}