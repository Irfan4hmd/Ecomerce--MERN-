const Category= require('../model/categorymodel');
const Product = require('../model/products')
const ErrorHandler= require('../utils/errorhandle')
const catcherrors = require('../middlewares/catcherrors') 
const ApiFeatuers= require('../utils/apifeatures') 
const cloudinary= require('cloudinary')
const Slider = require('../model/slider')
exports.newProduct= catcherrors (async (req,res,next)=>{
    try{
    const user=req.body.user
    
    const result = await cloudinary.v2.uploader.upload(req.body.images,{
        folder: 'ProductImage',
        width: 400,
        crop: "scale"
    })
    let CarouselImages=[];
    let CarouselImage=req.body.CarouselImages

for(let i=0;i<CarouselImage.length;i++){
    const result1 = await cloudinary.v2.uploader.upload(CarouselImage[i],{
        folder: 'ProductCarouselImages',
        width: 400,
        crop: "scale"
    })
    CarouselImages.push( {
        public_id: result1.public_id,
        url: result1.secure_url
         })
}

    const {name,price,description,category,subCategory,subsubCategory,seller,stock,ProdType}=req.body;
 
    const product = await Product.create({
        name,
        price,
        description,
        category,
        subCategory,
        subsubCategory,
        seller,
        stock,
        images:
            {
           public_id: result.public_id,
           url: result.secure_url
            },
            CarouselImages,
        user,
        ProdType
    })
    res.status(200).json({
     success:true,
     product
    
    })}catch(err){
        res.status(400).json({
            message: err
        })
    }
})
exports.slidersUpload=catcherrors(async(req,res,next)=>{
    let slider=[];
    const img=req.body.images
    
    for(let i=0;i<img.length;i++){
        const result = await cloudinary.v2.uploader.upload(img[i],{
            folder: 'SliderImages',
            width:600,
            hieght: 600
        })
         slider= await Slider.create({
            images:
            {
           public_id: result.public_id,
           url: result.secure_url
            },
            Heading: req.body.Heading,
            SubHeading: req.body.SubHeading,
            Content: req.body.Content
        })
        
    }
   
    
    res.status(200).json({
        success: true,
        slider
    })
   
})
exports.getSliderImages=catcherrors(async(req,res,next)=>{
    const slider= await Slider.find()
    res.status(200).json({
        success: true,
        slider
    })
})
exports.delSliderImage=catcherrors(async(req,res,next)=>{
    
   const  slider= await Slider.findByIdAndDelete(req.params.id)
   if(!slider){
       res.status(400).json({
           success: false,
           message: "Slider Not Found"
       })
   }
   res.status(200).json({
    success :true,
    slider
})

})

exports.getProducts=catcherrors( async(req,res,next)=>{
try{
    const resPerPage=4;
    let productCount=await Product.countDocuments();
    const apiFeatuers= new ApiFeatuers(Product.find(),req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)
    const product = await apiFeatuers.query;
   
    res.status(200).json({
        success :true,
        resPerPage,
        productCount,
        product
        
    })
}catch(err){
    res.status(400).json({
        success :false,
        message: err
        
    })
}
})
exports.getSingleProducts=catcherrors( async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('product not found',404))
    }
    res.status(200).json({
        success :true,
        product
        
    })
})

exports.updateProduct=catcherrors( async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message:"Product not found"
        })
    }
    let result
      if(req.body.images){  
     result = await cloudinary.v2.uploader.upload(req.body.images,{
        folder: 'ProductImage',
        width: 150,
        crop: "scale"
    })
}else{
    result={
        public_id: product.images.public_id,
        secure_url: product.images.url
    }
    console.log(result)
}
    let CarouselImages=[];
    if(req.body.CarouselImages){
    let CarouselImage=req.body.CarouselImages

for(let i=0;i<CarouselImage.length;i++){
    const result1 = await cloudinary.v2.uploader.upload(CarouselImage[i],{
        folder: 'ProductCarouselImages',
        width: 150,
        crop: "scale"
    })
    CarouselImages.push( {
        public_id: result1.public_id,
        url: result1.secure_url
         })
}

}

    const {name,price,description,category,seller,stock}=req.body;
     product = await Product.findByIdAndUpdate(req.params.id,
       { name,
        price,
        description,
        category,
        seller,
        stock,
        images:
           {
           public_id: result.public_id,
           url: result.secure_url
            },
            CarouselImages},{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(201).json({
        success:true,
        product
    })
})
exports.deleteProduct=catcherrors (async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success: false,
            message:"Product not found"
        })
    }
     await product.remove();
    res.status(201).json({
        success:true,
        message:"product has been deleted"
    })
})
exports.createproductReview=catcherrors(async(req,res,next)=>{
        const {ratings,comment,productId}=req.body;
        const review={
            user:req.user.id,
            name:req.user.name,
            ratings:Number(ratings),
            comment
        }

        const product= await Product.findById(productId);
        const isreviewed=product.reviews.find( r=>
            r.user.toString()===req.user.id.toString()
        )
        if(isreviewed){
            product.reviews.forEach(element=>{
                if(element.user.toString()===req.user._id.toString()){
                    element.ratings=ratings;
                    element.comment=comment;
                }
            })
        }
        else{
            product.reviews.push(review);
            product.noofreviews=product.reviews.length
        }
        product.ratings=product.reviews.reduce((acc,item)=>item.ratings+acc,0)/product.reviews.length
        await product.save({validateBeforeSave:false})
      
        res.status(200).json({
            success:true,
           review
        })
   

})
exports.getProductsReviews= catcherrors(async(req,res,next)=>{
    const product= await Product.findById(req.params.id);
    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

exports.deleteProductreviw=catcherrors (async(req,res,next)=>{
    let product = await Product.findById(req.query.productId);
   let reviews= product.reviews.filter(review=> review.id.toString()!== req.query.id.toString());
    const  noofreviews= reviews.length
   const ratings=product.reviews.reduce((acc,item)=>item.ratings+acc,0)/ reviews.length
    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        noofreviews
    },{
        new:true,
        runValidators:true,
        usrFindAndModify:false
    }
    )
    res.status(201).json({
        success:true,
        
    })
})