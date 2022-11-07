const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const server = express();
const cors = require('cors');

dotenv.config();
server.use(cors());

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/hotel').then(
    console.log('database connection established'),
    server.listen(PORT , () => {
        console.log(`server listening on port ${PORT}`);
    })
).catch(err => console.log(err));