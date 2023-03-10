const ErrorHandler= require('../utils/errorhandle');
module.exports=(err,req,res,next)=>{
err.statusCode=err.statusCode||500;
let error={...err}
error.message=err.message

if(err.name==='CastError'){
    const message=`Resource not found invalid: ${err.path}`
   error=new ErrorHandler(message,404)
}

if(err.name==='ValidationError'){
    const message=Object.values(err.errors).map(value=>value.message);
   error=new ErrorHandler(message,400)
}

if(err.code === 11000){
    const message=`Duplicate email entered`
     error=new ErrorHandler(message,400)
}
if(err.name==='JsonwebTokenError'){
    const message='Json web token is invalid.Try again!';
    error=new ErrorHandler(message,400)
}
if(err.name==='TokenExpiredError'){
    const message='Json web token is invalid.Try again!';
       error=new ErrorHandler(message,400)
}
res.status(err.statusCode).json({
    success:false,
    message: err.message
})
}