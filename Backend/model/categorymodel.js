const mongoose=require('mongoose');
const {Schema}=mongoose
const CategorySchema= Schema({
name:{
    type: String,
    required: true,
    trim: true
},
slug:{
    type: String,
    required: true,
    unique: true
},
parentId:{
    type: String
},
grandParentId:{
    type: String
},
images:
        {
            public_id:{
                type:String,
                
            },
            url:{
                type:String,
                
            }
        }
},{timestamps: true})
module.exports=mongoose.model('Category',CategorySchema)