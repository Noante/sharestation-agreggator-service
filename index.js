const server = require("./src/config/Server");

server.app.listen(process.env.EXPRESS_PORT, () => 

    console.log(`O servidor está escutando na porta ${process.env.EXPRESS_PORT}`)

)

