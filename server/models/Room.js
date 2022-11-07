const mongoose = require('mongoose');

const RoomScheme = mongoose.Schema({
    room_name: {type: String, required: true},
    room_number: {type: Number, required: true},
    room_img:
    {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model('Room', RoomScheme);