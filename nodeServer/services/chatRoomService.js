const chatRoomRepository = require('../repositories/chatRoomRepository');

//채팅방 생성
const addChatRoom = async (data) => {
    return await chatRoomRepository.addChatRoom(data);
};

// 채팅방 검색(userName 사용), listChatRoom()도 유사한 듯
const searchChatRoom = async (data) => {
    return await chatRoomRepository.searchChatRoom(data);
};

// 특정 채팅방 get (_id를 이용)
const getChatRoomId = async (data) => {
    return await chatRoomRepository.getChatRoomId(data);
};

// 특정 채팅방 get(chat_userId 이용), checkChatRoom() 
const getChatRoomUser = async (data) => {
    return await chatRoomRepository.getChatRoomUser(data);
};


module.exports = { addChatRoom, searchChatRoom, getChatRoomId, getChatRoomUser, checkChatRoom }