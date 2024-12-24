const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { model } = require('mongoose');

require('dotenv').config();

exports.signUp = async (req,res) => {
    try {
        const {email,password,name,role}=req.body;
        const ExistUser = await User.findOne({email});
        if (ExistUser) {
            return res.status(500).json({
                status:false,
                message:'user already exist'
            })
        }

        let hashedpass;

        try {
            hashedpass=await bcrypt.hash(password,10);
            console.log(hashedpass)
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:'error hasing password'
            })
        }
        
        try {
            const response = await User.create({email,name,password:hashedpass,role});
            return res.status(200).json({
                status:true,
                message:'Signing up statusfull',
                data:response
            })
        } catch (error) {
            return res.status(500).json({
                status:false,
                message:'error creating entry'
            })
        }

    } catch (error) {
        console.error('error signing up');
        console.error(error.message);
        return res.status(500).json({
            status:false,
            message:'error in signinig up'
        })
    }
}

exports.login = async (req,res) => {
    try {

        const {email,password}=req.body;
        if (!email && !password) {
            return res.status(500).json({
                success:false,
                message:"email or password is not valid"
            })
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(500).json({
                success:false,
                message:"user didn't exist please signup"
            })
        }

        const payload={
            email:user.email,
            role:user.role,
            id:user._id
        }
        if( await bcrypt.compare(password,user.password)){
            const token = jwt.sign(payload,process.env.JWT_SECRET);
            let copyUser=user.toObject();
            copyUser.password=undefined;
            copyUser.token=token;
            return res.cookie("token",token).status(200).json({
                success:true,
                token,
                copyUser,
                message:"error generating token"
            })
        }
        else{
            return res.status(500).json({
                success:false,
                message:"password is wrong"
            })
        }


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error generating token"
        })
    }
}