import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { InternshipJournalEntry } from '../types';
import { Layers, Plus } from 'lucide-react';

export const InternshipReturnHub: React.FC = () => {
  const { internships, addInternshipEntry, updateInternshipEntry } = useApp();
  const [activeEntryId, setActiveEntryId] = useState<string | null>(
    internships.length > 0 ? internships[0].id : null
  );

  const [showNewModal, setShowNewModal] = useState(false);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');

  const currentEntry = internships.find((i) => i.id === activeEntryId);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim()) return;
    const newEntry: InternshipJournalEntry = {
      id: 'int-' + Date.now(),
      internshipCompany: company,
      roleTitle: role || 'Platform Engineering Intern',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      mentorName: '',
      deliverables: [],
      technicalDecisionsMade: [],
      bugsDiagnosedAndFixed: [],
      documentationWritten: [],
      managerFeedback: [],
      oneToOneReviewNotes: '',
      fourDimensions: {
        technicalExecution: '',
        ownershipAndJudgment: '',
        writtenCommunication: '',
        businessImpact: ''
      },
      returnOfferStatus: 'pending'
    };
    addInternshipEntry(newEntry);
    setActiveEntryId(newEntry.id);
    setShowNewModal(false);
    setCompany('');
    setRole('');
  };

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-lg border border-slate-800 bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>Internship-to-Full-Time Offer Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track daily engineering ownership, 1:1 manager feedback, and qualitative evidence across
            the 4 dimensions required for full-time conversion.
          </p>
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Internship Workspace</span>
        </button>
      </div>

      {internships.length === 0 ? (
        <div className="p-8 border border-dashed border-slate-800 rounded-lg text-center text-xs text-slate-400">
          No internship logged yet. Once you land your 2nd or 3rd-year internship, activate this hub to track conversion readiness.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-2 md:col-span-1">
            {internships.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveEntryId(item.id)}
                className={`w-full text-left p-3 rounded border text-xs transition ${
                  activeEntryId === item.id
                    ? 'bg-slate-800 border-emerald-500 text-slate-100'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/50'
                }`}
              >
                <div className="font-semibold">{item.internshipCompany}</div>
                <div className="text-[11px] text-slate-400">{item.roleTitle}</div>
                <div className="text-[10px] font-mono text-emerald-400 mt-1 uppercase">
                  Status: {item.returnOfferStatus}
                </div>
              </button>
            ))}
          </div>

          {/* Main workspace */}
          {currentEntry && (
            <div className="md:col-span-3 space-y-4 bg-slate-900 p-5 rounded-lg border border-slate-800 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    {currentEntry.internshipCompany} — {currentEntry.roleTitle}
                  </h3>
                  <span className="text-slate-400 text-[11px]">Started: {currentEntry.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Return Offer Status:</span>
                  <select
                    value={currentEntry.returnOfferStatus}
                    onChange={(e) =>
                      updateInternshipEntry({
                        ...currentEntry,
                        returnOfferStatus: e.target.value as any
                      })
                    }
                    className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
                  >
                    <option value="pending">Pending Midpoint</option>
                    <option value="received">Return Offer Received</option>
                    <option value="accepted">Accepted Full-Time</option>
                    <option value="declined">Declined</option>
                    <option value="rejected">Not Converted</option>
                  </select>
                </div>
              </div>

              {/* Four Dimensions of Return Offer Conversion */}
              <div>
                <h4 className="font-semibold text-slate-200 text-xs mb-2">
                  Four Evaluation Dimensions (Required for Conversion Decision)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <span className="font-medium text-emerald-400 block">
                      1. Technical Execution & Code Quality
                    </span>
                    <textarea
                      rows={3}
                      value={currentEntry.fourDimensions.technicalExecution}
                      onChange={(e) =>
                        updateInternshipEntry({
                          ...currentEntry,
                          fourDimensions: {
                            ...currentEntry.fourDimensions,
                            technicalExecution: e.target.value
                          }
                        })
                      }
                      placeholder="e.g. Delivered 4 PRs with 100% test coverage; addressed all senior review remarks constructively."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-200 text-[11px]"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <span className="font-medium text-emerald-400 block">
                      2. Ownership & Engineering Judgment
                    </span>
                    <textarea
                      rows={3}
                      value={currentEntry.fourDimensions.ownershipAndJudgment}
                      onChange={(e) =>
                        updateInternshipEntry({
                          ...currentEntry,
                          fourDimensions: {
                            ...currentEntry.fourDimensions,
                            ownershipAndJudgment: e.target.value
                          }
                        })
                      }
                      placeholder="e.g. Raised production outage risk with unindexed queries and escalated to DBA before deploy."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-200 text-[11px]"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <span className="font-medium text-emerald-400 block">
                      3. Written Communication & Team Sync
                    </span>
                    <textarea
                      rows={3}
                      value={currentEntry.fourDimensions.writtenCommunication}
                      onChange={(e) =>
                        updateInternshipEntry({
                          ...currentEntry,
                          fourDimensions: {
                            ...currentEntry.fourDimensions,
                            writtenCommunication: e.target.value
                          }
                        })
                      }
                      placeholder="e.g. Authored complete onboarding troubleshooting guide; logged concise weekly progress summaries."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-200 text-[11px]"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <span className="font-medium text-emerald-400 block">
                      4. Measurable Operational / Business Impact
                    </span>
                    <textarea
                      rows={3}
                      value={currentEntry.fourDimensions.businessImpact}
                      onChange={(e) =>
                        updateInternshipEntry({
                          ...currentEntry,
                          fourDimensions: {
                            ...currentEntry.fourDimensions,
                            businessImpact: e.target.value
                          }
                        })
                      }
                      placeholder="e.g. Reduced log ingestion pipeline latency by 32% via connection pool reuse."
                      className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-slate-200 text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* New Internship Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-sm w-full p-5 space-y-3 text-xs text-slate-200">
            <h3 className="font-semibold text-sm">Start Internship Tracking</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-slate-400 mb-1">Company *</label>
                <input
                  required
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Canonical, Red Hat, Postman"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Role Title</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. SRE Intern"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-emerald-600 text-white rounded font-medium"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
