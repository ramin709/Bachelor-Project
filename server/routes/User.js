import express from 'express';
import {changePassword , editUserInfo , getFeaturedReviews , getUser , signIn, signUp }  from '../controllers/User.js';

const router = express.Router();

router.get('/:id' , getUser);
router.get('/Testimonials/' , getFeaturedReviews);
router.post('/SignIn/' , signIn);
router.post('/SignUp/' , signUp);
router.patch('/ChangePassword/' , changePassword);
router.patch('/Profile/' , editUserInfo);

export default router;