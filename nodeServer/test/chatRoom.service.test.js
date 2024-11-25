const mongoose = require('mongoose');
const chatRoomservice = require('../services/chatRoomService');
const chatRoomRepository = require('../repositories/chatRoomRepository');
require('dotenv').config();

jest.mock('../repositories/chatRoomRepository');

describe('chatRoomService', () => {

    beforeAll(async () => {

        chatRoomRepository.addChatRoom.mockClear();
        chatRoomRepository.getChatRoomUser.mockClear();    

        await mongoose.connect(process.env.DB);
        console.log('beforeAll', process.env.DB, process.env.DB_NAME);

    });

    afterAll(async () => {

        await mongoose.disconnect();
        console.log('afterAll');
    });


    it('addChatRoom', async () => {

        const mockData = { chat_user: ['userId1', 'userId10'], chat_type: 1 };
        const mock = { _id: '12345', ...mockData };
        console.log('addChatRoom mock : ', mock);
        
        chatRoomRepository.addChatRoom.mockResolvedValue(mock);
        
        const result = await chatRoomservice.addChatRoom(mockData);
        console.log('addChatRoom result : ', result);
        
        expect(result).toEqual(mock);
        expect(chatRoomRepository.addChatRoom).toHaveBeenCalledWith(mockData);
    });


    it('getChatRoomUser', async () => {

        const mockData = { chat_user: ['userId1', 'userId9'], chat_type: 1 };
        const mock = 'userId9';
        console.log('getChatRoomUser mock : ', mock);

        chatRoomRepository.getChatRoomUser.mockResolvedValue(mock);

        const result = await chatRoomservice.getChatRoomUser(mockData);
        console.log('getChatRoomUser result : ', result);

        expect(result).toEqual(mock);
        expect(chatRoomRepository.getChatRoomUser).toHaveBeenCalledWith(mockData);
    });

    it('getChatRoomId', async () => {

        const mockData = { _id: '12345', chat_user: ['userId1', 'userId9'], chat_type: 1 };
        const mock = '12345';
        console.log('getChatRoomId mock : ', mock);

        chatRoomRepository.getChatRoomId.mockResolvedValue(mock);

        const result = await chatRoomservice.getChatRoomId(mockData);
        console.log('getChatRoomId result : ', result);

        expect(result).toEqual(mock);
        expect(chatRoomRepository.getChatRoomId).toHaveBeenCalledWith(mockData);
    });

    it('searchChatRoom', async () => {

        const mockData = { chat_user: ['userId1', 'userId9'], chat_type: 1 };
        const mock = 'userId9';
        console.log('searchChatRoom mock : ', mock);

        chatRoomRepository.searchChatRoom.mockResolvedValue(mock);

        const result = await chatRoomservice.searchChatRoom(mockData);
        console.log('searchChatRoom result : ', result);

        expect(result).toEqual(mock);
        expect(chatRoomRepository.searchChatRoom).toHaveBeenCalledWith(mockData);
    });    
});