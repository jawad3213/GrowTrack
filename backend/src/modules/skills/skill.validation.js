const { body, param, query } = require("express-validator");

exports.getAll = [
  query("search").optional().isString(),
  query("categorie").optional().isString(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Skill ID is required"),
];

exports.create = [
  body("nom").notEmpty().withMessage("Skill name is required"),
  body("description").optional().isString(),
  body("categorie").optional().isString(),
  body("niveau_min").optional().isInt({ min: 1, max: 5 }),
  body("image").optional().isString(),
];

exports.update = [
  param("id").notEmpty().withMessage("Skill ID is required"),
  body("nom").optional().notEmpty(),
  body("description").optional().isString(),
  body("categorie").optional().isString(),
  body("niveau_min").optional().isInt({ min: 1, max: 5 }),
  body("image").optional().isString(),
];

exports.delete = [
  param("id").notEmpty().withMessage("Skill ID is required"),
];
