const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const chatRoomRoutes = require("./routes/chatRoomRoutes");  
const cors = require('cors');  


mongoose.connect(process.env.DB)
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("Database connection error: ", error));

// CORS 설정
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api', chatRoomRoutes); // /api 경로에 대한 라우팅

module.exports =  app ;
