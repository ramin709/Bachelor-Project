import mongoose from 'mongoose'

const BookingInfoScheme = mongoose.Schema({
    owner: { type: String, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    adult_count: Number,
    children_count: Number,
    roomsInfo: [{room_name: String, count: Number , room_number: [Number] , total_cost: Number}]
});

export default mongoose.model('Booking_info' , BookingInfoScheme);