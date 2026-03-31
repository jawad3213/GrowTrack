const { body, param, query } = require("express-validator");

exports.getAll = [
  query("id_etudiant").optional().isInt(),
  query("id_professeur").optional().isInt(),
  query("id_classe").optional().isInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Evaluation ID is required"),
];

exports.create = [
  body("id_etudiant").isInt().withMessage("Student ID is required"),
  body("id_professeur").isInt().withMessage("Professor ID is required"),
  body("id_classe").optional().isInt(),
  body("type_evaluation").notEmpty().withMessage("Evaluation type is required"),
  body("note").optional().isFloat({ min: 0, max: 20 }),
  body("competences").optional().isArray(),
  body("commentaire").optional().isString(),
  body("date_evaluation").optional().isISO8601(),
];

exports.update = [
  param("id").notEmpty().withMessage("Evaluation ID is required"),
  body("note").optional().isFloat({ min: 0, max: 20 }),
  body("competences").optional().isArray(),
  body("commentaire").optional().isString(),
  body("status").optional().isIn(["en_cours", "termine"]),
];
