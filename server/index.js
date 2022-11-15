import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import roomTypeRouter from './routes/RoomType.js'
import userRouter from './routes/User.js'
import bookingInfoRouter from './routes/BookingInfo.js'
import roomRouter from './routes/Room.js'

const server = express();
dotenv.config();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));
server.use('/roomType' , roomTypeRouter);
server.use('/user' , userRouter);
server.use('/reserve' , bookingInfoRouter);
server.use('/room' , roomRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/hotel').then(
    console.log('database connection established'),
    server.listen(PORT , () => {
        console.log(`server listening on port ${PORT}`);
        console.log(mongoose.modelNames());
    })
).catch(err => console.log(err));