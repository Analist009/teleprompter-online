import React from 'react';
import { Settings, Save, Download, Upload } from 'lucide-react';
import Clock from './Clock';

interface HeaderProps {
  onSave: () => void;
  onToggleSettings: () => void;
  onImport: () => void;
  onExport: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave, onToggleSettings, onImport, onExport }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm animate-slide-down">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">פרומפטר פרו</h1>
        <Clock />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onImport}
          className="btn-icon group"
          title="ייבא טקסט"
        >
          <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onExport}
          className="btn-icon group"
          title="ייצא טקסט"
        >
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onSave}
          className="btn-icon group"
          title="שמור טקסט"
        >
          <Save className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={onToggleSettings}
          className="btn-icon group"
          title="הגדרות"
        >
          <Settings className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </header>
  );
};

export default Header;