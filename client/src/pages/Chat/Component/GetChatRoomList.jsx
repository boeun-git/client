import { useEffect, useState } from 'react';
import axios from 'axios';

const ListChatRoom = ({onRoomSelect, onRoomType, onRoomUser}) => {
    const [chatRooms, setChatRooms] = useState([]);

    //const [chatUsers, setChatUsers] = useState([]);

    //const [userName, setUserName] = useState([]);
    const userName = 'userId3';

    //const userName = 'userId88';
    useEffect(() => {
        // API 요청
        axios.get('http://localhost:3001/api/getChatRoomList', {
            // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
            params: { data:  userName}  
        })
        .then((response) => {
            // 서버로부터 받은 데이터 처리
            setChatRooms(response.data.data);
            
            console.log('response : ', response);
        })
        .catch((error) => {
            console.error('Error getChatRoomList.js : ', error);
        });
    }, []);

    // return (
    //     <div>
    //         <h2>{userName} 채팅방 리스트</h2>
    //         {chatRooms.map((room, index) => (


    //             <div key={index} onClick={() => {onRoomSelect(room.id); onRoomType(room.chatType); onRoomUser(filteredUserNames);}}>
    //                 <p>{room.id} : {room.userName} - {room.chatType}, 최근 메시지 : {room.msg} , {room.userName}, {chatUsers}</p>
    //             </div>

    //         ))}
    //     </div>
    // );

    return (
        <div>
        {/*<div style={{border:'1px black solid'}}>*/}
            <h5>{userName}의 채팅방 리스트</h5>
            {
                chatRooms.length === 0 ? (
                        <b>채팅한 내역이 없습니다.</b>
                ) : (
                    chatRooms.map((room, index) => {
                        // userName을 제외한 배열을 만들기
                        const chatUsers = room.userName.filter(name => name !== userName);

                        return (
                            <div key={index} onClick={() => {onRoomSelect(room.id); onRoomType(room.chatType); onRoomUser(chatUsers);}}>
                                <p>
                                    <b>{chatUsers.join(',')}</b> 
                                    <br/>
                                    {room.msg} 
                                </p>
                            </div>
                        );
                    })
                )
            }
        </div>
    );    
};

export default ListChatRoom;
