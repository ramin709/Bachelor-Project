import mongoose from 'mongoose';
import bookingInfoDocument from '../models/BookingInfo.js'
import RoomTypeDocument from '../models/RoomType.js'

export const getReservationData = async(req, res) => {
    const {room} = req.body;
    var roomsData = [];
    var pureRoomsData = [];

    for(let i = 0; i < room.length; i++) {
        console.log(room)
        roomsData.push(await RoomTypeDocument.find({room_name: room[i]}))
    }

    roomsData.forEach(room => {
        room[0].services = room[0].services.splice(0 , 6);
        pureRoomsData.push(room[0]);
    })

    res.status(200).json(pureRoomsData);

}

export const reserveRooms = async(req, res) => {
    console.log('request detected in reserveRooms');
}

