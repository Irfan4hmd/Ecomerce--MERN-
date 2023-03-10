const mongoose=require('mongoose');
const {Schema}=mongoose
const OrderSchema= Schema({
    shippingInfo:{
        address:{
            type:String,
            
        },
        city:{
            type:String,
           
        },
        phoneNo:{
            type:String,
          
        },
        postalcode:{
            type:String,
            
        },
        country:{
            type:String,
            
        }
    },
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
       
        price:{
            type:Number,
            required:true
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Product'
        },
       
    }
    ],
    paymentInfo:{
        id:{
            type:String
        },
        status:{
            type:String,
            default: "Not Paid"
        }
    },
    paidAt:{
        type:Date,

    },
        itemsPrice:{
        type:Number,
        required:true,
        default:0.0
        },
        shippingPrice:{
        type:Number,
        required:true,
        default:0.0
        },
        totalPrice:{
        type:Number,
        required:true,
        default:0.0
        },
        
    orderStatus:{
        type:String,
        
        default:'Processing'
    },
    deliverdAt:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('Order',OrderSchema)