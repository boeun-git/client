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

    // 클릭할 때 badge 사라지게
    const badgeChange = (index) => {
        chatRooms[index].receiveChk = 'Y';
    }

    return (
        <CDBContainer style={{ margin: '0', padding: '0' ,height: '87.8vh' }}>
            <CDBListGroup 
                style={{ 
                    width: "25rem", 
                    borderRadius: '0', 
                    overflowY: "auto", 
                    maxHeight: "87.8vh" // 높이를 고정시켜서 스크롤이 발생하도록 합니다.
                }}
            >
                <div className="flex-1" style={{ overflowY: "auto" }}>
                    {
                        chatRooms.length === 0 ? (
                            <CDBListGroupItem style={{ textAlign: 'center', height: "87.8vh", border:'0' }}>
                                <p style={{ verticalAlign: 'middle', marginTop: '50%' }}>
                                    <b>채팅한 내역이 없습니다.</b>
                                </p>
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
                                        style={{ margin: 0, padding: 0, height: "7rem" ,  border: "0 0 1px 0"}} 
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
                                            <input type="text" value={room.userName.filter(name => name.userName !== userName).map(user=> user.user_type === 'ROLE_STORE' ? `${user.storeName} (${user.userName})` : user.userName)} style={{border : '0px', fontWeight: 'bold', background: "white" }} hover disabled/>
                                            <br />
                                            {lastMessage}
                                        </Stack>
                                        {room.receiveChk === 'N' && (
                                        <div style={{ display: 'flex', alignItems: 'center', marginRight:'1em'}}>
                                            <CDBBadge color="danger" size="small" borderType="pill" >
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            </CDBBadge>
                                        </div>
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
