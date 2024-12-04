// controllers/socketController.js
//const socketService = require('../services/socketService'); // 소켓 서비스
let io;
const users = {};  // {socket.id: userName}, {userName, socket.id}
const msgService = require('../services/msgService');


const setupSocket  =  (socketIo) => {

    io = socketIo
  
    io.on('connection', (socket) => {
        console.log('connection : ', socket.id);

        reconnection: false  // 자동 재연결 방지


        // 클라이언트가 사용자 ID를 보낼 때 처리 나중엔 밑에 주석되있는거로 수정(로그인)
        socket.on('insertUserName', (userName) => {
            //socketService.insertUserName(socket, userName); 
            insertUserName(socket, userName); 
        });
        /*
        const { userName } = socket.handshake.query;
        // userId와 userName을 socket.id와 매핑하여 저장
        users[socket.id] = { userName };
        console.log(`User ${userName} connected with socket id: ${socket.id}`);
        //*/




        // 클라이언트가 'getSingleJoinRoom' 이벤트를 보낼 때 처리
        socket.on('getSingleJoinRoom', (roomId, chatUserNames) => {
            console.log('before getSingleJoinRoom....');
            //socketService.singleJoinRoom(io, roomId, chatUserNames); 
            console.log('after getSingleJoinRoom....');
        });

        socket.on('chatMessage', (messageData) => {
            socketService.sendMessageToRoom(io, messageData); 
        });

        
        socket.on('sendMsg', (roomId, msg, sendUser, room_type, msg_type, chatUsers) => {
            
            console.log('socket sendMsg : ', roomId, msg, sendUser, room_type);
            //socket.emit('sendMsg', roomId, msg);
            // roomId로 서버에서 메세지 보내기
            io.to(roomId).emit('receiveMessage', roomId, msg, sendUser);


            let receiveData = {};

            if(room_type === 0){
                chatUsers.forEach(user => {

                    receiveData[user] = { receive_chk: "N" };  // 각 사용자에게 기본적으로 "N"

                });
            }else{
                receiveData[chatUsers[0]] = { receive_chk: "N" };
            }
    
            
            const newMessage = {
                room_id: roomId,
                msg: msg,
                msg_type: msg_type,
                sender_id: sendUser,
                receive: receiveData
            };
            console.log("msg : ", newMessage);
            msgService.addMsg(newMessage);
        
        });


        //연결해제될때 user에서도 삭제
        socket.on('disconnect', () => {
            const userName = users[socket.id];
            const socketId = users[userName];
            console.log(users);
            if (userName || socketId) {
                delete users[socket.id];
                delete users[userName];
                console.log('userName : ', userName, 'disconnect');
                console.log(users);
            }
        });

    });
};

//group chat
const groupJoinRoom = (roomId, chatUserNames) => {
    if (io) {

        console.log('before groupJoinRoom....');
        //io.emit('getSingleJoinRoom', roomId, chatUserNames);  // 모든 클라이언트에게 방 입장을 알림
        //io.in(roomId).emit('getSingleJoinRoom', chatUserNames);  // 모든 클라이언트에게 방 입장을 알림

        for (let i = 0; i<chatUserNames.length; i++){
            if(users[chatUserNames[i]]){
                io.to(users[chatUserNames[i]]).socketsJoin(roomId);
                console.log('groupJoinRoom userName : ', chatUserNames[i]
                    ,' socketId:' ,users[chatUserNames[i]], ', room: ', roomId);
            }else{
                console.log('groupJoinRoom userName : ', chatUserNames[i],' xxxxx ');                
            }
        }

        console.log('io.room : \n', io.sockets.adapter.rooms); 
        console.log('io.sockets.adapter : \n', io.sockets.adapter);

        console.log('after groupJoinRoom....');
    } else {
        console.error('groupJoinRoom io 없다');
    }    
}

// 1:1 chat
const SingleJoinRoom = ( roomId, chatUserNames) => {

    if (io) {

        console.log('before SingleJoinRoom....');

        io.to(users[chatUserNames[0]]).socketsJoin(roomId);
        io.to(users[chatUserNames[1]]).socketsJoin(roomId);

        console.log(`singleJoinRoom userName : ${chatUserNames[0]}, room: ${roomId}`);
        console.log(`singleJoinRoom userName : ${chatUserNames[1]}, room: ${roomId}`);        

        console.log('io.sockets.adapter.rooms : \n', io.sockets.adapter.rooms); 
        //console.log('io.sockets.adapter : \n', io.sockets.adapter);
        console.log('after SingleJoinRoom....');
    } else {
        console.error('io xxxxx');
    }
};

const insertUserName = (socket, userName) => {

    users[socket.id] = userName;  // socket.id와 userName 매핑
    users[userName] = socket.id;  // socket.id와 userName 매핑
    console.log(`insertUserName userName : ${userName} , socket.id: ${socket.id}`);

};

// //접속여부확인
// const checkUser = (userNames) => {
//     if ( users[userNames[0]] && users[userNames[1]] ) return true;
//     else return false;
// };

const checkUser = (userNames) => {
    return userNames.every(userName => users[userName]);
};

//const sendMsgSingle = (roomId, sendUserName, msg) => {
const sendMsgSingle = (data) => {

    console.log(chatRoomController.receiveUserName(data.id));
    //checkUser(data.)

    socket.emit('sendMsg', roomId, msg);

    io.to(data.roomId).emit('chatMessage', data.msg, data.sendUserName);
    console.log('msg data : \n', data);

}

const sendMsgGroup = (roomId, sendUserName, msg) => {

    io.to(roomId).emit('chatMessage', msg, sendUserName);
    console.log(`Message sent to room ${message.room}: ${message.text}`);

}

module.exports = { 
    setupSocket, 
    SingleJoinRoom, 
    groupJoinRoom, 
    insertUserName, 
    checkUser, 
    sendMsgSingle,
    sendMsgGroup };
