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
    return await msgRepository.getChatMsg(data);
};

//chatRoom의 objectId, 로그인한 회원의 userName로 find
const checkChatMsgId = async (chatRoomId, userName) => {
    return await msgRepository.checkChatMsgId(chatRoomId, userName);
};

//로그인한 회원의 userName로 N인 것만 find
const checkChatMsgUser = async (userName) => {
    return await msgRepository.checkChatMsgUser(userName);
};


module.exports = { addMsg, getChatRoomMsg, checkChatMsgId, checkChatMsgUser,getChatMsg };