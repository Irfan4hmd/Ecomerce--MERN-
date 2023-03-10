const express = require('express');
const router = express.Router();

const {getProducts,newProduct,getSingleProducts,updateProduct,deleteProduct,createproductReview} = require('../controllers/productcontrollers');
const {isAuthenticated,authorizeroles}=require('../middlewares/authmid')

router.route('/review').put(isAuthenticated,createproductReview)


module.exports= router;