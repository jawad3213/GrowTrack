const { body, param, query } = require("express-validator");

exports.getAll = [
  query("id_etudiant").optional().isInt(),
  query("id_professeur").optional().isInt(),
  query("status").optional().isIn(["en_cours", "termine", "en_attente"]),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Project ID is required"),
];

exports.create = [
  body("id_etudiant").isInt().withMessage("Student ID is required"),
  body("id_professeur").isInt().withMessage("Professor ID is required"),
  body("titre").notEmpty().withMessage("Title is required"),
  body("description").optional().isString(),
  body("date_debut").optional().isISO8601(),
  body("date_fin").optional().isISO8601(),
  body("status").optional().isIn(["en_cours", "termine", "en_attente"]),
];

exports.update = [
  param("id").notEmpty().withMessage("Project ID is required"),
  body("titre").optional().notEmpty(),
  body("description").optional().isString(),
  body("date_debut").optional().isISO8601(),
  body("date_fin").optional().isISO8601(),
  body("status").optional().isIn(["en_cours", "termine", "en_attente"]),
];

exports.delete = [
  param("id").notEmpty().withMessage("Project ID is required"),
];
