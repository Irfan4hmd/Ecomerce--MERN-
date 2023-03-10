const express = require('express');
const router = express.Router();

const {getProducts,newProduct,getSingleProducts,updateProduct,deleteProduct,createproductReview,getProductsReviews, deleteProductreviw,slidersUpload, getSliderImages, delSliderImage} = require('../controllers/productcontrollers');
const {isAuthenticated,authorizeroles}=require('../middlewares/authmid')

router.route('/products').get(getProducts)

router.route('/products/getreviews/:id').get(isAuthenticated,getProductsReviews)
                                    .delete(isAuthenticated,deleteProductreviw)

router.route('/product/:id').get(getSingleProducts)
                             .put(isAuthenticated,authorizeroles('admin'),updateProduct)
                             .delete(isAuthenticated,authorizeroles('admin'),deleteProduct)
router.route('/slider').post(isAuthenticated,authorizeroles('admin'),slidersUpload)
                       .get(getSliderImages)
                       
router.route('/slider/:id').delete(isAuthenticated,authorizeroles('admin'),delSliderImage)

module.exports= router;