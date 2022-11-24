import mongoose from 'mongoose';
import bookingInfoDocument from '../models/BookingInfo.js'
import RoomTypeDocument from '../models/RoomType.js'
import UserDocument from '../models/User.js'
import { findEmptyRoom, bookRoom } from './Room.js'

export const getReservationData = async (req, res) => {
    const { room } = req.body;
    var roomsData = [];
    var pureRoomsData = [];

    for (let i = 0; i < room.length; i++) {
        roomsData.push(await RoomTypeDocument.find({ room_name: room[i] }))
    }

    roomsData.forEach(room => {
        room[0].services = room[0].services.splice(0, 6);
        pureRoomsData.push(room[0]);
    })

    res.status(200).json(pureRoomsData);

}

export const findAndReserveRoom = async (roomType) => {
    try {
        const roomNumber = await findEmptyRoom();
        console.log(roomNumber);
        return true;
    } catch (error) {
        console.log(error.message);
    }

    return false;
}

export const reserveRooms = async (req, res) => {
    const { check_in, check_out, adult_count, children_count, rooms, total_cost } = req.body;
    const userId = req.id;
    const { username } = await UserDocument.findOne({ _id: userId });
    console.log(rooms)
    var bookedRooms = [];

    rooms.forEach(async (room) => {
        for (var i = 0; i < Number(room.count); i++) {
            console.log(await findAndReserveRoom(room.room_name))
        }
        console.log(bookedRooms);
    })


}

