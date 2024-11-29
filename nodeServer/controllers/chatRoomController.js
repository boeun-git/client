const chatRoomService = require('../services/chatRoomService');
const msgService = require('../services/msgService');

//채팅방 생성
const addChatRoom = async (req) => {

    console.log("controller addChatRoom req : ", req);

    //생성 전 room의 여부 확인
    const room = await chatRoomController.getChatRoomUser(req.chat_user[0], req.chat_user[1]);

    //없다면 채팅방 생성
    if(room === null){

        const add = await chatRoomService.addChatRoom(req);

        console.log("controllser addChatRoom add \n", add);   

        return {data: add}

    }else{
        //있다면 있는 정보 return
        console.log("controllser addChatRoom room \n", room);   
        return {data:room}
    }

};


//채팅방 리스트
const getChatRoomList = async (req) => {

    const chatRoomList = await chatRoomService.getChatRoomList(req);

    const chatRooms = await Promise.all(chatRoomList.map(async (result) => {

        const chatRoomMsg = await msgService.getChatRoomMsg(result._id);
        
        //나중에 msg가 없다면 room삭제하는 것 추가하기
        const lastMsg = chatRoomMsg && chatRoomMsg.msg ? chatRoomMsg.msg : 'No message';
        console.log(result.chat_user,result.chat_type,result._id, lastMsg);

        return {
            userName: result.chat_user,
            chatType: result.chat_type,
            id : result._id,
            msg : lastMsg,
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

    return getChatRoom;

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


module.exports = { addChatRoom, getChatRoomList, getChatRoomUser, getChatRoomId, getChatRoomMsg, getChatMsg , checkChatMsgUser, checkChatMsgId}