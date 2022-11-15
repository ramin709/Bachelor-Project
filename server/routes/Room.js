import express from 'express';
import { getAllAvailableRoomTypes , getAvailableRoomTypes } from '../controllers/Room.js';
const router = express.Router();

router.get('/BookNow/' , getAllAvailableRoomTypes);
router.post('/BookNow/' , getAvailableRoomTypes);

export default router;

