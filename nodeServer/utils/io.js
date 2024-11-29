module.exports = function(io) {
    const users = {};  // {socket.id: userName}


    io.on('connection', (socket) => {
        console.log(socket.id, ' user connected');
        
        // 클라이언트가 사용자 ID를 보낼 때 처리
        socket.on('registerUser', (userName) => {
            users[socket.id] = userName;  // socket.id와 userName 매핑
            console.log(`User ${userName} registered with socket id: ${socket.id}`);
        });
                
        //socket.id를 보내기
        socket.emit('socketId', socket.id);
            

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
            }
        });
    });
};


//socket.on('send_message') 클라이언트에서 보내는 메시지를 수신하는 이벤트
//socket.emit('new_message') 클라이언트에 새로운 메시지를 전송
//io.emit('new_message') 모든 클라이언트에 새로운 메시지를 전송