const User =require('../model/usermodel')
const ErrorHandler = require("../utils/errorhandle");
const catcherrors = require("./catcherrors");
const jwt=require('jsonwebtoken')
const jwt_secret="bdidbiudhuohlnqisouhwu2uewhybu"
exports.isAuthenticated=catcherrors(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler("user not logged in",401))
    }
    const decoded=jwt.verify(token,jwt_secret)
    req.user=await User.findById(decoded.id);
    next()
})
exports.authorizeroles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
          return next(
              new ErrorHandler(`role ${req.user.role} is not allowed to access this route`,403)
          )
        }
        next()
    }
}