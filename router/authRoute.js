const express=require('express');
const authRouter=express.Router();
const{signup,signin,getUser,logOut}=require('../controller/authController')
const jwtAuth=require('../middleware/jwtAuthController');
authRouter.post('/signup',signup)
authRouter.post('/signin',signin)
authRouter.get('/user',jwtAuth,getUser);
authRouter.get('/logout',jwtAuth,logOut);


module.exports=authRouter;