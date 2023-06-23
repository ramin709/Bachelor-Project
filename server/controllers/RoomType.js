import RoomTypeDocument from '../models/RoomType.js'

export const getAllRoomTypes = async(req , res) => {
    const allRoomTypes = await RoomTypeDocument.find();
    res.status(200).json(allRoomTypes)
}

export const getFeaturedRoomTypes = async(req , res) => {
    try {
        const data = await RoomTypeDocument.find({isFeatured: true});
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

export const getRoom = async(req , res) => {
   const {id} = req.params;
   const room = await RoomTypeDocument.findOne({_id: id});
   const roomWithSixService = {...room._doc, services: room?.services.splice(0,6)};
   res.status(200).json(roomWithSixService);
}