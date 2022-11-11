import mongoose from 'mongoose';
import RoomDocument from '../models/Room.js'

export const getRoomCounts = async (req, res) => {
    console.log('request detected in getRoom');

    const roomCounts = await RoomDocument.count();
    return roomCounts;
}