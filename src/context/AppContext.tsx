import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Phase,
  JobOpportunity,
  CompetencyItem,
  InternshipJournalEntry,
  WeeklyReflection,
  ProgressStatus
} from '../types';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { INITIAL_COMPETENCIES } from '../data/competencyData';
import { INITIAL_JOBS } from '../data/initialJobsData';

interface AppContextType {
  curriculum: Phase[];
  jobs: JobOpportunity[];
  competencies: CompetencyItem[];
  internships: InternshipJournalEntry[];
  reflections: WeeklyReflection[];
  activePhaseId: number;
  setActivePhaseId: (id: number) => void;
  updateTaskStatus: (phaseId: number, weekId: string, status: ProgressStatus) => void;
  updateDeliverable: (
    phaseId: number,
    weekId: string,
    deliverableId: string,
    updates: { status: ProgressStatus; repoUrl?: string; exitCriteriaMet?: boolean }
  ) => void;
  updateLinkedInPost: (
    phaseId: number,
    weekId: string,
    postText: string,
    status: 'planned' | 'drafted' | 'published' | 'skipped'
  ) => void;
  addJobOpportunity: (job: JobOpportunity) => void;
  updateJobOpportunity: (job: JobOpportunity) => void;
  deleteJobOpportunity: (id: string) => void;
  updateCompetency: (id: string, updates: Partial<CompetencyItem>) => void;
  addInternshipEntry: (entry: InternshipJournalEntry) => void;
  updateInternshipEntry: (entry: InternshipJournalEntry) => void;
  addReflection: (reflection: WeeklyReflection) => void;
  exportDataAsJson: () => string;
  importDataFromJson: (jsonData: string) => { success: boolean; message: string };
  resetToDefault: () => void;
}

const STORAGE_KEY = 'cloud_career_os_v1_data';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [curriculum, setCurriculum] = useState<Phase[]>(CURRICULUM_DATA);
  const [jobs, setJobs] = useState<JobOpportunity[]>(INITIAL_JOBS);
  const [competencies, setCompetencies] = useState<CompetencyItem[]>(INITIAL_COMPETENCIES);
  const [internships, setInternships] = useState<InternshipJournalEntry[]>([]);
  const [reflections, setReflections] = useState<WeeklyReflection[]>([]);
  const [activePhaseId, setActivePhaseId] = useState<number>(0);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.curriculum) setCurriculum(parsed.curriculum);
        if (parsed.jobs) setJobs(parsed.jobs);
        if (parsed.competencies) setCompetencies(parsed.competencies);
        if (parsed.internships) setInternships(parsed.internships);
        if (parsed.reflections) setReflections(parsed.reflections);
      }
    } catch (err) {
      console.error('Failed to parse stored localStorage data:', err);
    }
  }, []);

  // Save to LocalStorage on update
  useEffect(() => {
    try {
      const payload = {
        version: '1.0.0',
        lastUpdated: new Date().toISOString(),
        curriculum,
        jobs,
        competencies,
        internships,
        reflections
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [curriculum, jobs, competencies, internships, reflections]);

  const updateTaskStatus = (phaseId: number, weekId: string, status: ProgressStatus) => {
    setCurriculum((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          weeks: phase.weeks.map((w) => (w.id === weekId ? { ...w, status } : w))
        };
      })
    );
  };

  const updateDeliverable = (
    phaseId: number,
    weekId: string,
    deliverableId: string,
    updates: { status: ProgressStatus; repoUrl?: string; exitCriteriaMet?: boolean }
  ) => {
    setCurriculum((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          weeks: phase.weeks.map((w) => {
            if (w.id !== weekId) return w;
            return {
              ...w,
              deliverables: w.deliverables.map((del) => {
                if (del.id !== deliverableId) return del;
                return { ...del, ...updates };
              })
            };
          })
        };
      })
    );
  };

  const updateLinkedInPost = (
    phaseId: number,
    weekId: string,
    postText: string,
    status: 'planned' | 'drafted' | 'published' | 'skipped'
  ) => {
    setCurriculum((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          weeks: phase.weeks.map((w) => {
            if (w.id !== weekId) return w;
            return {
              ...w,
              linkedInPostIdea: {
                ...w.linkedInPostIdea,
                postText,
                status
              }
            };
          })
        };
      })
    );
  };

  const addJobOpportunity = (job: JobOpportunity) => {
    setJobs((prev) => [job, ...prev]);
  };

  const updateJobOpportunity = (job: JobOpportunity) => {
    setJobs((prev) => prev.map((j) => (j.id === job.id ? job : j)));
  };

  const deleteJobOpportunity = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  const updateCompetency = (id: string, updates: Partial<CompetencyItem>) => {
    setCompetencies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const addInternshipEntry = (entry: InternshipJournalEntry) => {
    setInternships((prev) => [entry, ...prev]);
  };

  const updateInternshipEntry = (entry: InternshipJournalEntry) => {
    setInternships((prev) => prev.map((item) => (item.id === entry.id ? entry : item)));
  };

  const addReflection = (reflection: WeeklyReflection) => {
    setReflections((prev) => [reflection, ...prev]);
  };

  const exportDataAsJson = (): string => {
    return JSON.stringify(
      {
        version: '1.0.0',
        exportDate: new Date().toISOString(),
        institution: 'TKM College of Engineering, Kerala',
        cohort: '2026-2030',
        curriculum,
        jobs,
        competencies,
        internships,
        reflections
      },
      null,
      2
    );
  };

  const importDataFromJson = (jsonData: string): { success: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonData);
      if (!parsed.curriculum || !Array.isArray(parsed.curriculum)) {
        return { success: false, message: 'Invalid format: Missing curriculum array.' };
      }
      setCurriculum(parsed.curriculum);
      if (Array.isArray(parsed.jobs)) setJobs(parsed.jobs);
      if (Array.isArray(parsed.competencies)) setCompetencies(parsed.competencies);
      if (Array.isArray(parsed.internships)) setInternships(parsed.internships);
      if (Array.isArray(parsed.reflections)) setReflections(parsed.reflections);
      return { success: true, message: 'Data imported and verified successfully.' };
    } catch (e: any) {
      return { success: false, message: `JSON Parse error: ${e.message}` };
    }
  };

  const resetToDefault = () => {
    setCurriculum(CURRICULUM_DATA);
    setJobs(INITIAL_JOBS);
    setCompetencies(INITIAL_COMPETENCIES);
    setInternships([]);
    setReflections([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AppContext.Provider
      value={{
        curriculum,
        jobs,
        competencies,
        internships,
        reflections,
        activePhaseId,
        setActivePhaseId,
        updateTaskStatus,
        updateDeliverable,
        updateLinkedInPost,
        addJobOpportunity,
        updateJobOpportunity,
        deleteJobOpportunity,
        updateCompetency,
        addInternshipEntry,
        updateInternshipEntry,
        addReflection,
        exportDataAsJson,
        importDataFromJson,
        resetToDefault
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
