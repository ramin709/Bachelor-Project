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

export const reserveRooms = async (req, res) => {
    const { check_in, check_out, adults_count, children_count, rooms, eachRoomTotalCost } = req.body;
    const userId = req.id;
    const { username } = await UserDocument.findOne({ _id: userId });
    var room_number = [];

    for (let i = 0; i < rooms.length; i++) {
        room_number = await findEmptyRoom(rooms[i].room_name, rooms[i].count);
        rooms[i] = { ...rooms[i], room_number: room_number, total_cost: eachRoomTotalCost[i] }
    }

    const data = { check_in, check_out, adults_count: Number(adults_count), children: Number(children_count), owner: username, roomsInfo: rooms }
    
    try {
        await bookingInfoDocument.create(data);
        res.status(200).json({isCreated: true});
    } catch (error) {
        console.log(error);
    }

}

export const getReservationHistory = async(req , res) => {
    const userId = req.id;
    const {username} = await UserDocument.findOne({_id: userId});
    const reservationHistory = await bookingInfoDocument.find({owner: username});
    res.status(200).json(reservationHistory);
}

