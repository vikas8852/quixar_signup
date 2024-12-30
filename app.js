const express=require('express');
const app=express();
const authRouter=require('./router/authRoute');
const databaseconnect = require('./config/databaseConfig');
const cookieParser=require('cookie-parser');

//use cookie parser
app.use(cookieParser());
//convert json
app.use(express.json());
// Middleware to parse URL-encoded bodies
//app.use(express.urlencoded({ extended: true }));
//route
app.use('/api/auth/',authRouter);
//database
databaseconnect();
app.use('/',(req,res)=>{
    res.status(200).json({data:'JWTauth server'})
})

module.exports=app;