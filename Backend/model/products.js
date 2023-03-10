const mongoose=require('mongoose')
const { Schema } = mongoose;
const productSchema = new Schema({
    name:{
        type:String,
        required:[true,'please enter product name'],
        trim:true,
        maxlength:[100,'Product name cannot exceed 100 chars']
    },
    price:{
        type: Number,
        required:[true,'please enter the price'],
        default:0.0
    },
    description:{
        type:String,
        required:[true,'please enter the description']
    },
    ratings:{
        type:Number,
        default:0
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
        CarouselImages:
      [  {
            public_id:{
                type:String,
                
            },
            url:{
                type:String,
                
            }
        }]
    ,
    category:{
        type: String,
        
       
    },
    subCategory:{
        type: String
    },
    subsubCategory:{
        type: String
    },
    seller:{
        type: String,
        required:[true,'Please enter the Product seller  name']
    },
    stock:{
        type:Number,
        required:[true,'please enter product stock'],
        default:0
    },
    noofreviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
        name:{
            type:String,
            required:true
        },
        ratings:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
         },
    }
    ],
    
    user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
         },
    ProdType:{
        type: String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

}) 
module.exports = mongoose.model('Product',productSchema);