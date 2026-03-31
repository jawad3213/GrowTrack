const express = require("express");
const router = express.Router();
const evaluationController = require("./evaluation.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const evaluationValidation = require("./evaluation.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(evaluationValidation.getAll),
  evaluationController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin", "professor"),
  evaluationController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(evaluationValidation.getById),
  evaluationController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(evaluationValidation.create),
  evaluationController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(evaluationValidation.update),
  evaluationController.update
);

module.exports = router;
