const router = require("express").Router();
const authController = require("./controller/AuthController");

router.post("/api/auth", authController.auth);

module.exports = router;