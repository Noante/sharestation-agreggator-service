require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const proxy = require("express-http-proxy");
const route = require("../route");
const jwt = require("./JwtConfig");

class Server {

    constructor() {

        this.app = express();
        this.setupMiddleware();
        this.app.use(route);

    }

    selectProxyHost(path){

        let host = "";

        switch (path) {
            case "file": host = "http://localhost:3001/"; break;
            case "email": host = "http://localhost:3002/"; break;
            default: host = "http://localhost:3000/"; break;
        }

        return host;
    }

    setupMiddleware(){

        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(bodyParser.json({ limit: "50mb" }));

        this.app.use(async (req, res, next) => {

            res.setHeader("Access-Control-Allow-Origin" , "*");
            res.setHeader("Access-Control-Allow-Methods" , "POST, PUT, GET, DELETE");
            res.setHeader("Access-Control-Allow-Headers" , "Content-Type");
            res.setHeader("Access-Control-Allow-Credentials" , true);
        
            if(req.path === "/api/user/auth" || req.path === "/api/user") {
                next();

            } else {

                const token = req.headers["authorization"];
                const jwtResponse = await jwt.verifiyToken(token);
    
                if(jwtResponse.auth){

                    const path = req.path.replace("/api/", "");
                    const barIndex = path.indexOf("/") === -1 ? path.length : path.indexOf("/");
    
                    proxy(this.selectProxyHost(path.substring(0, barIndex)))(req, res, next);
    
                } else {
    
                    res.status(401);
                    res.json(jwtResponse);
    
                }

            }
        
        });

    }

}

module.exports = new Server();