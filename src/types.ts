export type ProgressStatus =
  | 'not-started'
  | 'in-progress'
  | 'needs-evidence'
  | 'assessment-passed'
  | 'blocked'
  | 'completed';

export interface ResourceItem {
  id: string;
  title: string;
  provider: string;
  url: string;
  resourceType: 'documentation' | 'book' | 'interactive' | 'course' | 'spec';
  durationHours: number;
  freeLearningAvailable: boolean;
  certificateOffered: boolean;
  certificateType: 'free-badge' | 'paid-certificate' | 'none';
  dateVerified: string;
  verificationNotes: string;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  description: string;
  status: ProgressStatus;
  repoUrl?: string;
  demoUrl?: string;
  architectureDiagramUrl?: string;
  writeupUrl?: string;
  exitCriteriaMet: boolean;
}

export interface WeeklyTask {
  id: string;
  phaseId: number;
  weekNumber: number;
  title: string;
  estimatedHours: number;
  status: ProgressStatus;
  keyTopics: string[];
  exercises: string[];
  resources: ResourceItem[];
  deliverables: ProjectDeliverable[];
  linkedInPostIdea: {
    suggestedAngle: string;
    evidenceToAttach: string;
    draftOutline: string;
    status: 'planned' | 'drafted' | 'published' | 'skipped';
    postText?: string;
  };
}

export interface Phase {
  id: number;
  title: string;
  timeframe: string;
  targetYear: number;
  learningObjectives: string[];
  prerequisites: string[];
  exitRequirement: string;
  weeks: WeeklyTask[];
  flagshipProject?: {
    name: string;
    description: string;
    stages: string[];
  };
}

export type WorkArrangement = 'fully-remote' | 'hybrid' | 'on-site';
export type IndiaEligibility = 'confirmed-eligible' | 'potentially-eligible' | 'not-eligible' | 'unknown';
export type ApplicationStatus = 'saved' | 'in-progress' | 'submitted' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';

export interface JobOpportunity {
  id: string;
  companyName: string;
  jobTitle: string;
  roleFamily: 'cloud-infrastructure' | 'platform-engineering' | 'distributed-systems' | 'sre' | 'backend';
  jobUrl: string;
  positionType: 'internship' | 'full-time';
  permittedLocation: string;
  workArrangement: WorkArrangement;
  indiaEligibility: IndiaEligibility;
  eligibilitySourceNote: string;
  eligibleGraduationYears: number[];
  minimumDegree: string;
  requiredSkills: string[];
  applicationOpens: string;
  applicationDeadline: string;
  expectedInternshipWindow?: string;
  returnOfferPathwayDocumented: boolean;
  status: ApplicationStatus;
  lastVerifiedDate: string;
  followUpDate: string;
  notes: string;
}

export type CompetencyLevel =
  | 'not-started'
  | 'learning'
  | 'demonstrated-with-guidance'
  | 'demonstrated-independently'
  | 'demonstrated-in-substantial-project';

export interface CompetencyItem {
  id: string;
  group: string;
  skillName: string;
  currentLevel: CompetencyLevel;
  evidenceLinks: string[];
  associatedProjectDeliverable: string;
  lastDemonstratedDate: string;
  nextVerificationAction: string;
}

export interface InternshipJournalEntry {
  id: string;
  internshipCompany: string;
  roleTitle: string;
  startDate: string;
  endDate: string;
  mentorName: string;
  deliverables: string[];
  technicalDecisionsMade: string[];
  bugsDiagnosedAndFixed: string[];
  documentationWritten: string[];
  managerFeedback: string[];
  oneToOneReviewNotes: string;
  fourDimensions: {
    technicalExecution: string;
    ownershipAndJudgment: string;
    writtenCommunication: string;
    businessImpact: string;
  };
  returnOfferStatus: 'pending' | 'received' | 'rejected' | 'accepted' | 'declined';
}

export interface WeeklyReflection {
  id: string;
  date: string;
  weekNumber: number;
  phaseId: number;
  whatDidIBuild: string;
  unassistedExplanation: string;
  debugStory: string;
  evidencePublishedUrl: string;
  nextPriorityTask: string;
  collegeWorkloadAdjustmentNote: string;
}
