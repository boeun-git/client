// testChatRoomRepository.js
const chatRoomRepository = require('../repositories/chatRoomRepository');

//chat_room insert
async function testaddChatRoom(){
    try{
        //await chatRoomRepository.addChatRoom({chat_user : ["userId1", "userId3"], chat_type: 1});  // 로그가 찍힐 메서드 호출
        //await chatRoomRepository.addChatRoom({chat_user : ["userId2", "userId3"], chat_type: 1});  // 로그가 찍힐 메서드 호출
        //await chatRoomRepository.addChatRoom({chat_user : ["userId3", "userId4"], chat_type: 1});  // 로그가 찍힐 메서드 호출
    }catch(err){
        console.error('Error in addChatRoom:', err);
    }
}

//testaddChatRoom();

async function testsearchChatRoom() {
    try {
    await chatRoomRepository.searchChatRoom('userId1');  // 로그가 찍힐 메서드 호출
    } catch (err) {
    console.error('Error in testsearchChatRoom:', err);
    }
}

// testsearchChatRoom();

//673f259289c2f2a97ebf438a
//673f52810dee1ee756021d4e
async function testgetChatRoomId() {
    try {
        await chatRoomRepository.getChatRoomId('673f52810dee1ee756021d4e');  // 로그가 찍힐 메서드 호출
    } catch (err) {
    console.error('Error testgetChatRoomId : ', err);
    }
}

//testgetChatRoomId();


async function testgetChatRoomUser() {
    try {
        await chatRoomRepository.getChatRoomUser('userId1', 'userId3');  // 로그가 찍힐 메서드 호출
    } catch (err) {
    console.error('Error getChatRoomUser : ', err);
    }
}

   // testgetChatRoomUser();