import mongoose from 'mongoose'

const RoomServices = mongoose.Schema({
    service: {type: String , required: true , unique: true},
    roomTypes: {type :[mongoose.Schema.Types.ObjectId] , ref: "roomtypes"},
});

export default mongoose.model('RoomServices' , RoomServices);