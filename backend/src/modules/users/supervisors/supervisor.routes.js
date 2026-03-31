const express = require("express");
const router = express.Router();
const supervisorController = require("./supervisor.controller");
const { authenticate } = require("../../../middleware/authenticate");
const authorize = require("../../../middleware/authorize");
const { validate } = require("../../../middleware/validate");
const supervisorValidation = require("./supervisor.validation");

router.get(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(supervisorValidation.getAll),
  supervisorController.getAll
);

router.get(
  "/count",
  authenticate,
  authorize("admin"),
  supervisorController.getCount
);

router.get(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(supervisorValidation.getById),
  supervisorController.getById
);

router.post(
  "/",
  authenticate,
  authorize("admin", "professor"),
  validate(supervisorValidation.create),
  supervisorController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("admin", "professor"),
  validate(supervisorValidation.update),
  supervisorController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  validate(supervisorValidation.delete),
  supervisorController.delete
);

module.exports = router;
