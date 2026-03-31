# GrowTrack — Application Description

## 📋 Table of Contents

1. [Problem Statement](#1--problem-statement)
2. [Proposed Solution](#2--proposed-solution)
3. [Application Goals](#3--application-goals)
4. [User Roles & Permissions](#4--user-roles--permissions)
5. [Application Architecture](#5--application-architecture)
6. [How the Application Works](#6--how-the-application-works)
7. [Key Features by Role](#7--key-features-by-role)
8. [Technology Stack](#8--technology-stack)
9. [Database Structure](#9--database-structure)
10. [Security & Authentication](#10--security--authentication)
11. [Deployment](#11--deployment)

---

## 1 — Problem Statement

In educational institutions (universities, training centers, engineering schools), **tracking student skill development** remains a largely manual and fragmented process. Professors evaluate students through various methods, but there is no centralized system to:

- **Monitor the progression** of students' soft and technical skills over time.
- **Generate evaluations** in a structured, traceable, and standardized way.
- **Signal behavioral or academic issues** (absences, misconduct, poor performance) and follow up on them.
- **Manage projects and groups** assigned to students with clear oversight for professors.
- **Provide students** with visibility into their own performance, evaluations, and areas for improvement.
- **Give administrators** a global overview of the institution's performance, trends, and alerts.

As a result, skill tracking is scattered across spreadsheets, paper forms, and informal communication — leading to **lost data, inconsistency, and lack of accountability**.

---

## 2 — Proposed Solution

**GrowTrack** is a comprehensive **web-based platform** that centralizes **skill tracking, student evaluation, signal management, and project oversight** into a single application accessible by three types of users: **Administrators**, **Professors**, and **Students**.

The platform provides:

- A **role-based dashboard system** where each user sees data relevant to their responsibilities.
- A **structured evaluation workflow** where professors choose skills, evaluate students per class, and the results are stored historically.
- A **signal system** (like an internal reporting mechanism) to flag and track student issues, including resolution follow-ups.
- A **project management module** for professors to create, assign, and monitor student group projects.
- A **self-evaluation feature** allowing students to assess their own skills and compare them with professor evaluations.
- Automated **PDF report generation** for student profiles.
- A **calendar** for scheduling and tracking academic events.

---

## 3 — Application Goals

| Goal | Description |
|------|-------------|
| **Centralization** | Unify all student evaluation and tracking data in one platform |
| **Transparency** | Give students visibility into their evaluations and skills progression |
| **Accountability** | Create a traceable history of evaluations, signals, and project contributions |
| **Efficiency** | Reduce the manual work for professors with structured evaluation forms |
| **Oversight** | Provide administrators with a global view of institutional performance |
| **Reporting** | Generate downloadable PDF reports for student profiles |
| **Communication** | Enable in-app notifications and signal follow-ups between roles |

---

## 4 — User Roles & Permissions

### 👨‍💼 Administrator (`admin`)

The administrator has **full control** over the platform's configuration and user management.

| Permission | Description |
|-----------|-------------|
| Manage Students | Add, edit, delete student accounts |
| Manage Professors | Add, edit, delete professor accounts |
| Manage Supervisors | Add, edit, delete supervisor accounts |
| Manage Coaches | Add, edit, delete coach entries |
| Manage Skills | Create, edit, delete the skill definitions used in evaluations |
| Manage Fields & Groups | Configure academic fields (sectors) and student groups/classes |
| View Signals | Monitor all reported signals across the institution |
| Global Overview | View aggregated evaluation data and statistics |
| Calendar | Manage institutional events and deadlines |
| Dashboard | View platform-wide analytics (total students, professors, evaluations, etc.) |

### 👨‍🏫 Professor (`Professor`)

Professors interact with students through evaluations, project management, and signal reporting.

| Permission | Description |
|-----------|-------------|
| Dashboard | View personal statistics (classes, students, evaluations, signals) |
| Evaluate Students | Select a class → choose skills → rate each student → submit evaluation |
| Evaluation History | View past evaluations with details |
| Project Management | Create projects, assign groups, monitor progress |
| Signal Students | Report an issue for a student (absence, behavior, academic concern) |
| Signal History | View and manage past signals and their resolution status |
| Generate PDF Reports | Create downloadable student profile reports |
| Notifications | Receive and view in-app notifications |

### 🎓 Student (`student`)

Students have a **read-focused** experience with self-evaluation capabilities.

| Permission | Description |
|-----------|-------------|
| Dashboard | View personal skill completion rates and evaluation results |
| View Evaluations | See evaluations received from professors |
| View Projects | See assigned projects and group members |
| Self-Evaluation | Assess own skills and compare with professor evaluations |
| View Signals | See signals reported about them and their resolution |
| Reports | View personal reports and statistics |
| Notifications | Receive in-app notifications |

---

## 5 — Application Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Vue 3 + Vite (SPA)                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │   │
│  │  │  Pinia   │  │  Router  │  │  Axios API Service  │  │   │
│  │  │  Store   │  │  Guard   │  │  (with interceptors)│  │   │
│  │  └──────────┘  └──────────┘  └────────────────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│                   Vite Dev Proxy                              │
│               /api/* → localhost:3000                         │
│             /admin/* → localhost:3000                         │
│           /uploads/* → localhost:3000                         │
└───────────────────────────┬────────────────────────────────┘
                            │ HTTP (REST API)
┌───────────────────────────┴────────────────────────────────┐
│                   SERVER (Node.js + Express 5)              │
│                                                             │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │  Helmet  │  │  CSRF (csrf- │  │  JWT Auth Middleware  │  │
│  │ Security │  │   csrf)      │  │  (Access + Refresh)   │  │
│  └──────────┘  └──────────────┘  └───────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    Routes Layer                       │   │
│  │  /api/auth/*  │  /admin/*  │  /prof/*  │  /student/* │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                 Controllers Layer                     │   │
│  │  authController │ adminControllers │ profController  │   │
│  │                 │ studentControllers                  │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                   Models Layer                        │   │
│  │      Raw SQL queries via pg (node-postgres)           │   │
│  └──────────────────────────────────────────────────────┘   │
│                          │                                   │
└───────────────────────────┬────────────────────────────────┘
                            │ SQL
┌───────────────────────────┴────────────────────────────────┐
│                   PostgreSQL Database                        │
│                                                             │
│  Tables: utilisateur, etudiant, professeur, superviseur,    │
│  projet, groupe, competence, evaluation, signal, sector,    │
│  coach, notification, etc.                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 6 — How the Application Works

### Authentication Flow

1. User navigates to the login page (`/Login`).
2. User enters email and password.
3. Frontend sends `POST /api/auth/login` with credentials.
4. Backend validates against the `utilisateur` table (bcrypt password comparison).
5. On success, the server issues:
   - An **access token** (JWT, 15min expiry) stored in an HttpOnly cookie.
   - A **refresh token** (JWT, 7 days expiry) stored in an HttpOnly cookie.
6. The frontend router guard (`beforeEach`) calls `GET /api/auth/check` on every navigation.
7. If the access token is expired, the Axios interceptor calls `POST /api/auth/refresh` to get a new one silently.
8. The router checks the user's `role` against the route's `meta.role` — unauthorized users are redirected to `/Error`.

### Role-Based Navigation

After login, users are redirected to their respective dashboard:

| Role | Redirect To | Sidebar |
|------|------------|---------|
| `admin` | `/dashboard` | `AppSidebar.vue` |
| `Professor` | `/DashboardProf` | `sidebarProf.vue` |
| `student` | `/dashstud` | `sidebarStudent.vue` |

Each role has its own layout, header, and sidebar component, ensuring a tailored experience.

### Evaluation Workflow (Professor)

1. Professor navigates to **Evaluation → Classes**.
2. Selects a class to evaluate.
3. Chooses the skills to assess from the predefined skill catalog.
4. For each student in the class, rates each skill (score-based evaluation).
5. Submits the evaluation — data is stored in the database with timestamps.
6. The evaluation appears in the professor's **History** and on the student's **Dashboard**.

### Signal Workflow

1. A professor (or admin) creates a **signal** about a student.
2. The signal includes: student name, reason/category, description, and severity.
3. The signal is visible to the admin in the **Signals** management page.
4. A solution/resolution can be attached to the signal after follow-up.
5. The student can see signals reported about them in their own dashboard.

### Project Management (Professor)

1. Professor creates a new **project** with a title, description, and deadline.
2. Assigns student **groups** to the project.
3. Tracks the project status and can view group members and their details.
4. Can generate a PDF report for the project.

---

## 7 — Key Features by Role

### Admin Features

| Feature | Page | Description |
|---------|------|-------------|
| Dashboard | `/dashboard` | Stats overview: total students, professors, evaluations, signals |
| Student Management | `/Student` | CRUD operations with search, pagination, bulk actions |
| Professor Management | `/Professor` | CRUD operations for professor accounts |
| Supervisor Management | `/Supervisor` | CRUD operations for supervisor accounts |
| Skills Catalog | `/Skills` | Define and manage the skills used in evaluations |
| Fields & Groups | `/Group` | Configure academic sectors, fields, and student groups |
| Coaches | `/Coach` | Manage coach profiles |
| Evaluations Overview | `/GlobalOverview` | Aggregated evaluation statistics across all classes |
| Signals | `/Signals` | View and manage all reported signals |
| Calendar | `/Calendar` | Academic events and scheduling |

### Professor Features

| Feature | Page | Description |
|---------|------|-------------|
| Dashboard | `/DashboardProf` | Personal stats and quick actions |
| Class Evaluation | `/ClassesEval` | Select classes and evaluate students |
| Evaluation History | `/HistoriqueEval` | View past submitted evaluations |
| Project Management | `/ProjectMang` | Create and manage student projects |
| Signal Classes | `/ClassesSignal` | Report signals per class |
| Signal History | `/HistoriqueSignal` | View past signals and resolutions |
| Notifications | `/Notification` | In-app notification center |
| PDF Generation | `/gen` | Generate downloadable student reports |

### Student Features

| Feature | Page | Description |
|---------|------|-------------|
| Dashboard | `/dashstud` | Personal skill completion and evaluation summary |
| Evaluations | `/StudEvals` | View received evaluations from professors |
| Projects | `/StudProject` | View assigned projects and group members |
| Self-Evaluation | `/selfEval` | Self-assess skills and compare with professor ratings |
| Signals | `/StudSignals` | View signals reported about the student |
| Reports | `/StudRapport` | View personal reports |
| Notifications | `/StudNotif` | In-app notification center |

---

## 8 — Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Vue 3 (Composition API) | Reactive UI components |
| **Build Tool** | Vite | Fast dev server with HMR |
| **State Management** | Pinia | Centralized auth and app state |
| **CSS Framework** | Tailwind CSS v4 | Utility-first styling |
| **HTTP Client** | Axios | API calls with interceptor for token refresh |
| **Backend Framework** | Express 5 (Node.js) | REST API server |
| **Database** | PostgreSQL (hosted on Neon) | Relational data storage |
| **Database Driver** | pg (node-postgres) | Raw SQL queries |
| **Authentication** | JWT (jsonwebtoken) | Access + Refresh token pair |
| **Password Hashing** | bcrypt | Secure password storage |
| **Security** | Helmet, csrf-csrf, express-rate-limit | HTTP headers, CSRF protection, rate limiting |
| **Email** | Nodemailer (Gmail SMTP) | Password reset emails |
| **PDF Generation** | Puppeteer + EJS | Server-side PDF rendering |
| **File Upload** | Multer | Profile picture uploads |
| **Testing** | Jest + Supertest | Backend unit and integration tests |
| **Containerization** | Docker + Docker Compose | Production deployment |

---

## 9 — Database Structure

The PostgreSQL database is built around the `utilisateur` (user) table, with role-specific relationships:

### Core Tables

| Table | Description |
|-------|-------------|
| `utilisateur` | Central user table (id, nom, prenom, email, mot_de_passe, my_role) |
| `etudiant` | Student-specific data linked to utilisateur |
| `professeur` | Professor-specific data linked to utilisateur |
| `superviseur` | Supervisor-specific data linked to utilisateur |
| `coach` | Coach profiles managed by admin |

### Academic Structure

| Table | Description |
|-------|-------------|
| `sector` | Academic fields/sectors (e.g., Computer Science, Business) |
| `groupe` | Student groups/classes within sectors |

### Evaluation & Skills

| Table | Description |
|-------|-------------|
| `competence` | Skill definitions (name, category, description) |
| `evaluation` | Evaluation records linking professor → student → skills → scores |

### Project Management

| Table | Description |
|-------|-------------|
| `projet` | Project definitions (title, description, deadline, status) |

### Signals & Notifications

| Table | Description |
|-------|-------------|
| `signal` | Reported issues (reporter, reported student, reason, status, solution) |
| `notification` | In-app notifications per user |

---

## 10 — Security & Authentication

### Authentication Mechanism

- **Dual JWT Strategy**: Access token (short-lived, 15min) + Refresh token (long-lived, 7 days).
- **HttpOnly Cookies**: Tokens are stored in HttpOnly cookies (not accessible via JavaScript), preventing XSS attacks.
- **Remember Me**: When enabled, cookies get explicit `maxAge`; otherwise they are session cookies.
- **Automatic Token Refresh**: The Axios interceptor detects 401 responses and silently refreshes the access token.

### Security Layers

| Layer | Technology | Purpose |
|-------|-----------|---------|
| CSRF Protection | `csrf-csrf` (Double CSRF pattern) | Prevents cross-site request forgery |
| HTTP Security Headers | `helmet` | Sets secure HTTP headers (XSS, HSTS, etc.) |
| Rate Limiting | `express-rate-limit` | Prevents brute-force login attacks |
| Input Validation | `express-validator` | Sanitizes and validates all user inputs |
| Password Security | `bcrypt` (10 rounds) | Secure one-way password hashing |
| Role-Based Access | Router guards + middleware | Ensures users can only access their role's pages |

### CORS Configuration

In development, the Vite dev server proxies API requests to the backend (`localhost:3000`), unifying the origin and avoiding CORS/SameSite cookie issues. In production, both frontend and backend are served from the same origin via Docker.

---

## 11 — Deployment

### Development

```bash
# Terminal 1 — Backend
cd backend
npm install
npm run dev          # Starts Express on port 3000 with nodemon

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev          # Starts Vite on port 5173 with proxy to :3000
```

### Production (Docker)

The project includes `docker-compose.yml` and `docker-compose.prod.yml` for containerized deployment:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

This builds and runs both the frontend (served as static files) and backend containers, connected to the PostgreSQL database.

---

## Summary

**GrowTrack** is a role-based academic management platform that solves the problem of fragmented student skill tracking. It provides administrators with institutional oversight, professors with structured evaluation and project management tools, and students with transparency into their own performance. Built with modern web technologies (Vue 3, Express 5, PostgreSQL), it features robust security (JWT, CSRF, Helmet), automated PDF generation, and is ready for containerized deployment.
