const express = require("express");
const router = express.Router();
const professorController = require("./professor.controller");
const { authenticate } = require("../../../middleware/authenticate");
const authorize = require("../../../middleware/authorize");
const { validate } = require("../../../middleware/validate");
const professorValidation = require("./professor.validation");

router.get(
  "/",
  authenticate,
  authorize("admin"),
  validate(professorValidation.getAll),
  professorController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  professorController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(professorValidation.getById),
  professorController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validate(professorValidation.create),
  professorController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(professorValidation.update),
  professorController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(professorValidation.delete),
  professorController.delete
);

module.exports = router;
