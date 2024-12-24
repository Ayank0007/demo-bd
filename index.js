const express = require("express");
const app = express();

app.use(express.json());

require('dotenv').config();

const PORT=process.env.PORT || 4000;
const dbconnect=require('./config/database');
dbconnect();

app.use('/v1',require('./routes/user'))
app.listen(PORT,()=>{
    console.log(`app is listing at port no ${PORT}` );
});