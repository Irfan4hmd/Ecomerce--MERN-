const ErrorHandler=require('../utils/errorhandle');
const catcherrors=require('../middlewares/catcherrors');
const Category= require('../model/categorymodel');
const slugify= require('slugify')
const mongoose= require('mongoose')
const Product = require('../model/products')
const ApiFeatuers= require('../utils/apifeatures')
const cloudinary= require('cloudinary')
exports.createCategory= catcherrors (async (req,res,next)=>{
try {
    

const {name,parentId}=req.body
const result = await cloudinary.v2.uploader.upload(req.body.images,{
    folder: 'CatImage',
    width: 400,
    crop: "scale"
})
 const slug= slugify(name)
 let category
 if(parentId){
 
 
  category=await Category.create({
     name,
     slug,
     parentId,
     images:
            {
           public_id: result.public_id,
           url: result.secure_url
            }
 })
}
else{
    category=await Category.create({
        name,
        slug,
        images:
            {
           public_id: result.public_id,
           url: result.secure_url
            }
        
    })

 }

    res.status(200).json({
     success:true,
     category
    
    })
} catch (error) {
    console.log(error)
}
})
function getcatsinformat(category,parentId= null) {
    const categoryList=[];
    let categories
    if(parentId ==null){
       categories =  category.filter(cat=> cat.parentId == undefined)
    }else{
        categories =  category.filter(cat=> cat.parentId == parentId)
    }
    for(let i of categories){
    categoryList.push(
        {
            _id: i._id,
            name: i.name,
            slug: i.slug,
            parentId: i.parentId,
            images: i.images,
            children: getcatsinformat(category, i._id)
        }
    )
    }  
    return categoryList;
    
}
exports.getCategories= catcherrors(async(req,res,next)=>{
    const category= await Category.find();
    const categoryList = getcatsinformat(category)
    res.status(200).json({
        success: true,
        categoryList
    })
})
exports.getJustCategories= catcherrors(async(req,res,next)=>{
    const category= await Category.find({parentId: null});
   
    res.status(200).json({
        success: true,
        category
    })
})
exports.getCategOfParent= catcherrors(async(req,res,next)=>{
    const category= await Category.find({parentId: req.params.parentId})
    const category1= await Category.findById(req.params.parentId)
    res.status(200).json({
        success: true,
        category:category1
    })
})
exports.getProductofCat=catcherrors(async(req,res,next)=>{
 try {  const {category,type}= req.params
    
     let products=[]
     if(type==="category"){
        products = await Product.find({category: category})
     }
     if(type==="subCategory"){
        products = await Product.find({subCategory: category})
     }
     if(type==="subsubCategory"){
        products = await Product.find({subsubCategory: category})
     }
    if(products.length===0){
        res.status(201).json({
           
            message:"Product Not Found"
        })
    }
     else{
     res.status(200).json({
         success: true,
         products
     })
 }}
     catch(err){
         res.status(400).json({
             success: false,
             err
         })
     }
})

exports.addProductCat= catcherrors(async(req,res,next)=>{
    const {category,type}= req.body
    
   
    const product=await Product.findById(req.params.productId);
 
    if(type=="category"){
        product.category= category
    }
    if(type=="subCategory"){
        product.subCategory = category
        const subCateg= await Category.find({name: category})
        const id= subCateg.parentId
        const categ = await Category.findById(id)
        product.category= categ.name
    }
    if(type=="subsubCategory"){
        product.subsubCategory = category
        const subsubCateg= await Category.findOne({name: category})
        const SubId= subsubCateg.parentId
        
        const subCateg= await Category.findById(SubId)
        const id= subCateg.parentId
        const categ = await Category.findById(id)
        product.category= categ.name
        product.subCategory = subCateg.name
    }
   
   
   await product.save()
    res.status(200).json({
        success: true,
        product
    })
})
exports.getProductNotofCat=catcherrors(async(req,res,next)=>{
    try {  const {category,type}= req.params
    const resPerPage=4;
    
  
    
   
        let products=[],productCount=0
        if(type==="category"){
            const apiFeatuers= new ApiFeatuers(Product.find({category: {$ne: category}}),req.query)
                                              .pagination(resPerPage)
            products = await apiFeatuers.query;
            
        }
        if(type==="subCategory"){
            const apiFeatuers= new ApiFeatuers(Product.find({subCategory: {$ne: category}}),req.query)
                                              .pagination(resPerPage)
            products = await apiFeatuers.query;
        }
        if(type==="subsubCategory"){
            const apiFeatuers= new ApiFeatuers(Product.find({subsubCategory: {$ne: category}}),req.query)
                                              .pagination(resPerPage)
            products = await apiFeatuers.query;
        }
       if(products.length===0){
           res.status(201).json({
              
               message:"Product Not Found"
           })
       }
        else{
            res.status(200).json({
                success :true,
                resPerPage,
                
                products
                
            })
    }}
        catch(err){
            res.status(400).json({
                success: false,
                err
            })
        }
   })
exports.delCategory= catcherrors(async(req,res,next)=>{
    const category= await Category.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
        success: true,
        category
    })
})
exports.delProductCat= catcherrors(async(req,res,next)=>{
    const productId= req.params.productId
    const product=await Product.findById(productId);
    product.category= null
    product.subCategory = null
    product.subsubCategory = null
   await product.save()
    res.status(200).json({
        success: true,
        product
    })
})
