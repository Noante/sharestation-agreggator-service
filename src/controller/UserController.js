const jwt = require("../config/JwtConfig");
const db = require("../database/models");
const crypto = require("crypto");
const { validationResult } = require("express-validator");

class UserController {

    async auth(req, res, next) {

        try {

            const userDAO = db["User"];
            const userRequest = req.body;

            const user = await userDAO.findOne({where: {email: userRequest.email}});

            if(user){

                const hashPass = crypto.pbkdf2Sync(userRequest.password, user.salt, 1000, 64, "sha512").toString("hex");

                if(user.password === hashPass){

                    const token = jwt.signToken({email: user.email});
                
                    res.status(200);
                    res.json({msg: "Authenticated with success.", token: token});

                } else {

                    res.status(401);
                    res.json({msg: "Authentication Failed"});    

                }

            } else {

                res.status(401);
                res.json({msg: "Authentication Failed. E-mail not founded"});

            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({"error": error});   
        }
        
    }

    async insertOne(req, res, next) {

        try {

            const validation = validationResult(req);

            if(validation.isEmpty()){

                const userDAO = db["User"];

                const userRequest = req.body;

                const user = await userDAO.findOne({where: {email: userRequest.email}});

                if(user){
                    res.status(409);
                    res.send({msg: `There is a user already using the e-mail ${user.email}`});
                } else {
                    const salt = crypto.randomBytes(16).toString("hex");
                    const hashPass = crypto.pbkdf2Sync(userRequest.password, salt, 1000, 64, "sha512").toString("hex");
                    
                    userRequest.password = hashPass;
                    userRequest.salt = salt;

                    userDAO.create(userRequest);

                    res.status(201);
                    res.send({msg: "User has been created with success"});
                }

            } else {

                res.status(400);
                res.send({msg: validation});

            }
            
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({msg: "An error has occurred on creating a User"});    
        }

    }

}

module.exports = new UserController();