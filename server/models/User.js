const mongoose = require('mongoose');

const UserScheme = mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    phone_number: String,
    birthday: String,
    gender: {type: String, maxlength: 6},
    profile_img: {
        data: Buffer,
        contentType: String
    },
    is_checked: {type: Boolean, required: true},
    reviews: [{review: String , rating: Number}]
});

module.exports = mongoose.model('User' , UserScheme);