const jwt = require("../config/JwtConfig");

class AuthController {

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

}

module.exports = new AuthController();