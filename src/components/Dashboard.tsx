import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  ArrowRight,
  ExternalLink,
  FileEdit
} from 'lucide-react';

export const Dashboard: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  const { curriculum, activePhaseId, jobs, competencies, addReflection, reflections } = useApp();
  const currentPhase = curriculum.find((p) => p.id === activePhaseId) || curriculum[0];
  const activeWeek = currentPhase.weeks[0];

  // Reflection form state
  const [showReflectionModal, setShowReflectionModal] = useState(false);
  const [whatBuilt, setWhatBuilt] = useState('');
  const [unassistedExplained, setUnassistedExplained] = useState('');
  const [debugLog, setDebugLog] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [nextPriority, setNextPriority] = useState('');
  const [workloadNote, setWorkloadNote] = useState('');

  // Count deliverables and status
  let totalWeeks = 0;
  let completedWeeks = 0;
  curriculum.forEach((p) => {
    p.weeks.forEach((w) => {
      totalWeeks++;
      if (w.status === 'completed' || w.status === 'assessment-passed') {
        completedWeeks++;
      }
    });
  });

  const verifiedIndependentCompetencies = competencies.filter(
    (c) =>
      c.currentLevel === 'demonstrated-independently' ||
      c.currentLevel === 'demonstrated-in-substantial-project'
  ).length;

  const urgentJobs = jobs.filter(
    (j) => j.status === 'saved' || j.status === 'in-progress'
  );

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatBuilt.trim()) return;
    addReflection({
      id: 'ref-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      phaseId: activePhaseId,
      weekNumber: activeWeek ? activeWeek.weekNumber : 1,
      whatDidIBuild: whatBuilt,
      unassistedExplanation: unassistedExplained,
      debugStory: debugLog,
      evidencePublishedUrl: evidenceUrl,
      nextPriorityTask: nextPriority,
      collegeWorkloadAdjustmentNote: workloadNote
    });
    setWhatBuilt('');
    setUnassistedExplained('');
    setDebugLog('');
    setEvidenceUrl('');
    setNextPriority('');
    setWorkloadNote('');
    setShowReflectionModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Target & Realism Header */}
      <div className="p-5 rounded-lg border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 mb-2">
              <span>TARGET: TIER-1 FULLY REMOTE FROM INDIA (2026–2030)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              Cloud Infrastructure & Backend Systems Roadmap
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              10–12 hours/week commitment. Progress requires public code, passing automated tests,
              and verifiable documentation. No fabricated achievements.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowReflectionModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold shadow transition"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Log Weekly Review</span>
            </button>
          </div>
        </div>

        {/* Real Progress Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 block">Current Focus</span>
            <span className="font-semibold text-slate-200">Phase {activePhaseId} (Target 2026)</span>
          </div>
          <div>
            <span className="text-slate-400 block">Curriculum Progress</span>
            <span className="font-semibold text-slate-200">
              {completedWeeks} / {totalWeeks} modules verified
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Evidence-Backed Skills</span>
            <span className="font-semibold text-emerald-400">
              {verifiedIndependentCompetencies} / {competencies.length} verified
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Tracked Opportunities</span>
            <span className="font-semibold text-slate-200">{jobs.length} listed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Phase & Week Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Active Sprint
                </span>
                <h2 className="text-base font-semibold text-slate-100">{currentPhase.title}</h2>
              </div>
              <button
                onClick={() => onNavigate('curriculum')}
                className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition"
              >
                <span>Curriculum Details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Phase Exit Requirement:</span>
              </div>
              <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                {currentPhase.exitRequirement}
              </div>
            </div>

            {/* Active Week Deliverables */}
            {activeWeek && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Current Tasks: Week {activeWeek.weekNumber} — {activeWeek.title}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-mono">
                    ~{activeWeek.estimatedHours} hrs scheduled
                  </span>
                </div>

                <div className="space-y-2">
                  {activeWeek.deliverables.map((del) => (
                    <div
                      key={del.id}
                      className="p-3 bg-slate-950/70 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="text-xs font-medium text-slate-200">{del.title}</div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{del.description}</p>
                      </div>
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                            del.status === 'completed'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {del.status}
                        </span>
                        {del.repoUrl ? (
                          <a
                            href={del.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Code
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">No evidence link</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Weekly Reflection History */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-100 mb-3 flex items-center justify-between">
              <span>Weekly Engineering Reviews ({reflections.length})</span>
              <span className="text-[11px] text-slate-400 font-normal">Evidence of unassisted competence</span>
            </h2>

            {reflections.length === 0 ? (
              <div className="text-center py-6 border border-dashed border-slate-800 rounded text-slate-400 text-xs">
                No weekly reviews logged yet. Complete your first study week and log what you built!
              </div>
            ) : (
              <div className="space-y-3">
                {reflections.slice(0, 3).map((ref) => (
                  <div key={ref.id} className="p-3 bg-slate-950 border border-slate-800 rounded text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                      <span>Phase {ref.phaseId} • Week {ref.weekNumber}</span>
                      <span>{ref.date}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">What was built: </strong>
                      <span className="text-slate-400">{ref.whatDidIBuild}</span>
                    </div>
                    <div>
                      <strong className="text-slate-300">Unassisted explanation: </strong>
                      <span className="text-slate-400">{ref.unassistedExplanation}</span>
                    </div>
                    {ref.debugStory && (
                      <div>
                        <strong className="text-slate-300">Debugging story: </strong>
                        <span className="text-slate-400">{ref.debugStory}</span>
                      </div>
                    )}
                    {ref.evidencePublishedUrl && (
                      <div className="pt-1">
                        <a
                          href={ref.evidencePublishedUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                        >
                          <ExternalLink className="w-3 h-3" /> Published Proof / Code
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Opportunities & Competency Gaps */}
        <div className="space-y-6">
          {/* Tracked Job Deadlines */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Upcoming Applications</span>
              </h2>
              <button
                onClick={() => onNavigate('jobs')}
                className="text-xs text-slate-400 hover:text-emerald-400"
              >
                View All
              </button>
            </div>

            <div className="mt-3 space-y-3">
              {urgentJobs.length === 0 ? (
                <p className="text-xs text-slate-400 py-3">No active jobs tracked.</p>
              ) : (
                urgentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-3 bg-slate-950 border border-slate-800 rounded text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{job.companyName}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                        {job.workArrangement}
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] truncate">{job.jobTitle}</div>
                    <div className="text-[10px] text-slate-400 pt-1 flex items-center justify-between">
                      <span>India: {job.indiaEligibility}</span>
                      <span>Grad: {job.eligibleGraduationYears.join(', ')}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Planned LinkedIn Post */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
            <h2 className="text-sm font-semibold text-slate-100 mb-2 flex items-center justify-between">
              <span>This Week's LinkedIn Idea</span>
              <button
                onClick={() => onNavigate('linkedin')}
                className="text-xs text-slate-400 hover:text-emerald-400"
              >
                Planner
              </button>
            </h2>

            {activeWeek ? (
              <div className="p-3 bg-slate-950 border border-slate-800 rounded text-xs space-y-2">
                <div className="text-[11px] font-medium text-emerald-400">
                  Angle: {activeWeek.linkedInPostIdea.suggestedAngle}
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Evidence to attach:</strong> {activeWeek.linkedInPostIdea.evidenceToAttach}
                </p>
                <div className="p-2 rounded bg-slate-900 text-[11px] text-slate-300 font-mono">
                  {activeWeek.linkedInPostIdea.draftOutline}
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No active week loaded.</p>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Review Modal */}
      {showReflectionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-xl w-full p-6 text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-semibold text-base">Weekly Engineering Review</h3>
              <button
                onClick={() => setShowReflectionModal(false)}
                className="text-slate-400 hover:text-slate-200 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveReflection} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  1. What did I actually build this week? (Code, scripts, tests)
                </label>
                <textarea
                  required
                  rows={2}
                  value={whatBuilt}
                  onChange={(e) => setWhatBuilt(e.target.value)}
                  placeholder="e.g. Wrote an NGINX log parser in Python with pytest suite covering corrupted log lines."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  2. What did I learn that I can explain without assistance?
                </label>
                <textarea
                  required
                  rows={2}
                  value={unassistedExplained}
                  onChange={(e) => setUnassistedExplained(e.target.value)}
                  placeholder="e.g. The difference between buffered and unbuffered I/O and why standard streams need explicit flushing."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  3. What failed, and how did I debug it?
                </label>
                <textarea
                  rows={2}
                  value={debugLog}
                  onChange={(e) => setDebugLog(e.target.value)}
                  placeholder="e.g. Permission denied on /var/log/syslog; investigated file groups and added user to adm group instead of running as sudo."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  4. What evidence did I publish? (GitHub repo, gist, post URL)
                </label>
                <input
                  type="url"
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  placeholder="https://github.com/username/log-analyzer"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  5. What is the single most important next task?
                </label>
                <input
                  type="text"
                  value={nextPriority}
                  onChange={(e) => setNextPriority(e.target.value)}
                  placeholder="e.g. Implement Docker multi-stage build to shrink image under 40MB."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  6. Did academic workload (TKMCE exams/labs) require adjustments?
                </label>
                <input
                  type="text"
                  value={workloadNote}
                  onChange={(e) => setWorkloadNote(e.target.value)}
                  placeholder="e.g. Series exams scheduled; reduced external study from 12 hours to 6 hours."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowReflectionModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
                >
                  Save Reflection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
