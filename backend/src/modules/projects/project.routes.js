const express = require("express");
const router = express.Router();
const projectController = require("./project.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const projectValidation = require("./project.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(projectValidation.getAll),
  projectController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin", "professor"),
  projectController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(projectValidation.getById),
  projectController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(projectValidation.create),
  projectController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(projectValidation.update),
  projectController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(projectValidation.delete),
  projectController.delete
);

module.exports = router;
