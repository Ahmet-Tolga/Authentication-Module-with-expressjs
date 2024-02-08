const jwt=require("jsonwebtoken");

module.exports.jwtVerify=async function(req,res,next){
    const token=req.cookies && req.cookies.jwt;

    if(token){
        await jwt.verify(token.refresh_token,`${process.env.SECRET_KEY}`,(err,decoded)=>{
            if(err){
                return res.redirect("/signin");
            }
           
            next();
        })
    }
    else{
        return res.redirect("/signin");
    }
}

module.exports.Req_user = async function(req, res, next) {
    const token = req.cookies && req.cookies.jwt;

    if (token) {
        jwt.verify(token.refresh_token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.locals.user = null;
                return res.redirect("/signin");
            } else {

                res.locals.user = decoded; 
                return next();
            }
        });
    } else {
        res.locals.user = null;
        return next();
    }
}
