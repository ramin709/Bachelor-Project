import mongoose from 'mongoose'

const RoomScheme = mongoose.Schema({
    roomNumber: { type: Number, required: true },
    isBooked: { type: Boolean, default: false },
    isChecked: { type: Boolean, default: false },
    roomType: {type: mongoose.Schema.Types.ObjectId , required: true , ref: "RoomTypes"}
})

export default mongoose.model('Room', RoomScheme);