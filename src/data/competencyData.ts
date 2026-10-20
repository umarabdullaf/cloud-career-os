import { CompetencyItem } from '../types';

export const INITIAL_COMPETENCIES: CompetencyItem[] = [
  {
    id: 'comp-1',
    group: '1. Programming & DSA',
    skillName: 'Algorithmic Problem Solving & Big-O Verification',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 2: DSA Solutions Repository',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Solve 20 Hash Map & Array problems with written Big-O analysis'
  },
  {
    id: 'comp-2',
    group: '2. Linux & Operating Systems',
    skillName: 'Process Lifecycle, Signals & POSIX Filesystem',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 0 & Phase 2: Linux Diagnostics Toolkit',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Demonstrate bash script analyzing /proc filesystem and handling SIGTERM'
  },
  {
    id: 'comp-3',
    group: '3. Networking & Security',
    skillName: 'TCP/IP Handshake, DNS Resolution & TLS Diagnostics',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 4: Low-Level Socket Diagnostic Tool',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Capture and explain packet handshake trace using tcpdump'
  },
  {
    id: 'comp-4',
    group: '4. Backend & Databases',
    skillName: 'FastAPI, Schema Validation & PostgreSQL Indexing',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 3: Async Task Management API',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Run EXPLAIN ANALYZE showing query plan improvement from B-tree index'
  },
  {
    id: 'comp-5',
    group: '5. Cloud Architecture & IAM',
    skillName: 'Least-Privilege IAM & Cloud Resource Isolation',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 6: Terraform LocalStack Configuration',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Define granular IAM policy JSON with zero wildcard permissions'
  },
  {
    id: 'comp-6',
    group: '6. Containers & Orchestration',
    skillName: 'Multi-stage Dockerfiles & Kubernetes Manifests',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 7: K3s Service Deployment',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Build a secure, unprivileged distroless container image under 25MB'
  },
  {
    id: 'comp-7',
    group: '7. Infrastructure as Code & CI/CD',
    skillName: 'Terraform Modules, Remote State & GitHub Actions',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 6: IaC Pipeline Repository',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Configure automated pull-request validation pipeline with lint checks'
  },
  {
    id: 'comp-8',
    group: '8. Distributed Systems & Reliability',
    skillName: 'Idempotency, Retries, Backoff & Leases',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 9: Orbit Distributed Job Scheduler',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Run chaos script injecting worker failure during task execution'
  },
  {
    id: 'comp-9',
    group: '9. Testing, Debugging & Observability',
    skillName: 'Pytest, Prometheus Metrics & Structured Logs',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 1 & Phase 7: Prometheus Metric Target',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Export p95 latency counter and alert on 5xx error spikes'
  },
  {
    id: 'comp-10',
    group: '10. AI-Assisted Engineering',
    skillName: 'Safe AI Operational Tooling & Prompt Injection Defense',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 8: Incident Analysis CLI',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Implement data sanitization stripping secrets before model processing'
  },
  {
    id: 'comp-11',
    group: '11. Communication & Collaboration',
    skillName: 'ADR Documentation & Public Engineering Writing',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 0-10 Weekly LinkedIn Publishing & ADRs',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Publish 4 technical writeups with reproducible code demonstrations'
  },
  {
    id: 'comp-12',
    group: '12. Interview Readiness',
    skillName: 'System Design Architecture & Live Coding Under Scrutiny',
    currentLevel: 'not-started',
    evidenceLinks: [],
    associatedProjectDeliverable: 'Phase 10: Interview Briefing Portfolio',
    lastDemonstratedDate: '',
    nextVerificationAction: 'Execute 45-minute mock system design session explaining Orbit trade-offs'
  }
];
