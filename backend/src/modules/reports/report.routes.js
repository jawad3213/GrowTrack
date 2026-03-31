const express = require("express");
const router = express.Router();
const reportController = require("./report.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");

router.get(
  "/student/:studentId",
  authenticate,
  authorize("admin", "professor", "student"),
  reportController.getStudentReport
);

router.get(
  "/class/:classId",
  authenticate,
  authorize("admin", "professor"),
  reportController.getClassReport
);

router.get(
  "/evaluation/:evaluationId",
  authenticate,
  authorize("admin", "professor", "student"),
  reportController.getEvaluationReport
);

module.exports = router;
