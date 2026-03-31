const { body } = require("express-validator");

exports.updateProfile = [
  body("nom").optional().notEmpty(),
  body("prenom").optional().notEmpty(),
  body("email").optional().isEmail(),
  body("telephone").optional().isString(),
];

exports.updatePassword = [
  body("currentPassword").notEmpty().withMessage("Current password is required"),
  body("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters"),
];
