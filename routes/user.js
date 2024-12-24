const express =require('express');
const router =express.Router();

const { signUp, login } = require('../controller/Auth');
const { isStudent, isAdmin, auth } = require('../middlewares/auth');
router.post('/signup',signUp);
router.post('/login',login);


router.get('/test',auth,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"you are verified through test"
    })
});

router.get('/student',auth,isStudent,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"you are verified as student"
    })
});


router.get('/instructor',auth,isAdmin,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"you are verified as instructor"
    })
})


module.exports = router;