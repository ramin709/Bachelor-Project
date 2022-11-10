import express from 'express';
import {getAllRoomTypes , getFeaturedRoomTypes , getRoom} from '../controllers/RoomType.js'

const router = express.Router();

router.get('/FeaturedRooms/' , getFeaturedRoomTypes);
router.get('/Rooms/' , getAllRoomTypes);
router.get('/Rooms/:id' , getRoom);

export default router;