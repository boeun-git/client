const chatRoomRepository = require('../repositories/chatRoomRepository');

//채팅방 생성
const addChatRoom = async (data) => {
    //const chatRoom = await chatRoomRepository.addChatRoom(data);
    //return chatRoom;
    console.log("service addChatRoom : ", data);
    return await chatRoomRepository.addChatRoom(data);
};

// 채팅방 검색(userName 사용), listChatRoom()도 유사한 듯
const searchChatRoom = async (userName) => {
    return await chatRoomRepository.searchChatRoom(userName);
};

// 특정 채팅방 get (_id를 이용)
const getChatRoomId = async (id) => {
    return await chatRoomRepository.getChatRoomId(id);
};

// 특정 채팅방 get(chat_userId 이용), checkChatRoom() 
const getChatRoomUser = async (userName, chatUserName) => {
    return await chatRoomRepository.getChatRoomUser(userName, chatUserName);
};


// 특정 채팅방 get(chat_userId 이용), checkChatRoom() 
const getChatRoomUsers = async (chatUserNames) => {
    return await chatRoomRepository.getChatRoomUsers(chatUserNames);
};

// 특정 채팅방 rm(_id 이용) 
const rmChatRoom = async (id) => {
    return await chatRoomRepository.rmChatRoom(id);
};

module.exports = {
    addChatRoom, 
    searchChatRoom, 
    getChatRoomId, 
    getChatRoomUser, 
    getChatRoomUsers, 
    rmChatRoom }