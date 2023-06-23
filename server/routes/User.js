import express from 'express';
import {/* changePassword ,changeProfileImg , editUserInfo , */ getFeaturedReviews, /* getUser , */ signIn, signUp , getStatsInfo, /* addReviewToUser */ }  from '../controllers/User.js';
import {auth} from '../middlewares/auth.js';
import multer from 'multer'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null , '../client/public/images');
    },

    filename: (req ,file , cb) => {
        cb(null , file.originalname);
    }
})

export const upload = multer({storage});

router.get('/Testimonials/' , getFeaturedReviews);
router.get('/Stats/' , getStatsInfo);
router.post('/SignUp/' , signUp);
router.post('/SignIn/' , signIn);
/* router.patch('/ChangePassword/' , auth ,changePassword);
router.patch('/Profile/' , auth ,editUserInfo);
router.patch('/changeProfileImg/'  , auth,upload.single('file')  , changeProfileImg);
router.get('/:id' , auth ,getUser);
router.post('/addReview' , addReviewToUser); */

export default router;