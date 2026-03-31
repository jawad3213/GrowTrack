const reportService = require("./report.service");
const { success, error } = require("../../shared/utils/response");

exports.getStudentReport = async (req, res, next) => {
  try {
    const report = await reportService.generateStudentReport(req.params.studentId);
    return success(res, 200, "Student report generated", report);
  } catch (err) {
    next(err);
  }
};

exports.getClassReport = async (req, res, next) => {
  try {
    const report = await reportService.generateClassReport(req.params.classId);
    return success(res, 200, "Class report generated", report);
  } catch (err) {
    next(err);
  }
};

exports.getEvaluationReport = async (req, res, next) => {
  try {
    const report = await reportService.generateEvaluationReport(req.params.evaluationId);
    return success(res, 200, "Evaluation report generated", report);
  } catch (err) {
    next(err);
  }
};
