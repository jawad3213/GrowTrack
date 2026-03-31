const express = require("express");
const router = express.Router();
const classController = require("./class.controller");
const { authenticate } = require("../../middleware/authenticate");
const authorize = require("../../middleware/authorize");
const { validate } = require("../../middleware/validate");
const classValidation = require("./class.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(classValidation.getAll),
  classController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  classController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(classValidation.getById),
  classController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(classValidation.create),
  classController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(classValidation.update),
  classController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(classValidation.delete),
  classController.delete
);

module.exports = router;
