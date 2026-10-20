import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompetencyItem, CompetencyLevel } from '../types';
import { Award } from 'lucide-react';

export const CompetencyMatrix: React.FC = () => {
  const { competencies, updateCompetency } = useApp();
  const [editingItem, setEditingItem] = useState<CompetencyItem | null>(null);

  const handleSave = () => {
    if (!editingItem) return;
    updateCompetency(editingItem.id, editingItem);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-lg border border-slate-800 bg-slate-900">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <span>Evidence-Based Competency Assessment</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Self-ratings do not satisfy hiring bars. Competency levels must be supported by public code,
          reproducible tests, and design trade-off explanations.
        </p>
      </div>

      <div className="space-y-3">
        {competencies.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1 md:max-w-xl">
              <span className="text-[10px] font-mono text-emerald-400">{item.group}</span>
              <h3 className="font-semibold text-slate-100 text-sm">{item.skillName}</h3>
              <p className="text-slate-400 text-[11px]">
                <strong>Associated Project:</strong> {item.associatedProjectDeliverable}
              </p>
              <p className="text-slate-400 text-[11px]">
                <strong>Next Verification Action:</strong> {item.nextVerificationAction}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start md:self-auto">
              <span
                className={`text-[11px] font-mono px-2.5 py-1 rounded border uppercase text-center ${
                  item.currentLevel === 'demonstrated-in-substantial-project'
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    : item.currentLevel === 'demonstrated-independently'
                    ? 'bg-blue-950 text-blue-300 border-blue-700'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                {item.currentLevel.replace(/-/g, ' ')}
              </span>

              <button
                onClick={() => setEditingItem({ ...item })}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition"
              >
                Update Evidence
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Competency Update Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-5 space-y-3 text-xs text-slate-200">
            <h3 className="font-bold text-sm text-slate-100">Update Competency Record</h3>
            <p className="text-slate-400">{editingItem.skillName}</p>

            <div>
              <label className="block text-slate-300 mb-1">Competency Level</label>
              <select
                value={editingItem.currentLevel}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    currentLevel: e.target.value as CompetencyLevel
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
              >
                <option value="not-started">Not Started</option>
                <option value="learning">Learning / Coursework</option>
                <option value="demonstrated-with-guidance">Demonstrated with Guidance</option>
                <option value="demonstrated-independently">Demonstrated Independently</option>
                <option value="demonstrated-in-substantial-project">
                  Demonstrated in Substantial Project (Orbit / Flagship)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Evidence URL (Repo, PR, or Article)</label>
              <input
                type="url"
                value={editingItem.evidenceLinks[0] || ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    evidenceLinks: [e.target.value]
                  })
                }
                placeholder="https://github.com/..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Next Action to Advance Level</label>
              <input
                type="text"
                value={editingItem.nextVerificationAction}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    nextVerificationAction: e.target.value
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setEditingItem(null)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
              >
                Save Competency
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
