const mongoose = require('mongoose');

const BookingInfoScheme = mongoose.Schema({
    owner: { type: String, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    adult_count: Number,
    children_count: Number,
    total_cost: {type: Number, required: true},
    room_number: [Number],
});

module.exports = mongoose.model('Booking_info' , BookingInfoScheme);