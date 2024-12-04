// services/socketService.js
const users = {};  // {socket.id: userName}, {userName, socket.id}

const insertUserName = (socket, userName) => {

    users[socket.id] = userName;  // socket.id와 userName 매핑
    users[userName] = socket.id;  // socket.id와 userName 매핑
    console.log(`insertUserName userName : ${userName} , socket.id: ${socket.id}`);

}

//const singleJoinRoom = (socket, roomId, chatUserSockets) => {
const singleJoinRoom = (io, roomId, chatUserNames) => {


    io.to(users[chatUserNames[0]]).join(roomId);
    io.to(users[chatUserNames[1]]).join(roomId);

    console.log(`singleJoinRoom userName : ${chatUserSockets[0]}, room: ${roomId}`);
    console.log(`singleJoinRoom userName : ${chatUserSockets[1]}, room: ${roomId}`);

}

const sendMessageToRoom = (io, message) => {
    io.to(message.room).emit('chatMessage', message);
    console.log(`Message sent to room ${message.room}: ${message.text}`);
}


// function joinRoom(socket, roomName, chatUserSocket) {
//     socket.join(roomName);
//     io.in(chatUserSocket).socketsJoin(roomName);

//     console.log(`${socket.id} joined room: ${roomName}`);
//     console.log(`${chatUserSocket} joined room: ${roomName}`);

// }

module.exports = { insertUserName, singleJoinRoom,  sendMessageToRoom };

