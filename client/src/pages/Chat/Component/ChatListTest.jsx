import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CDBListGroup, CDBListGroupItem, CDBBadge, CDBContainer } from "cdbreact";
//import './List.css';

const ChatList = ({onRoomSelect, onRoomType, onRoomUser}) => {
    const [chatRooms, setChatRooms] = useState([]);
    const userName = 'userId3';


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


  return (
    
    <CDBContainer style={{ margin:'0', padding:'0', border:'1px solid'}}>
        <h5>{userName}의 채팅방 리스트</h5>
            <CDBListGroup style={{ width: "25rem", borderRadius: '0' }}>

            {
                chatRooms.length === 0 ? (
                    <CDBListGroupItem className="d-flex" style={{ height: "7rem"}}>
                        채팅한 내역이 없습니다.
                    </CDBListGroupItem>                    

                ) : (
                    chatRooms.map((room, index) => {
                        // userName을 제외한 배열을 만들기
                        const chatUsers = room.userName.filter(name => name !== userName);

                        return (
                            <CDBListGroupItem hover className="d-flex" style={{ height: "7rem"}} key={index} onClick={() => {onRoomSelect(room.id); onRoomType(room.chatType); onRoomUser(chatUsers);}}>
                                <b>{chatUsers.join(',')}</b> <br/><br/>
                                {room.msg} {/*<CDBBadge color="primary">19</CDBBadge>*/}
                            </CDBListGroupItem>                            

                        );
                    })
                )
            }

            </CDBListGroup>
    </CDBContainer>
  );
};
export default  ChatList;