module.exports.errorHandler=(error,res)=>{
    if(error.code==11000){
        res.status(404).json({success:false,message:"username must be unique"});
    }
    else{
        Object.values(error.errors).forEach(item=>{
            let sub_item=item.properties;
            res.status(404).json({success:false,message:sub_item.message});
        })
    }
}
