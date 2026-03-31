const { body, param, query } = require("express-validator");

exports.getAll = [
  query("status").optional().isIn(["en_attente", "en_cours", "resolu"]),
  query("id_etudiant").optional().isInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }),
];

exports.getById = [
  param("id").notEmpty().withMessage("Signal ID is required"),
];

exports.create = [
  body("id_etudiant").isInt().withMessage("Student ID is required"),
  body("id_professeur").optional().isInt(),
  body("type_signal").notEmpty().withMessage("Signal type is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("priorite").optional().isIn(["basse", "moyenne", "haute", "critique"]),
];

exports.update = [
  param("id").notEmpty().withMessage("Signal ID is required"),
  body("status").optional().isIn(["en_attente", "en_cours", "resolu"]),
  body("priorite").optional().isIn(["basse", "moyenne", "haute", "critique"]),
  body("description").optional().isString(),
];

exports.resolve = [
  param("id").notEmpty().withMessage("Signal ID is required"),
  body("resolution").notEmpty().withMessage("Resolution is required"),
];
