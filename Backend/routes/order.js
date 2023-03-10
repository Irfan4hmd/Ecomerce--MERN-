const express=require('express');
const router=express.Router();
const {newOrder,getUsersOrders,getsingleOrder,payment ,getOrders,updateOrders,deleteOrder,getAllCounts,createCart,getCartItems,delCartItems, payment1, updatePaymentInfo}=require('../controllers/ordercontroller')
const {isAuthenticated,authorizeroles}=require('../middlewares/authmid');
router.route('/order/new').post(isAuthenticated,newOrder);
router.route('/order/allorders').get(isAuthenticated,authorizeroles('admin'),getOrders);
router.route('/order/updateorders/:id').put(isAuthenticated,authorizeroles('admin'),updateOrders)
                                        .delete(isAuthenticated,authorizeroles('admin'),deleteOrder)
router.route('/order/myorders').get(isAuthenticated,getUsersOrders);
router.route('/order/:id').get(isAuthenticated,getsingleOrder)
                          .put(isAuthenticated,updatePaymentInfo)
router.route('/cart').get(isAuthenticated,getCartItems)
                     .put(isAuthenticated,createCart)
router.route('/cart/:id').delete(isAuthenticated,delCartItems)
router.route('/getallcounts').get(isAuthenticated,authorizeroles('admin'),getAllCounts)
router.route('/payment').post(isAuthenticated,payment)
router.route('/payment1').post(isAuthenticated,payment1)
module.exports=router