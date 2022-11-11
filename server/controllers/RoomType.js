import mongoose from 'mongoose'
import RoomTypeDocument from '../models/RoomType.js'

export const getAllRoomTypes = async(req , res) => {
    console.log('request detected in getAllRoomTypes');
}

export const getFeaturedRoomTypes = async(req , res) => {
    try {
        const data = await RoomTypeDocument.find();
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
    }
}

export const getRoom = async(req , res) => {
    console.log('request detected in getRoom');
}