const Sequelize = require("sequelize");
const environment = require("./EnvironmentConfig");

class DatabaseConnection {

    constructor(){
        
        this.config = environment[process.env.NODE_ENV];
        this.database = new Sequelize(this.config.url, this.config);

    }

    connect(){

        this.database.authenticate().then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log("An error has occurred on connecting with database");
        });

    }

}

module.exports = new DatabaseConnection();