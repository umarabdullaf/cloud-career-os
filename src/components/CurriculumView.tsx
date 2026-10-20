import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressStatus } from '../types';
import {
  ExternalLink,
  Layers,
  ChevronRight
} from 'lucide-react';

export const CurriculumView: React.FC = () => {
  const { curriculum, activePhaseId, setActivePhaseId, updateDeliverable, updateTaskStatus } = useApp();
  const selectedPhase = curriculum.find((p) => p.id === activePhaseId) || curriculum[0];

  // Modal for editing evidence
  const [editingDeliverable, setEditingDeliverable] = useState<{
    phaseId: number;
    weekId: string;
    delId: string;
    title: string;
    repoUrl: string;
    status: ProgressStatus;
    exitMet: boolean;
  } | null>(null);

  const handleSaveEvidence = () => {
    if (!editingDeliverable) return;
    updateDeliverable(
      editingDeliverable.phaseId,
      editingDeliverable.weekId,
      editingDeliverable.delId,
      {
        status: editingDeliverable.status,
        repoUrl: editingDeliverable.repoUrl,
        exitCriteriaMet: editingDeliverable.exitMet
      }
    );
    setEditingDeliverable(null);
  };

  return (
    <div className="space-y-6">
      {/* Phase Selection Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-slate-800 text-xs">
        {curriculum.map((phase) => {
          const isSelected = phase.id === activePhaseId;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhaseId(phase.id)}
              className={`px-3 py-2 rounded-t font-medium whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              Phase {phase.id}: {phase.title.split(':')[1]?.trim() || phase.title}
            </button>
          );
        })}
      </div>

      {/* Selected Phase Info */}
      <div className="p-5 rounded-lg border border-slate-800 bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono text-emerald-400">Target Timeframe: {selectedPhase.timeframe}</span>
            <h2 className="text-lg font-bold text-slate-100">{selectedPhase.title}</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono self-start sm:self-auto">
            Year {selectedPhase.targetYear}
          </span>
        </div>

        {/* Learning Objectives & Exit Requirement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-slate-950 rounded border border-slate-800">
            <h3 className="font-semibold text-slate-300 mb-2">Core Learning Objectives:</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              {selectedPhase.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
          <div className="p-3 bg-slate-950 rounded border border-slate-800">
            <h3 className="font-semibold text-slate-300 mb-2">Non-Negotiable Exit Requirement:</h3>
            <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
              {selectedPhase.exitRequirement}
            </p>
          </div>
        </div>

        {/* Orbit Flagship Box if Phase 9 */}
        {selectedPhase.flagshipProject && (
          <div className="p-4 bg-emerald-950/30 border border-emerald-800/60 rounded-lg text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>Flagship Project: {selectedPhase.flagshipProject.name}</span>
            </div>
            <p className="text-slate-300">{selectedPhase.flagshipProject.description}</p>
            <div className="pt-2">
              <div className="font-semibold text-slate-200 mb-1">Progressive Engineering Stages:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-400 text-[11px]">
                {selectedPhase.flagshipProject.stages.map((stg, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-1 bg-slate-900 rounded">
                    <ChevronRight className="w-3 h-3 text-emerald-500" />
                    <span>{stg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Breakdown */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
          Weekly Modules & Verifiable Deliverables
        </h3>

        {selectedPhase.weeks.map((week) => (
          <div key={week.id} className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-mono text-emerald-400">Week {week.weekNumber}</span>
                <h4 className="text-base font-semibold text-slate-100">{week.title}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-mono">{week.estimatedHours} hrs study</span>
                <select
                  value={week.status}
                  onChange={(e) =>
                    updateTaskStatus(selectedPhase.id, week.id, e.target.value as ProgressStatus)
                  }
                  className="bg-slate-950 border border-slate-700 text-xs rounded px-2 py-1 text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="needs-evidence">Needs Evidence</option>
                  <option value="assessment-passed">Assessment Passed</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Key Topics & Exercises */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <h5 className="font-semibold text-slate-300 mb-1">Key Topics Covered:</h5>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {week.keyTopics.map((top, i) => (
                    <li key={i}>{top}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-slate-300 mb-1">Practical Lab Exercises:</h5>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  {week.exercises.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Verified Free Resources */}
            <div>
              <h5 className="text-xs font-semibold text-slate-300 mb-2">Curated Free Learning Resources:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {week.resources.map((res) => (
                  <div key={res.id} className="p-2.5 bg-slate-950 border border-slate-800 rounded flex flex-col justify-between">
                    <div>
                      <div className="font-medium text-slate-200">{res.title}</div>
                      <div className="text-[11px] text-slate-400">Provider: {res.provider}</div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-400 font-mono">
                        {res.freeLearningAvailable ? '✓ 100% Free Audit/Reading' : 'Paid / Library'}
                      </span>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-300 hover:text-emerald-400 flex items-center gap-1 font-semibold"
                      >
                        Official Spec <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Deliverable & Evidence Input */}
            <div>
              <h5 className="text-xs font-semibold text-slate-300 mb-2">Project Deliverable & Evidence:</h5>
              {week.deliverables.map((del) => (
                <div
                  key={del.id}
                  className="p-3 bg-slate-950 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-200">{del.title}</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">{del.description}</p>
                    {del.repoUrl && (
                      <a
                        href={del.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px] mt-1"
                      >
                        <ExternalLink className="w-3 h-3" /> {del.repoUrl}
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setEditingDeliverable({
                        phaseId: selectedPhase.id,
                        weekId: week.id,
                        delId: del.id,
                        title: del.title,
                        repoUrl: del.repoUrl || '',
                        status: del.status,
                        exitMet: del.exitCriteriaMet
                      })
                    }
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs self-start sm:self-auto"
                  >
                    Attach Proof / Code
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Deliverable Proof Modal */}
      {editingDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-slate-100">Attach Verifiable Evidence</h3>
            <p className="text-slate-400">{editingDeliverable.title}</p>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Public GitHub Repository / Demo URL</label>
              <input
                type="url"
                value={editingDeliverable.repoUrl}
                onChange={(e) =>
                  setEditingDeliverable({ ...editingDeliverable, repoUrl: e.target.value })
                }
                placeholder="https://github.com/student/project-repo"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-medium">Deliverable Status</label>
              <select
                value={editingDeliverable.status}
                onChange={(e) =>
                  setEditingDeliverable({
                    ...editingDeliverable,
                    status: e.target.value as ProgressStatus
                  })
                }
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="needs-evidence">Needs Evidence</option>
                <option value="completed">Completed & Verified</option>
              </select>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="exitCrit"
                checked={editingDeliverable.exitMet}
                onChange={(e) =>
                  setEditingDeliverable({ ...editingDeliverable, exitMet: e.target.checked })
                }
                className="rounded bg-slate-950 border-slate-700"
              />
              <label htmlFor="exitCrit" className="text-slate-300">
                I have verified tests pass and code runs without crashing
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => setEditingDeliverable(null)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvidence}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
              >
                Save Evidence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
