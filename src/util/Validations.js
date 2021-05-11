const { body } = require("express-validator");

module.exports = {

    user: [
        body("name").not().isEmpty().withMessage("Name is required and has not been entered"),
        body("name").isLength({max: 50, min: 4}).withMessage("Name must have between 4 and 50 char"),
        body("surname").not().isEmpty().withMessage("Surname is required and has not been entered"),
        body("surname").isLength({max: 50, min: 4}).withMessage("Surname must have between 4 and 50 char"),
        body("email").not().isEmpty().withMessage("E-mail is required and has not been entered"),
        body("email").isLength({max: 100, min: 8}).withMessage("E-mail must have between 8 and 100 char"),
        body("password").not().isEmpty().withMessage("Password is required and has not been entered"),
        body("password").isLength({max: 100, min: 8}).withMessage("Password must have between 8 and 100 char"),
        body("phone").not().isEmpty().withMessage("Phone is required and has not been entered"),
        body("phone").isLength({max: 15, min: 8}).withMessage("Phone must have between 8 and 15 char"),
        body("birthdate").not().isEmpty().withMessage("Birthdate is required and has not been entered")
    ]

}