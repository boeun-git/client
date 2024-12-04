module.exports = function(io) {
    const users = {};  // {socket.id: userName}, {userName, socket.id}


    io.on('connection', (socket) => {
        reconnection: false  // 자동 재연결 방지
        /*
        const { userName } = socket.handshake.query;
        // userId와 userName을 socket.id와 매핑하여 저장
        users[socket.id] = { userName };
        console.log(`User ${userName} connected with socket id: ${socket.id}`);
        //*/

        console.log(socket.id, ' user connected');
        
        // 클라이언트가 사용자 ID를 보낼 때 처리
        socket.on('insertUserName', (userName) => {
            users[socket.id] = userName;  // socket.id와 userName 매핑
            users[userName] = socket.id;  // socket.id와 userName 매핑
            console.log(`userName : ${userName} , socket.id: ${socket.id}`);
        });

        //socket.id를 보내기
        //socket.emit('socketId', socket.id);

/*
        socket.on('joinUserName', (chatUserName)=>{
            const chatUserNameSocketId = Object.keys(users).find(
                (socketId) => users[socketId] === chatUserName
            );
            socket.

            io.in(chatUserNameSocketId).socketsJoin("test");

            console.log(socket.rooms); // Set { <socket.id>, "room 237" }
            console.log(io.sockets.adapter);

            io.to("test").emit("a new user has joined the room"); // broadcast to everyone in the room
        })
        */
        socket.on('joinUserName', (chatUserName, userName) => {
            // users 객체에서 유저명에 해당하는 socketId 찾기
            const chatUserNameSocketId = Object.keys(users).find(
                (socketId) => users[socketId] === chatUserName
            );
            const userNameSocketId = Object.keys(users).find(
                (socketId) => users[socketId] === userName
            );            
        
            if (chatUserNameSocketId && userNameSocketId) {
                // 해당 socketId의 클라이언트를 test room에 join
                //io.to(chatUserNameSocketId).socketsJoin("6743ec8d052ebbdb03218e72");  // socketId로 room에 join  "_id"가 될 예정
                //io.to(userNameSocketId).socketsJoin("6743ec8d052ebbdb03218e72");  // socketId로 room에 join
                io.in(chatUserNameSocketId).socketsJoin("room1");
                io.in(userNameSocketId).socketsJoin("room1");
                console.log(`Socket ${chatUserNameSocketId}, ${userNameSocketId} joined room "room1"`);
        


                // 특정 room에 모든 클라이언트에게 emit
                io.to("room1").emit("a new user has joined the room"); // test room에 broadcast
            } else {
                console.log(`User with name ${chatUserName} not found.`);
            }
        
            // socket의 현재 rooms 출력 (debugging용)
            console.log(socket.rooms);  // 현재 socket이 속해있는 room들 확인
            // io.sockets.adapter 상태를 확인하려면, 전체 방 상태를 출력
            console.log(io.sockets.adapter);  // 전체 room 정보 확인
        });
        
          
        
            

        // 특정 사용자의 socket.id를 통해 메시지 보내기
        socket.on('sendMessageToUser', (targetUserId, message) => {
            const targetSocketId = Object.keys(users).find(
                (socketId) => users[socketId] === targetUserId
            );
            
            if (targetSocketId) {
                io.to(targetSocketId).emit('receiveMessage', message);
                console.log(`Message sent to user ${targetUserId}`);
            } else {
                console.log(`User ${targetUserId} not connected.`);
            }
        });

        

        // 클라이언트가 연결을 끊을 때 해당 정보를 삭제
        socket.on('disconnect', () => {
            const userName = users[socket.id];
            if (userName) {
                delete users[socket.id];
                console.log(`User ${userName} disconnected`);
                //console.log(`User ${users} `);
                console.log(users);
            }
        });
    });
};
/*
    // 특정 사용자 이름이 접속 중인지 확인하는 이벤트
    socket.on('checkUserOnline', (targetUserName) => {
        // 사용자 이름으로 접속 여부를 확인
        const isUserOnline = Object.values(users).includes(targetUserName);

        if (isUserOnline) {
            console.log(`${targetUserName} is online.`);
            socket.emit('userStatus', `${targetUserName} is online.`);
        } else {
            console.log(`${targetUserName} is not online.`);
            socket.emit('userStatus', `${targetUserName} is not online.`);
        }
    });
 */


//socket.on('send_message') 클라이언트에서 보내는 메시지를 수신하는 이벤트
//socket.emit('new_message') 클라이언트에 새로운 메시지를 전송
//io.emit('new_message') 모든 클라이언트에 새로운 메시지를 전송