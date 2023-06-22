import mongoose from 'mongoose'

const BookingInfoScheme = mongoose.Schema({
    owner: { type: String, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    rooms: {type: [mongoose.Schema.Types.ObjectId]},
    review: {type: {rating: Number , review: String}}
});

export default mongoose.model('BookingInfo' , BookingInfoScheme);