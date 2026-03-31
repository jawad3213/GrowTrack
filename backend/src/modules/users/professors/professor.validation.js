const { body, param, query } = require("express-validator");

exports.getAll = [
  query("search").optional().isString(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Professor ID is required"),
];

exports.create = [
  body("nom").notEmpty().withMessage("First name is required"),
  body("prenom").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("specialite").optional().isString(),
  body("telephone").optional().isString(),
];

exports.update = [
  param("id").notEmpty().withMessage("Professor ID is required"),
  body("nom").optional().notEmpty(),
  body("prenom").optional().notEmpty(),
  body("email").optional().isEmail(),
  body("specialite").optional().isString(),
  body("telephone").optional().isString(),
];

exports.delete = [
  param("id").notEmpty().withMessage("Professor ID is required"),
];
