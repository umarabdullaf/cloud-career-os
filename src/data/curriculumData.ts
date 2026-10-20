import { Phase } from '../types';

export const CURRICULUM_DATA: Phase[] = [
  {
    id: 0,
    title: 'Phase 0: Development Environment & Engineering Workflow',
    timeframe: 'Sept 2026 – Oct 2026',
    targetYear: 2026,
    learningObjectives: [
      'Master Linux terminal navigation, permissions, and process trees on Linux Mint',
      'Configure git, SSH key management, and GitHub repository hygiene',
      'Set up clean, isolated Python environments and learn terminal debugging'
    ],
    prerequisites: ['Basic computer literacy', 'Linux Mint installed on Ryzen 3 machine'],
    exitRequirement: 'Student clones a repo, configures isolated venv, runs automated check script, and explains Linux process tree without assistance.',
    weeks: [
      {
        id: 'p0-w1',
        phaseId: 0,
        weekNumber: 1,
        title: 'Linux Fundamentals & Bash Core',
        estimatedHours: 11,
        status: 'not-started',
        keyTopics: ['POSIX Filesystem Hierarchy', 'chmod, chown, file descriptors', 'stdin, stdout, stderr, pipes'],
        exercises: [
          'Create a directory tree using mkdir -p and set granular permissions with chmod octal notation',
          'Write a shell pipeline to find top 5 largest files in /var/log and redirect errors to /dev/null'
        ],
        resources: [
          {
            id: 'res-tlcl',
            title: 'The Linux Command Line (Fifth Internet Edition)',
            provider: 'William Shotts / LinuxCommand.org',
            url: 'https://linuxcommand.org/tlcl.php',
            resourceType: 'book',
            durationHours: 15,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Completely free book online in PDF and HTML format.'
          },
          {
            id: 'res-mit-missing',
            title: 'The Missing Semester of Your CS Education: Course Shell',
            provider: 'MIT OpenCourseWare (6.092)',
            url: 'https://missing.csail.mit.edu/',
            resourceType: 'course',
            durationHours: 3,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Open lectures, notes, and exercises. No account required.'
          }
        ],
        deliverables: [
          {
            id: 'del-p0-w1',
            title: 'dotfiles and Linux bootstrap shell script',
            description: 'Shell script that provisions a clean workstation setup on Linux Mint with strict error handling (set -euo pipefail).',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Standard streams and Unix pipes for debugging',
          evidenceToAttach: 'Screenshot of bash terminal running a clean pipe command redirecting stderr to a timestamped file',
          draftOutline: '1. What I misunderstood about standard error vs output. 2. How `2>&1` works under the hood. 3. Practical snippet for debugging.',
          status: 'planned'
        }
      },
      {
        id: 'p0-w2',
        phaseId: 0,
        weekNumber: 2,
        title: 'Git Version Control & Environment Reproducibility',
        estimatedHours: 10,
        status: 'not-started',
        keyTopics: ['Git internals (blobs, trees, commits)', 'Atomic commits & semantic messages', 'Python venv and pip freeze'],
        exercises: [
          'Initialize git repo, make 5 atomic commits with Conventional Commits syntax',
          'Simulate a merge conflict locally and resolve it via CLI'
        ],
        resources: [
          {
            id: 'res-progit',
            title: 'Pro Git Book (2nd Edition)',
            provider: 'Scott Chacon & Ben Straub (Official Git Docs)',
            url: 'https://git-scm.com/book/en/v2',
            resourceType: 'book',
            durationHours: 10,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Official creative commons book hosted on git-scm.'
          }
        ],
        deliverables: [
          {
            id: 'del-p0-w2',
            title: 'Public GitHub Profile & dev-setup Repo',
            description: 'Public git repo containing developer setup, markdown documentation, and automated syntax verification check.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Understanding Git as a content-addressable key-value datastore',
          evidenceToAttach: 'CLI inspection of .git/objects using git cat-file -p',
          draftOutline: '1. Why git is not just a backup tool. 2. Inspecting SHA-1 hashes directly in .git/objects. 3. Key takeaway on commit immutability.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 1,
    title: 'Phase 1: Python, Testing & Programming Fundamentals',
    timeframe: 'Nov 2026 – Jan 2027',
    targetYear: 2026,
    learningObjectives: [
      'Write idiomatic Python using strict type hints and OOP principles',
      'Build test-driven suites using pytest and virtual environments',
      'Parse unstructured server logs and emit structured JSON reports'
    ],
    prerequisites: ['Phase 0 completion', 'Git workflow proficiency'],
    exitRequirement: 'Student produces a documented log analyzer repository with 90%+ pytest coverage, CI badge, and reproducible sample datasets.',
    weeks: [
      {
        id: 'p1-w1',
        phaseId: 1,
        weekNumber: 3,
        title: 'Python Core, Data Structures & Typing',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['Dicts, sets, list comprehensions', 'Typing module & mypy', 'Context managers and file I/O'],
        exercises: [
          'Build a script that reads 50,000 lines of mock web logs without reading the entire file into memory at once (generators)',
          'Enforce strict typing with mypy --strict'
        ],
        resources: [
          {
            id: 'res-py-docs',
            title: 'Official Python 3 Documentation & Tutorial',
            provider: 'Python Software Foundation',
            url: 'https://docs.python.org/3/tutorial/',
            resourceType: 'documentation',
            durationHours: 20,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Canonical documentation.'
          }
        ],
        deliverables: [
          {
            id: 'del-p1-loganalyzer',
            title: 'Python CLI Log Analyzer with pytest',
            description: 'Analyzes NGINX/syslog formats, extracts status code histograms and hourly traffic spikes, tested with pytest.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Memory efficiency: Python Generators vs Loading 1GB logs into memory',
          evidenceToAttach: 'Memory consumption graph comparison (sys.getsizeof vs generator execution)',
          draftOutline: '1. The problem: Out of Memory error on 8GB RAM system. 2. How `yield` streams line by line. 3. Profiling results.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Phase 2: Computer Science, DSA & Linux Systems',
    timeframe: 'Feb 2027 – May 2027',
    targetYear: 2027,
    learningObjectives: [
      'Implement fundamental Data Structures & Algorithms from scratch',
      'Understand OS processes, memory paging, file systems, and signals',
      'Develop modular Linux diagnostics utilities in Python and Shell'
    ],
    prerequisites: ['Phase 1 completed'],
    exitRequirement: 'Solve 100 targeted DSA questions (NeetCode core) and write a functional Linux diagnostics tool that reports system bottlenecks.',
    weeks: [
      {
        id: 'p2-w1',
        phaseId: 2,
        weekNumber: 4,
        title: 'Data Structures: Arrays, Two Pointers & Hash Maps',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['Time/Space complexity Big-O analysis', 'Hash tables and collision resolution', 'Two pointers technique'],
        exercises: [
          'Implement HashMap from scratch in Python with chaining',
          'Solve Two Sum, Valid Anagram, Group Anagrams with clean complexity justification'
        ],
        resources: [
          {
            id: 'res-neetcode',
            title: 'NeetCode Roadmap & Algorithms',
            provider: 'NeetCode.io',
            url: 'https://neetcode.io/roadmap',
            resourceType: 'interactive',
            durationHours: 40,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Free problems and video solutions.'
          }
        ],
        deliverables: [
          {
            id: 'del-p2-dsa-notes',
            title: 'Tested DSA Solutions Repository with Complexity Writeups',
            description: 'Clean solutions with documented time/space analysis and pytest test cases for edge scenarios.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Algorithmic Complexity in real systems: Why O(N) lookup matters in network packet filters',
          evidenceToAttach: 'Code comparison showing O(N^2) nested scan vs O(N) Hash Set benchmark',
          draftOutline: '1. Theoretical Big-O vs real microsecond execution. 2. Benchmark snippet. 3. Practical implications.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Phase 3: Backend Engineering & Databases',
    timeframe: 'June 2027 – Sept 2027',
    targetYear: 2027,
    learningObjectives: [
      'Architect robust RESTful APIs with FastAPI and Pydantic validation',
      'Model relational schemas with PostgreSQL, B-tree indexes, and ACID transactions',
      'Containerize applications with lightweight multi-stage Dockerfiles'
    ],
    prerequisites: ['Phase 2 completion'],
    exitRequirement: 'Production-ready REST API containerized with Docker, featuring SQL migrations, connection pooling, and 0 SQL injection vectors.',
    weeks: [
      {
        id: 'p3-w1',
        phaseId: 3,
        weekNumber: 5,
        title: 'FastAPI, Schemas & HTTP Semantics',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['HTTP RFC 7231 status codes and verbs', 'Idempotent HTTP methods (GET, PUT, DELETE)', 'FastAPI dependency injection'],
        exercises: [
          'Design an API schema for asynchronous task submission',
          'Implement custom middleware for request UUID tracking and latency logging'
        ],
        resources: [
          {
            id: 'res-fastapi-docs',
            title: 'FastAPI Official Documentation',
            provider: 'Tiangolo',
            url: 'https://fastapi.tiangolo.com/',
            resourceType: 'documentation',
            durationHours: 15,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Complete free interactive documentation.'
          }
        ],
        deliverables: [
          {
            id: 'del-p3-backend-api',
            title: 'Async Job Management API with Postgres & Docker',
            description: 'Task submission API with database indexing, connection pooling, Alembic migrations, and full integration tests.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Database indexing trade-offs: Why adding indexes isn’t always free',
          evidenceToAttach: 'Postgres EXPLAIN ANALYZE query plan output showing index scan vs sequential scan',
          draftOutline: '1. What EXPLAIN ANALYZE revealed about my unindexed table. 2. The write-latency penalty of indexes. 3. What I chose.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Phase 4: Networking & Systems Fundamentals',
    timeframe: 'Oct 2027 – Dec 2027',
    targetYear: 2027,
    learningObjectives: [
      'Master TCP 3-way handshake, TLS termination, DNS resolution chains',
      'Analyze network traffic using tcpdump, curl, and dig',
      'Understand race conditions, deadlocks, and worker process concurrency'
    ],
    prerequisites: ['Phase 3 completion'],
    exitRequirement: 'Build a concurrent HTTP echo/diagnostic server from low-level sockets and demonstrate load benchmarking with wrk.',
    weeks: [
      {
        id: 'p4-w1',
        phaseId: 4,
        weekNumber: 6,
        title: 'TCP/IP, Sockets & Diagnostic Tools',
        estimatedHours: 11,
        status: 'not-started',
        keyTopics: ['OSI Model vs TCP/IP stack', 'Socket API (bind, listen, accept)', 'netstat, ss, tcpdump analysis'],
        exercises: [
          'Inspect a raw HTTP request and response headers using curl -v and netcat',
          'Diagnose simulated DNS resolution failures using dig +trace'
        ],
        resources: [
          {
            id: 'res-beej',
            title: "Beej's Guide to Network Programming",
            provider: 'Brian "Beej" Hall',
            url: 'https://beej.us/guide/bgnet/',
            resourceType: 'book',
            durationHours: 18,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Canonical free network systems book.'
          }
        ],
        deliverables: [
          {
            id: 'del-p4-net-diag',
            title: 'Low-Level Socket Diagnostic Tool',
            description: 'Command line tool written in Python/Go to measure TCP connection latency and TLS handshake duration.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Deconstructing what actually happens when you type curl -v https://api.example.com',
          evidenceToAttach: 'ASCII diagram showing DNS -> TCP Handshake -> TLS ClientHello -> HTTP GET flow',
          draftOutline: '1. The hidden overhead before the first byte. 2. Measuring TLS negotiation milliseconds. 3. Why connection reuse matters.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Phase 5: Cloud Foundations & Go Programming',
    timeframe: 'Jan 2028 – April 2028',
    targetYear: 2028,
    learningObjectives: [
      'Learn idiomatic Go for systems programming and cloud tooling',
      'Understand cloud building blocks: IAM, VPC, Object Storage, Security Groups',
      'Build containerized microservices operating under zero-cost budget constraints'
    ],
    prerequisites: ['Phase 4 completion'],
    exitRequirement: 'Student writes a concurrent Go background worker and executes it locally using Docker Compose without consuming cloud funds.',
    weeks: [
      {
        id: 'p5-w1',
        phaseId: 5,
        weekNumber: 7,
        title: 'Go Language Tour, Goroutines & Channels',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['Pointers, structs, interfaces', 'Goroutines and sync.WaitGroup', 'Buffered vs unbuffered channels'],
        exercises: [
          'Complete the official Tour of Go interactive tracks',
          'Write a worker pool in Go that processes incoming URLs with bounded concurrency'
        ],
        resources: [
          {
            id: 'res-tour-go',
            title: 'A Tour of Go',
            provider: 'The Go Authors (Google)',
            url: 'https://go.dev/tour/',
            resourceType: 'interactive',
            durationHours: 8,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Official, completely free interactive platform.'
          }
        ],
        deliverables: [
          {
            id: 'del-p5-go-worker',
            title: 'Concurrent Go Task Worker',
            description: 'CLI and worker pool implementation handling bounded job distribution with graceful SIGINT/SIGTERM shutdown.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Why Go replaced Python for my systems-level background jobs',
          evidenceToAttach: 'Memory comparison between Go compiled binary (15MB RAM) vs Python process (60MB RAM)',
          draftOutline: '1. Compilation vs interpreted startup. 2. Goroutine multiplexing on OS threads. 3. Measurable memory saving.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 6,
    title: 'Phase 6: Infrastructure as Code & CI/CD Pipelines',
    timeframe: 'May 2028 – July 2028',
    targetYear: 2028,
    learningObjectives: [
      'Write declarative Terraform configs applying principle of least privilege',
      'Build automated GitHub Actions pipelines with linting, testing, and security scanning',
      'Understand Terraform state locking, backend storage, and drift detection'
    ],
    prerequisites: ['Phase 5 completion'],
    exitRequirement: 'Complete GitHub Actions CI pipeline executing tflint, security scanning, and automated tests with 100% reproducibility.',
    weeks: [
      {
        id: 'p6-w1',
        phaseId: 6,
        weekNumber: 8,
        title: 'Terraform HCL, Providers & State Management',
        estimatedHours: 11,
        status: 'not-started',
        keyTopics: ['Terraform declarations & variables', 'State files & remote state safety', 'LocalStack for free AWS simulation'],
        exercises: [
          'Provision local S3 and IAM mocks using LocalStack without spending ₹1',
          'Build reusable Terraform modules with strict input validation'
        ],
        resources: [
          {
            id: 'res-hashi-tf',
            title: 'HashiCorp Terraform Official Tutorials',
            provider: 'HashiCorp Developer',
            url: 'https://developer.hashicorp.com/terraform/tutorials',
            resourceType: 'documentation',
            durationHours: 12,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Free official learning track. (Certification exam is paid and optional).'
          }
        ],
        deliverables: [
          {
            id: 'del-p6-iac-repo',
            title: 'LocalStack Verified Terraform Architecture with CI',
            description: 'Declarative infrastructure with automated tfsec scan and GitHub Actions pipeline, destroying resources cleanly.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Zero-Cost Cloud Engineering: How I test AWS Terraform locally with LocalStack',
          evidenceToAttach: 'Terminal screenshot running `terraform apply` against LocalStack endpoint',
          draftOutline: '1. The fear of unexpected cloud bills for students. 2. Emulating cloud APIs on localhost. 3. My testing workflow.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 7,
    title: 'Phase 7: Kubernetes, Observability & Reliability',
    timeframe: 'Aug 2028 – Nov 2028',
    targetYear: 2028,
    learningObjectives: [
      'Run container orchestration using lightweight local K3s/Minikube',
      'Deploy Prometheus metric collection and Grafana dashboard visualization',
      'Implement SRE principles: Service Level Objectives (SLOs), Error Budgets, and Postmortems'
    ],
    prerequisites: ['Phase 6 completion'],
    exitRequirement: 'Local Kubernetes cluster with self-healing deployments, ingress routing, Prometheus scrape targets, and a written postmortem for a simulated outage.',
    weeks: [
      {
        id: 'p7-w1',
        phaseId: 7,
        weekNumber: 9,
        title: 'Kubernetes Primitives & Observability',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['Pods, Deployments, Services, ConfigMaps', 'Liveness & Readiness probes', 'Prometheus metrics (/metrics endpoint)'],
        exercises: [
          'Deploy a multi-replica service in K3s and trigger rolling updates with zero dropped connections',
          'Configure a Prometheus dashboard graphing p99 latency'
        ],
        resources: [
          {
            id: 'res-google-sre',
            title: 'Site Reliability Engineering: How Google Runs Production Systems',
            provider: 'Google (Betsy Beyer et al.)',
            url: 'https://sre.google/sre-book/table-of-contents/',
            resourceType: 'book',
            durationHours: 25,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Completely free official book published by Google.'
          }
        ],
        deliverables: [
          {
            id: 'del-p7-k8s-cluster',
            title: 'Local K3s Cluster with Prometheus & Simulated Chaos Test',
            description: 'Pod chaos injection script, Prometheus alert rules, and structured Markdown postmortem report.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Liveness vs Readiness probes: A misconfiguration that caused cascading outage in my lab',
          evidenceToAttach: 'Kubernetes event log showing CrashLoopBackOff due to premature liveness probe failure',
          draftOutline: '1. What liveness and readiness actually signal. 2. The bug I introduced. 3. How to set initialDelaySeconds responsibly.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 8,
    title: 'Phase 8: AI-Assisted Cloud Engineering',
    timeframe: 'Dec 2028 – Feb 2029',
    targetYear: 2028,
    learningObjectives: [
      'Leverage AI for deterministic runbook parsing and automated log anomaly triage',
      'Implement strict human-in-the-loop controls: AI proposes, human approves operational changes',
      'Audit AI code suggestions for hallucinations, security vulnerabilities, and secrets leaks'
    ],
    prerequisites: ['Phase 7 completion'],
    exitRequirement: 'Build an open-source CLI that processes log files and matches them to runbooks deterministically, with safe optional LLM summarization.',
    weeks: [
      {
        id: 'p8-w1',
        phaseId: 8,
        weekNumber: 10,
        title: 'Safe AI Integration & Runbook Retrieval',
        estimatedHours: 11,
        status: 'not-started',
        keyTopics: ['Structured JSON outputs from LLMs', 'Prompt injection defense in operational tooling', 'Deterministic fallback logic'],
        exercises: [
          'Write a script that sanitizes logs (stripping IPs, auth tokens, passwords) before piping to any AI model',
          'Create a fallback mechanism when AI is unreachable or invalid JSON is returned'
        ],
        resources: [
          {
            id: 'res-owasp-llm',
            title: 'OWASP Top 10 for Large Language Model Applications',
            provider: 'OWASP Foundation',
            url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
            resourceType: 'documentation',
            durationHours: 6,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Free security documentation.'
          }
        ],
        deliverables: [
          {
            id: 'del-p8-incident-assistant',
            title: 'Sanitized Incident Analysis CLI (Deterministic + AI Hybrid)',
            description: 'Command line tool that parses production crash dumps, checks local runbooks, and proposes solutions with human approval gating.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Why we must never give an AI agent direct write credentials to cloud infrastructure',
          evidenceToAttach: 'Architecture diagram showing the Human-In-The-Loop approval gate',
          draftOutline: '1. The risk of hallucinated parameters in IaC. 2. Defense-in-depth architecture. 3. AI as advisor, human as operator.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 9,
    title: 'Phase 9: Flagship Distributed Systems Project — Orbit',
    timeframe: 'March 2029 – July 2029',
    targetYear: 2029,
    learningObjectives: [
      'Design, benchmark, and document Orbit: a production-grade distributed job scheduler',
      'Implement at-least-once delivery, heartbeats, dead-letter queues, and leader leases',
      'Produce comprehensive Architecture Decision Records (ADRs) and wrk load benchmarks'
    ],
    prerequisites: ['All prior phases completed'],
    exitRequirement: 'Student produces a flagship GitHub repository with architecture diagrams, benchmark suite, CI/CD pipeline, and failure recovery demonstration.',
    flagshipProject: {
      name: 'Orbit: Distributed Job Scheduler',
      description: 'Fault-tolerant, distributed task execution system with Raft-inspired coordination, worker health leases, and idempotency keys.',
      stages: [
        '1. REST API & Job Submission with PostgreSQL persistence',
        '2. Worker process queue with heartbeats and lease renewals',
        '3. Retries, exponential backoff, and Dead Letter Queue (DLQ)',
        '4. Idempotency key tracking to avoid duplicate execution',
        '5. Prometheus metrics: queue depth, worker saturation, failure rate',
        '6. Distributed lease coordination and graceful worker failover',
        '7. Load testing with 10,000 synthetic tasks; wrk latency graphs',
        '8. Complete technical writeup with trade-offs and failure analysis'
      ]
    },
    weeks: [
      {
        id: 'p9-w1',
        phaseId: 9,
        weekNumber: 11,
        title: 'Orbit Architecture: State Machine & Idempotency',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['State machine design: SUBMITTED -> RUNNING -> COMPLETED/FAILED', 'Idempotency keys using Redis/PostgreSQL', 'Deadlock avoidance in job queues'],
        exercises: [
          'Design PostgreSQL schema with optimistic concurrency locking (version column)',
          'Write integration test simulating two workers attempting to claim the identical task simultaneously'
        ],
        resources: [
          {
            id: 'res-ddia',
            title: 'Designing Data-Intensive Applications (Reference Readings)',
            provider: 'Martin Kleppmann',
            url: 'https://dataintensive.net/',
            resourceType: 'book',
            durationHours: 35,
            freeLearningAvailable: false,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Seminal book. Available through college library / standard academic access.'
          }
        ],
        deliverables: [
          {
            id: 'del-p9-orbit-flagship',
            title: 'Orbit Core Repository & Architecture Documentation',
            description: 'Complete codebase with ADRs, benchmark logs, Docker Compose harness, and GitHub CI workflow.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Handling Distributed Race Conditions: What happened when 20 workers claimed the same job',
          evidenceToAttach: 'Postgres transaction isolation log showing row-level locking (SELECT ... FOR UPDATE SKIP LOCKED)',
          draftOutline: '1. The failure scenario in distributed job queues. 2. Why standard SELECT was not enough. 3. SKIP LOCKED implementation.',
          status: 'planned'
        }
      }
    ]
  },
  {
    id: 10,
    title: 'Phase 10: Internship Conversion & Tier-1 Employment',
    timeframe: 'Aug 2029 – May 2030',
    targetYear: 2029,
    learningObjectives: [
      'Refine engineering resume showcasing verifiable GitHub projects and quantifiable impact',
      'Target verified India-eligible fully remote companies and Tier-1 hybrid systems engineering teams',
      'Excel in system design interviews, behavioral loops, and secure return-offer conversions'
    ],
    prerequisites: ['Orbit flagship completed', 'Core competencies demonstrated independently'],
    exitRequirement: 'Student clears mock technical interview loops, submits tailored applications to verified employers, and executes internship conversion plan.',
    weeks: [
      {
        id: 'p10-w1',
        phaseId: 10,
        weekNumber: 12,
        title: 'System Design Interview & Resume Tuning',
        estimatedHours: 12,
        status: 'not-started',
        keyTopics: ['System design framework: Requirements -> API -> Data Model -> Scale', 'Technical resume tailoring for Cloud/Backend', 'Behavioral STAR methodology'],
        exercises: [
          'Conduct a 45-minute timed mock system design interview of Orbit platform with a peer',
          'Eliminate buzzwords from resume and replace with metrics and reproducible GitHub links'
        ],
        resources: [
          {
            id: 'res-sys-design-primer',
            title: 'The System Design Primer',
            provider: 'Donne Martin',
            url: 'https://github.com/donnemartin/system-design-primer',
            resourceType: 'interactive',
            durationHours: 30,
            freeLearningAvailable: true,
            certificateOffered: false,
            certificateType: 'none',
            dateVerified: '2026-03-01',
            verificationNotes: 'Open-source, highly respected guide on GitHub.'
          }
        ],
        deliverables: [
          {
            id: 'del-p10-portfolio',
            title: 'Engineering Portfolio & Interview Briefing Doc',
            description: 'One-page PDF resume + GitHub repository documentation explaining engineering trade-offs in Phase 0-9 projects.',
            status: 'not-started',
            exitCriteriaMet: false
          }
        ],
        linkedInPostIdea: {
          suggestedAngle: 'Reflecting on 3 years of building systems projects from TKM College of Engineering',
          evidenceToAttach: 'GitHub activity graph and architectural breakdown of flagship projects',
          draftOutline: '1. What I knew as a first year vs what I understand now. 2. The value of building things from scratch. 3. Ready for infrastructure engineering.',
          status: 'planned'
        }
      }
    ]
  }
];
