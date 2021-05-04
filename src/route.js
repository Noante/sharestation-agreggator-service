const router = require("express").Router();
const fileController = require("./controller/FileController");
const authController = require("./controller/AuthController");

router.post("/api/auth", authController.auth);
router.post("/api/file", fileController.getFile);

module.exports = router;