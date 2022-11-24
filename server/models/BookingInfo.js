import mongoose from 'mongoose'

const BookingInfoScheme = mongoose.Schema({
    owner: { type: String, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    adult_count: Number,
    children_count: Number,
    total_cost: {type: [Number], required: true},
    rooms_number: {type: [Number], required: true},
    rooms_type: {type: [String], required: true},
});

export default mongoose.model('Booking_info' , BookingInfoScheme);