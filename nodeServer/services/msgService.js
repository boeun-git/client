const msgRepository = require('../repositories/msgRepository');

//메세지 insert , sendChatRoomMsg()
const addMsg = async (data) => {
    return await msgRepository.addMsg(data);
};

//chatRoom의 objectId로 검색
const getChatRoomMsg = async (data) => {
    return await msgRepository.getChatRoomMsg(data);
};

//chatRoom의 objectId, 로그인한 회원의 userName로 검색
const checkChatMsg = async (chatRoomId, userName) => {
    return await msgRepository.checkChatMsg(chatRoomId, userName);
};


module.exports = { addMsg, getChatRoomMsg, checkChatMsg };