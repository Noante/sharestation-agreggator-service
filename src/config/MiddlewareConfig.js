const jwt = require("./JwtConfig");
const httpProxy = require("http-proxy");
const proxyRedirect = require("../util/ProxyRedirect");

class MiddlewareConfig {

    constructor(){
        this.proxy = httpProxy.createProxyServer();
        this.setupMiddleware = this.setupMiddleware.bind(this);
    }

    setupCorsConfig(res){
        res.setHeader("Access-Control-Allow-Origin" , "*");
        res.setHeader("Access-Control-Allow-Methods" , "POST, PUT, GET, DELETE");
        res.setHeader("Access-Control-Allow-Headers" , "Content-Type");
        res.setHeader("Access-Control-Allow-Credentials" , true);
    }

    async setupProxyConfig(req, res, next){

        if(req.path === "/api/auth") {
            next();
        } else if(req.path === "/api/user") {
            this.proxy.web(req, res, { target: proxyRedirect.selectProxyHost(req.path) });
        } else { 
            const token = req.headers["authorization"];
            const jwtResponse = await jwt.verifiyToken(token);

            if(jwtResponse.auth){
                this.proxy.web(req, res, { target: proxyRedirect.selectProxyHost(req.path) });
            } else {
                res.status(401);
                res.json(jwtResponse);
            }

        }

    }

    setupMiddleware(req, res, next){
        this.setupCorsConfig(res);        
        this.setupProxyConfig(req, res, next)
    }

}

module.exports = MiddlewareConfig;