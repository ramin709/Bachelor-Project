import mongoose from 'mongoose';
import RoomDocument from '../models/Room.js'
import RoomTypeDocument from '../models/RoomType.js'

export const getRoomCounts = async (req, res) => {
    const roomCounts = await RoomDocument.count();
    return roomCounts;
}

export const getAvailableRoomTypes = async (req, res) => {
    const { rooms, adults, children } = req.body;
    const numberOfPeople = Number(children) + Number(adults)
    const allRooms = await RoomDocument.find();
    const availableRooms = allRooms.filter(room => !room.is_checked && !room.is_booked);
    const allRoomTypes = await RoomTypeDocument.find();
    var allRoomTypeAvailable = [];
    var allRoomTypesAvailableWithoutDuplicates = [];
    var response = null;
    var Error = null;

    if (numberOfPeople < Number(rooms)) {
        Error = 'Room number cannot be less than number of people';
    } else if(availableRooms === null){
        response = allRoomTypes;
        Error = 'No Room found with this information';
    } else {
        availableRooms.forEach(room => {
            allRoomTypes.forEach(roomType => {
                if (roomType.room_name === room.room_name) {
                    allRoomTypeAvailable.push(roomType);
                }
            })
        })

        allRoomTypeAvailable.forEach(roomType => {

            var isExists = false;
            if (allRoomTypesAvailableWithoutDuplicates.length > 0) {
                allRoomTypesAvailableWithoutDuplicates.forEach(item => {
                    /* console.log('roomType.room_name', roomType.room_name);
                    console.log('item.room_name', item.room_name); */
                    if (item.room_name === roomType.room_name) {
                        /* console.log('count up') */
                        isExists = true;
                    }
                })
                if (!isExists) {
                    /* console.log('enter') */
                    allRoomTypesAvailableWithoutDuplicates.push(roomType);
                }
            } else {
                allRoomTypesAvailableWithoutDuplicates.push(roomType);
            }

            response = allRoomTypesAvailableWithoutDuplicates;
            
        })
    }
    
    res.status(200).json({response , Error});
}

export const getAllAvailableRoomTypes = async (req, res) => {
    const allRoomTypes = await RoomTypeDocument.find();
    var allRoomTypesWithEmptyRoom = allRoomTypes.filter(roomType => (roomType.room_count - roomType.booked_count) !== 0);
    res.status(200).json(allRoomTypesWithEmptyRoom);
}