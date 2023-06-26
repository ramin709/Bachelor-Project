import express from 'express';
import {reserveRooms , getReservationData , getReservationHistory} from '../controllers/BookingInfo.js'
import { getUserNameAndLastName } from '../controllers/User.js';
import {auth} from '../middlewares/auth.js';
const router = express.Router();

router.get('/history' , auth , getReservationHistory);
router.post('/' , auth ,reserveRooms);
router.post('/info' , getReservationData);
router.get('/user' , auth ,getUserNameAndLastName);

export default router;