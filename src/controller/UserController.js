const jwt = require("../config/JwtConfig");
const User = require("../database/models/user");

class UserController {

    auth(req, res, next) {

        try {

            const user = req.body;

            if(user.email === "teste@mail.com" && user.password === "123"){

                const token = jwt.signToken({email: user.email});
                
                res.status(200);
                res.json({token: token});

            } else {

                res.status(401);
                res.json({error: "Authentication Failed."})

            }
            
        } catch (error) {

            res.status(500);
            res.send({"error": error});
            
        }
        
    }

    insertOne(req, res, next) {

        try {

            const user = req.body;

            const userCreated = user.create(user);

            res.status(201);
            res.send({msg: userCreated});
            
        } catch (error) {

            console.log(error);
            res.status(500);
            res.send({msg: "An error has occurred on creating a User"});
            
        }

    }

}

module.exports = new UserController();