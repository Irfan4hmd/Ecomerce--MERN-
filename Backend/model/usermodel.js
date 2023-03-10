const mongoose= require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto=require('crypto')
const {Schema}=mongoose
const jwt_secret="bdidbiudhuohlnqisouhwu2uewhybu"
const jwt_Expiretime="7d"
const UserSchema= new  Schema({
    name:{
        type:String,
        required:[true,'please enter username'],
        maxlength:[20,'Product name cannot exceed 20 chars']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate:[validator.isEmail,'please enter a valid email adress']
    },
    password:{
        type: String,
        required:[true,'please enter password'],
        minlength:[8,'Password must be atleast 8 characters long'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
           
        },
        url:{
            type:String,
           
        }
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})
UserSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id},jwt_secret,{
      expiresIn: jwt_Expiretime
    })
}
UserSchema.methods.comparepassword=function(enteredpwd){
    return bcrypt.compare(enteredpwd,this.password)
}

UserSchema.methods.getresetpwdtoken=function(){
    const resettoken= crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken= crypto.createHash('sha256').update(resettoken).digest("hex")
    this.resetPasswordExpire= Date.now()+30*60*1000
    return resettoken
}
module.exports=mongoose.model('User',UserSchema)