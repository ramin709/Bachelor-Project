import express from 'express';
import {reserveRooms , getReservationData} from '../controllers/BookingInfo.js'
const router = express.Router();

router.post('/' , reserveRooms);
router.post('/info' , getReservationData);

export default router;