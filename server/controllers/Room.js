import mongoose from 'mongoose';
import BookingInfoDocument from '../models/BookingInfo.js';
import RoomDocument from '../models/Room.js'
import RoomTypeDocument from '../models/RoomType.js'

export const getRoomCounts = async (req, res) => {
    const roomCounts = await RoomDocument.count();
    return roomCounts;
}

const changeVacantCount = (roomsList,roomType) => {
    var newRoomsList = roomsList;
    newRoomsList.forEach(room => {
        if(room._id.toString() === roomType._id.toString()){
            room.vacantCount = room.vacantCount + 1;
        }
    })
    return newRoomsList;
}

const getFreeRoomTypes = async(rooms) => {
    const allRoomTypes = await RoomTypeDocument.find();
    var freeRoomTypes = [];
    var count = 0;
    allRoomTypes.forEach(roomType => {
        console.log('count' , count)
        count++;
        rooms.forEach(room => {
            if(room.roomType.toString() === roomType._id.toString()){
                //console.log('iterate')
                /* console.log('room' , room);
                console.log('roomType' , roomType)
                console.log('freeRooms' , freeRoomTypes) */
                const availableRoomType = freeRoomTypes.find(roomTypeFree => roomTypeFree._id.toString() === roomType._id.toString());
                if(availableRoomType){
                    //console.log('enter')
                    freeRoomTypes = changeVacantCount(freeRoomTypes , availableRoomType);
                }else {
                    //console.log('enter else')
                    freeRoomTypes.push({...roomType._doc , vacantCount: 1})
                }
            }
        })
    })

    return freeRoomTypes;
}

/* const removeDuplicates = (allRoomTypeAvailable) => {
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
} */

export const getAvailableRoomTypes = async (req, res) => {
    const { rooms, adults, children } = req.body;
    const numberOfGuests = adults + children;
    const allRooms = await RoomDocument.find({isChecked: false});
    if(numberOfGuests >= Number(rooms)){
        if(allRooms !== null){
            const freeRooms = await getFreeRoomsInFuture(allRooms , req.body.checkIn);
            const result = await getFreeRoomTypes(freeRooms);
            //console.log('Free rooms are',result);
            res.status(200).json(result);
        }
    }
    
}

export const getAllAvailableRoomTypes = async (req, res) => {
    const allRoomTypes = await RoomTypeDocument.find();
    res.status(200).json(allRoomTypes);
}

export const findEmptyRoom = async(roomType , count) => {
    var roomNumbers = []
    const foundedRooms = await RoomDocument.find({isBooked : false , name: roomType}).limit(count);
    
    foundedRooms.map(room => roomNumbers.push(room?.roomNumber));

    return roomNumbers;
}

export const bookRoom = async (roomNumber) => {
    const updatedRoom = await RoomDocument.findOneAndUpdate({room_number: roomNumber} , {is_booked: true} , {returnDocument: 'after'});
   /*  console.log(updatedRoom) */
}

const getFreeRoomsInFuture = async(rooms , checkInDate) => {
    var notBookedRooms = rooms.filter(room => room.isBooked === false);
    console.log(checkInDate)
    var allReservations = await BookingInfoDocument.find({checkOut: {$lte: new Date(checkInDate)}});
    allReservations.forEach(reserve => {
        reserve.rooms.forEach(singleRoom => {
            rooms.forEach(room => {
                if(room._id.toString() == singleRoom.toString()){
                    notBookedRooms.push(room);
                }
            })
        })
    })

    return notBookedRooms;
}

