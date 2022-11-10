import mongoose from 'mongoose'

const RoomTypeScheme = mongoose.Schema({
    room_name: {type: String, required: true},
    cost_per_day: {type: Number, required: true},
    size: {type: Number, required: true},
    capacity : {type: Number, required: true},
    room_count: {type: Number, required: true},
    booked_count: {type: Number, required: true},
    description: {type: String},
    bed: {type: String, required: true , maxlength: 30},
    services: [String],
    room_img: String,
    is_featured: {type: Boolean, required: true}
})

export default mongoose.model('Room_type' , RoomTypeScheme);