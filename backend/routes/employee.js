const router = require("express").Router();
const multer = require("multer");
const employeeController = require("../controllers/employeeController.js");
const validator = require("../middleware/validator.js");
const verifyToken = require("../middleware/verifyToken.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../src/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/get", verifyToken, employeeController.getEmployees);
router.get("/get/:id", employeeController.getEmployee);
router.post(
  "/add",
  validator,
  verifyToken,
  upload.single("image"),
  employeeController.create
);
router.patch(
  "/update/:id",
  validator,
  upload.single("image"),
  verifyToken,
  employeeController.update
);
router.delete("/delete/:id", verifyToken, employeeController.delete);

module.exports = router;
