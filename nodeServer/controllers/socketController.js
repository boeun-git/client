let io;
const users = {};  // {socket.id: userName}, {userName, socket.id}
const msgService = require('../services/msgService');
//const path = require('path');
//const fs = require('fs');
require('dotenv').config();
const { S3Client, PutObjectCommand  } = require('@aws-sdk/client-s3');

const setupSocket  =  (socketIo) => {

    io = socketIo


    io.on('connection', (socket) => {
        console.log('connection : ', socket.id);
        const userName = socket.handshake.query.userName; // 클라이언트에서 전달된 userName
        insertUserName(socket, userName); 
        console.log('users : ', users);
        console.log('io.room : \n', io.sockets.adapter.rooms); 
        console.log('io.sockets.adapter : \n', io.sockets.adapter);

        reconnection: false  

        // 클라이언트가 사용자 ID를 보낼 때 처리 나중엔 밑에 주석되있는거로 수정(로그인)
        socket.on('insertUserName', (userName) => {
            //socketService.insertUserName(socket, userName); 
            insertUserName(socket, userName); 
        });

        // 클라이언트가 'getSingleJoinRoom' 이벤트를 보낼 때 처리
        socket.on('getSingleJoinRoom', (roomId, chatUserNames) => {
            console.log('before getSingleJoinRoom....');
            //socketService.singleJoinRoom(io, roomId, chatUserNames); 
            console.log('after getSingleJoinRoom....');
        });

        socket.on('chatMessage', (messageData) => {
            console.log("socket.on chatMessage : ", messageData);
            socketService.sendMessageToRoom(io, messageData); 
        });


        socket.on('chkOnOff', (userName) => {
            console.log(checkUserSingle(userName));
            console.log("socket.on chkOnOff : ", userName);
            //socketService.insertUserName(socket, userName); 
            //insertUserName(socket, userName); 
        });        

        //roomId : room
        //msg:전송한 메세지
        //sendUser : 보낸 회원 아이디
        //room_type : 0 - 단체 / 1 - 1대1
        //msg_type : 0 - text / 1 - 사진 / 2-동영상
        //chatUsers : 보낸 회원 제외한 사용자
        socket.on('sendMsg', (roomId, msg, sendUser, room_type, msg_type, chatUsers) => {
            let today = new Date();
            console.log('socket sendMsg : ', roomId, msg, sendUser, room_type, chatUsers);
            //socket.emit('sendMsg', roomId, msg);
            // roomId로 서버에서 메세지 보내기
            io.to(roomId).emit('receiveMessage', roomId, msg, sendUser, msg_type, today.toLocaleString());
            io.to(roomId).emit('receive');
            console.log('socket receiveMessage : ', roomId, msg, sendUser);
            console.log('socket receiveMessage users : ', users);

            let receiveData = {};

            if(room_type === 0){
                chatUsers.forEach(user => {
                    receiveData[user] = { receive_chk: "N" };  
                });
            }else{
                if(chatUsers[0].length < 4){
                    receiveData[chatUsers] = { receive_chk: "N" };
                }else{
                    receiveData[chatUsers[0]] = { receive_chk: "N" };
                }
                
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

    socket.on('image', (roomId, imgBuffer, sendUser, room_type, msg_type, chatUsers, imageName) => {

        if (imgBuffer) {
            const s3 = new S3Client({
                region: process.env.AWS_REGION,  
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                },
            });    
            
            console.log('fileName : ', imageName);

            const fileName = Math.floor(Math.random() * 1000).toString() + Date.now()  + '.' +  imageName.split('.').pop();  // 확장자 .jpg 고정 (필요시 확장자 동적 변경 가능)
            const folderPath = 'chat/'; // S3 내 저장할 폴더 설정 (예: chat/폴더에 저장)
    
            const uploadParams = {
                Bucket: 'placehere-bucket',   // 사용하려는 S3 버킷명
                Key: `${folderPath}${fileName}`,  // 폴더명/파일명 설정
                Body: imgBuffer,  // 이미지 데이터를 Buffer로 받음
            };
    
            // S3에 이미지 업로드
            s3.send(new PutObjectCommand(uploadParams))
                .then(() => {
                    // 업로드가 성공한 후 이미지 URL 생성 (공개 권한을 설정한 경우)
                    const imageUrl = `https://placehere-bucket.s3.amazonaws.com/${folderPath}${fileName}`;
    
                    let today = new Date();
                    io.to(roomId).emit('receiveimage', roomId, imageUrl, sendUser, room_type, msg_type, chatUsers, today.toLocaleString());
                    io.to(roomId).emit('receive');
                    console.log('S3 이미지 업로드 :', imageUrl);

                    let receiveData = {};

                    if(room_type === 0){
                        chatUsers.forEach(user => {
                            receiveData[user] = { receive_chk: "N" };  
                        });
                    }else{
                        receiveData[chatUsers[0]] = { receive_chk: "N" };
                    }
                    
                    const newMessage = {
                        room_id: roomId,
                        msg: fileName,
                        msg_type: msg_type,
                        sender_id: sendUser,
                        receive: receiveData
                    };
                    console.log("msg : ", newMessage);
                    msgService.addMsg(newMessage);                    
                })
                .catch((err) => {
                    console.error('S3 이미지 업로드 :', err);
                });
        }
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

        io.to(users[chatUserNames[0].userName]).socketsJoin(roomId);
        io.to(users[chatUserNames[1].userName]).socketsJoin(roomId);

        console.log(`singleJoinRoom userName : ${chatUserNames[0].userName}, room: ${roomId}`);
        console.log(`singleJoinRoom userName : ${chatUserNames[1].userName}, room: ${roomId}`);      
        
        //io.to(users[chatUserNames[0].userName]).emit('receive');  
        //io.to(users[chatUserNames[1].userName]).emit('receive');  

        console.log('io.sockets.adapter.rooms : \n', io.sockets.adapter.rooms); 
        //console.log('io.sockets.adapter : \n', io.sockets.adapter);
        console.log('after SingleJoinRoom....');
    } else {
        console.error('singlejoin 실패');
    }
};

const insertUserName = (socket, userName) => {
    // socket.id가 이미 users 객체에 존재하는지 확인
    if (!users[socket.id] && !users[userName]) {
        // users 객체에 값이 없으면 추가
        users[socket.id] = userName;  // socket.id와 userName 매핑
        users[userName] = socket.id;  // userName과 socket.id 매핑
        console.log(`insertUserName userName: ${userName}, socket.id: ${socket.id}`);
    } else {
        // 이미 존재하면 콘솔에 메시지 출력
        console.log(`User with socket.id: ${socket.id} or userName: ${userName} already exists.`);
    }
};

const checkUser = (userNames) => {
    console.log('checkUser : \n', userNames, users);
    return userNames.every(userName => users[userName]);
};

const checkUserSingle = (userName) => {
    console.log('checkUserSingle : \n', userName, users);

    if(Array.isArray(userName)){
        console.log('checkUserSingle users : \n', userName, users);
        userName = userName[0];
        console.log('checkUserSingle users : \n', userName, users);
    }
    

    //if (userName === users[userName]) return true;
    //else return false;
    // users 객체를 순회하며 userName과 일치하는 socketId를 찾는다
    for (let socketId in users) {
        if (users[socketId] === userName) {
            // userName이 일치하는 socketId가 있으면 true 반환
            console.log('socketId found: ', socketId);
            return true;
        }
    }

    // 일치하는 값이 없으면 false 반환
    return false;
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
    sendMsgGroup,
    checkUserSingle };
