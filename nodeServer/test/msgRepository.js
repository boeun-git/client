// testChatRoomRepository.js
const mongoose = require('mongoose');  // mongoose 모듈을 불러옵니다.

const msgRepository = require('../repositories/msgRepository');

//msg insert
async function testaddMsg(){
    try{
        
        await msgRepository.addMsg({
            room_id: new  mongoose.Types.ObjectId("673f52810dee1ee756021d4e"),
            msg : "메세지내용1",
            msg_type : 0, 
            sender_id : "userId3",
            receive: {
                "userId1": { receive_chk: "N" },
            }
        }); 
 
    }catch(err){
        console.error('Error in testaddMsg:', err);
    }
}

//testaddMsg();

async function testgetChatRoomMsg() {
    try {
    await msgRepository.getChatRoomMsg('673f52810dee1ee756021d4e');  // 로그가 찍힐 메서드 호출
    } catch (err) {
    console.error('Error in testgetChatRoomMsg:', err);
    }
}

testgetChatRoomMsg();
