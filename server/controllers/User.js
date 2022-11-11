import mongoose from 'mongoose';
import UserDocument from '../models/User.js';
import ReviewsDocument from '../models/Reviews.js';
import {getRoomCounts} from './Room.js';

const userCounts = async() => {
    const numberOfUsers = await UserDocument.count();
    return numberOfUsers;
}

const getMostPositiveRatings = async() => {
    const allReviews = await ReviewsDocument.find();
    const mostPositiveRatings = allReviews.filter(review => review.rating >= 4);
    const mostPositiveRatingsCounts = mostPositiveRatings.length;
    return mostPositiveRatingsCounts;
}

export const getUser = async(req , res) => {
    console.log('request detected in getUser');
}

export const changePassword = async(req , res) => {
    console.log('request detected in changePassword');
}

export const editUserInfo = async(req , res) => {
    console.log('request detected in editUserInfo');
}

export const signUp = async(req , res) => {
    console.log('request detected in signUp');
}

export const signIn = async(req , res) => {
    console.log('request detected in getUser');
}

export const getFeaturedReviews = async(req , res) => {
    console.log('request detected in getFeaturedReviews');
}

export const getStatsInfo = async(req , res) => {
    const roomsCount = await getRoomCounts(req , res);
    const staffCount = 1000;
    const usersCount = await userCounts();
    const positiveRatingReviewsCount = await getMostPositiveRatings();

    res.status(200).json({ rooms_count: roomsCount, staff_count: staffCount , guests_count: usersCount, positive_ratings_count: positiveRatingReviewsCount})
}