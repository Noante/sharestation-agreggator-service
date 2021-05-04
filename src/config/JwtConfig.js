const jwt = require ("jsonwebtoken");

class JwtConfig {

    signToken(payload){

        return jwt.sign(payload, process.env.KEY, { expiresIn: parseInt(process.env.EXPIRES) });

    }

    verifiyToken(token){

        return new Promise((resolve, reject) => {

            try {

                if(!token) resolve({auth: false, msg: "Authentication Needed"});

                token = token.replace("Bearer ", "");

                jwt.verify(token, process.env.KEY, (err, decoded) => {
                    if(err) resolve({auth: false, msg: "Invalid Token"});
    
                    resolve({auth: true, msg: "Authenticated"});
    
                })
                
            } catch (error) {

                reject(error);

            }

        });

    }

}

module.exports = new JwtConfig();