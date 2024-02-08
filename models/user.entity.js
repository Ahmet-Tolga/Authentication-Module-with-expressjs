const mongoose=require("mongoose");
const validator=require("express-validator");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    username:{type:String,required:[true,"username is required"],unique:[true,"username must be unique"]},
    password:{type:String,required:[true,"password is required"]},
    email:{type:String,required:[true,"email is required for signup"]},
},{timestamps:true});

const userModel=mongoose.model("users",userSchema);

module.exports=userModel;