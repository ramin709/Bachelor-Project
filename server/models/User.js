import mongoose from 'mongoose'

const UserScheme = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone_number: {type: String, default: ''},
    birthday: {type: String, default: ''},
    email: {type: String, default: ''},
    gender: {type: String, maxlength: 6, default: ''},
    profile_img: {type: String, default: ''},
    is_checked: {type: Boolean , default: false},
    reviews: {type: [{reservationId: mongoose.Schema.Types.ObjectId , rating: Number , review: String}] , default: []}
});

const User = mongoose.model('User', UserScheme);

export default User;