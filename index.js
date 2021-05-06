const server = require("./src/config/Server");

server.app.listen(process.env.EXPRESS_PORT, () => 

    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`)

)

