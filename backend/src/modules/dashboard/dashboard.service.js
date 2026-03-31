const dashboardModel = require("./dashboard.model");

exports.getAdminStats = async () => {
  return await dashboardModel.getAdminStats();
};

exports.getProfessorStats = async (professorId) => {
  return await dashboardModel.getProfessorStats(professorId);
};

exports.getStudentStats = async (studentId) => {
  return await dashboardModel.getStudentStats(studentId);
};

exports.getRecentActivities = async (limit) => {
  return await dashboardModel.getRecentActivities(limit);
};
