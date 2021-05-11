const router = require("express").Router();
const validator = require("./util/Validations");
const fileController = require("./controller/FileController");
const userController = require("./controller/UserController");

router.post("/api/user/auth", userController.auth);
router.post("/api/user", validator.user, userController.insertOne);

router.post("/api/file", fileController.getFile);

module.exports = router;