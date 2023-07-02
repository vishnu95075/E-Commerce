const app = require("./app");
const dotenv = require("dotenv");


dotenv.config({path:"backend/config/config.env"})

const connectDatabase = require("./config/database");
connectDatabase();


const server =app.listen(process.env.PORT, ()=>{
    console.log(`Server Running on PORT = http://localhost:${process.env.PORT}`)
})


process.on("unhandledRejection",err=>{
    console.log("Error : ",err.message);
    console.log(`Shuting down the server due to unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });

})