const mongoose = require("mongoose");

//채팅방 스키마
const chat_roomSchema = new mongoose.Schema({
    //chat_user는 배열, userName
    chat_user:{ 
        type: [String],
        required: true,
    },
    //chat_type : 0 - "group" 1 - "single"
    chat_type :{
        type: Number,
        required: true,
        enum: [0, 1]
    },    
}, {collection: 'chat_room'});

module.exports = mongoose.model("chat_room", chat_roomSchema);