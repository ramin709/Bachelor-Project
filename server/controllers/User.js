import mongoose from 'mongoose';
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
    console.log('request detected in getUser');
}

export const changePassword = async (req, res) => {
    console.log('request detected in changePassword');
}

export const editUserInfo = async (req, res) => {
    console.log('request detected in editUserInfo');
}

export const signUp = async (req, res) => {
    console.log('request detected in signUp');
}

export const signIn = async (req, res) => {
    console.log('request detected in getUser');
}

export const getFeaturedReviews = async (req, res) => {
    console.log('request detected in getFeaturedReviews');
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

    res.status(200).json(reviewsWithUserInfo.slice(0,8));

}

export const getStatsInfo = async (req, res) => {
    const roomsCount = await getRoomCounts(req, res);
    const staffCount = 1000;
    const usersCount = await userCounts();
    const positiveRatingReviewsCount = await getMostPositiveRatings();

    res.status(200).json({ rooms_count: roomsCount, staff_count: staffCount, guests_count: usersCount, positive_ratings_count: positiveRatingReviewsCount })
}