import express from 'express';
import {reserveRooms , getReservationData , getReservationHistory} from '../controllers/BookingInfo.js'
import {auth} from '../middlewares/auth.js';
const router = express.Router();

router.get('/history' , auth , getReservationHistory);
router.post('/' , auth ,reserveRooms);
router.post('/info' , getReservationData);

export default router;