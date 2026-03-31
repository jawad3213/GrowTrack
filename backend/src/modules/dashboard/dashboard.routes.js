const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboard.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");

router.get(
  "/stats",
  authenticate,
  authorize("admin", "professor", "student"),
  dashboardController.getStats
);

router.get(
  "/activities",
  authenticate,
  authorize("admin", "professor"),
  dashboardController.getRecentActivities
);

module.exports = router;
