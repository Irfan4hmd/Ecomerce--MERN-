const express = require('express');
const router = express.Router();
const {getProducts,newProduct,getSingleProducts,updateProduct,deleteProduct,createproductReview} = require('../controllers/productcontrollers');
const {isAuthenticated,authorizeroles}=require('../middlewares/authmid')
const {createCategory, getCategories,addProductCat, delProductCat, getProductofCat, getProductNotofCat, delCategory, getCategOfParent,getJustCategories}=require('../controllers/categorycontroller')

router.route('/products/new').post(isAuthenticated,authorizeroles('admin'),newProduct)
router.route('/category').get(getCategories)
                         .post(isAuthenticated,authorizeroles('admin'),createCategory)
router.route('/justcategory').get(getJustCategories)
router.route('/categoryofP/:parentId').get(getCategOfParent)
router.route('/delcategory/:id').delete(isAuthenticated,authorizeroles('admin'),delCategory)
router.route('/category/product/:category/:type').get(getProductofCat)
router.route('/category/addproduct/:productId').put(isAuthenticated,authorizeroles('admin'),addProductCat)
                                    .delete(isAuthenticated,authorizeroles('admin'),delProductCat)
router.route('/category/excproduct/:category/:type').get(getProductNotofCat)
module.exports= router;