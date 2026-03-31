const express = require("express");
const router = express.Router();
const profileController = require("./profile.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const profileValidation = require("./profile.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student", "supervisor", "coach"),
  profileController.getProfile
);

router.put(
  "/",
  authenticate,
  authorize("admin", "professor", "student", "supervisor", "coach"),
  validate(profileValidation.updateProfile),
  profileController.updateProfile
);

router.put(
  "/password",
  authenticate,
  authorize("admin", "professor", "student", "supervisor", "coach"),
  validate(profileValidation.updatePassword),
  profileController.updatePassword
);

module.exports = router;
