import mongoose from 'mongoose';
import RoomDocument from '../models/Room.js'
import RoomTypeDocument from '../models/RoomType.js'

export const getRoomCounts = async (req, res) => {
    const roomCounts = await RoomDocument.count();
    return roomCounts;
}

const removeDuplicates = (allRoomTypeAvailable) => {
    var allRoomTypesAvailableWithoutDuplicates = [];
    var response = null;

    allRoomTypeAvailable.forEach(roomType => {

        var isExists = false;
        if (allRoomTypesAvailableWithoutDuplicates.length > 0) {
            allRoomTypesAvailableWithoutDuplicates.forEach(item => {
                if (item.room_name === roomType.room_name) {
                    isExists = true;
                }
            })
            if (!isExists) {
                allRoomTypesAvailableWithoutDuplicates.push(roomType);
            }
        } else {
            allRoomTypesAvailableWithoutDuplicates.push(roomType);
        }

        response = allRoomTypesAvailableWithoutDuplicates;
    })
    return response;
}

export const getAvailableRoomTypes = async (req, res) => {
    const { rooms, adults, children } = req.body;
    const numberOfPeople = Number(children) + Number(adults)
    const allRooms = await RoomDocument.find({is_booked: false , is_checked: false});
    const allRoomTypes = await RoomTypeDocument.find();
    var allRoomTypeAvailable = [];
    var response = null;
    var Error = null;

    if (numberOfPeople < Number(rooms)) {
        Error = 'Room number cannot be less than number of people';
    } else if(allRooms === null){
        response = allRoomTypes;
        Error = 'No Room found with this information';
    } else {
        allRooms.forEach(room => {
            allRoomTypes.forEach(roomType => {
                if (roomType.room_name === room.room_name) {
                    allRoomTypeAvailable.push(roomType);
                }
            })

            response = removeDuplicates(allRoomTypeAvailable);
        })
    }
    
    res.status(200).json({response , Error});
}

export const getAllAvailableRoomTypes = async (req, res) => {
    const allRoomTypes = await RoomTypeDocument.find();
    var allRoomTypesWithEmptyRoom = allRoomTypes.filter(roomType => (roomType.room_count - roomType.booked_count) !== 0);
    res.status(200).json(allRoomTypesWithEmptyRoom);
}

export const findEmptyRoom = async(roomType , count) => {
    var roomNumbers = []
    const foundedRooms = await RoomDocument.find({is_booked : false , room_name: roomType}).limit(count);
    
    foundedRooms.map(room => roomNumbers.push(room?.room_number));

    return roomNumbers;
}

export const bookRoom = async (roomNumber) => {
    const updatedRoom = await RoomDocument.findOneAndUpdate({room_number: roomNumber} , {is_booked: true} , {returnDocument: 'after'});
   /*  console.log(updatedRoom) */
}