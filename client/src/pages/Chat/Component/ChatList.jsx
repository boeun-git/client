import React, { useEffect, useState } from "react";
import axios from "axios";
import { CDBListGroup, CDBListGroupItem, CDBBadge, CDBContainer } from "cdbreact";
import './List.css';
import Stack from "react-bootstrap/esm/Stack";
import { useSocket } from "../Socket";

const ChatList = ({ onRoomSelect }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const socket = useSocket();
    // sessionStorage에서 가져오기
    const userName = sessionStorage.getItem("userName");

    // useEffect(() => {
    //     // API 요청
    //     axios.get('http://localhost:3001/api/getChatRoomList', {
    //         params: { data: userName }
    //     })
    //     .then((response) => {
    //         setChatRooms(response.data.data);
    //         console.log('response : ', response);
    //         console.log('response.data.data : ', response.data.data);
    //         console.log('response.data.data[0] : ', response.data.data[0]);
    //         console.log('response.data.data[0].id : ', response.data.data[0].id);
    //         console.log('response.data.data[0].userName : ', response.data.data[0].userName);
    //         console.log('response.data.data[0].userName : ', response.data.data[0].chatType);
    //         console.log('response.data.data[0].userName : ', response.data.data[0].userName[0].userName);
    //         console.log('response.data.data[0].userName : ', response.data.data[0].userName[1].userName);
    //     })
    //     .catch((error) => {
    //         console.error('Error getChatRoomList.js : ', error);
    //     });
    // }, []);


    // 채팅방 목록을 불러오는 함수
    const refreshChatRoom = () => {    
        //axios.get('http://localhost:3001/api/getChatRoomList', {
        axios.get('https://placehere.store/api/getChatRoomList', {
            params: { data: userName }
        })
        .then((response) => {
            setChatRooms(response.data.data);
        })
        .catch((error) => {
            console.error('Error getChatRoomList.js : ', error);
        });
    }
    

    // useEffect(() => {
    //     refreshChatRoom();

    //     socket.on("receive", () => {
    //         console.log("socket.on('receive')");
    //         refreshChatRoom(); 
    //     });

    // }, []);


    useEffect(() => {
        refreshChatRoom();

        if (socket) {  // socket 객체가 null이 아닌지 확인
            socket.off("receive");

            socket.on("receive", () => {
                console.log("socket.on('receive')");
                refreshChatRoom();
            });
        }
    

    }, [socket]);
    console.log("chatList socket : ", socket);
    console.log('chatList ; ',socket); 

    // useEffect(() => {
    //     socket.on("receive", () => {
    //         console.log("Receive");
    //     });
    // })

    // 클릭할 때 badge 사라지게
    const badgeChange = (index) => {
        //chatRooms[index].receiveChk = 'Y';
    }

    return (
        <CDBContainer style={{ margin: '0', padding: '0' }}>
            <CDBListGroup 
                style={{ 
                    width: "25rem", 
                    borderRadius: '0', 
                    overflowY: "auto", 
                    maxHeight: "86vh" // 높이를 고정시켜서 스크롤이 발생하도록 합니다.
                }}
            >
                <div className="flex-1" style={{ overflowY: "auto" }}>
                    {
                        chatRooms.length === 0 ? (
                            <CDBListGroupItem style={{ textAlign: 'center', height: "85vh", borderColor: '#A6A6A6' }}>
                                <p style={{ verticalAlign: 'middle', marginTop: '50%' }}><b>채팅한 내역이 없습니다.</b></p>
                            </CDBListGroupItem>
                        ) : (
                            chatRooms.map((room, index) => {
                                const lastMessage = room.msg;
                                const receiveChk = room.receiveChk;

                                const chatUsers = room.userName
                                .filter(user => user.userName !== userName) // userName을 제외
                                .map(user => user.userName );

                                const storeName = room.userName
                                .filter(user => user.userName !== userName) // userName을 제외
                                .map(user=> user.user_type === 'ROLE_STORE' ? user.storeName : '');

                                const chatUserType = room.userName
                                .filter(user => user.userName !== userName)
                                .map(user => user.user_type);

                                console.log('chatUserType', chatUserType);
                                return (
                                    <CDBListGroupItem 
                                        hover 
                                        className="d-flex" 
                                        style={{ margin: 0, padding: 0, height: "7rem" }} 
                                        key={index} 
                                        onClick={() => {
                                            onRoomSelect(room.id, chatUsers, room.chatType, chatUserType, storeName);
                                            // alert(room.id);
                                            // alert(chatUsers);
                                            // alert(room.chatType );
                                            // alert(chatUserType );
                                            // alert(storeName);
                                            badgeChange(index);
                                        }}
                                    >
                                        <Stack style={{ margin: '10px' }}>
                                            <input type="text" value={room.userName.filter(name => name.userName !== userName).map(user=> user.user_type === 'ROLE_STORE' ? `${user.storeName} (${user.userName})` : user.userName)} style={{border : '0px', fontWeight: 'bold' }} disabled/>
                                            <br />
                                            {lastMessage}
                                        </Stack>
                                        {room.receiveChk === 'N' && (
                                            <CDBBadge color="danger" style={{ width: '5vh', height: '5vh', textAlign: 'center' }}>
                                                new
                                            </CDBBadge>
                                        )}
                                    </CDBListGroupItem>
                                );
                            })
                        )
                    }
                </div>
            </CDBListGroup>
        </CDBContainer>
    );
};

export default ChatList;
