/**
 * API endpoint constants
 * Centralized to avoid hardcoded strings across services/components
 */
export const API = {
  // Auth
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    REFRESH: "/api/auth/refresh",
    CHECK: "/api/auth/check",
    RESET_PASSWORD: "/api/auth/reset-password",
    CSRF: "/api/csrf-token",
  },

  // Admin
  ADMIN: {
    STUDENTS: "/admin/students",
    PROFESSORS: "/admin/professors",
    SUPERVISORS: "/admin/supervisors",
    SKILLS: "/admin/skills",
    CLASSES: "/admin/class",
    COACHES: "/admin/coachs",
    SIGNALS: "/admin/signals",
    PROFILE: "/admin/profile",
    DASHBOARD: "/api/DashAdmin",
    GLOBAL_OVERVIEW: "/api/GlobalOverView",
  },

  // Professor
  PROFESSOR: {
    DASHBOARD: "/prof/dashboard",
    EVAL_HISTORY: "/api/prof_evaluation_history",
    EVAL_CLASSES: "/api/prof_evaluation_classes",
    PROJECT_MANAGEMENT: "/api/prof_project_management",
    SIGNAL_HISTORY: "/api/signal_history",
    SIGNAL_CLASSES: "/api/signal_classes",
    REPORT: "/api/report",
  },

  // Student
  STUDENT: {
    DASHBOARD: "/student/dashboard",
    PROJECTS: "/student/projects",
    NOTIFICATIONS: "/student/notifications",
  },

  // Misc
  CONTACT: "/api/contactus",
  HASH: "/api/hash",
  GENERATE_PDF: "/api/generate-pdf",
};
