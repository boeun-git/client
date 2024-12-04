import React, { useState, useEffect } from 'react';
import { useSocket } from '../Socket';
import axios from 'axios';
//import io from 'socket.io-client';

// 서버 URL 설정
//const socket = io('http://localhost:3001');
/*
// 서버 URL 설정
const socket = io('http://localhost:3001', {
    // 서버 연결 시 userName 전달
    query: { userName: 로그인된 사용자 ID }  
});
 */

const SendChatMsg = ({roomId, userName, type, users}) => {
    const socket = useSocket();
    const [room, setRoom] = useState('');
   // const [userName, setUserName] = useState('');
    const [chatUserName, setChatUserName] = useState([]);
    const [msg, setMsg] = useState('');
    const [receiveMsg, setReceiveMsg] = useState([]);
    const [preReceiveMsg, setPreReceiveMsg] = useState([]);
    //const [receivedMessage, setReceivedMessage] = useState('');
    
    useEffect(() => {
        // API 요청
        axios.get('http://localhost:3001/api/getChatMsg', {
            // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
            params: { data:  roomId}  
        })
        .then((response) => {
            // 서버로부터 받은 데이터 처리
            setPreReceiveMsg(response.data.data);
        
            console.log('response : ', response);
            console.log('response.data : ', response.data);
            console.log('response.data.data : ', response.data.data);
            console.log('response.data.data[0] : ', response.data.data[0]);
            console.log('preReceiveMsg : ', preReceiveMsg);

        })
        .catch((error) => {
            console.error('Error getChatRoomList.js : ', error);
        });
    }, [roomId]);


    useEffect(() => {
        // roomId가 변경될 때마다 메시지와 채팅 사용자 이름 초기화
        setReceiveMsg([]);
        setChatUserName([]);

    }, [roomId]); // roomId가 변경될 때마다 실행됨

    
    useEffect(() => {
        if (socket) {

            // 메시지 수신 이벤트
            socket.on('receiveMessage', (room, msg, chatUserName) => {
                setRoom(room);
                setChatUserName((prevChatUserName) => [...prevChatUserName, chatUserName]);
                console.log("receiveMessage: " ,msg, chatUserName);
                setReceiveMsg((prevMsg) => [...prevMsg, msg]);
            });
        }

    }, [socket]); 

    const sendMsg = () => {
        socket.emit('sendMsg', roomId, msg, userName, type, 0, users);
    }

    return (
        <div style={{/*border:'1px black solid'*/}}>

            <b>현재 채팅방 : {roomId}</b><br/>
            <b>{type} (0 : 단체, 1: 1대1)</b><br/>
            <b>로그인 회원 : {userName}</b>  <br/>
            <b>채팅방 회원 : {users}</b>  <br/>

            <div>

            <div>
            {preReceiveMsg.map((room, index) => {
                // userName을 제외한 배열을 만들기
                //const chatUsers = room.userName.filter(name => name !== userName);


                const date = new Date(room.msg_dt);
                const koreanTime = date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
                return (
                    <div key={index}>
                        <p>
                             {room.sender_id === userName ? '' : room.sender_id+' :' } {room.msg} ({koreanTime})
                        </p>
                    </div>
                );
            })}
            
            {receiveMsg.map((msg, index) => (
                room === roomId && (
                    <p key={index}> {chatUserName[index]} : {msg} </p>
                )
            ))}
            </div>

                <input
                    type="text"
                    placeholder="msg"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={sendMsg}>전송</button>
            </div>  
           
        </div>
    );
};

export default SendChatMsg;