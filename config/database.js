const mongoose = require("mongoose");

require('dotenv').config();

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MOGODB_URL);
        console.log("database connected successfully");
        
    } catch (error) {
        console.log("db connection error");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports=dbconnect;