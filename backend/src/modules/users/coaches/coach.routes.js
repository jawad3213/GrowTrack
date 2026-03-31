const express = require("express");
const router = express.Router();
const coachController = require("./coach.controller");
const { authenticate } = require("../../../middleware/authenticate");
const authorize = require("../../../middleware/authorize");
const { validate } = require("../../../middleware/validate");
const coachValidation = require("./coach.validation");

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validate(coachValidation.getAll),
  coachController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  coachController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(coachValidation.getById),
  coachController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(coachValidation.create),
  coachController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(coachValidation.update),
  coachController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(coachValidation.delete),
  coachController.delete
);

module.exports = router;
