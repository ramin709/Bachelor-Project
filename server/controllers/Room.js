import mongoose from 'mongoose';
import BookingInfoDocument from '../models/BookingInfo.js';
import RoomDocument from '../models/Room.js'
import RoomTypeDocument from '../models/RoomType.js'

export const getRoomCounts = async (req, res) => {
    const roomCounts = await RoomDocument.count();
    return roomCounts;
}

const changeVacantCount = (roomsList, roomType) => {
    var newRoomsList = roomsList;
    newRoomsList.forEach(room => {
        if (room._id.toString() === roomType._id.toString()) {
            room.vacantCount = room.vacantCount + 1;
        }
    })
    return newRoomsList;
}

const getFreeRoomTypes = async (rooms) => {
    const allRoomTypes = await RoomTypeDocument.aggregate([{
        $lookup: {
            from: 'roomservices',
            localField: '_id',
            foreignField: 'roomTypes',
            as: 'services'
        }
    }]);
    /* console.log(rooms)
    console.log(allRoomTypes.services) */
    var freeRoomTypes = [];
    var count = 0;
    allRoomTypes.forEach(roomType => {
        rooms.forEach(room => {
            /* console.log(room) */
            if (room.roomType.toString() === roomType._id.toString()) {
                //console.log('iterate')
                /* console.log('room' , room);
                console.log('roomType' , roomType)
                console.log('freeRooms' , freeRoomTypes) */
                const availableRoomType = freeRoomTypes.find(roomTypeFree => roomTypeFree._id.toString() === roomType._id.toString());
                if (availableRoomType) {
                    //console.log('enter')
                    freeRoomTypes = changeVacantCount(freeRoomTypes, availableRoomType);
                } else {
                    //console.log('enter else')
                    freeRoomTypes.push({ ...roomType, vacantCount: 1 })
                }
            }
        })
    })

    return freeRoomTypes;
}

export const getAvailableRoomTypes = async (req, res) => {
    const { rooms, adults, children } = req.body;
    const numberOfGuests = adults + children;
    const allRooms = await RoomDocument.find();
    if (numberOfGuests >= Number(rooms)) {
        if (allRooms !== null) {
            const freeRooms = await getFreeRoomsInFuture(allRooms, req.body.checkIn);
            const result = await getFreeRoomTypes(freeRooms);
            /* console.log('Free rooms are',result); */
            res.status(200).json(result);
        }
    }

}

export const getAllAvailableRoomTypes = async (req, res) => {
    const allRoomTypes = await RoomTypeDocument.find();
    res.status(200).json(allRoomTypes);
}

export const findEmptyRoom = async (roomType, count, checkInDate) => {
    var roomNumbers = []
    const foundedRooms = await RoomDocument.find({ isBooked: false, name: roomType }).limit(count).select("_id");

    if (foundedRooms.length < count) {
        const remaining = count - foundedRooms.length;
        const result = await RoomDocument.aggregate([{
            $lookup: {
                from: 'roomtypes',
                localField: 'roomType',
                foreignField: '_id',
                as: 'roomTypeInfo'
            },
        },
        {
            $lookup: {
                from: 'bookinginfos',
                localField: '_id',
                foreignField: 'rooms',
                as: 'bookingInfo'
            }
        }]);

        result.forEach(singleRecord => {
            const correspondingDate = singleRecord?.bookingInfo[singleRecord?.bookingInfo.length - 1]?.checkOut
            const checkOutDate = correspondingDate ? new Date(correspondingDate) : null;
            const customerCheckInDate = new Date(checkInDate);
            if (checkOutDate) {
                if (checkOutDate.getMonth() === customerCheckInDate.getMonth()) {
                    const diffTime = Math.abs(customerCheckInDate - checkOutDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    if (diffDays >= 0) {
                        foundedRooms.push({ _id: singleRecord?._id })
                    }
                }
            }
        })

    }
    foundedRooms.map(room => roomNumbers.push(room?._id));
    return roomNumbers;
}

export const bookRoom = async (roomNumber) => {
    const updatedRoom = await RoomDocument.findOneAndUpdate({ roomNumber: roomNumber }, { isBooked: true }, { returnDocument: 'after' });
}

const getFreeRoomsInFuture = async (rooms, checkInDate) => {
    var notBookedRooms = rooms.filter(room => room.isBooked === false);
    const RoomsWithCheckOut = await RoomDocument.aggregate([{
        $lookup: {
            from: 'bookinginfos',
            localField: '_id',
            foreignField: 'rooms',
            as: 'bookingInfo'
        }
    },{
        $match: {
        isBooked: true
    }}
    ])
    RoomsWithCheckOut.forEach(roomWithCheckOut => {
        console.log(roomWithCheckOut)
        const latestReserveForCurrentRoom = roomWithCheckOut.bookingInfo[roomWithCheckOut.bookingInfo.length - 1];
        const customerCheckInDate = new Date(checkInDate).getTime();
        const latestCheckOutDate = new Date(latestReserveForCurrentRoom?.checkOut).getTime();
        /* console.log(customerCheckInDate);
        console.log(latestCheckOutDate); */
        if (customerCheckInDate >= latestCheckOutDate) {
            /* console.log('enter');
            console.log(rooms) */
            const freeRoom = rooms.filter(room => room._id.toString() === roomWithCheckOut._id.toString());
            /* console.log(freeRoom) */
            notBookedRooms.push(freeRoom[0]);
        }
    })
    //console.log(notBookedRooms)
    return notBookedRooms;
}

