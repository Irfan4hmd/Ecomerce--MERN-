const sendToken= (user,statusCode,res)=>{
    const token= user.getJwtToken();
    const options={
        expires:new Date(
            Date.now()+ 7*24*60*60*1000
        ),
        httpOnly:true
    }
    res.status(statusCode).cookie('token',token,options).json({
        succes:true,
        token,
        user
    })
}
module.exports= sendToken;