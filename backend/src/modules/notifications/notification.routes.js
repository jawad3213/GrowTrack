const express = require("express");
const router = express.Router();
const notificationController = require("./notification.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const notificationValidation = require("./notification.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  notificationController.getAll
);

router.get(
  "/unread-count",
  authenticate,
  authorize("admin", "professor", "student"),
  notificationController.getUnreadCount
);

router.put(
  "/:id/read",
  authenticate,
  authorize("admin", "professor", "student"),
  notificationController.markAsRead
);

router.put(
  "/read-all",
  authenticate,
  authorize("admin", "professor", "student"),
  notificationController.markAllAsRead
);

router.post(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(notificationValidation.create),
  notificationController.create
);

module.exports = router;
