import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../Socket';



const AddChatRoom = ({setUser, addRoomId, addRoomUser, addRoomType}) => {
    const [chatRoomAdd, setChatRoomAdd] = useState([]);
    const [userName, setUserName] = useState([]);
    const [chatUserName, setChatUserName] = useState([]);
    const [chatUserNames, setChatUserNames] = useState([]);
    const socket = useSocket(); // socket 정보 가져오기    


    useEffect(() => {
        if (socket) {
            // socket이 준비된 이후에만 이벤트 리스너를 등록합니다.
            socket.on('getSingleJoinRoom', (roomId, chatUserNames) => {
                console.log(`User(s) ${chatUserNames} joined room ${roomId}`);
                // 방 입장 후 처리 로직 작성
            });

            socket.on('roomJoined', (data) => {
                console.log(`${data.userId} has joined room ${data.roomId}`);
            });

            // cleanup: 컴포넌트가 언마운트되거나 socket이 변경될 때 이벤트 리스너를 정리합니다.
            return () => {
                socket.off('getSingleJoinRoom');
                socket.off('roomJoined');
            };
        }
    }, [socket]); // socket이 변경될 때마다 effect 실행

    
      // 사용자 이름 등록
    const insertUserName = () => {
        console.log('before insertUserName : ', userName);
        console.log('socket : ', socket);
        socket.emit('insertUserName', userName);
        console.log('after insertUserName : ', userName);
        setUser(userName);
        console.log('setUser : ', setUser);
    };

    //1:1
    const joinUserName = () => {
//        socket.emit('joinUserName', chatUserName, userName);
        if (userName && chatUserName) {
            // POST 요청
            //axios.post('http://localhost:3001/api/addChatRoom', {
            axios.post('https://placehere.store/api/addChatRoom', {
                //나중에 userName, 채팅할 회원 아이디로 수정
                chat_user: [userName, chatUserName],
                //chat_user: ['userId1', 'userId3'],
                //0:단체, 1: 1대1
                chat_type: 1
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setChatRoomAdd(response.data.data.data);
                console.log('1:1 addChatRoom.js : ', response.data.data);
                
                
                console.log('response : ', response);
                console.log('response.data : ', response.data);
                console.log('response.data.data : ', response.data.data);
                console.log('response.data.data.data : ', response.data.data.data);
                console.log('response.data.data.data[0] : ', response.data.data.data[0]);
                console.log('response.data.data.data[0]._id : ', response.data.data.data[0]._id);
                const roomId = response.data.data.data[0]._id; // _id 추출
            // addRoomId는 이제 비동기적으로 처리 후 호출됨
            addRoomId(roomId);
            addRoomType(1);
                //console.log(' addRoomId : ', chatRoomAdd._id);
            })
            .catch((error) => {
                console.error('Error 1:1 addChatRoom.js : ', error);
            });
            
        }
    }

    //group
    const groupJoinUserName = () => {
        //        socket.emit('joinUserName', chatUserName, userName);
        if (userName && chatUserNames) {
            const chatUserNamesArray = chatUserNames.split(',').map(user => user.trim()); // 공백 제거
            console.log(chatUserNamesArray);
            // POST 요청
            //axios.post('http://localhost:3001/api/addChatRoom', {
            axios.post('https://placehere.store/api/addChatRoom', {
                //나중에 userName, 채팅할 회원 아이디로 수정
                chat_user: [userName, ...chatUserNamesArray],
                //chat_user: ['userId1', 'userId3'],
                //0:단체, 1: 1대1
                chat_type: 0
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setChatRoomAdd(response.data.data.data);
                console.log('group addChatRoom.js : ', response.data.data);
                const roomId = response.data.data.data._id; // _id 추출
                addRoomId(roomId);
                addRoomUser(chatUserNamesArray);
                addRoomType(0);
            })
            .catch((error) => {
                console.error('Error group addChatRoom.js : ', error);
            });

        }
    }    

    return (
        <div >
            <b>채팅방 추가 </b>
            <p>{chatRoomAdd.chat_user} - {chatRoomAdd.chat_type}</p>
            <div>
                <input
                    type="text"
                    placeholder="로그인 회원 ID"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button onClick={insertUserName}>로그인</button>
            </div>    
            <div>
                <input
                    type="text"
                    placeholder="채팅할 회원"
                    value={chatUserName}
                    onChange={(e) => setChatUserName(e.target.value)}
                />
                <button onClick={joinUserName}>1:1</button>
            </div>              
            <div>
                <input
                    type="text"
                    placeholder="채팅할 회원들"
                    value={chatUserNames}
                    onChange={(e) => setChatUserNames(e.target.value)}
                />
                <button onClick={groupJoinUserName}>단체</button>
            </div>        
        </div>
    );
};

export default AddChatRoom;