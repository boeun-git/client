//http서버 생성할 때 사용
const {createServer} = require("http");
const app = require("./app");
const socketIo = require('socket.io');
require("dotenv").config();

app.get('/', (req, res) => res.send('Hello World!'));

const httpServer = createServer(app);

// Socket.IO 서버 설정
const io = socketIo(httpServer, {
    cors: {
        origin: '*', // 클라이언트에서 서버로의 요청을 허용
        methods: ['GET', 'POST'],
    },
});

// 클라이언트와 연결된 이벤트 처리
io.on('connection', (socket) => {
    console.log('A user connected');

    // 메시지 전송 이벤트
    socket.on('send_message', (messageData) => {
        console.log('Message received:', messageData);

        // 메시지를 저장하고, 모든 클라이언트로 브로드캐스트
        io.emit('new_message', messageData);  // 모든 클라이언트에 새 메시지를 전송
    });
    
    // 단체 채팅에 참여하는 이벤트
    socket.on('join_group_room', (roomId) => {
        socket.join(roomId);
        console.log(`A user joined the group room: ${roomId}`);

        // 방에 참여한 모든 사용자에게 메시지 전송
        io.to(roomId).emit('message', `A new user has joined the group chat!`);
    });

    // 클라이언트가 연결을 끊었을 때 처리
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

//cors.origin: '*' 모든 클라이언트에서 서버로의 연결을 허용, 보안을 강화하려면 특정 도메인만 허용
//socket.on('send_message') 클라이언트에서 보내는 메시지를 수신하는 이벤트
//socket.emit('new_message') 클라이언트에 새로운 메시지를 전송
//io.emit('new_message') 모든 클라이언트에 새로운 메시지를 전송


httpServer.listen(process.env.PORT,()=>{
    console.log("server listening on port", process.env.PORT);
});


//const test = require('./test/testChatRoomRepository');
//test;