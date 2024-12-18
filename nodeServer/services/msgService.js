const msgRepository = require('../repositories/msgRepository');

//메세지 insert , sendChatRoomMsg()
const addMsg = async (data) => {
    return await msgRepository.addMsg(data);
};

//chatRoom의 objectId로 검색, 마지막 메세지만
const getChatRoomMsg = async (data) => {
    return await msgRepository.getChatRoomMsg(data);
};

//chatRoom의 objectId로 검색, 전체 메세지
const getChatMsg = async (data) => {
    console.log('msgService.js getChatMsg : ',data);
    return await msgRepository.getChatMsg(data);
};

//chatRoom의 objectId, 로그인한 회원의 userName로 검색
const checkChatMsg = async (chatRoomId, userName) => {
    return await msgRepository.checkChatMsg(chatRoomId, userName);
};

const receiveUserName = async (roomId) => {
    return await msgRepository.receiveUserName(roomId);
}

//msgId = ObjectId, userName = 수신한 회원 아이디?
const receiveMsgChk = async (msgId, userName) => {
    return await msgRepository.receiveMsgChk(msgId, userName);
}

//roomId = ObjectId, userName = 수신한 회원 아이디?
const receiveMsgAllChk = async (roomId, userName) => {
    return await msgRepository.receiveMsgAllChk(roomId, userName);
}

module.exports = { 
    addMsg, 
    getChatRoomMsg, 
    checkChatMsg, 
    getChatMsg, 
    receiveUserName, 
    receiveMsgChk, 
    receiveMsgAllChk };