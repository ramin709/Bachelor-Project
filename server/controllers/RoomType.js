const mongoose = require('mongoose');
const RoomTypeDocument = require('../models/RoomType.js');

export const getAllRoomTypes = async(req , res) => {
    console.log('request detected in getAllRoomTypes');
}

export const getFeaturedRoomTypes = async(req , res) => {
    console.log('request detected in getFeaturedRoomTypes');
}

export const getRoom = async(req , res) => {
    console.log('request detected in getRoom');
}