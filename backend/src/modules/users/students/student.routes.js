const express = require("express");
const router = express.Router();
const studentController = require("./student.controller");
const { authenticate } = require("../../../middleware/authenticate");
const authorize = require("../../../middleware/authorize");
const { validate } = require("../../../middleware/validate");
const studentValidation = require("./student.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(studentValidation.getAll),
  studentController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  studentController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor", "student"),
  validate(studentValidation.getById),
  studentController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(studentValidation.create),
  studentController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(studentValidation.update),
  studentController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(studentValidation.delete),
  studentController.delete
);

module.exports = router;
