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
async function searchChatRoom(userName) {

  console.log('searchChatRoom :', userName);

  try {

    //const chatRoom = await ChatRoom.find({chat_user : userName});
    const chatRoom = await ChatRoom.find({"chat_user.userName": userName});

    if (!chatRoom) {

        // 채팅방이 없을 경우
      console.log(`repository userName : ${userName}`);

    } else {

      // 조회된 채팅방 로그
      console.log('repository searchChatRoom : ', chatRoom); 

    }
    return chatRoom;

  } catch (err) {

    console.error('Error repository searchChatRoom : ', err); // 에러 로그
    throw err;

  }

}


// 특정 채팅방 get (_id를 이용)
async function getChatRoomId(id) {

  console.log('repository getChatRoomId :', id);

  try {

    const chatRoom = await ChatRoom.findById(id);

    if (!chatRoom) {

      console.log(`repository getChatRoomId id : ${id}`);

    } else {

      console.log('repository getChatRoomId : ', chatRoom); 

    }

    return chatRoom;

  } catch (err) {

    console.error('repository getChatRoomId err : ', err); 
    throw err;

  }
}

// 특정 채팅방 get(chat_userId 이용)
async function getChatRoomUser(username, chatUserId) {

  console.log('repository getChatRoomUser : ', username, chatUserId); // ID로 조회 전 로그

  if(Array.isArray(chatUserId)){
    console.log('checkUserSingle users : \n', username, chatUserId);
    chatUserId = chatUserId[0];
    console.log('checkUserSingle users : \n', username, chatUserId);
  }

  try {

    const chatRoom = await ChatRoom.find({chat_user: { $all: [userName, chatUserId] }, chat_type : 1});
  //   const chatRoom = await ChatRoom.find({
  //     chat_user: {
  //       $elemMatch: { userName: username }  
  //     },
  //     chat_type: 1
  //   }).then((rooms) => {
     
  //     return rooms.filter(room => {
  //         return room.chat_user.some(user => 
  //             user.userName.includes(chatUserId) || user.storeName.includes(chatUserId)
  //         );
  //     });
  // });
                            
    if (!chatRoom) {

      console.log(`repository getChatRoomUser userName : ${username}`); 

    } else {

      console.log('repository getChatRoomUser : ', chatRoom); 

    }

    return chatRoom;

  } catch (err) {

    console.error('Error repository getChatRoomUser : ', err); // 에러 로그
    throw err;

  }
  
}

// 특정 채팅방 get(chat_userId 이용)
async function getChatRoomUsers(chatUserId) {

  console.log('repository getChatRoomUsers : ', chatUserId); // ID로 조회 전 로그

  try {

    
    //const chatRoom = await ChatRoom.findOne({chat_user: { $all: chatUserId }, chat_type: 0});
    const chatRoom = await ChatRoom.find(
      {
        chat_user: 
        { 
          // chatUserId 배열을 순회하면서 $elemMatch로 각 userName을 찾음
          $all: chatUserId.map(user => ({ $elemMatch: { userName: user } })) 
        }, 
        chat_type : 0
      });    

    if (!chatRoom) {

      console.log(`repository getChatRoomUsers chat_user : ${chatUserId}`); 

    } else {

      console.log('repository getChatRoomUsers : ', chatRoom); 

    }

    return chatRoom;

  } catch (err) {

    console.error('Error repository getChatRoomUsers : ', err); // 에러 로그
    throw err;

  }
  
}

// 특정 채팅방 delete(_id 이용)
async function rmChatRoom(id) {
  try{
    
    const deletedChatRoom = await ChatRoom.findByIdAndDelete(id);
    
    console.log('repository rmChatRoom : ', deletedChatRoom);

  }catch(err){
    console.error('Error repository rmChatRoom : ', err); // 에러 로그
    throw err;
  }
  
}

module.exports = { addChatRoom, searchChatRoom, getChatRoomId, getChatRoomUser, getChatRoomUsers, rmChatRoom};
