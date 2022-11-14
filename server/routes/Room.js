import express from 'express';
import { getAllAvailableRoomTypes } from '../controllers/Room.js';
const router = express.Router();

router.post('/BookNow/' , getAllAvailableRoomTypes);

export default router;

