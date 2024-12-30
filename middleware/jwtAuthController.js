const JWT=require('jsonwebtoken');
const jwtAuth=(req,res,next)=>{
    const token=(req.cookies && req.cookies.token)||null;
    if(!token){
        return res.status(400).json({
            success:false,
            message:'Not authorized'
        })
    }
    try{
        const payload=JWT.verify(token,process.env.SECRET || 'default-secret');
        req.user={id:payload.id,email:payload.email};

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })

    }
    //call the next middleware
    next();
}
module.exports=jwtAuth;