const { body, param, query } = require("express-validator");

exports.getAll = [
  query("search").optional().isString(),
  query("filiere").optional().isString(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Class ID is required"),
];

exports.create = [
  body("nom").notEmpty().withMessage("Class name is required"),
  body("filiere").notEmpty().withMessage("Field/Sector is required"),
  body("niveau").optional().isInt({ min: 1, max: 5 }),
  body("annee_scolaire").optional().isString(),
];

exports.update = [
  param("id").notEmpty().withMessage("Class ID is required"),
  body("nom").optional().notEmpty(),
  body("filiere").optional().notEmpty(),
  body("niveau").optional().isInt({ min: 1, max: 5 }),
  body("annee_scolaire").optional().isString(),
];

exports.delete = [
  param("id").notEmpty().withMessage("Class ID is required"),
];
