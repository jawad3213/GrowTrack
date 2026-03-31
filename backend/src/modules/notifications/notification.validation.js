const { body, param, query } = require("express-validator");

exports.getAll = [
  query("type").optional().isString(),
  query("lu").optional().isBoolean(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.create = [
  body("id_user").isInt().withMessage("User ID is required"),
  body("type").notEmpty().withMessage("Notification type is required"),
  body("titre").notEmpty().withMessage("Title is required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("lien").optional().isString(),
];
