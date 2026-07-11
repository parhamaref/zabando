# 🦉 Zabando Enterprise Monorepo

Welcome to the **Zabando Enterprise Monorepo**, the architectural blueprint for a world-class, adaptive language learning platform. This structure is designed to support modularity, high performance, and rapid full-stack iteration in line with global standards (such as Duolingo's engineering principles).

---

## 🏗️ Monorepo Structure

```bash
zabando/
│
├── apps/                        # Frontend and client applications
│   ├── web/                     # Next.js 14 (App Router) - Main Web App
│   ├── admin/                   # Next.js - Content & Course Management Panel
│   ├── mobile/                  # React Native / Android Native Core
│   └── landing/                 # Marketing and landing pages website
│
├── services/                    # Backend microservices and AI modules
│   ├── api-gateway/             # Unified NestJS API Gateway
│   ├── auth-service/            # Authentication, JWT & OAuth service
│   ├── user-service/            # User profile, statistics & settings manager
│   ├── course-service/          # Course content, lessons & exercises microservice
│   ├── session-service/         # Interactive learning sessions state machine
│   ├── gamification-service/    # XP, Streaks, Leagues & Badges engine
│   ├── learning-engine/         # ML Core (Python + FastAPI + PyTorch)
│   ├── content-ai-service/      # AI Content generation proxy (Google AI Studio)
│   └── analytics-service/       # Event streaming, user behavior & A/B testing
│
├── packages/                    # Shareable packages (Internal libraries)
│   ├── ui/                      # Shared design system (Tailwind CSS + ShadCN UI)
│   ├── utils/                   # Common helper functions and calculations
│   ├── types/                   # Unified TypeScript interfaces & Enums
│   ├── config/                  # Shared environmental configuration keys
│   └── sdk/                     # Unified SDK client for frontend-backend connection
│
├── infra/                       # Devops and Cloud Orchestration configs
│   ├── docker/                  # Dockerfiles for service containers
│   ├── k8s/                     # Kubernetes deployment manifests
│   ├── nginx/                   # Nginx reverse proxy configuration
│   ├── terraform/               # Infrastructure as Code (IaC) for GCP
│   └── monitoring/              # Grafana, Prometheus & Loki metrics dashboards
│
├── database/                    # Database migrations & orchestration scripts
│   ├── migrations/              # PostgreSQL schema migrations (Drizzle/Flyway)
│   ├── seeds/                   # Seed scripts for CEFR curriculum & exercises
│   └── schema/                  # Unified ERD schemas and data model files
│
├── scripts/                     # Operational automation scripts
│   ├── dev/                     # Sandbox simulation scripts
│   ├── deploy/                  # Cloud delivery workflows
│   └── ci-cd/                   # Continuous Integration configurations
│
└── docs/                        # Standard technical documentation
    ├── architecture/            # Architectural diagrams and design specifications
    ├── api/                     # OpenAPI (Swagger) specs
    ├── ml/                      # Machine learning engine documentation
    └── content/                 # Guidelines for CEFR content generation
```

---

## ⚡ Key Technologies

- **Package Manager**: Workspaces (using `pnpm` or `yarn`) to orchestrate multi-package linking instantly.
- **Orchestration**: **Turborepo** (`turbo`) for intelligent, cached, and parallel task execution.
- **Languages**: TypeScript (Full Stack UI, Gateway, and Services) & Python (Machine Learning and Analytics).
- **Core AI**: Google AI Studio & Gemini API integration in `content-ai-service` for on-the-fly CEFR question creation.
- **Database**: PostgreSQL for high-performance relations, integrated with Drizzle ORM.

---

## 🚀 Local Quickstart Guide

To run the complete workspace locally in development mode:

### 1. Prerequisites
- **Node.js**: `>=18.0.0`
- **pnpm**: `>=8.0.0` (Recommended)

### 2. Install Workspace Dependencies
```bash
pnpm install
```

### 3. Run Development Servers
```bash
pnpm dev
# Or utilizing Turborepo's parallel workspace execution
pnpm turbo run dev
```

---
*Created with ♥ by Zabando Platform Engineers.*
