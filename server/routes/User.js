const express = require('express');
const userController = require('../controllers/User.js');
const {changePassword , editUserInfo , getFeaturedReviews , getUser , signIn, signUp } = userController;

const router = express.Router();

router.get('/:id' , getUser);
router.get('/Testimonials/' , getFeaturedReviews);
router.post('/SignIn/' , signIn);
router.post('/SignUp/' , signUp);
router.patch('/ChangePassword/' , changePassword);
router.patch('/Profile/' , editUserInfo);

export default router;