const { io, httpServer } = require('./utils/socket');
const app = require("./app");

require("dotenv").config();

httpServer.listen(process.env.PORT,()=>{
    console.log("server listening on port", process.env.PORT);
});