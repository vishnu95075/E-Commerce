const express = require("express")
const errorMiddleware = require("./middleware/error")
const app = express();
const product = require("./routes/productRoute");
const user = require("./routes/userRoute")
const oderRoute = require("./routes/oderRoute")
const cors = require('cors');

const cookieParser = require("cookie-parser");
const fileUpload=require("express-fileupload")

var bodyParser = require('body-parser');
app.use(fileUpload())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", oderRoute);
//  MiddleWare For Error
app.use(errorMiddleware);


module.exports = app;