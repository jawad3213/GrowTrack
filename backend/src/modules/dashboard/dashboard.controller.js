const dashboardService = require("./dashboard.service");
const { success } = require("../../shared/utils/response");

exports.getStats = async (req, res, next) => {
  try {
    const { role, id } = req.user;
    let stats;

    if (role === "admin") {
      stats = await dashboardService.getAdminStats();
    } else if (role === "professor") {
      stats = await dashboardService.getProfessorStats(id);
    } else if (role === "student") {
      stats = await dashboardService.getStudentStats(id);
    } else {
      return success(res, 200, "Stats retrieved", {});
    }

    return success(res, 200, "Stats retrieved successfully", stats);
  } catch (err) {
    next(err);
  }
};

exports.getRecentActivities = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activities = await dashboardService.getRecentActivities(limit);
    return success(res, 200, "Recent activities retrieved", activities);
  } catch (err) {
    next(err);
  }
};
