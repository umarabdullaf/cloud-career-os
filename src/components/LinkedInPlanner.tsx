import React from 'react';
import { useApp } from '../context/AppContext';
import { Share2 } from 'lucide-react';

export const LinkedInPlanner: React.FC = () => {
  const { curriculum, activePhaseId, updateLinkedInPost } = useApp();
  const currentPhase = curriculum.find((p) => p.id === activePhaseId) || curriculum[0];

  return (
    <div className="space-y-6">
      <div className="p-5 rounded-lg border border-slate-800 bg-slate-900">
        <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-400" />
          <span>Weekly LinkedIn Publishing Planner</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1 max-w-3xl">
          Publish proof of real engineering lessons and bugs, not hollow promotional hype.
          Quality and technical honesty outshine vanity metrics.
        </p>
      </div>

      <div className="space-y-4">
        {currentPhase.weeks.map((week) => {
          const post = week.linkedInPostIdea;
          return (
            <div key={week.id} className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <div>
                  <span className="font-mono text-emerald-400 text-[10px]">
                    Week {week.weekNumber} Publishing Slot
                  </span>
                  <h3 className="font-semibold text-slate-100 text-sm">{post.suggestedAngle}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Status:</span>
                  <select
                    value={post.status}
                    onChange={(e) =>
                      updateLinkedInPost(
                        currentPhase.id,
                        week.id,
                        post.postText || '',
                        e.target.value as any
                      )
                    }
                    className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-slate-200"
                  >
                    <option value="planned">Planned</option>
                    <option value="drafted">Drafted</option>
                    <option value="published">Published</option>
                    <option value="skipped">Skipped (Exams / Rest)</option>
                  </select>
                </div>
              </div>

              <div>
                <strong className="text-slate-300">Evidence / Artifact to Attach: </strong>
                <span className="text-slate-400">{post.evidenceToAttach}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-[11px] text-slate-300">
                {post.draftOutline}
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Post Draft (Optional)</label>
                <textarea
                  rows={3}
                  value={post.postText || ''}
                  onChange={(e) =>
                    updateLinkedInPost(currentPhase.id, week.id, e.target.value, post.status)
                  }
                  placeholder="Draft your thoughts here before copying to LinkedIn..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};