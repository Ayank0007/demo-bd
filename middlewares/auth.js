const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next) => {
    try {
        const token =req.body.token ||req.cookies.token || req.header('Authorization').replace('Bearer ','');
        if(!token){
            return res.status(401).json({
                success:false,
                message:'tokken missing'
            })
        }

        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user=decode;
        } catch (error) {
            return res.status(400).json({
                success:false,
                message:"you are not sending any token in body"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error occured while verifying token"
        })
    }
}

exports.isStudent =(req,res,next)=>{
    try {
        if(req.user.role!=='student'){
            return res.status(404).json({
                succes:false,
                message:"you are not authrize for accessing student"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error occured while verifying as student"
        })
    }
}

exports.isAdmin =(req,res,next)=>{
    try {
        if(req.user.role!=='instructor'){
            return res.status(404).json({
                succes:false,
                message:"you are not authrize for accessing intructor"
            })
        }
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"error occured while verifying as instructor"
        })
    }
}