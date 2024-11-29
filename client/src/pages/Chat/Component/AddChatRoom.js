import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AddChatRoom = () => {
    const [chatRoomAdd, setChatRoomAdd] = useState([]);
    
    useEffect(() => {
        // POST 요청
        axios.post('http://localhost:3001/api/addChatRoom', {
            //나중에 userName, 채팅할 회원 아이디로 수정
            chat_user: ['userId1', 'userId9'],
            //chat_user: ['userId1', 'userId3'],
            //0:단체, 1: 1대1
            chat_type: 1,
        })
        .then((response) => {
            // 서버로부터 받은 데이터 처리
            setChatRoomAdd(response.data.data);
            console.log('addChatRoom.js : ', response.data.data);
        })
        .catch((error) => {
            console.error('Error addChatRoom.js : ', error);
        });
    }, []);

    return (
        <div>
            <h2>채팅방 추가 test</h2>
            <p>{chatRoomAdd.chat_user} - {chatRoomAdd.chat_type}</p>
    
        </div>
    );
};

export default AddChatRoom;