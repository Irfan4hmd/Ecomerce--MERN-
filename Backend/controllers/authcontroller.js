const User= require('../model/usermodel');
const ErrorHandler=require('../utils/errorhandle');
const sendEmail = require('../utils/sendEmail')
const crypto=require('crypto')
const Cart = require('../model/cartmodel');
const cloudinary= require('cloudinary')
const catchAsyncErrors=require('../middlewares/catcherrors');
const sendToken = require('../utils/jwttoken');
exports.registeruser =catchAsyncErrors (async(req,res,next) => {
const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder: 'Avatar',
    width: 150,
    crop: "scale"
})
 const {name,email,password}=req.body;
 
 const user=await User.create({
     name,
     email,
     password,
     avatar:{
         public_id: result.public_id,
         url: result.secure_url
     }
 })
 const cart=await Cart.create({
     user:user.id
 })
 const token= user.getJwtToken();
 sendToken(user,200,res)


})
exports.loginuser=catchAsyncErrors(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return(next(new ErrorHandler('please enter email and password',400)))
    }
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return (next(new ErrorHandler('Invalid email or password',401)))
    }
    const matchpassword= await user.comparepassword(password)
    if(!matchpassword){
       return (next(new ErrorHandler('Invalid email or password',401)))
    }
  const token= user.getJwtToken();
  sendToken(user,200,res)
})

exports.logoutUser=catchAsyncErrors(async(req,res,next)=>{
     res.cookie('token',null,{
         expires:new Date(Date.now()),
         httpOnly:true
     })
     res.status(200).json({
         success:true,
         message:"User successfully logged Out"
     })
})

exports.forgotpassword= catchAsyncErrors(async(req,res,next)=>{
    
    const user = await User.findOne({email: req.body.email})
    if(!user){
        return (next(new ErrorHandler('user not found with this email',401)))
    }
 const   resettoken=user.getresetpwdtoken();
    await user.save({validateBeforeSave:false})
    const reseturl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resettoken}`;
    const message=`Your password reset token is :\n\n${resettoken}\n\n If you have not requested this email then ignore it`
    try {
        await sendEmail({
               email:user.email,
               subject:'password recovery',
               message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(error,500))
    }

})

exports.resetpassword= catchAsyncErrors(async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })
    if(!user){
        return next(new ErrorHandler('the password reset token is invalid ',400))
    }
    if(req.body.password!==req.body.confirmpassword){
        return next(new ErrorHandler('Password doesnot match',400))
    }
    user.password=req.body.password;
    user.resetPasswordExpire=undefined;
    user.resetPasswordToken=undefined;
    await user.save();
    sendToken(user,200,res)
})
exports.getUserProfile=catchAsyncErrors( async(req,res,next)=>{

    const user = await User.findById(req.user.id);
   
    res.status(200).json({
        success :true,
        user
    })
})
exports.checkUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies
    let succ=true;
    if(!token){
       succ=false;
    }
    res.status(200).json({
        success:true,
        value:succ
    })
})
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
    let user =await User.findById(req.user.id).select('+password');
    const isMatched = await user.comparepassword(req.body.oldpassword)
    if(!isMatched){
     return   next(new ErrorHandler('The password is incorrect',400))
    }
   user.password= req.body.password
   await user.save();
   sendToken(user,200,res)
})

exports.updateUser=catchAsyncErrors( async(req,res,next)=>{
  try{
      let result
      if(req.body.avatar){
     result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'Avatar',
        width: 150,
        crop: "scale"
    })
}
    let updateuser
    if(result){
         updateuser={
            name:req.body.name,
            email:req.body.email,
            avatar:{
             public_id: result.public_id,
             url: result.secure_url
         }
        }
    }else{
        updateuser={
            name:req.body.name,
            email:req.body.email,
           
        }
    }
   
 
const  user = await User.findByIdAndUpdate(req.user.id,updateuser,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(201).json({
        success:true,
        user
    })}catch(error){
        res.status(400).json({
            success:true,
            message: error
        })
    }
})

exports.getalluser=catchAsyncErrors(async(req,res,next)=>{
    const users=await User.find();
    let userCount=await User.countDocuments();
    res.status(200).json({
        success:true,
        users,
        userCount
    })
})

exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return  next(new ErrorHandler('The User does not exist',400))
    }
    res.status(200).json({
        success:true,
        user
    })
})

exports.updateUserProfile=catchAsyncErrors( async(req,res,next)=>{
   
    const updateuser={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
 const  user = await User.findByIdAndUpdate(req.params.id,updateuser,{
         new:true,
         runValidators:true,
         useFindAndModify:false
     });
     res.status(201).json({
         success:true,
         
     })
 })
 exports.deleteuser=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return  next(new ErrorHandler('The User does not exist',400))
    }
    await user.remove();
    res.status(200).json({
        success:true,
        
    })
})