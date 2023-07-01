const express= require("express")
const errorMiddleware = require("./middleware/error")
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const cookieParser = require("cookie-parser");

var bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1",product);
app.use("/api/v1",user)
//  MiddleWare For Error
app.use(errorMiddleware);


module.exports=app;