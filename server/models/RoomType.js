import mongoose from 'mongoose'

const RoomTypeScheme = mongoose.Schema({
    costPerDay: {type: Number, required: true},
    size: {type: Number, required: true},
    capacity : {type: Number, required: true},
    description: {type: String},
    name: {type: String, required: true , maxlength: 30},
    roomImg: String,
    isFeatured: {type: Boolean, required: true},
    bed: {type: String , default: ''}
})

export default mongoose.model('RoomTypes' , RoomTypeScheme);