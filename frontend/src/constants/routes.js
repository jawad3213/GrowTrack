/**
 * Route path constants
 * Centralized to avoid hardcoded route paths across the frontend
 */
export const ROUTES = {
  // Public
  HOME: "/",
  LOGIN: "/Login",
  FORGOT_PASSWORD: "/forgotpass",
  RESET_PASSWORD: "/resetpass",
  CONTACT: "/ContactUs",
  TEAM: "/OurTeam",
  ERROR: "/Error",

  // Admin
  ADMIN: {
    DASHBOARD: "/dashboard",
    STUDENTS: "/Student",
    PROFESSORS: "/Professor",
    SUPERVISORS: "/Supervisor",
    SKILLS: "/Skills",
    GROUPS: "/Group",
    COACHES: "/Coach",
    SIGNALS: "/Signals",
    GLOBAL_OVERVIEW: "/GlobalOverview",
    CALENDAR: "/Calendar",
    PROFILE: "/UserProfile",
  },

  // Professor
  PROFESSOR: {
    DASHBOARD: "/DashboardProf",
    CLASSES_EVAL: "/ClassesEval",
    EVAL_HISTORY: "/HistoriqueEval",
    PROJECT_MANAGEMENT: "/ProjectMang",
    CLASSES_SIGNAL: "/ClassesSignal",
    SIGNAL_HISTORY: "/HistoriqueSignal",
    REPORT: "/Rapport",
    NOTIFICATIONS: "/Notification",
  },

  // Student
  STUDENT: {
    DASHBOARD: "/dashstud",
    EVALUATIONS: "/StudEvals",
    PROJECTS: "/StudProject",
    SIGNALS: "/StudSignals",
    SELF_EVAL: "/selfEval",
    REPORT: "/StudRapport",
    NOTIFICATIONS: "/StudNotif",
  },
};
