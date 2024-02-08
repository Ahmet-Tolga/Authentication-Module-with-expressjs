const express = require("express");
const env=require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter=require("./routes/auth.router");
const {jwtVerify,Req_user}=require("./middlewares/auth.middleware");
const app = express();

env.config();
const port=process.env.PORT || 3001

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRouter);
app.use("*",Req_user);


app.use("/",jwtVerify,(req,res)=>{
    res.send("index page!");
})


try {
    mongoose.connect("mongodb://127.0.0.1:27017/ProjectManagement")
        .then(() => { console.log("connected database succesfully!") })
        .then(() => { app.listen(port,()=>console.log(`listenin port on ${port}`)) })
}
catch (err) {
    console.log(err);
}