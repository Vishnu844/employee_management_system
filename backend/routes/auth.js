const router = require("express").Router();
const loginController = require("../controllers/loginController.js");

router.post("/register", loginController.register);

router.post("/login", loginController.login);

module.exports = router;
