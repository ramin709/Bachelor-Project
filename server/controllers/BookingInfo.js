import mongoose from 'mongoose';
import bookingInfoDocument from '../models/BookingInfo.js'
import RoomTypeDocument from '../models/RoomType.js'
import UserDocument from '../models/User.js'
import RoomDocument from '../models/Room.js'
import { findEmptyRoom, bookRoom } from './Room.js'

export const getReservationData = async (req, res) => {
    console.log('getReserveRoomDate')
    const { room } = req.body;
    var roomsData = [];
    var pureRoomsData = [];

    for (let i = 0; i < room.length; i++) {
        const currentRoomTypeWithServices = await RoomTypeDocument.aggregate([{
            $lookup:{
                from: 'roomservices',
                localField: '_id',
                foreignField: 'roomTypes',
                as: 'services',
            }
        }]);
        /* console.log(currentRoomTypeWithServices[0].services) */
        roomsData.push(currentRoomTypeWithServices)
    }

    /* console.log(roomsData) */

    roomsData.forEach(room => {
        room[0].services = room[0].services.splice(0, 6);
        pureRoomsData.push(room[0]);
    })

    res.status(200).json(pureRoomsData);

}

export const reserveRooms = async (req, res) => {
    console.log('reserve')
    const { checkIn, checkOut, rooms, eachRoomTotalCost } = req.body;
    const userId = req.id;
    const { username } = await UserDocument.findOne({ _id: userId });
    var roomsNumber = [];

    for (let i = 0; i < rooms.length; i++) {
        roomsNumber = await findEmptyRoom(rooms[i].name, rooms[i].count, checkIn);
        rooms[i] = { ...rooms[i], _id: roomsNumber, totalCost: eachRoomTotalCost[i] }
    }

    for (let j = 0; j < rooms.length; j++) {
        await RoomDocument.findOneAndUpdate({ _id: rooms[j]._id }, { isBooked: true });
    }

    const newRooms = rooms.map(room => room._id)[0];
    var totalCost = 0;    
    for(let i = 0; i < rooms.length; i++) {
        totalCost += rooms[i].totalCost;
    }

    totalCost = totalCost + (totalCost*0.09) + 10;

    const data = { checkIn, checkOut, owner: username, rooms: newRooms , totalCost: totalCost }
    console.log(data)

    try {
        await bookingInfoDocument.create(data);
        res.status(200).json({isCreated: true});
    } catch (error) {
        console.log(error);
    }
}

export const getReservationHistory = async (req, res) => {
    console.log('getHistory');
    const userId = req.id;
    const { username } = await UserDocument.findOne({ _id: userId });
    const reservationHistory = await bookingInfoDocument.aggregate([{
        $lookup:{
            
        }
    }]);

    /* res.status(200).json(reservationHistory); */
}

