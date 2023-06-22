import mongoose from 'mongoose'

const RoomServices = mongoose.Schema({
    service: {type: String , required: true},
    roomTypes: [mongoose.Schema.Types.ObjectId]
})

export default mongoose.model('RoomServices' , RoomServices);