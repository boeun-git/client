const chatRoomRepository = require('../repositories/chatRoomRepository');

//채팅방 생성
const addChatRoom = async (data) => {

    console.log("service addChatRoom : ", data);
    return await chatRoomRepository.addChatRoom(data);

};

// 채팅방 검색(userName 사용), listChatRoom()도 유사한 듯
const getChatRoomList = async (userName) => {

    return await chatRoomRepository.getChatRoomList(userName);

};

// 특정 채팅방 get (_id를 이용)
const getChatRoomId = async (id) => {

    return await chatRoomRepository.getChatRoomId(id);

};

// 특정 채팅방 get(chat_userId 이용), checkChatRoom() 
const getChatRoomUser = async (userName, chatUserName) => {

    return await chatRoomRepository.getChatRoomUser(userName, chatUserName);

};

// 특정 채팅방 삭제(_id) 사용 (msg가 없을 경우 수행하도록)
const removeChatRoom = async (id) => {

    return await chatRoomRepository.removeChatRoom(id);

};


module.exports = { addChatRoom, getChatRoomList, getChatRoomId, getChatRoomUser, removeChatRoom }