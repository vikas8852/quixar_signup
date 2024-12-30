const userModel=require("../model/userSchema");
const emailValidator=require("email-validator");
const signup = async(req, res,next) => {
    const {name,email,password,confirmPassword}=req.body;
    console.log(name,email,password,confirmPassword)
   
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }
    const validEmail=emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success:false,
            message:" Invalid Email formate"
        })
    }
    if(password!=confirmPassword){
        return res.status(400).json({
            success:false,
            message:" password and ConfirmPasword not match "
        })
    }

    try{
        const userInfo=userModel(req.body);
        const result=await userInfo.save(); 
         return res.status(200).json({
            success:true,
            data:result

         })
 
    }catch(e){
        if(e.code===11000){
            return res.status(400).json({
                success:false,
                message:'Account already exits eith provide email id'
            })

        }
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
  
    
  };
  const signin= async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:" every field is mandatory"
        })
    }
   try{

    const user=await userModel
    .findOne({
        email
    })
    .select('+password');
  
    if(!user || user.password!==password){
        return res.status(400).json({
            success:false,
            message:"Invalid credential"
        })
      }

  const token=user.jwtToken();
  user.password=undefined;
  const cookieOption={
    maxAge:24*60*60*1000,
    httpOnly:true
  };
  res.cookie("token",token,cookieOption);
  res.status(200).json({
    success:true,
    data:user
  })
   }
   catch(e){
    return  res.status(400).json({
        success:false,
        message:e.message
      })
   }

  }
 const getUser=async(req,res)=>{
    const userId=req.user.id;
    try{
        const user=await userModel.findById(userId);
        return res.status(200).json({
            success:true,
            data:user
        })

    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
        
    }
 }
 const logOut=(req,res)=>{
    try{
     const cookieOption={
        expires:new Date(),
        httpOnly:true
     };
     res.cookie("token",null,cookieOption);
     res.status(200).json({
        success:true,
        message:"Logged Out"
     })
    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
         })


    }

 }


  
  module.exports = { signup,signin,getUser,logOut};
