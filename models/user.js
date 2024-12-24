const mongoose =require('mongoose');

const user = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["student","instructor","visitor"],
        require:true,
        default:"visitor"
    }
})

const User = mongoose.model("USERS",user);
module.exports=User;