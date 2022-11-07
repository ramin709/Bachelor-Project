const mongoose = require('mongoose');

const RoomTypeScheme = mongoose.Scheme({
    room_name: {type: String, required: true},
    cost_per_day: {type: Number, required: true},
    size: {type: Number, required: true},
    capacity : {type: Number, required: true},
    room_count: {type: Number, required: true},
    booked_count: {type: Number, required: true},
    description: {type: String, required: true},
    bed: {type: String, required: true , maxlength: 30},
})

module.exports = mongoose.model('Room_type' , RoomTypeScheme);