import express from 'express';
import {changePassword , editUserInfo , getFeaturedReviews, getUser , signIn, signUp , getStatsInfo }  from '../controllers/User.js';
import {auth} from '../middlewares/auth.js';

const router = express.Router();

router.get('/Testimonials/' , getFeaturedReviews);
router.get('/Stats/' , getStatsInfo);
router.post('/SignUp/' , signUp);
router.post('/SignIn/' , signIn);
router.patch('/ChangePassword/' , auth ,changePassword);
router.patch('/Profile/' , auth ,editUserInfo);
router.get('/:id' , auth ,getUser);

export default router;