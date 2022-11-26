import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDocument from '../models/User.js';
import ReviewsDocument from '../models/Reviews.js';
import { getRoomCounts } from './Room.js';

const userCounts = async () => {
    const numberOfUsers = await UserDocument.count();
    return numberOfUsers;
}

const getMostPositiveRatings = async () => {
    const allReviews = await ReviewsDocument.find();
    const mostPositiveRatings = allReviews.filter(review => review.rating >= 4);
    const mostPositiveRatingsCounts = mostPositiveRatings.length;
    return mostPositiveRatingsCounts;
}

export const getUser = async (req, res) => {
    const userId = req.id;
    const relatedUser = await UserDocument.findOne({ _id: userId });
    res.status(200).json({ user: relatedUser })
}

export const changePassword = async (req, res) => {
    const { old_password, new_password, confirm_new_password } = req.body;
    const userId = req.id;

    const relatedUser = await UserDocument.findOne({ _id: userId });

    if (new_password !== confirm_new_password) {
        res.status(400).json({ message: 'Passwords does not match' });
    }

    if (relatedUser.password === await bcrypt.hash(old_password, 12)) {
        res.status(400).json({ message: 'old password does not match with stored information' });
    }

    const userWithNewPass = await UserDocument.findByIdAndUpdate(userId, { password: await bcrypt.hash(new_password, 12) });
    console.log(userWithNewPass);
    res.status(200).json({ user: userWithNewPass });
}

export const editUserInfo = async (req, res) => {
    const userId = req.id;
    const { username, first_name, last_name, email, phone, gender, birth_date } = req.body;
    const userWithNewInfo = await UserDocument.findByIdAndUpdate(userId, { username, first_name, last_name, email,phone_number: phone, gender, birthday: birth_date });
    res.status(200).json({ user: userWithNewInfo });
}

export const signUp = async (req, res) => {
    const { first_name, last_name, check, password, confirm_password, username } = req.body;
    try {
        const existingUser = await UserDocument.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirm_password) {
            res.status(400).json({ message: 'Password does not match with confirm password' });
        }

        const newUser = await UserDocument.create({ username, password: await bcrypt.hash(password, 12), first_name, last_name });
        const refresh = jwt.sign({ id: newUser._id }, 'test', { expiresIn: '1h' });
        const access = jwt.sign({ id: newUser._id }, 'test', { expiresIn: '5m' });
        console.log(access);
        res.status(200).json({ refresh, access });
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    try {
        const relatedUser = await UserDocument.findOne({ username });

        if (!relatedUser) {
            console.log('not found');
            res.status(404).json({ message: 'User not found' });
        }

        const isPasswordTrue = await bcrypt.compare(password, relatedUser.password);

        if (!isPasswordTrue) {
            console.log('password is not correct')
            res.status(400).json({ message: 'Password is incorrect' });
        }

        const refresh = jwt.sign({ id: relatedUser._id }, 'test', { expiresIn: '1h' });
        const access = jwt.sign({ id: relatedUser._id }, 'test', { expiresIn: '5m' });

        res.status(200).json({ refresh, access });
    } catch (error) {
        console.log(error)
    }
}

export const getFeaturedReviews = async (req, res) => {
    const allReviews = await ReviewsDocument.find({ rating: { $gte: 4 } });

    const allUsers = await UserDocument.find();
    var reviewsWithUserInfo = [];

    allUsers.forEach(user => {
        allReviews.forEach(singleReview => {
            if (user._id.toString() == singleReview.user_id.toString()) {
                reviewsWithUserInfo.push({ first_name: user.first_name, last_name: user.last_name, profile_img: user.profile_img, review: singleReview.review, rating: singleReview.rating });
            }
        })
    });

    res.status(200).json(reviewsWithUserInfo.slice(0, 8));

}

export const getStatsInfo = async (req, res) => {
    const roomsCount = await getRoomCounts(req, res);
    const staffCount = 1000;
    const usersCount = await userCounts();
    const positiveRatingReviewsCount = await getMostPositiveRatings();

    res.status(200).json({ rooms_count: roomsCount, staff_count: staffCount, guests_count: usersCount, positive_ratings_count: positiveRatingReviewsCount })
}

export const changeProfileImg = async (req, res) => {
    const userId = req.id;
    const relatedUser = await UserDocument.findByIdAndUpdate(userId , {profile_img: `./images/${req.file.originalname}`});

    res.status(200).json({relatedUser})
}