import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobOpportunity, WorkArrangement, IndiaEligibility, ApplicationStatus } from '../types';
import { Briefcase, Plus, ExternalLink, Filter, Trash2 } from 'lucide-react';

export const JobTracker: React.FC = () => {
  const { jobs, addJobOpportunity, updateJobOpportunity, deleteJobOpportunity } = useApp();

  const [filterArrangement, setFilterArrangement] = useState<string>('all');
  const [filterIndia, setFilterIndia] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for adding an opportunity
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [roleFamily, setRoleFamily] = useState<'cloud-infrastructure' | 'platform-engineering' | 'distributed-systems' | 'sre' | 'backend'>('cloud-infrastructure');
  const [jobUrl, setJobUrl] = useState('');
  const [positionType, setPositionType] = useState<'internship' | 'full-time'>('internship');
  const [workArrangement, setWorkArrangement] = useState<WorkArrangement>('fully-remote');
  const [indiaEligibility, setIndiaEligibility] = useState<IndiaEligibility>('confirmed-eligible');
  const [eligibilitySourceNote, setEligibilitySourceNote] = useState('');
  const [gradYears, setGradYears] = useState('2030');
  const [skills, setSkills] = useState('');
  const [applicationOpens, setApplicationOpens] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [returnOfferPathway, setReturnOfferPathway] = useState(true);

  const filteredJobs = jobs.filter((job) => {
    if (filterArrangement !== 'all' && job.workArrangement !== filterArrangement) return false;
    if (filterIndia !== 'all' && job.indiaEligibility !== filterIndia) return false;
    return true;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !jobTitle.trim()) return;

    const newJob: JobOpportunity = {
      id: 'job-' + Date.now(),
      companyName,
      jobTitle,
      roleFamily,
      jobUrl: jobUrl || 'https://',
      positionType,
      permittedLocation: workArrangement === 'fully-remote' ? 'India (Remote)' : 'Bangalore / Hybrid',
      workArrangement,
      indiaEligibility,
      eligibilitySourceNote: eligibilitySourceNote || 'Manually verified via careers portal.',
      eligibleGraduationYears: gradYears.split(',').map((y) => parseInt(y.trim())).filter((n) => !isNaN(n)),
      minimumDegree: 'B.Tech CSE',
      requiredSkills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      applicationOpens: applicationOpens || 'Rolling',
      applicationDeadline: applicationDeadline || 'Unspecified',
      returnOfferPathwayDocumented: returnOfferPathway,
      status: 'saved',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      followUpDate: '',
      notes: ''
    };

    addJobOpportunity(newJob);
    setShowAddModal(false);
    setCompanyName('');
    setJobTitle('');
    setJobUrl('');
    setEligibilitySourceNote('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-lg border border-slate-800 bg-slate-900">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Internship & Opportunity Tracker</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Strict distinction between <strong>Fully Remote</strong> vs <strong>Explicit India Eligibility</strong>.
            Never assume "Remote" implies legal right to work from Kerala, India.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-semibold self-start sm:self-auto transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Opportunity</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded text-xs">
        <div className="flex items-center gap-1 text-slate-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Filters:</span>
        </div>

        <div>
          <select
            value={filterArrangement}
            onChange={(e) => setFilterArrangement(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300"
          >
            <option value="all">All Work Arrangements</option>
            <option value="fully-remote">Fully Remote Only</option>
            <option value="hybrid">Hybrid Only</option>
            <option value="on-site">On-Site Only</option>
          </select>
        </div>

        <div>
          <select
            value={filterIndia}
            onChange={(e) => setFilterIndia(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300"
          >
            <option value="all">All India Statuses</option>
            <option value="confirmed-eligible">Confirmed India Eligible</option>
            <option value="potentially-eligible">Potentially Eligible (Verify)</option>
            <option value="not-eligible">Not Eligible in India</option>
          </select>
        </div>
      </div>

      {/* Opportunity Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-lg bg-slate-900">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[10px]">
            <tr>
              <th className="p-3">Company & Role</th>
              <th className="p-3">Work Arrangement</th>
              <th className="p-3">India Eligibility</th>
              <th className="p-3">Grad Year</th>
              <th className="p-3">Deadline</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredJobs.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-slate-400">
                  No opportunities match the selected criteria.
                </td>
              </tr>
            ) : (
              filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-800/40">
                  <td className="p-3">
                    <div className="font-semibold text-slate-100">{job.companyName}</div>
                    <div className="text-[11px] text-slate-400">{job.jobTitle}</div>
                    <a
                      href={job.jobUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:underline inline-flex items-center gap-1 text-[10px] mt-0.5"
                    >
                      <ExternalLink className="w-2.5 h-2.5" /> Official Career Link
                    </a>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                        job.workArrangement === 'fully-remote'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {job.workArrangement}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${
                        job.indiaEligibility === 'confirmed-eligible'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {job.indiaEligibility}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1 max-w-xs truncate" title={job.eligibilitySourceNote}>
                      {job.eligibilitySourceNote}
                    </div>
                  </td>
                  <td className="p-3 font-mono">{job.eligibleGraduationYears.join(', ')}</td>
                  <td className="p-3 font-mono text-slate-400">{job.applicationDeadline}</td>
                  <td className="p-3">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        updateJobOpportunity({
                          ...job,
                          status: e.target.value as ApplicationStatus
                        })
                      }
                      className="bg-slate-950 border border-slate-800 text-[11px] rounded p-1 text-slate-200"
                    >
                      <option value="saved">Saved</option>
                      <option value="in-progress">In Progress</option>
                      <option value="submitted">Submitted</option>
                      <option value="interviewing">Interviewing</option>
                      <option value="offered">Offered</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteJobOpportunity(job.id)}
                      className="text-slate-400 hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add Opportunity */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full p-5 space-y-3 text-xs text-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="font-semibold text-sm">Add Tracked Opportunity</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Company Name *</label>
                  <input
                    required
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Canonical, Cloudflare"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Job Title *</label>
                  <input
                    required
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Cloud Infrastructure Intern"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Official Career Posting URL</label>
                <input
                  type="url"
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                  placeholder="https://company.com/careers/posting-id"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Work Arrangement</label>
                  <select
                    value={workArrangement}
                    onChange={(e) => setWorkArrangement(e.target.value as WorkArrangement)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  >
                    <option value="fully-remote">Fully Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="on-site">On-Site</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Explicit India Eligibility</label>
                  <select
                    value={indiaEligibility}
                    onChange={(e) => setIndiaEligibility(e.target.value as IndiaEligibility)}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  >
                    <option value="confirmed-eligible">Confirmed India Eligible</option>
                    <option value="potentially-eligible">Potentially Eligible (Verify)</option>
                    <option value="not-eligible">Not Eligible for India</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Source Note for Eligibility Claim</label>
                <input
                  type="text"
                  value={eligibilitySourceNote}
                  onChange={(e) => setEligibilitySourceNote(e.target.value)}
                  placeholder="e.g. Verified company maintains an Indian subsidiary in Bengaluru."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">Eligible Grad Years</label>
                  <input
                    type="text"
                    value={gradYears}
                    onChange={(e) => setGradYears(e.target.value)}
                    placeholder="2029, 2030"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Application Deadline</label>
                  <input
                    type="text"
                    value={applicationDeadline}
                    onChange={(e) => setApplicationDeadline(e.target.value)}
                    placeholder="e.g. 2028-11-30 or Rolling"
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
