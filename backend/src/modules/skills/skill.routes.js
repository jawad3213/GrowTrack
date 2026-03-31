const express = require("express");
const router = express.Router();
const skillController = require("./skill.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const skillValidation = require("./skill.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(skillValidation.getAll),
  skillController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  skillController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(skillValidation.getById),
  skillController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(skillValidation.create),
  skillController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(skillValidation.update),
  skillController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(skillValidation.delete),
  skillController.delete
);

module.exports = router;
