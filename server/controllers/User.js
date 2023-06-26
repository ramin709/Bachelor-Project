import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserDocument from '../models/User.js';
import BookingsDocument from '../models/BookingInfo.js'
import { getRoomCounts } from './Room.js';

const userCounts = async () => {
    const numberOfUsers = await UserDocument.count();
    return numberOfUsers;
}

export const getUserNameAndLastName = async (req, res) => {
    console.log('getUserInfoInReservation');
    const id = req.id;
    const userInfo = await UserDocument.findOne({ _id: id }).select(['firstName', 'lastName']);
    res.status(200).json(userInfo);
}

const getMostPositiveRatings = async () => {
    const allReviews = await ReviewsDocument.find();
    const mostPositiveRatings = allReviews.filter(review => review.rating >= 4);
    const mostPositiveRatingsCounts = mostPositiveRatings.length;
    return mostPositiveRatingsCounts;
}

export const getUser = async (req, res) => {
    console.log('getUser')
    const userId = req.id;
    const relatedUser = await UserDocument.findOne({ _id: userId });
    res.status(200).json({ user: relatedUser })
}

export const changePassword = async (req, res) => {
    console.log('changePass');
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
    console.log('editUser');
    const userId = req.id;
    const { username, firstName, lastName, email, phoneNumber, gender, birthOfDate } = req.body;
    const userWithNewInfo = await UserDocument.findByIdAndUpdate(userId, { username, firstName, lastName, email, phoneNumber, gender, birthOfDate });
    res.status(200).json({ user: userWithNewInfo });
}

export const signUp = async (req, res) => {
    console.log('signUp');
    const { firstName, lastName, check, password, confirm_password, username } = req.body;
    try {
        const existingUser = await UserDocument.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
        }

        if (password !== confirm_password) {
            res.status(400).json({ message: 'Password does not match with confirm password' });
        }

        const newUser = await UserDocument.create({ username, password: await bcrypt.hash(password, 12), firstName, lastName });
        const refresh = jwt.sign({ id: newUser._id }, 'test', { expiresIn: '1h' });
        const access = jwt.sign({ id: newUser._id }, 'test', { expiresIn: '5m' });
        console.log(access);
        res.status(200).json({ refresh, access });
    } catch (error) {
        console.log(error)
    }
}

export const signIn = async (req, res) => {
    console.log('signIn');
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
    console.log('getFeaturedReviews');
    var result = [];
    const reviews = await BookingsDocument.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'owner',
            foreignField: 'username',
            as: 'userInfo'
        }
    }
    ]);

    reviews.forEach(review => {
        if(review.review && review.review.rating >=4){
            result.push({firstName: review.userInfo[0].firstName , profileImg: review.userInfo[0].profileImg , lastName: review.userInfo[0].lastName , review: review.review.review , rating: review.review.rating});
        }
    })

    res.status(200).json(result.slice(0,9));

}

export const getStatsInfo = async (req, res) => {
    console.log('getStats');
    const roomsCount = await getRoomCounts(req, res);
    const staffCount = 1000;
    const usersCount = await userCounts();
    const positiveRatingReviewsCount = /* await getMostPositiveRatings() */ 0;

    res.status(200).json({ rooms_count: roomsCount, staff_count: staffCount, guests_count: usersCount, positive_ratings_count: positiveRatingReviewsCount })
}

export const changeProfileImg = async (req, res) => {
    console.log('changeProfImg');
    const userId = req.id;
    const relatedUser = await UserDocument.findByIdAndUpdate(userId, { profileImg: `./images/${req.file.originalname}` });

    res.status(200).json({ relatedUser })
}

export const addReviewToUser = async (req, res) => {
    console.log('addReview');
    console.log(req.body.reservationId)
    const relatedReservation = await BookingsDocument.findById(req.body.reservationId);
    console.log(relatedReservation);
    const user = await UserDocument.findOne({ username: relatedReservation?.owner });
    console.log(user);
    user.reviews.push({ reservationId: req.body.reservationId, rating: req.body.rating, review: req.body.review });
    const result = await UserDocument.findOneAndUpdate(user._id, { reviews: user.reviews })
    res.status(200).json(result);
}