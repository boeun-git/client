const mongoose = require('mongoose');
require('dotenv').config();
const chatRoomRepository = require('../repositories/chatRoomRepository');


describe('findId', () => {

  beforeAll(async () => {

    await mongoose.connect(process.env.DB);
    console.log('beforeAll', process.env.DB, process.env.DB_NAME);

});

  afterAll(async () => {

    await mongoose.disconnect();
    console.log('afterAll');

});

  it('should insert a doc into collection', async () => {

    //chatRoomRepository.getChatRoomId TEST
    const roomId = new mongoose.Types.ObjectId('673f251137797b74c12d761e');
    const mockUser = { _id: roomId};
    const chatRoomResult = await chatRoomRepository.getChatRoomId(roomId);
    console.log('chatRoomResult : ', chatRoomResult);
    console.log('chatRoomResult : ', chatRoomResult._id);
    console.log('mockUser : ', mockUser._id);
    expect(chatRoomResult._id).toEqual(mockUser._id);

    // //chatRoomRepository.searchChatRoom TEST 배열
    // const searchroomId = new mongoose.Types.ObjectId('673f259289c2f2a97ebf438a');
    // const userName = 'userId3';
    // const mockRoomId = { _id: searchroomId};
    // const searchChatRoomResult = await chatRoomRepository.searchChatRoom(userName);
    // console.log('searchChatRoomResult : ', searchChatRoomResult[0]._id);
    // console.log('mockUser : ', mockRoomId._id);
    // expect(searchChatRoomResult[0]._id).toEqual(mockRoomId._id);     

    
//      chatRoomRepository.addChatRoom
//      const searchroomId = new mongoose.Types.ObjectId('673f259289c2f2a97ebf438a');
//      const userNames = ['userId3', 'userId7'];
//      const mockRoomId = { chat_user: userNames};
//      const addChatRoomResult = await chatRoomRepository.addChatRoom({
//          chat_user: userNames,
//          chat_type: 1,
//      });
//      console.log('addChatRoomResult : ', addChatRoomResult.chat_user);
//      console.log('mockUser : ', mockRoomId.chat_user);
//      expect(addChatRoomResult.chat_user).toEqual(mockRoomId.chat_user);    
    });

});