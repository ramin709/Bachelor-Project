import mongoose from 'mongoose'

const RoomScheme = mongoose.Schema({
    room_name: { type: String, required: true },
    room_number: { type: Number, required: true },
    is_booked: { type: Boolean, required: true },
    is_checked: { type: Boolean, required: true },
})

export default mongoose.model('Room', RoomScheme);