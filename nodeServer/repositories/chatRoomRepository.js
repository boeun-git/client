const ChatRoom = require('../models/chatRoom');

//채팅방 생성
async function addChatRoom(chatRoomData) {

  console.log('before repository addChatRoom : ', chatRoomData); 

  try {

    // ChatRoom 모델을 사용해 새로운 채팅방 객체 생성
    const chatRoom = new ChatRoom(chatRoomData);

    // 해당 객체를 데이터베이스에 저장하고 저장한 값을 savedChatRoom에 받아오기
    const savedChatRoom = await chatRoom.save();

    console.log('after repository addChatRoom : ', savedChatRoom); // 저장된 채팅방 정보 출력

    return savedChatRoom;

  } catch (err) {

    console.error('Error repository addChatRoom : ', err); // 에러 로그 출력
    throw err; // 에러를 다시 던져서 호출자에게 전달

  }

}

// 채팅방 검색(userName 사용), listChatRoom()도 유사한 듯
async function getChatRoomList(userName) {

  console.log('getChatRoomList :', userName);

  try {

    const chatRoom = await ChatRoom.find({chat_user : userName});

    if (!chatRoom) {

        // 채팅방이 없을 경우
      console.log(`repository getChatRoomList userName : ${userName}`);

    } else {

      // 조회된 채팅방 로그
      console.log('repository getChatRoomList : ', chatRoom); 

    }
    return chatRoom;

  } catch (err) {

    console.error('Error repository getChatRoomList : ', err); // 에러 로그
    throw err;

  }

}


// 특정 채팅방 get (_id를 이용)
async function getChatRoomId(id) {

  console.log('repository getChatRoomId :', id);

  try {

    const chatRoom = await ChatRoom.findById(id);

    if (!chatRoom) {

      console.log(`id : ${id}`);

    } else {

      console.log('repository getChatRoomId : ', chatRoom); 

    }

    return chatRoom;

  } catch (err) {

    console.error('Error repository getChatRoomId : ', err); 
    throw err;

  }
}

// 특정 채팅방 get(chat_userId 이용), checkChatRoom으로도 사용 가능할듯
async function getChatRoomUser(userName, chatUserId) {

  console.log('repository getChatRoomUser : ', userName); // ID로 조회 전 로그

  try {

    // 배열에 두 값이 모두 포함되면 찾음
    const chatRoom = await ChatRoom.findOne({chat_user: { $all: [userName, chatUserId] }});

    if (!chatRoom) {

      console.log(`repository chat_user : ${userName}`); 

    } else {

      console.log('repository getChatRoomUser : ', chatRoom); 

    }

    return chatRoom;

  } catch (err) {

    console.error('Error repository getChatRoomUser : ', err); // 에러 로그
    throw err;

  }
  
}

// 채팅방 삭제 (특정 _id로 삭제)
async function removeChatRoom(id) {
  console.log('repository removeChatRoom :', id);

  try {
    // _id로 채팅방을 찾아 삭제
    const removeChatRoom = await ChatRoom.findByIdAndDelete(id);

    if (!removeChatRoom) {
      console.log(`채팅방이 존재하지 않거나 삭제에 실패했습니다. id: ${id}`);
      return null;
    } else {
      console.log('repository removeChatRoom 성공:', removeChatRoom);
      return removeChatRoom;
    }

  } catch (err) {
    console.error('Error repository removeChatRoom : ', err); 
    throw err;  
  }
}

module.exports = { addChatRoom, getChatRoomList, getChatRoomId, getChatRoomUser, removeChatRoom};
