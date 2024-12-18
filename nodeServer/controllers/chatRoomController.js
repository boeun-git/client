const chatRoomService = require('../services/chatRoomService');
const msgService = require('../services/msgService');

//채팅방 생성
const addChatRoom = async (req) => {

    console.log("controller addChatRoom req : ", req);
    let room = '';
    //생성 전 room의 여부 확인
    if (req.chat_type === 1){
        room = await chatRoomService.getChatRoomUser(req.chat_user[0].userName, req.chat_user[1].userName);
    }else{
        if (typeof req.chat_user === 'string') {
            req.chat_user = JSON.parse(req.chat_user);
        }
        room = await chatRoomService.getChatRoomUsers(req.chat_user);
    }
    //없다면 채팅방 생성
    if(room === null || room.length === 0){


        console.log("controller addChatRoom add \n", req);   

        const add = await chatRoomService.addChatRoom(req);

        console.log("controller addChatRoom add \n", add);   

        return add;

    }else{
        //있다면 있는 정보 return
        console.log("controller addChatRoom room \n", room);   

        return room;
    }

};


//채팅방 리스트
const getChatRoomList = async (req) => {

    console.log("chatRoomController getChatRoomList : ", req);

    const chatRoomList = await chatRoomService.searchChatRoom(req.trim());
    
    console.log("chatRoomController getChatRoomList : ", chatRoomList);

    const chatRooms = await Promise.all(chatRoomList.map(async (result) => {

        const chatRoomMsg = await msgService.getChatRoomMsg(result._id);
        
        
        //const lastMsg = chatRoomMsg[0] && chatRoomMsg[0].msg ? chatRoomMsg[0].msg : 'No message';
        //msg가 없다면 room삭제
        const lastMsg = chatRoomMsg[0] && chatRoomMsg[0].msg ? chatRoomMsg[0].msg : (chatRoomService.rmChatRoom(result._id));
        //const receiveChk = chatRoomMsg[0] && chatRoomMsg[0].receive?.[result.chat_user]?.receive_chk ? chatRoomMsg[0].receive[result.chat_user].receive_chk : '';
        
        if(chatRoomMsg[0]){
            console.log("chatRoomController chatroomMsg[0]",chatRoomMsg[0]);
        }
        const receiveChk = chatRoomMsg[0]?.receive?.get(req)?.receive_chk || '';

        console.log("lastMsg : ", req, result.chat_user, result.chat_type, result._id, lastMsg, "receive_chk : ", receiveChk);
    
        return {
            userName: result.chat_user,
            chatType: result.chat_type,
            id: result._id,
            msg: lastMsg,
            receiveChk: receiveChk,  // receive_chk 값을 추가
        };

    }));

    return chatRooms;
    
};


//특정 채팅방(userName, chatUserName 사용), 채팅방 검색
const getChatRoomUser = async (userNames) => {

    console.log("controller getChatRoomUser : ", userNames);
    const userName = userNames.split(',')
    console.log("controller getChatRoomUser : ",userName);
    const getChatRoom = await chatRoomService.getChatRoomUser(userName[0].trim(), userName[1].trim());

    const chatRooms = await Promise.all(getChatRoom.map(async (result) => {

        const chatRoomMsg = await msgService.getChatRoomMsg(result._id);
        
        //나중에 msg가 없다면 room삭제하는 것 추가하기
        const lastMsg = chatRoomMsg[0] && chatRoomMsg[0].msg ? chatRoomMsg[0].msg : 'No message';
        console.log("lastMsg : ",result.chat_user,result.chat_type,result._id, lastMsg);

        return {
            userName: result.chat_user,
            id : result._id,
            msg : lastMsg,
            chatType : result.chat_type
        };
    }));


    return chatRooms;

};

//특정 채팅방(_id사용)
const getChatRoomId = async (chatRoomId) => {

    const getChatRoom = await chatRoomService.getChatRoomId(chatRoomId);

    return getChatRoom;

};

const getChatRoomMsg = async(chatRoomId)=>{

    const getMsg = await msgService.getChatRoomMsg(chatRoomId);

    return getMsg;
}

const getChatMsg = async(chatRoomId)=>{

    const getMsg = await msgService.getChatMsg(chatRoomId);

    return getMsg;
}

const checkChatMsgUser = async(userName)=>{

    const getMsg = await msgService.checkChatMsgUser(userName);

    return getMsg;
}


const checkChatMsgId = async(data)=>{
    const roomId = data.roomId;
    const userName = data.userName;
    console.log(roomId, userName);
    const getMsg = await msgService.checkChatMsgId(roomId, userName);

    return getMsg;
}


const sendMsgSingle = async(data)=>{
    //const roomId = data.roomId;
    //const sendUserName = data.sendUserName;
    console.log(data);

    
    
    const getMsg = await msgService.addMsg(data);

    return getMsg;
}

const receiveMsgChk = async(data)=>{

    console.log(data);

    const getMsg = await msgService.receiveMsgChk(data.msgId, data.userName);

    //return getMsg;
}

const receiveMsgAllChk = async(roomId, userName)=>{

    console.log(roomId, userName);

    await msgService.receiveMsgAllChk(roomId, userName);

}

module.exports = { 
    addChatRoom, 
    getChatRoomList, 
    getChatRoomUser, 
    getChatRoomId, 
    getChatRoomMsg, 
    getChatMsg , 
    checkChatMsgUser, 
    checkChatMsgId,
    sendMsgSingle,
    receiveMsgChk,
    receiveMsgAllChk}