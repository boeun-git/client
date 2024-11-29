import { useEffect, useState } from 'react';
import axios from 'axios';

const ListChatRoom = () => {
    const [chatRooms, setChatRooms] = useState([]);
    
    useEffect(() => {
        // API 요청
        axios.get('http://localhost:3001/api/chatRoomList', {
            // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
            params: { data: 'userId3' }  
        })
        .then((response) => {
            // 서버로부터 받은 데이터 처리
            setChatRooms(response.data.data);
        })
        .catch((error) => {
            console.error('Error ChatRoomList.js : ', error);
        });
    }, []);

    return (
        <div>
            <h2>채팅방 리스트 test</h2>
            {chatRooms.map((room, index) => (
                <div key={index}>
                    <p>{room.userName} - {room.chatType}</p>
                </div>
            ))}
        </div>
    );
};

export default ListChatRoom;
