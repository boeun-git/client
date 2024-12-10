// routes/chatRoomRoutes.js
const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');
const socketController = require('../controllers/socketController');
// socket.io 인스턴스를 여기서 가져옵니다
//const { io } = require('../utils/socket');  // io 객체를 가져오는 방식에 따라 수정

// 채팅방 생성 
router.post('/addChatRoom', async(req, res) => {

    try {

        const data = req.body;
        console.log("data route /addChatRoom \n", data);

        if(data.chat_type === 1){
            console.log("chatRoomRoutes.js /addChatRoom 1:1 chat");
            if (! socketController.checkUserSingle(data.chat_user[1])) {
                res.status(500).json({data :  "offline"});
                console.log("error route /addChatRoom : offline", );
                return;
            }
        }else{
            if (! socketController.checkUser(data.chat_user)) {
                res.status(500).json({data :  "offline"});
                console.log("error route /addChatRoom : offline", );
                return;
            }
        }
        //접속여부확인하기
        

        const addChatRoom = await chatRoomController.addChatRoom(data);

//        const roomId = addChatRoom.data._id;
        console.log('addChatRoom : ',addChatRoom);
        console.log('addChatRoom.data : ',addChatRoom.data);
        console.log('addChatRoom.data : ',addChatRoom.data._id);
        //console.log('addChatRoom.data[0] : ',addChatRoom.data[0]);
        //console.log('addChatRoom.data[0]._id : ',addChatRoom.data[0]._id);

        //console.log('addChatRoom.data[0]._id : ',roomId);
        //console.log('roomId.string : ',roomId.toString());

        if(data.chat_type === 0){
            const roomId = addChatRoom.data._id.toString();
            //group
            console.log("chatRoomRoutes.js /addChatRoom group before :\n", roomId, data.chat_user);
            socketController.groupJoinRoom(roomId, data.chat_user);
            console.log("chatRoomRoutes.js /addChatRoom group after");
        }else{
            const roomId = addChatRoom.data[0]._id.toString();
            //1:1
            console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", roomId, data.chat_user);
            socketController.SingleJoinRoom(roomId, data.chat_user);
            console.log("chatRoomRoutes.js /addChatRoom 1:1 after");
        }
    
        res.status(200).json({data: addChatRoom});

    } catch (error) {

        res.status(500).json({error :  error.message});
        console.log("error route /addChatRoom \n", error);

    }

});


// 채팅방 리스트 (userName의 채팅방 리스트)
router.get('/getChatRoomList', async (req, res) => {

    try {

        const { data } = req.query;
        console.log("data route /getChatRoomList \n", data);

        const chatRooms = await chatRoomController.getChatRoomList(data);
        console.log("chatRooms route /getChatRoomList \n", chatRooms);

        res.status(200).json({ data: chatRooms });

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /getChatRoomList \n", error);

    }

});

// 채팅방 검색 (userName, chatUserName) userName은 로그인 회원, chatUserName은 검색한 회원?
router.get('/searchChatRoom', async (req, res) => {

    try {

        const { data } = req.query;
        console.log("data route /searchChatRoom \n : ", data);

        const chatRooms = await chatRoomController.getChatRoomUser(data);
        console.log("chatRooms route /searchChatRoom \n", chatRooms);

        res.status(200).json({ data: chatRooms });

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /searchChatRoom \n", error);

    }

});


// 특정 채팅방 정보 (userName, chatUserName)
router.get('/getChatRoomUser', async (req, res) => {

    try {

        const { data } = req.query;
        console.log("data route /getChatRoomUser \n : ", data);

        const chatRooms = await chatRoomController.getChatRoomUser(data);
        console.log("chatRooms route /getChatRoomUser \n", chatRooms);

        res.status(200).json({ data: chatRooms });

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /getChatRoomUser \n", error);

    }

});


// 특정 채팅방 정보 (_id)
router.get('/getChatRoomId', async (req, res) => {

    try {

        const { data } = req.query;
        console.log("data route /getChatRoomId \n", data);

        const chatRooms = await chatRoomController.getChatRoomId(data);
        console.log("chatRooms route /getChatRoomId \n", chatRooms);

        res.status(200).json({ data: chatRooms });

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /chatRoomList \n", error);

    }

});


// 특정 채팅방의 마지막 메세지(_id)
router.get('/getChatRoomMsg', async (req, res) => {

    try {

        const { data } = req.query;
        console.log("data route /getChatRoomMsg \n", data);

        const chatRoomMsg = await chatRoomController.getChatRoomMsg(data);
        console.log("chatRoomMsg route /getChatRoomMsg \n", chatRoomMsg);

        res.status(200).json({ data: chatRoomMsg });

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /getChatRoomMsg \n", error);

    }

});


// 특정 채팅방 메세지 전체 (_id)
router.get('/getChatMsg', async (req, res) => {

    try {

        const { data } = req.query;
        const chatRoomMsg = await chatRoomController.getChatMsg(data);

        //접속여부확인하기
        // if (! socketController.checkUser(data.chat_user)) {
        //     res.status(200).json({ data: chatRoomMsg, onoff : "off"});
        //     console.log("error route /addChatRoom : offline", );
        //     return;
        // }        

        //res.status(200).json({ data: chatRoomMsg, onoff : "on" });
        res.status(200).json({ data: chatRoomMsg});

        console.log("data route /chatRoomList \n", data);
        console.log("chatRooms route /chatRoomList \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /chatRoomList \n", error);

    }

});


// receiveChk가 N 확인??(userName)
router.get('/checkChatMsgUser', async (req, res) => {

    try {

        const { data } = req.query;
        const chatRoomMsg = await chatRoomController.checkChatMsgUser(data);

        res.status(200).json({ data: chatRoomMsg });

        console.log("data route /checkChatMsgUser \n", data);
        console.log("chatRooms route /checkChatMsgUser \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /checkChatMsgUser \n", error);

    }

});


// receiveChk가 N 확인??(_id)
router.get('/checkChatMsgId', async (req, res) => {

    try {

        const data = req.query;
        //console.log("data route /checkChatMsgId \n", roomId);
        const chatRoomMsg = await chatRoomController.checkChatMsgId(data);

        res.status(200).json({ data: chatRoomMsg });

        
        console.log("chatRooms route /checkChatMsgId \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /chatRoomList \n", error);

    }

});


// send 1:1
router.post('/sendMsgSingle', async (req, res) => {

    try {

        const data = req.body;
        console.log("data route /sendMsgSingle \n", data.roomId);

        const sendMsg = await socketController.sendMsgSingle(data);
        //const chatRoomMsg = await chatRoomController.checkChatMsgId(data);
        //const chatRoomMsg = await chatRoomController.sendMsgSingle(data);

        res.status(200).json({ data: chatRoomMsg });

        console.log("chatRooms route /sendMsgSingle \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /sendMsgSingle \n", error);

    }

});


// send Group
router.get('/sendMsgGroup', async (req, res) => {

    try {

        const data = req.query;
        console.log("data route /checkChatMsgId \n", roomId);
        const chatRoomMsg = await chatRoomController.checkChatMsgId(data);

        res.status(200).json({ data: chatRoomMsg });

        
        console.log("chatRooms route /checkChatMsgId \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /chatRoomList \n", error);

    }

});

module.exports = router;
