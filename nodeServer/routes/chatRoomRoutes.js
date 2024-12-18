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
            //console.log("chatRoomRoutes.js /addChatRoom 1:1 chat", data.chat_user[1]);
            console.log("chatRoomRoutes.js /addChatRoom 1:1 chat", data.chat_user[1]);
            console.log("chatRoomRoutes.js /addChatRoom 1:1 chat", data.chat_user[1].userName);
            //if (! socketController.checkUserSingle(data.chat_user[1])) {
                if (! socketController.checkUserSingle(data.chat_user[1].userName)) {
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
        //console.log('addChatRoom.data : ',addChatRoom.data._id);
        //console.log('addChatRoom.data[0] : ',addChatRoom.data[0]);
        //console.log('addChatRoom.data[0]._id : ',addChatRoom.data[0]._id);

        //console.log('addChatRoom.data[0]._id : ',roomId);
        //console.log('roomId.string : ',roomId.toString());\


        if(data.chat_type === 0){
            const roomId = addChatRoom.data._id.toString();
            //group
            console.log("chatRoomRoutes.js /addChatRoom group before :\n", roomId, data.chat_user);
            socketController.groupJoinRoom(roomId, data.chat_user);
            console.log("chatRoomRoutes.js /addChatRoom group after");
        }else{
            console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", addChatRoom, data.chat_user);
            console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", addChatRoom[0], data.chat_user);
            //console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", roomId, data.chat_user);


            if (Array.isArray(addChatRoom) && addChatRoom.length > 0 && addChatRoom[0]._id) {
                // addChatRoom.data가 배열이고 첫 번째 요소에 _id가 존재할 때
                const roomId = addChatRoom[0]._id.toString();
                console.log(roomId);
                console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", roomId, data.chat_user);
                socketController.SingleJoinRoom(roomId, data.chat_user);
                console.log("chatRoomRoutes.js /addChatRoom 1:1 after");                
            } else if (addChatRoom && addChatRoom._id) {
                // addChatRoom.data가 객체이고 _id가 존재할 때
                const roomId = addChatRoom._id.toString();
                console.log(roomId);
                console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", roomId, data.chat_user);
                socketController.SingleJoinRoom(roomId, data.chat_user);
                console.log("chatRoomRoutes.js /addChatRoom 1:1 after");
            } else {
                // 위 조건에 해당하지 않으면
                console.log('Invalid data structure');
            }
            
            // if (addChatRoom.data[0]._id ) {
                
            //     const roomId = addChatRoom.data[0]._id.toString();
            //     console.log(roomId);
            //   } else if(addChatRoom.data._id ) {
            //     const roomId = addChatRoom.data._id.toString();
            //     console.log(roomId);
            //   }else{
            //     const roomId = addChatRoom.data.toString();
            //     console.log(roomId);
            //   }
            
            //1:1
            // console.log("chatRoomRoutes.js /addChatRoom 1:1 before :\n", roomId, data.chat_user);
            // socketController.SingleJoinRoom(roomId, data.chat_user);
            // console.log("chatRoomRoutes.js /addChatRoom 1:1 after");
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

        const { roomId, userName } = req.query;
        console.log("chatRoomRoutes.js getChatMsg : ", roomId, userName);
        const chatRoomMsg = await chatRoomController.getChatMsg(roomId);

        await chatRoomController.receiveMsgAllChk(roomId, userName);

        //접속여부확인하기
        // if (! socketController.checkUser(data.chat_user)) {
        //     res.status(200).json({ data: chatRoomMsg, onoff : "off"});
        //     console.log("error route /addChatRoom : offline", );
        //     return;
        // }        

        //res.status(200).json({ data: chatRoomMsg, onoff : "on" });
        
        
        //console.log("data route /chatRoomList \n", data);
        console.log("chatRooms route /chatRoomList \n", chatRoomMsg);

        return res.status(200).json({ data: chatRoomMsg});

    } catch (error) {

        console.log("error route /chatRoomList \n", error);

        return res.status(500).json({ error: error.message });
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

router.get('/receiveMsgChk', async (req, res) => {

    try {

        const data = req.query;
        console.log("data route /receiveMsgChk \n", data);

        //const receiveMsgChk = await chatRoomController.receiveMsgChk(data);

        await chatRoomController.receiveMsgChk(data);
        res.status(200).json({  });
        
        //console.log("chatRooms route /checkChatMsgId \n", chatRoomMsg);

    } catch (error) {

        res.status(500).json({ error: error.message });
        console.log("error route /chatRoomList \n", error);

    }

});

router.get('/chkMsg', async(req, res) => {

    try{
        const { roomId, userName } = req.query;

        await  chatRoomController.receiveMsgAllChk(roomId, userName);

    }catch(error){

        res.status(500).json({ error: error.message });
        console.log("error route /chkMsg \n", error);

    }
});



module.exports = router;
