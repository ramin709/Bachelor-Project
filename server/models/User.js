import mongoose from 'mongoose'

const UserScheme = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, default: ''},
    birthOfDate: {type: String, default: ''},
    email: {type: String, default: ''},
    gender: {type: String, maxlength: 6, default: ''},
    profileImg: {type: String, default: ''},
});

const User = mongoose.model('User', UserScheme);

export default User;