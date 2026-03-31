const express = require("express");
const router = express.Router();
const verifyRolee = require('../../middlewares/verificationRole');
const {verifyToken}=require('../../middlewares/VerifyToken')

router.use(verifyToken)
router.use(verifyRolee("admin"))


// Tu peux intégrer ici des middlewares de validation si besoin
// const { validate_skill, validations, validate } = require("../../validators/adminValidation")

const skillController = require("../../controllers/adminControllers/skillController");

router.post("/create", skillController.createSkill);
router.get("/", skillController.getAllSkills);
router.patch("/:skill_name", skillController.updateSkill);
router.delete("/:skill_name", skillController.deleteSkill);
router.get("/total", skillController.getTotalSkills);
router.get("/stats", skillController.getSkillStats);
router.get("/evaluation-stats", skillController.getEvaluationStats);
router.get("/signal-stats", skillController.getSignalStats);

module.exports = router;
