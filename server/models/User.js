import mongoose from 'mongoose'

const UserScheme = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone_number: String,
    birthday: String,
    gender: {type: String, maxlength: 6},
    profile_img: String,
    is_checked: {type: Boolean},
    reviews: [{review: String , rating: Number}]
});

const User = mongoose.model('User', UserScheme);

export default User;