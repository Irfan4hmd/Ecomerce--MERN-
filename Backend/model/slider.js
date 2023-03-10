const mongoose=require('mongoose')
const { Schema } = mongoose;
const sliderSchema = new Schema({
    images:
    {
        public_id:{
            type:String,
            
        },
        url:{
            type:String,
            
        }
    }
,
Heading:{
    type: String
},
SubHeading:{
    type: String
},
Content:{
    type: String
},
    createdAt:{
        type:Date,
        default:Date.now
    }

}) 
module.exports = mongoose.model('Slider',sliderSchema);