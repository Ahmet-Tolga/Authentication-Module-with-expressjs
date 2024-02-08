const userModel=require("../models/user.entity");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const {errorHandler}=require("../errors/error.handler");

const create_token=async(username,id)=>{
    const payload={username:username,id:id};
    const access_token=await jwt.sign(payload,`${process.env.SECRET_KEY}`,{expiresIn:"30s"});
    return {"access_token":access_token,"refresh_token":await jwt.sign(payload,`${process.env.SECRET_KEY}`,{expiresIn:"1d"})};
}

const login=async(username,password)=>{
    const user=await userModel.findOne({username:username});
    if(!user){
        throw new Error("invalid username");
    }
    if(await bcrypt.compare(password,user.password)){
        return user;
    }
    throw new Error("wrong password");
}

module.exports.get_signin=(req,res)=>{
    res.status(200).send("Login page");
}

module.exports.get_signup=(req,res)=>{
    res.status(200).send("Signup page");
}

module.exports.post_signin=async(req,res)=>{
    const {username,password}=req.body;
    try{
        const user=await login(username,password);
        const token=await create_token(username,user._id);
        res.cookie("jwt",token);
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
}

module.exports.post_signup=async(req,res)=>{
    const {username,password,email}=req.body;
    try{
        const new_user=await userModel.create({username:username,password:await bcrypt.hash(password,10),email:email});
        new_user.save()
        res.status(202).json(new_user);
    }
    catch(err){
        errorHandler(err,res);
    }
}

module.exports.logout=(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    res.redirect("/signin");
}


