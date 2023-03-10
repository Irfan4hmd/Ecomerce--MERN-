const Order=require('../model/ordermodel');
const Product=require('../model/products');
const User= require('../model/usermodel');
const ErrorHandler=require('../utils/errorhandle');
const catchAsyncErrors=require('../middlewares/catcherrors');
const Cart = require('../model/cartmodel');
const stripe=require('stripe')("sk_test_51LMx3DL1YzgC3DzGR0vEpIZyJoxoxDBTEKh7HbBXNdpCDC5x5eBKsAROo0JaaLopcLe73qmVFr6riQ93TQOR5JGc00cAnQHCOd")
const sendEmail=require('../utils/sendEmail')
exports.newOrder=catchAsyncErrors(async(req,res,next)=>{
const {
    
    shippingInfo,
    paymentstat
} = req.body;

let orderItems=[]

let shippingPrice=25
let itemsPrice=0
const cart=await Cart.find({user:req.user.id})
for(let i=0;i<cart.length;i++){
    orderItems.push(cart[i].orderItems[0])
    itemsPrice=itemsPrice+((cart[i].orderItems[0].price)*(cart[i].orderItems[0].quantity))
}
let totalPrice=itemsPrice+shippingPrice

const order=await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    paymentInfo:{
        status: paymentstat
    },
    shippingPrice,
    totalPrice,
    
    
    user:req.user.id
})

res.status(200).json({
    success:true,
    order
})
})

exports.payment=catchAsyncErrors(async(req,res,next)=>{
    try{
    const {orderdata,token,orderId}=req.body
    const order = await Order.findById(orderId)
    if(!order){
        return next(new ErrorHandler('the order is not found',404))
    }
    order.shippingInfo={
        country: token.card.address_country,
        city: token.card.address_city,
        address: token.card.address_line1,
        postalcode: token.card.address_zip
    }
    
    let currency='usd'
    if(token.card.address_country=='India'){
        currency='inr'
    }
   
    return stripe.customers.create({
        email: token.email,
        source: token.id,
       
       
      }).then(customer=>{
        stripe.charges.create({
          amount: orderdata.totalPrice * 100,
          currency: currency,
          customer: customer.id,
          receipt_email:token.email,
          description: `This is Payment for Order-${orderdata._id}`,
          
          shipping:{
              name: token.card.name,
              address:{
                  country: token.card.address_country,
                  city: token.card.address_city
                  
              }
          }
        })
        }).then(async(charge) => {
            order.paymentInfo.id= token.id
            order.paymentInfo.status="Paid"
          await  order.save()
          const message="Your Order Has Been Placed"
          await sendEmail({
            email:req.user.email,
            subject:'Order Placing',
            message
     })
            res.status(200).json({
                Success: true,
                charge
            })  
       
       
      
    })}catch(err) {
        res.status(400).json(err);
      }

  })
exports.payment1=catchAsyncErrors(async(req,res,next)=>{
    const product = await stripe.products.create({
        name: 'ProductsBuy',
      });
      const price = await stripe.prices.create({
        unit_amount: req.body.amount,
        currency: 'usd',
        product: product.id
      });

    res.status(200).json({
        success:true,
        product,
        price
    })
})
exports.getsingleOrder=catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('the order is not found',404))
    }
    res.status(200).json({
        success:true,
        order
    })
})
exports.updatePaymentInfo=catchAsyncErrors(async(req,res,next)=>{
    const  status=req.body.status
    
    const order = await Order.findById(req.params.id)
    order.paymentInfo.status=status;
    order.paidAt=Date.now();
    await order.save();
    res.status(200).json({
        order,
        success:true
    })
})
exports.getUsersOrders=catchAsyncErrors(async(req,res,next)=>{
    let orderCount=0
    const orders = await Order.find({user:req.user.id})
    for(let i=0;i<orders.length;i++){
        
        orderCount++;
    }

    res.status(200).json({
        success:true,
        orderCount,
        orders
    })
})
exports.createCart=catchAsyncErrors(async(req,res,next)=>{
    const orderItems= {
        name,
        product,
        price,
        quantity,
        images
    }=req.body;
    const cart=await Cart.create({
        user:req.user.id,
        orderItems:orderItems
    })
   
    res.status(200).json({
        success:true
    })


})
exports.getCartItems=catchAsyncErrors(async(req,res,next)=>{
    const cart=await Cart.find({user:req.user.id})
    
    res.status(201).json({
        success:true,
        cart
    })
})
exports.delCartItems=catchAsyncErrors(async(req,res,next)=>{
    const cart = await Cart.findById(req.params.id)
    if(!cart){
        return next(new ErrorHandler('the cart is not found',404))
    }
    await cart.remove();
    res.status(200).json({
        success:true
    })
})
exports.getOrders=catchAsyncErrors(async(req,res,next)=>{
    
    const orders = await Order.find()
 
    let totalamont=0;
    orders.forEach(element => {
        totalamont+=element.totalPrice
    });
    res.status(200).json({
        success:true,
        totalamont,
        orders
    })
})

exports.updateOrders=catchAsyncErrors(async(req,res,next)=>{
    
    const orders = await Order.findById(req.params.id)
    if(orders.orderStatus==='Delivered'){
        return next(new ErrorHandler('The order is alredy delivered',400))
    }
    orders.orderItems.forEach(async item=>{
        await updateStock(item.product,item.quantity)
    })
    orders.orderStatus=req.body.status,
    orders.deliveredAt=Date.now();
    await orders.save()
    res.status(200).json({
        success:true,
        orders
    })
})

async function updateStock(id,quantity){
    const product=await Product.findById(id)
    product.stock=product.stock-quantity;
    await product.save({validateBeforeSave:false});
}


exports.deleteOrder=catchAsyncErrors(async(req,res,next)=>{
    const order = await Order.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler('the order is not found',404))
    }
    await order.remove();
    res.status(200).json({
        success:true,
        
    })
})
exports.getAllCounts=catchAsyncErrors(async(req,res,next)=>{
    let productCount=await Product.countDocuments();
    let userCount=await User.countDocuments();
    let orderCount=await Order.countDocuments();
    res.status(200).json({
        productCount,
        userCount,
        orderCount
    })
})