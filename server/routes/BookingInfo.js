import express from 'express';
import {reserveRooms , getReservationData} from '../controllers/BookingInfo.js'
import {auth} from '../middlewares/auth.js';
const router = express.Router();

router.post('/' , auth ,reserveRooms);
router.post('/info' , getReservationData);

export default router;