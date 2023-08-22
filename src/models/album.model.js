const database = require("../database/database-config")


const getAll = () =>{
    return database.query("SELECT * FROM album")
        .then(([results]) => (results))
}

module.exports = {
    getAll
}