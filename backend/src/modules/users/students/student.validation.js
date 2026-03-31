const { body, param, query } = require("express-validator");

exports.getAll = [
  query("search").optional().isString(),
  query("id_classe").optional().isInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Student ID is required"),
];

exports.create = [
  body("nom").notEmpty().withMessage("First name is required"),
  body("prenom").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("id_classe").optional().isInt(),
  body("telephone").optional().isString(),
  body("date_naissance").optional().isISO8601(),
];

exports.update = [
  param("id").notEmpty().withMessage("Student ID is required"),
  body("nom").optional().notEmpty(),
  body("prenom").optional().notEmpty(),
  body("email").optional().isEmail(),
  body("id_classe").optional().isInt(),
  body("telephone").optional().isString(),
  body("date_naissance").optional().isISO8601(),
  body("full_name").optional().isString(),
  body("cin").optional().isString(),
  body("cne").optional().isString(),
  body("pass").optional().isString(),
  body("id_sector").optional(),
];

exports.delete = [
  param("id").notEmpty().withMessage("Student ID is required"),
];
