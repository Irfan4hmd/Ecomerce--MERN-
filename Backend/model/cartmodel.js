const mongoose=require('mongoose');
const {Schema}=mongoose
const CartSchema= Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    orderItems:[
      {  
        name:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        images:
        {
            public_id:{
                type:String,
                
            },
            url:{
                type:String,
                
            }
        },
        price:{
            type:Number,
            required:true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Product'
        },
    
           
    },
    
    ]
})
module.exports=mongoose.model('Cart',CartSchema)