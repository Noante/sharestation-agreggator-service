const router = require("express").Router();
const validator = require("./util/Validations");
const userController = require("./controller/UserController");

router.post("/api/user/auth", userController.auth);
router.post("/api/user", validator.user, userController.insertOne);

module.exports = router;