const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");
const authValidation = require("./auth.validation");
const { validate } = require("../../middleware/validate");
const { authLimiter } = require("../../middleware/rateLimiter");
const { authenticate } = require("../../middleware/authenticate");

router.use(authLimiter);

router.post("/login", validate(authValidation.Login), authController.Login);
router.post("/reset-password", validate(authValidation.Email), authController.ResetPass);
router.post("/logout", authController.Logout);
router.post("/refresh", authController.RefreshToken);
router.get("/check", authenticate, authController.check);

module.exports = router;
