import React, { useRef } from 'react';
import { useEditorState } from './hooks/useEditorState';
import { useEditorActions } from './hooks/useEditorActions';
import EditorHeader from './components/EditorHeader';
import EditorContent from './components/EditorContent';
import EditorSidebar from './components/EditorSidebar';
import Testimonials from './components/Testimonials';
import SEOTags from './components/SEOTags';
import Footer from './components/Footer';

const TeleprompterEditor: React.FC = () => {
  const {
    content,
    setContent,
    settings,
    updateSettings,
    resetSettings,
    showSettings,
    setShowSettings
  } = useEditorState();
  
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    handleSave,
    handleImport,
    handleExport,
    toggleSettings
  } = useEditorActions({
    content,
    onContentChange: setContent,
    setShowSettings
  });

  return (
    <>
      <SEOTags />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex flex-col min-h-screen gap-6">
          <EditorHeader
            onSave={handleSave}
            onToggleSettings={toggleSettings}
            onImport={handleImport}
            onExport={handleExport}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow">
            <EditorContent
              textAreaRef={textAreaRef}
              content={content}
              settings={settings}
              onContentChange={setContent}
            />
            <EditorSidebar
              showSettings={showSettings}
              settings={settings}
              onSettingsChange={updateSettings}
              onResetSettings={resetSettings}
            />
          </div>

          <Testimonials />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TeleprompterEditor;