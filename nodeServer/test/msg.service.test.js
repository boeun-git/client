const mongoose = require('mongoose');
const msgservice = require('../services/msgService');
const msgRepository = require('../repositories/msgRepository');
require('dotenv').config();

jest.mock('../repositories/msgRepository');

describe('msgService', () => {

    beforeAll(async () => {

        msgRepository.addMsg.mockClear();
        msgRepository.getChatRoomMsg.mockClear();    

        await mongoose.connect(process.env.DB);
        console.log('beforeAll', process.env.DB, process.env.DB_NAME);

    });

    afterAll(async () => {

        await mongoose.disconnect();
        console.log('afterAll');
    });

    
    it('addMsg', async () => {

        const mockData = {
            room_id: '12345', 
            msg: "내용이다",
            msg_type: 0,
            sender_id : "userId1",
            receive:{
                "userId10" :  {receive_chk : "N"}
            }
        };
        const mock = { _id: '12345', ...mockData };
        console.log('mock : ', mock);
        
        msgRepository.addMsg.mockResolvedValue(mock);
        
        const result = await msgservice.addMsg(mockData);
        console.log('result : ', result);
        
        expect(result).toEqual(mock);
        expect(msgRepository.addMsg).toHaveBeenCalledWith(mockData);
    });


    it('getChatRoomMsg', async () => {

        const mockData = {
            room_id: '12345', 
            msg: "내용이다",
            msg_type: 0,
            sender_id : "userId1",
            receive:{
                "userId10" :  {receive_chk : "N"}
            }
        };

        const mock = { _id: '12345', ...mockData };

        console.log('mock : ', mock);

        msgRepository.getChatRoomMsg.mockResolvedValue(mock);

        const result = await msgservice.getChatRoomMsg(mockData);

        console.log('result : ', result);

        expect(result).toEqual(mock);
        expect(msgRepository.getChatRoomMsg).toHaveBeenCalledWith(mockData);
    });

    it('checkChatMsg', async () => {
        const mockData = {
            room_id: '12345', 
            msg: "내용이다",
            msg_type: 0,
            sender_id : "userId1",
            receive:{
                "userId10" :  {receive_chk : "N"}
            }
        };

        const mock = { room_id: '12345', ...mockData };

        console.log('checkChatMsg mock : ', mock);

        msgRepository.checkChatMsg.mockResolvedValue(mock);

        const result = await msgservice.checkChatMsg(mockData);

        console.log('checkChatMsg result : ', result);

        expect(result).toEqual(mock);
        expect(msgRepository.checkChatMsg).toHaveBeenCalledWith(mockData);
    });
});