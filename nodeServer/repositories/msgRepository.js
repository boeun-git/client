const mongoose = require('mongoose');
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
        const msg = await Msg.findOne({ room_id: roomId }).sort({ msg_dt: -1 });

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
    const roomId = new mongoose.Types.ObjectId(chatRoomId);
    
    console.log('getChatMsg : ', chatRoomId);

    try{
        const msg = await Msg.find({ room_id: roomId }).sort({ msg_dt: -1 });

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
async function checkChatMsgId(chatRoomId, userName){
    const roomId = new mongoose.Types.ObjectId(chatRoomId);
    
    console.log('checkChatMsgId : ', chatRoomId, userName);

    try{
        const msg = await Msg.find({
            room_id: roomId,
            [`receive.${userName}.receive_chk`]: 'N'
        });

        if (msg.length === 0) {

            console.log(`checkChatMsgId : ${roomId}`);

        } else {

            console.log('success checkChatMsgId : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error checkChatMsgId : ', err); 
        throw err;

    }

}

//receive_chk가 N인것만 검색
async function checkChatMsgUser(userName){
    const roomId = new mongoose.Types.ObjectId(chatRoomId);
    
    console.log('checkChatMsgUser : ', chatRoomId, userName);

    try{
        const msg = await Msg.find({
            [`receive.${userName}.receive_chk`]: 'N'
        });

        if (msg.length === 0) {

            console.log(`checkChatMsgUser : ${roomId}`);

        } else {

            console.log('success checkChatMsgUser : ', msg); 

        }

        return msg;

    } catch (err) {

        console.error('Error checkChatMsgUser : ', err); 
        throw err;

    }

}

module.exports = { addMsg, getChatRoomMsg, checkChatMsgId, checkChatMsgUser, getChatMsg };