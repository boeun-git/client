const mongoose = require("mongoose");

//메세지 스키마
const msgSchema = new mongoose.Schema({

    room_id: {
        type:mongoose.Schema.ObjectId,
        //참조하는 스키마(?)의 이름
        ref:"chatRoom", 
    },
    msg:{ 
        type: String,
    },
    img:{ 
        type: String,
    },
    video:{ 
        type: String,
    },
    //0: 텍스트, 1: 이미지, 2: 동영상
    msg_type:{ 
        type: Number,
        required: true,
        enum: [0, 1, 2]
    },
    msg_dt :  {
        type: Date,
        default: Date.now
    },
    sender_id :{
        type: String,
        required: true
    },
    receive:{
        type: Map,
        of : {
            receive_chk: {type : String, enum: ['Y', 'N']}
        },
        required: true
    }
    
}, {collection: 'msg'});

module.exports = mongoose.model("msg", msgSchema);