// socket.js

// HTTP 서버 생성
const { createServer } = require("http");
const app = require("../app.js");
const socketIo = require('socket.io');  // socket.io 라이브러리 가져오기
const socketController = require("../controllers/socketController");  // 소켓 이벤트 처리

require("dotenv").config();  // 환경 변수 로드

// HTTP 서버 생성
const httpServer = createServer(app);

// 웹소켓 서버 설정
const io = socketIo(httpServer, {
    cors: {
        origin: "http://localhost:3000",  // 허용하는 클라이언트의 origin 설정
        methods: ['GET', 'POST']
    }
});

// 소켓 서버 로직 처리 (이 부분을 socketController에 위임)
socketController.setupSocket(io);

module.exports = { io, httpServer };