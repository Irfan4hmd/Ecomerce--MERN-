const express= require('express');
const router= express.Router();
const {isAuthenticated,authorizeroles}=require('../middlewares/authmid')
const {registeruser,loginuser,logoutUser,forgotpassword,resetpassword,getalluser,updateUserProfile,getUserDetails,getUserProfile,updatePassword,updateUser,deleteuser, checkUser}=require('../controllers/authcontroller');
router.route('/getuser').get(isAuthenticated,getUserProfile);
router.route('/checkUser').get(checkUser);
router.route('/logout').get(logoutUser);
router.route('/getalluser').get(isAuthenticated,authorizeroles('admin'),getalluser);
router.route('/getuserdetail/:id').get(isAuthenticated,authorizeroles('admin'),getUserDetails)
router.route('/register').post(registeruser);
router.route('/login').post(loginuser);
router.route('/password/forget').post(forgotpassword);

router.route('/password/reset/:token').put(resetpassword);

router.route('/password/updatePassword').put(isAuthenticated,updatePassword);
router.route('/updateuser').put(isAuthenticated,updateUser);

router.route('/getuserdetail/:id').put(isAuthenticated,authorizeroles('admin'),updateUserProfile)
                                  .delete(isAuthenticated,authorizeroles('admin'),deleteuser)
module.exports = router;