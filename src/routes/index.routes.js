const albumRouter = require("./Album.routes")

const setupRoutes = (server) =>{
    server.use("/albums", albumRouter)
}

module.exports = {
    setupRoutes
}