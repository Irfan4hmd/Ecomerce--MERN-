module.exports=catcherr=>(req,res,next)=>{
    Promise.resolve(catcherr(req,res,next))
    .catch(next)
} 