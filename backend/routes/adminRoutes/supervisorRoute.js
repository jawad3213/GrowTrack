const express = require("express");
const router = express.Router();
const {validate_student,validations,validate} = require("../../validators/adminValidation")
const supervisorController = require("../../controllers/adminControllers/supervisorController")

const path = require("path");
const multer = require ("multer");
const verifyRolee = require('../../middlewares/verificationRole');
const {verifyToken}=require('../../middlewares/VerifyToken')

router.use(verifyToken)
router.use(verifyRolee("admin"))


// Config multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + file.originalname;
      cb(null, uniqueSuffix);
    },
  });
  const upload = multer({ storage: storage });


router.post("/create",  upload.single('image'), supervisorController.createSupervisor);
//,validate_student,validate
router.get("/",supervisorController.getAllSupervisors);
router.get("/search",supervisorController.getSupervisorByCin);
router.get("/:id",supervisorController.getSupervisorById);
router.patch("/:id_supervisor", upload.single('image'),supervisorController.updateSupervisor);
router.delete("/:id_utilisateur",supervisorController.deleteSupervisor);
router.get("/total",supervisorController.getTotalSupervisors)
router.get("/position",supervisorController.getSupervisorsByPosition)
router.get("/company",supervisorController.getSupervisorsByCompany)
router.get("/stats",supervisorController.getSupervisorStats)


module.exports = router;