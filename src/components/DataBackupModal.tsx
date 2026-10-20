import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileDown, FileUp, AlertTriangle } from 'lucide-react';

export const DataBackupModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { exportDataAsJson, importDataFromJson, resetToDefault } = useApp();
  const [importString, setImportString] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    const dataStr = exportDataAsJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cloud_career_os_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    if (!importString.trim()) return;
    const res = importDataFromJson(importString);
    setImportStatus(res.message);
    if (res.success) {
      setTimeout(() => {
        onClose();
        setImportStatus(null);
        setImportString('');
      }, 1000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress back to pristine defaults? This cannot be undone.')) {
      resetToDefault();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full p-6 text-slate-200 text-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <FileDown className="w-4 h-4 text-emerald-400" />
            <span>Data Persistence & Backup</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>

        <p className="text-slate-400">
          Cloud Career OS operates 100% locally on your machine with no external server tracking.
          Export regular backups to protect your project notes and evidence links.
        </p>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-2">
          <div className="font-semibold text-slate-200">Export Backup</div>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium flex items-center gap-1.5"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download JSON Snapshot</span>
          </button>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded space-y-2">
          <div className="font-semibold text-slate-200">Import / Restore Backup</div>
          <textarea
            rows={3}
            value={importString}
            onChange={(e) => setImportString(e.target.value)}
            placeholder="Paste your JSON backup data here..."
            className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-[11px] font-mono text-slate-200"
          />
          {importStatus && (
            <div className="text-[11px] font-mono text-emerald-400">{importStatus}</div>
          )}
          <button
            onClick={handleImport}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium flex items-center gap-1.5"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Validate & Restore Data</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={handleReset}
            className="text-red-400 hover:underline flex items-center gap-1"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Reset to Clean Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
