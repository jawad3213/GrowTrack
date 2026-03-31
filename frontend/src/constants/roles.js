export const ROLES = {
  ADMIN: "admin",
  PROFESSOR: "Professor",
  STUDENT: "student",
};

export const ROLE_DASHBOARDS = {
  [ROLES.ADMIN]: "/dashboard",
  [ROLES.PROFESSOR]: "/DashboardProf",
  [ROLES.STUDENT]: "/dashstud",
};
