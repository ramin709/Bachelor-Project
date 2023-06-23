import mongoose from 'mongoose';
import bookingInfoDocument from '../models/BookingInfo.js'
import RoomTypeDocument from '../models/RoomType.js'
import UserDocument from '../models/User.js'
import RoomDocument from '../models/Room.js'
import { findEmptyRoom, bookRoom } from './Room.js'

export const getReservationData = async (req, res) => {
    const { room } = req.body;
    var roomsData = [];
    var pureRoomsData = [];

    for (let i = 0; i < room.length; i++) {
        roomsData.push(await RoomTypeDocument.findOne({ room_name: room[i] }))
    }

    /* roomsData.forEach(room => {
        room[0].services = room[0].services.splice(0, 6);
        pureRoomsData.push(room[0]);
    }) */
    console.log(roomsData)
    res.status(200).json(roomsData);

}

export const reserveRooms = async (req, res) => {
    const { checkIn, checkOut, adultsCount, childrenCount, rooms, eachRoomTotalCost } = req.body;
    const userId = req.id;
    const { username } = await UserDocument.findOne({ _id: userId });
    console.log(username)
    console.log(rooms)
    var room_number = [];

    /* for (let i = 0; i < rooms.length; i++) {
        room_number = await findEmptyRoom(rooms[i].room_name, rooms[i].count);
        rooms[i] = { ...rooms[i], roomNumber: roomNumber, total_cost: eachRoomTotalCost[i] }
    }

    for(let j=0; j< rooms.length; j++) {
        await RoomDocument.findOneAndUpdate({ room_number: rooms[j].room_number} , {is_booked : true});
    }

    const data = { checkIn, checkOut, adultsCount: Number(adultsCount), children: Number(childrenCount), owner: username, roomsInfo: rooms }
    
    try {
        await bookingInfoDocument.create(data);
        res.status(200).json({isCreated: true});
    } catch (error) {
        console.log(error);
    } */
}

export const getReservationHistory = async(req , res) => {
    const userId = req.id;
    const {username} = await UserDocument.findOne({_id: userId});
    const reservationHistory = await bookingInfoDocument.find({owner: username});
    res.status(200).json(reservationHistory);
}

