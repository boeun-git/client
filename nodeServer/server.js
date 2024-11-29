//http서버 생성할 때 사용
const {createServer} = require("http");
const app = require("./app");
//웹소켓
const socketIo = require('socket.io');
require("dotenv").config();

const httpServer = createServer(app);
//app.get('/', (req, res) => res.send('Hello World!'));

// 웹소켓 서버 설정
const io = socketIo(httpServer, {
    
    cors: {

        // 클라이언트에서 서버로의 요청을 허용 //"http://localhost:3000"
        //origin: '*', 
        origin: "http://localhost:3000", 
        methods: ['GET', 'POST']

    }
    
});

require("./utils/io")(io);

httpServer.listen(process.env.PORT,()=>{
    console.log("server listening on port", process.env.PORT);
});


//const test = require('./test/testChatRoomRepository');
//test;