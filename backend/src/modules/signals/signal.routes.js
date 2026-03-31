const express = require("express");
const router = express.Router();
const signalController = require("./signal.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const signalValidation = require("./signal.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(signalValidation.getAll),
  signalController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin", "professor"),
  signalController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(signalValidation.getById),
  signalController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(signalValidation.create),
  signalController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(signalValidation.update),
  signalController.update
);

router.put(
  "/:id/resolve",
  authenticate,
  authorize("admin", "professor"),
  validate(signalValidation.resolve),
  signalController.resolve
);

module.exports = router;
