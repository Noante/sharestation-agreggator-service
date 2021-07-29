const jwt = require("../config/JwtConfig");
const db = require("../database/models");
const crypto = require("crypto");

class AuthController {

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
                    res.json({msg: "Authenticated with success.", token: token, user_id: user.id});

                } else {

                    res.status(401);
                    res.json({msg: "Authentication Failed"});    

                }

            } else {

                res.status(401);
                res.json({msg: "Authentication Failed. E-mail not founded"});

            }
            
        } catch (error) {
            console.error(error);
            res.status(500);
            res.send({"error": error});   
        }
        
    }

}

module.exports = new AuthController();