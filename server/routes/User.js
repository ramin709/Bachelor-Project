import express from 'express';
import {changePassword , editUserInfo , getFeaturedReviews , getUser , signIn, signUp , getStatsInfo }  from '../controllers/User.js';

const router = express.Router();

router.get('/Testimonials/' , getFeaturedReviews);
router.get('/Stats/' , getStatsInfo);
router.post('/SignIn/' , signIn);
router.post('/SignUp/' , signUp);
router.patch('/ChangePassword/' , changePassword);
router.patch('/Profile/' , editUserInfo);
router.get('/:id' , getUser);

export default router;