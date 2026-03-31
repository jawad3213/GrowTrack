<p align="center">
  <h1 align="center">📈 GrowTrack</h1>
  <p align="center">
    <strong>A comprehensive web-based platform for student skill tracking, evaluation, and academic management.</strong>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vuedotjs&logoColor=white" alt="Vue 3" />
    <img src="https://img.shields.io/badge/Express-5.1-000000?style=flat-square&logo=express&logoColor=white" alt="Express 5" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
    <img src="https://img.shields.io/badge/License-ISC-blue?style=flat-square" alt="License" />
  </p>
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Problem & Solution](#-problem--solution)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Schema](#-database-schema)
- [API Reference](#-api-reference)
- [Authentication Flow](#-authentication-flow)
- [Testing](#-testing)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Docker Deployment](#-docker-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**GrowTrack** is a role-based academic management platform that centralizes **skill tracking**, **student evaluation**, **signal management**, and **project oversight** into a single application. It replaces scattered spreadsheets and paper forms with a modern, secure, real-time web application.

The platform serves three types of users — **Administrators**, **Professors**, and **Students** — each with a tailored dashboard and set of capabilities.

---

## 🧩 Problem & Solution

### The Problem

In educational institutions, tracking student skill development is fragmented and manual:

- No centralized system to monitor skill progression over time
- Evaluations are scattered across spreadsheets and paper forms
- Behavioral/academic issues have no structured follow-up mechanism
- Students lack visibility into their own performance
- Administrators have no institutional-level overview

### The Solution

GrowTrack provides:

| Capability | Description |
|------------|-------------|
| **Structured Evaluations** | Professors evaluate students per class with a predefined skill catalog |
| **Signal System** | Internal reporting mechanism to flag and track student issues |
| **Project Management** | Create, assign, and monitor group projects |
| **Self-Evaluation** | Students assess their own skills and compare with professor ratings |
| **PDF Reports** | Automated, downloadable student profile reports |
| **Global Dashboard** | Institution-wide analytics for administrators |
| **Calendar** | Academic event scheduling and tracking |

---

## ✨ Key Features

- 🔐 **Secure JWT Authentication** — Dual token strategy (access + refresh) with HttpOnly cookies
- 👥 **Role-Based Access Control** — Admin, Professor, and Student roles with route guards
- 📊 **Interactive Dashboards** — Real-time charts and metrics using ApexCharts
- 📝 **Skill Evaluation System** — Structured per-class evaluation workflow with score tracking
- 🚩 **Signal Management** — Report, track, and resolve student issues
- 📁 **Project & Group Management** — Create projects, assign teams, monitor progress
- 📄 **PDF Generation** — Server-side PDF rendering with Puppeteer + EJS templates
- 🔔 **In-App Notifications** — Real-time notification system per user
- 📅 **Calendar Integration** — FullCalendar-powered academic scheduling
- 🛡️ **Enterprise Security** — Helmet, CSRF protection, rate limiting, input validation
- 🐳 **Docker Ready** — Full containerization for development and production
- ⚙️ **CI/CD Pipeline** — GitHub Actions for automated testing and Docker image deployment

---

## 👤 User Roles

### 👨‍💼 Administrator

Full platform control: manage all users (students, professors, supervisors, coaches), configure skills catalog, manage fields/groups, view global evaluations overview, monitor all signals, and access platform-wide analytics.

### 👨‍🏫 Professor

Evaluate students per class, manage projects and group assignments, report and track signals, generate student PDF reports, and view personal teaching statistics.

### 🎓 Student

View personal skill progression and evaluation results, access assigned projects and group members, perform self-evaluations, view reported signals, and receive in-app notifications.

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Vue 3](https://vuejs.org/) | 3.5 | Reactive UI (Composition API) |
| [Vite](https://vitejs.dev/) | 6.2 | Build tool with HMR |
| [Pinia](https://pinia.vuejs.org/) | 3.0 | State management |
| [Vue Router](https://router.vuejs.org/) | 4.5 | Client-side routing with guards |
| [Tailwind CSS](https://tailwindcss.com/) | 4.1 | Utility-first CSS framework |
| [Axios](https://axios-http.com/) | 1.8 | HTTP client with interceptors |
| [ApexCharts](https://apexcharts.com/) | 4.7 | Interactive data visualization |
| [GSAP](https://greensock.com/gsap/) | 3.13 | Animations |
| [FullCalendar](https://fullcalendar.io/) | 6.1 | Calendar UI component |
| [Yup](https://github.com/jquense/yup) | 1.6 | Form schema validation |
| [Heroicons](https://heroicons.com/) | 2.2 | SVG icon library |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| [Node.js](https://nodejs.org/) | 22 | JavaScript runtime |
| [Express](https://expressjs.com/) | 5.1 | REST API framework |
| [PostgreSQL](https://www.postgresql.org/) | — | Relational database |
| [pg](https://node-postgres.com/) | 8.16 | PostgreSQL driver (raw SQL) |
| [JWT](https://jwt.io/) | 9.0 | Token-based authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | 5.1 | Password hashing |
| [Helmet](https://helmetjs.github.io/) | 8.1 | HTTP security headers |
| [csrf-csrf](https://github.com/Psifi-Solutions/csrf-csrf) | 4.0 | CSRF protection |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | 7.5 | Rate limiting |
| [express-validator](https://express-validator.github.io/) | 7.2 | Input validation/sanitization |
| [Puppeteer](https://pptr.dev/) | 24.10 | Server-side PDF generation |
| [EJS](https://ejs.co/) | 3.1 | PDF template engine |
| [Nodemailer](https://nodemailer.com/) | 6.10 | Email (password reset) |
| [Multer](https://github.com/expressjs/multer) | 1.4 | File upload handling |

### Testing

| Tool | Purpose |
|------|---------|
| [Jest](https://jestjs.io/) | Backend unit & integration tests |
| [Supertest](https://github.com/ladjs/supertest) | HTTP assertion library |
| [Vitest](https://vitest.dev/) | Frontend unit tests |
| [Vue Test Utils](https://test-utils.vuejs.org/) | Vue component testing |
| [Cypress](https://www.cypress.io/) | End-to-end testing |

### DevOps

| Tool | Purpose |
|------|---------|
| [Docker](https://www.docker.com/) | Containerization |
| [Docker Compose](https://docs.docker.com/compose/) | Multi-container orchestration |
| [GitHub Actions](https://github.com/features/actions) | CI/CD pipeline |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                 Vue 3 + Vite (SPA)                         │  │
│  │  ┌──────────┐  ┌────────────┐  ┌────────────────────────┐ │  │
│  │  │  Pinia   │  │ Vue Router │  │  Axios (interceptors)  │ │  │
│  │  │  Store   │  │  Guards    │  │  + CSRF token mgmt     │ │  │
│  │  └──────────┘  └────────────┘  └────────────────────────┘ │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                    Vite Dev Proxy                                 │
│              /api/*  → localhost:3000                             │
│              /admin/* → localhost:3000                            │
│              /prof/*  → localhost:3000                            │
│           /student/* → localhost:3000                             │
│           /uploads/* → localhost:3000                             │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTP (REST API)
┌──────────────────────────────┴───────────────────────────────────┐
│                    SERVER (Node.js + Express 5)                   │
│                                                                  │
│  ┌──────────┐ ┌──────────────┐ ┌──────────────────────────────┐ │
│  │  Helmet  │ │  CSRF (csrf- │ │  JWT Auth Middleware         │ │
│  │ Security │ │   csrf)      │ │  (Access + Refresh tokens)   │ │
│  └──────────┘ └──────────────┘ └──────────────────────────────┘ │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │               Modular Routes Layer                         │  │
│  │  /api/auth/*  │ /api/admin/*  │ /prof/*  │ /student/*     │  │
│  │  /api/signals │ /api/evaluations │ /api/projects          │  │
│  └────────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │            Controllers → Services → Models                 │  │
│  │            (Raw SQL via pg / node-postgres)                │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────┬───────────────────────────────────┘
                               │ SQL (TCP)
┌──────────────────────────────┴───────────────────────────────────┐
│                      PostgreSQL Database                         │
│                                                                  │
│  utilisateur │ etudiant │ professeur │ superviseur │ coach       │
│  sector │ class │ competence │ skill_evaluation │ evaluations    │
│  signal │ solution │ projet │ team │ notifications │ news        │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
GrowTrack/
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline
├── backend/
│   ├── __tests__/
│   │   ├── integration/            # Integration tests (auth, CRUD flows)
│   │   └── unit/                   # Unit tests (controllers, models, routes, validators)
│   ├── config/                     # DB pool, CORS, CSRF configuration
│   ├── controllers/                # Legacy route controllers
│   ├── database/
│   │   ├── schema.sql              # Full database schema
│   │   ├── migrations/             # Database migrations
│   │   └── seeds/                  # Database seed data
│   ├── middlewares/                 # Legacy middleware (auth, validation)
│   ├── models/                     # Legacy SQL query models
│   ├── routes/                     # Legacy route definitions
│   ├── seeders/                    # Data seeders
│   ├── src/
│   │   ├── app.js                  # Express app configuration (main entry)
│   │   ├── config/                 # CORS, CSRF config
│   │   ├── middleware/             # Auth, rate limiting, validation, error handler
│   │   ├── modules/                # Modular feature code
│   │   │   ├── auth/               # Authentication (routes, controller, validation)
│   │   │   ├── users/              # Students, Professors, Supervisors, Coaches
│   │   │   ├── skills/             # Skills CRUD
│   │   │   ├── evaluations/        # Evaluation management
│   │   │   ├── signals/            # Signal reporting
│   │   │   ├── projects/           # Project management
│   │   │   ├── classes/            # Class management
│   │   │   ├── dashboard/          # Dashboard analytics
│   │   │   ├── notifications/      # Notification system
│   │   │   ├── reports/            # Report generation
│   │   │   └── profile/            # User profile management
│   │   ├── shared/                 # Shared utilities
│   │   └── templates/              # EJS templates for PDF generation
│   ├── validators/                 # Input validation schemas
│   ├── views/                      # Server-side views
│   ├── server.js                   # Server entry point
│   ├── Dockerfile                  # Backend Docker image
│   └── package.json
├── frontend/
│   ├── __tests__/
│   │   ├── components-tests/       # Vue component unit tests
│   │   └── stores-tests/           # Pinia store tests
│   ├── cypress/
│   │   └── e2e/                    # 16 End-to-end test suites
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── assets/                 # CSS, images
│   │   ├── components/
│   │   │   ├── ui/                 # Reusable SaaS UI components
│   │   │   ├── layout/             # Admin, Prof, Student layouts
│   │   │   ├── charts/             # Chart components (ApexCharts)
│   │   │   ├── icons/              # Icon components
│   │   │   └── profile/            # Profile components
│   │   ├── composables/            # Vue composables (usePagination, etc.)
│   │   ├── constants/              # API endpoints, roles, routes
│   │   ├── features/
│   │   │   ├── admin/              # Admin pages & components
│   │   │   ├── auth/               # Login, forgot password pages
│   │   │   ├── professor/          # Professor pages & components
│   │   │   ├── public/             # Public pages (landing, about, contact)
│   │   │   └── student/            # Student pages & components
│   │   ├── router/                 # Vue Router (per-role route files)
│   │   ├── schemas/                # Yup validation schemas
│   │   ├── services/               # API service layer (Axios)
│   │   └── stores/                 # Pinia stores (auth, user data)
│   ├── index.html                  # SPA entry point
│   ├── vite.config.js              # Vite configuration + dev proxy
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   ├── cypress.config.js           # Cypress E2E configuration
│   ├── vitest.config.js            # Vitest unit test configuration
│   ├── Dockerfile                  # Frontend Docker image
│   └── package.json
├── docker-compose.yml              # Development containers
├── docker-compose.prod.yml         # Production containers
├── package.json                    # Root (concurrent dev script)
└── README.md
```

---

## 📋 Prerequisites

Before running the project, ensure you have:

| Requirement | Version |
|-------------|---------|
| [Node.js](https://nodejs.org/) | >= 18.x |
| [npm](https://www.npmjs.com/) | >= 9.x |
| [PostgreSQL](https://www.postgresql.org/) | >= 14.x (or a cloud instance like [Neon](https://neon.tech/)) |
| [Docker](https://www.docker.com/) *(optional)* | >= 24.x |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/GrowTrack.git
cd GrowTrack
```

### 2. Set Up the Database

Create a PostgreSQL database and run the schema:

```bash
# Create the database
psql -U postgres -c "CREATE DATABASE GrowTrack;"

# Run the schema
psql -U postgres -d GrowTrack -f backend/database/schema.sql
```

This will create all tables and insert:
- 6 default skills (Communication, Teamwork, Problem-solving, etc.)
- 1 default admin user (`admin@growtrack.com`)

### 3. Configure Environment Variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with your database credentials and secrets (see [Environment Variables](#-environment-variables)).

### 4. Install Dependencies & Run

**Option A — Run both together (recommended):**

```bash
npm install          # Install root dependencies (concurrently)
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm run dev          # Starts both backend (:3000) and frontend (:5173)
```

**Option B — Run separately:**

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev          # Express on http://localhost:3000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev          # Vite on http://localhost:5173
```

### 5. Access the Application

Open your browser at **http://localhost:5173**

Default admin credentials:
- **Email:** `admin@growtrack.com`
- **Password:** *(set during seeding — check your schema or reset via the app)*

---

## 🔑 Environment Variables

Create a `backend/.env` file based on `backend/.env.example`:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | Backend server port | `3000` |
| `ACCESS_SECRET` | JWT access token secret | *(random 64-char hex string)* |
| `REFRESH_SECRET` | JWT refresh token secret | *(random 64-char hex string)* |
| `EMAIL_USER` | Gmail address for Nodemailer | `your-email@gmail.com` |
| `EMAIL_PASS` | Gmail app-specific password | *(16-char app password)* |
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_USER` | PostgreSQL user | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | `your_password` |
| `DB_NAME` | Database name | `GrowTrack` |
| `MODE` | Database mode (`local` or `cloud`) | `local` |
| `FRONTEND_URL` | Frontend origin for CORS | `http://localhost:5173` |
| `DATABASE_URL` | Full connection string (cloud mode) | `postgresql://user:pass@host/db?sslmode=require` |

> **Note:** For `EMAIL_PASS`, use a [Google App Password](https://support.google.com/accounts/answer/185833), not your regular Gmail password.

---

## 🗄️ Database Schema

The PostgreSQL database is built around the central `utilisateur` (user) table with role-specific extensions:

```mermaid
erDiagram
    utilisateur ||--o| etudiant : "is a"
    utilisateur ||--o| professeur : "is a"
    utilisateur ||--o| superviseur : "is a"
    utilisateur ||--o| coach : "is a"
    utilisateur ||--o| admin : "is a"

    sector ||--o{ class : "contains"
    class ||--o{ etudiant : "enrolled in"
    professeur ||--o{ enseigne : "teaches"
    class ||--o{ enseigne : "taught in"

    professeur ||--o{ projet : "creates"
    projet ||--o{ team : "has"
    team ||--o{ team_student : "includes"
    etudiant ||--o{ team_student : "belongs to"

    utilisateur ||--o{ signal : "reports"
    utilisateur ||--o{ signal : "reported on"
    signal ||--o| solution : "resolved by"

    etudiant ||--o{ skill_evaluation : "evaluated"
    utilisateur ||--o{ skill_evaluation : "evaluates"
    skill_evaluation ||--o{ evaluations : "scores"
    competence ||--o{ evaluations : "assessed in"

    utilisateur ||--o{ notifications : "receives"
    etudiant ||--o{ stage : "interns at"
    superviseur ||--o{ supervise : "supervises"
```

### Core Tables

| Table | Description |
|-------|-------------|
| `utilisateur` | Central user table (id, name, email, password, role, status) |
| `etudiant` | Student data (CNE, class assignment) |
| `professeur` | Professor data (code, department, contract status) |
| `superviseur` | Supervisor data (registration number, company, position) |
| `coach` | Coach profiles (specialization, domain) |
| `admin` | Admin metadata (assigned zone) |
| `sector` | Academic fields/sectors |
| `class` | Student classes within sectors |
| `competence` | Skill definitions with evaluation questions |
| `skill_evaluation` | Evaluation records (evaluator → student → context) |
| `evaluations` | Individual skill scores per evaluation |
| `signal` | Issue reports (reporter, reported, severity, status) |
| `solution` | Signal resolution records |
| `projet` | Project definitions (title, deadline, assigned class) |
| `team` | Project teams with grades |
| `team_student` | Team membership (student ↔ team) |
| `stage` | Internship records |
| `notifications` | Per-user notification messages |
| `news` | Platform news/announcements |

---

## 📡 API Reference

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login with email/password |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/refresh` | Refresh access token |
| `GET` | `/api/auth/check` | Verify current session |
| `POST` | `/api/auth/logout` | Clear auth cookies |
| `POST` | `/api/auth/forgot-password` | Send reset email |
| `POST` | `/api/resetpass` | Reset password with token |
| `GET` | `/api/csrf-token` | Get CSRF token |

### Admin — User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/students` | List all students |
| `POST` | `/api/admin/students` | Create a student |
| `PUT` | `/api/admin/students/:id` | Update a student |
| `DELETE` | `/api/admin/students/:id` | Delete a student |
| `GET` | `/api/admin/professors` | List all professors |
| `POST` | `/api/admin/professors` | Create a professor |
| `PUT` | `/api/admin/professors/:id` | Update a professor |
| `DELETE` | `/api/admin/professors/:id` | Delete a professor |
| `GET` | `/api/admin/supervisors` | List all supervisors |
| `POST` | `/api/admin/supervisors` | Create a supervisor |
| `PUT` | `/api/admin/supervisors/:id` | Update a supervisor |
| `DELETE` | `/api/admin/supervisors/:id` | Delete a supervisor |
| `GET` | `/api/admin/coaches` | List all coaches |
| `POST` | `/api/admin/coaches` | Create a coach |
| `PUT` | `/api/admin/coaches/:id` | Update a coach |
| `DELETE` | `/api/admin/coaches/:id` | Delete a coach |

### Admin — Academic

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/skills` | List all skills |
| `POST` | `/api/admin/skills` | Create a skill |
| `PUT` | `/api/admin/skills/:id` | Update a skill |
| `DELETE` | `/api/admin/skills/:id` | Delete a skill |
| `GET` | `/api/admin/classes` | List all classes |
| `POST` | `/api/admin/classes` | Create a class |

### Evaluations, Signals, Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/evaluations` | List evaluations |
| `POST` | `/api/evaluations` | Submit an evaluation |
| `GET` | `/api/signals` | List signals |
| `POST` | `/api/signals` | Create a signal |
| `GET` | `/api/projects` | List projects |
| `POST` | `/api/projects` | Create a project |

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard` | Dashboard analytics |
| `GET` | `/api/notifications` | User notifications |
| `GET` | `/api/profile` | User profile |
| `PUT` | `/api/profile` | Update profile |
| `POST` | `/api/reports` | Generate reports |
| `POST` | `/api/generate-pdf` | Generate PDF report |
| `GET` | `/health` | Server health check |

---

## 🔐 Authentication Flow

```
┌─────────┐         ┌─────────┐         ┌──────────┐
│ Browser │         │ Express │         │ Database │
└────┬────┘         └────┬────┘         └────┬─────┘
     │   POST /login     │                   │
     │──────────────────>│                   │
     │                   │  SELECT user      │
     │                   │──────────────────>│
     │                   │  user data        │
     │                   │<──────────────────│
     │                   │                   │
     │                   │  bcrypt.compare() │
     │                   │  sign JWT tokens  │
     │                   │                   │
     │  Set-Cookie:      │                   │
     │  access_token     │                   │
     │  refresh_token    │                   │
     │  (HttpOnly)       │                   │
     │<──────────────────│                   │
     │                   │                   │
     │  GET /auth/check  │                   │
     │──────────────────>│                   │
     │                   │ verify JWT        │
     │  { role, user }   │                   │
     │<──────────────────│                   │
     │                   │                   │
     │  [Token expired]  │                   │
     │  POST /refresh    │                   │
     │──────────────────>│                   │
     │  New access_token │                   │
     │<──────────────────│                   │
```

**Security layers:**
- **Dual JWT Tokens** — Access (15 min) + Refresh (7 days) in HttpOnly cookies
- **CSRF Protection** — Double-submit cookie pattern via `csrf-csrf`
- **HTTP Headers** — Helmet for XSS, HSTS, and other security headers
- **Rate Limiting** — `express-rate-limit` to prevent brute-force attacks
- **Input Validation** — `express-validator` on all endpoints
- **Password Hashing** — bcrypt with 10 salt rounds

---

## 🧪 Testing

The project has a comprehensive testing strategy across three levels:

### Backend Unit Tests

```bash
cd backend
npm run test:unit
```

Tests cover: controllers, models, routes, validators, and middleware.

### Backend Integration Tests

```bash
cd backend
npm run test:integration
```

Tests cover: authentication flows, student CRUD, professor module, skills module.

### Frontend Unit Tests

```bash
cd frontend
npm run test:unit
```

Tests cover: Vue component rendering, Pinia store logic.

### End-to-End Tests (Cypress)

```bash
cd frontend
npm run test:e2e:dev    # Opens Cypress interactive runner
npm run test:e2e        # Runs headless
```

**16 E2E test suites** covering:

| Suite | Coverage |
|-------|----------|
| `authentification.cy.js` | Login, logout, session handling |
| `authRedirect.cy.js` | Route guard redirections |
| `roleAccess.cy.js` | Role-based page access |
| `admin.cy.js` | Admin dashboard functionality |
| `student.cy.js` | Student CRUD operations |
| `professor.cy.js` | Professor CRUD operations |
| `supervisor.cy.js` | Supervisor CRUD operations |
| `coach.cy.js` | Coach CRUD operations |
| `skills.cy.js` | Skills catalog management |
| `classes.cy.js` | Class management |
| `evaluations.cy.js` | Evaluation workflow |
| `projects.cy.js` | Project management |
| `dashboard.cy.js` | Dashboard metrics |
| `notifications.cy.js` | Notification system |
| `reports.cy.js` | Report generation |
| `forgotPassword.cy.js` | Password reset flow |

### Run All Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

---

## ⚙️ CI/CD Pipeline

The project uses **GitHub Actions** (`.github/workflows/ci.yml`) triggered on pushes and PRs to the `dev` branch:

```
┌────────────────┐     ┌──────────────────────┐
│   Test Job     │────>│  Build & Push Job     │
│                │     │                       │
│ • Checkout     │     │ • Docker Hub Login    │
│ • Node.js 18   │     │ • Build backend image │
│ • Install deps │     │ • Build frontend image│
│ • Backend tests│     │ • Push to Docker Hub  │
│ • Frontend tests│    │                       │
└────────────────┘     └──────────────────────┘
```

---

## 🐳 Docker Deployment

### Development

```bash
docker-compose up -d
```

This starts:
- **Backend** on `localhost:3000`
- **Frontend** on `localhost:5173`

### Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Production images are pre-built and hosted on Docker Hub:
- `nour537/growtrack-backend:latest`
- `nour537/growtrack-frontend:latest`

The production setup includes:
- Named networks for service isolation
- Health checks on the backend
- Optional Nginx reverse proxy configuration (commented template included)

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m 'Add my feature'`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request against `dev`

### Code Standards

- **Frontend:** ESLint + Prettier (run `npm run lint` and `npm run format`)
- **Backend:** CommonJS modules, modular architecture under `src/modules/`
- **Commits:** Use descriptive commit messages
- **Tests:** Add tests for new features before submitting a PR

---

## 📄 License

This project is licensed under the **ISC License**.

---
