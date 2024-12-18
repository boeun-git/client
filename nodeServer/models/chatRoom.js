const mongoose = require("mongoose");

// Mongoose 디버깅 활성화
mongoose.set('debug', true);

//채팅방 스키마
const chat_roomSchema = new mongoose.Schema({

    chat_user: [{
        userName: { type: String, required: true },  
        storeName: { type: String, required: false },
        user_type: { type: String, enum: ['ROLE_USER', 'ROLE_STORE'], required: true } 
      }],
    //chat_type : 0 - 단체, 1 - 1대1
    chat_type :{
        type: Number,
        required: true,
        enum: [0, 1]
    },    

}, {collection: 'chat_room'});

//save 전 chat_user를 정렬해서 같은 값이 없게
chat_roomSchema.pre('save', function(next){

    this.chat_user.sort();
    next();
    
});

module.exports = mongoose.model("chat_room", chat_roomSchema);