const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const chatRoomRoutes = require("./routes/chatRoomRoutes");  
const cors = require('cors');  
const schedule = require("node-schedule");
const Message = require("./models/msg");

mongoose.connect(process.env.DB)
    .then(() => console.log("connected to database"))
    .catch((error) => console.error("Database connection error: ", error));

// CORS 설정
app.use(cors({

    origin: '*', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    
}));

app.use(express.json());
app.use('/api', chatRoomRoutes); // /api 경로에 대한 라우팅




// 스케줄러 매일 0시에 3일 지난 msg 삭제
const j = schedule.scheduleJob("0 0 * * *", async function () {
  try {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);  // 3일 전 날짜 계산

    // 3일 이상 지난 메시지 삭제
    const result = await Message.deleteMany({ msg_dt: { $lt: threeDaysAgo } });

    console.log(`${result.deletedCount} delete`);

  } catch (err) {
    console.error("schedule err:", err);
  }
});



module.exports =  app ;