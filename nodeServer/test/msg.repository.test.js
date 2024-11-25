const mongoose = require('mongoose');
require('dotenv').config();
const msgRepository = require('../repositories/msgRepository');


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

        // //msgRepository.getChatRoomMsg TEST 배열
        // const roomId = new mongoose.Types.ObjectId('673f52810dee1ee756021d4e');
        // const mockUser = { room_id: roomId};
        // const msgResult = await msgRepository.getChatRoomMsg(roomId);
        // console.log('msgResult : ', msgResult[0]);
        // console.log('msgResult : ', msgResult[0].room_id);
        // console.log('mockUser : ', mockUser.room_id);
        // expect(msgResult[0].room_id).toEqual(mockUser.room_id);

        // //msgRepository.addMsg TEST
        // const msg = ({
        //     room_id: new  mongoose.Types.ObjectId("673f52810dee1ee756021d4e"),
        //     msg : "메세지내용내용내용",
        //     msg_type : 0, 
        //     sender_id : "userId1",
        //     receive: {
        //         "userId3": { receive_chk: "N" },
        //     }
        // });         

        // const roomId = new mongoose.Types.ObjectId('673f52810dee1ee756021d4e');
        // const mockUser = { room_id: roomId};
        // const msgResult = await msgRepository.addMsg(msg);
        // console.log('msgResult : ', msgResult);
        // console.log('msgResult : ', msgResult.room_id);
        // console.log('mockUser : ', mockUser.room_id);

        // expect(msgResult.room_id).toEqual(mockUser.room_id);  
    });

});