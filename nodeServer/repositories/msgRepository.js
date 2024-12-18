const mongoose = require('mongoose');  // mongoose 모듈을 불러옵니다.

const Msg = require('../models/msg');

async function addMsg(messageData){
    
    console.log('addMsg : ', messageData);

    try{

        const msg = new Msg(messageData);

        const savedmsg = await msg.save();

        console.log('addMsg : ', savedmsg);

        return savedmsg;

    }catch(err){
        
        console.error('Error addMsg : ', err);
        throw err;

    }

}

//chatRoom의 objectId로 검색
async function getChatRoomMsg(chatRoomId){
    const roomId = new mongoose.Types.ObjectId(chatRoomId);
    
    console.log('getChatRoomMsg : ', chatRoomId);

    try{
        const msg = await Msg.find({ room_id: roomId }).sort({ msg_dt: -1 }).limit(1);

        if (!msg) {

            console.log(`getChatRoomMsg : ${roomId}`);

        } else {

              console.log('success getChatRoomMsg : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error getChatRoomMsg : ', err); 
        throw err;

    }

}


//chatRoom의 objectId로 검색
async function getChatMsg(chatRoomId){
    //const roomId = new mongoose.Types.ObjectId(chatRoomId);
    console.log("getChatMsg//////////////" );
    console.log("chatRoomId:", chatRoomId);
    if (!mongoose.Types.ObjectId.isValid(chatRoomId)) {
      throw new Error('Invalid ObjectId format');
    }
    const roomId = new mongoose.Types.ObjectId(chatRoomId);

    console.log('getChatMsg : ', chatRoomId);

    try{
        //오래된 메세지 순으로
        const msg = await Msg.find({ room_id: roomId }).sort({ msg_dt: 1 });

        if (!msg) {

            console.log(`getChatMsg : ${roomId}`);

        } else {

              console.log('success getChatMsg : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error getChatRoomMsg : ', err); 
        throw err;

    }

}

//chatRoom의 objectId로 검색
//async function checkChatMsg(chatRoomId, userName){
//    const roomId = new mongoose.Types.ObjectId(chatRoomId);
//    
//    console.log('checkChatMsg : ', chatRoomId, userName);
//
//    try{
//        const msg = await Msg.find({
//            room_id: roomId,
//            [`receive.${userName}.receive_chk`]: 'N'
//        });
//
//        if (!msg) {
//
//            console.log(`checkChatMsg : ${roomId}`);
//
//        } else {
//
//              console.log('success checkChatMsg : ', msg); 
//
//        }
//
//        return msg;
//
//    } catch (err) {
//
//        console.error('Error checkChatMsg : ', err); 
//        throw err;
//
//    }
//
//}

//chatRoom의 objectId로 검색
async function checkChatMsg(chatRoomId, userName){
    const roomId = new mongoose.Types.ObjectId(chatRoomId);
    
    console.log('checkChatMsg : ', chatRoomId, userName);

    try{
        const msg = await Msg.find({
            room_id: roomId,
            [`receive.${userName}.receive_chk`]: 'N'
        });

        if (msg.length === 0) {

            console.log(`checkChatMsg : ${roomId}`);

        } else {

            console.log('success checkChatMsg : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error checkChatMsg : ', err); 
        throw err;

    }

}

async function receiveUserName (roomId) {
    try{
        const userName = await Msgaggregate([
            {
              $match: {
                room_id: ObjectId(roomId)  // 특정 room_id를 필터링
              }
            },
            {
              $project: {
                userIds: { $objectToArray: "$receive" }  // 'receive' 필드를 배열로 변환
              }
            },
            {
              $unwind: "$userIds"  // 'receive' 배열을 펼쳐서 각 userId마다 하나씩 반환
            },
            {
              $project: {
                userId: "$userIds.k"  // 'userIds'에서 key 값(즉, userId)을 추출
              }
            }
          ])

        return userName;  
    } catch(error){
        console.log('msgRepository receiveUserName error \n', error);
    }
}

// 메시지를 읽었다고 표시하는 함수
async function receiveMsgChk (messageId, userId) {
    try{
        const msgUpdate = await Msg.updateOne(
            { _id: messageId },
            { $set: { [`receive.${userId}.receive_chk`]: 'Y' } }, // 해당 사용자의 receive_chk 값을 'Y'로 업데이트
            (err, result) => {
                if (err) {
                console.log("receiveMsgChk err :", err);
                } else {
                console.log("receiveMsgChk :", result);
                }
            }
        );
    } catch(error){
        console.log('msgRepository receiveUserName error \n', error);
    }
}

// 메시지를 읽었다고 표시하는 함수 (한번에)
async function receiveMsgAllChk(roomId, userId) {
    try {

        console.log("메시지 읽기 업데이트 :", roomId, userId);
        const objectId = new mongoose.Types.ObjectId(roomId);
        // 해당 roomId에 해당하는 모든 문서의 'receive_chk' 값을 'Y'로 변경
        const msgUpdate = await Msg.updateMany(
        { 
            room_id: objectId,
            [`receive.${userId}.receive_chk`]: 'N' 
        },
        { 
          '$set': { [`receive.${userId}.receive_chk`]: 'Y' } 
        }
        );

        console.log("메시지 읽기 업데이트 성공:", msgUpdate);
    } catch (error) {
        console.log('msgRepository receiveMsgChk error \n', error);
    }
}


module.exports = { 
    addMsg, 
    getChatRoomMsg, 
    checkChatMsg, 
    getChatMsg, 
    receiveUserName,
    receiveMsgChk,
    receiveMsgAllChk};