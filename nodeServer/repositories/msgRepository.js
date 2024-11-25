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
        const msg = await Msg.find({ room_id: roomId });

        if (!msg) {

            console.log(`getChatRoomMsg : ${roomId}`);

        } else {

              console.log('success getChatRoomMsg : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error getChatRoomId : ', err); 
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

module.exports = { addMsg, getChatRoomMsg, checkChatMsg };