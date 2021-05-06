const Sequelize = require("sequelize");
const dbConnection = require("../config/DatabaseConnection");

class User {

    name = "";
    email = "";
    password = "";
    phone = "";
    birthdate = "";
    storage_size = 0;
    active = true;

    get name() { return name }
    set name(name) { this.name = name}
    get email() { return email }
    set email(email) { this.email = email}
    get password() { return password }
    set password(password) { this.password = password}
    get phone() { return phone }
    set phone(phone) { this.phone = phone}
    get birthdate() { return birthdate }
    set birthdate(birthdate) { this.birthdate = birthdate}
    get storage_size() { return storage_size }
    set storage_size(storage_size) { this.storage_size = storage_size}
    get active() { return active }
    set active(active) { this.active = active}

    static defineSequelize(){
        return dbConnection.database.define("user", {
            name : { type: Sequelize.STRING },
            email : { type: Sequelize.STRING },
            password : { type: Sequelize.STRING },
            phone : { type: Sequelize.STRING },
            birthdate : { type: Sequelize.DATE },
            storage_size : { type: Sequelize.DOUBLE },
            active : { type: Sequelize.BOOLEAN }
        })
    }

}


module.exports = User;