require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const route = require("../route");
const MiddlewareConfig = require("./MiddlewareConfig");

class Server {

    constructor() {
        const middleware = new MiddlewareConfig();
        
        this.app = express();
        this.app.use(cors());
        this.app.use(middleware.setupMiddleware);
        this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
        this.app.use(express.json({ limit: "50mb" }));
        this.app.use(route);
    }

}

module.exports = new Server();