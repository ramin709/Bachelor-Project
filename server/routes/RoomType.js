const express = require('express');
const roomTypeControllers = require('../controllers/RoomType.js');

const {getAllRoomTypes , getFeaturedRoomTypes , getRoom} = roomTypeControllers;

const router = express.Router();

router.get('/FeaturedRooms/' , getFeaturedRoomTypes);
router.get('/Rooms/' , getAllRoomTypes);
router.get('/Rooms/:id' , getRoom);

export default router;