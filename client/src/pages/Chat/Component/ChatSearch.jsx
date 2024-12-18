import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBBadge, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';
import Stack from "react-bootstrap/esm/Stack";


//const ChatSearch = ({onRoomSelect, onRoomType, onRoomUser}) => {
const ChatSearch = ({onRoomSelect}) => {
    
    const [searchUserName, setSearchUserName] = useState('');
    const [searchRoom, setSearchRoom] = useState([]);

    const loginUserName = sessionStorage.getItem("userName");
    const userName = sessionStorage.getItem("userName")+','+ searchUserName;

    const searchButtonClick = () => {
        console.log("chatSearch.jsx userName : ", userName);
        if(searchUserName) {
            axios.get('http://localhost:3001/api/searchChatRoom', {
            
                params: { data:  userName}  
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchRoom(response.data.data);
                console.log('getChatRoomUser : ', response.data.data);
                
            })
            .catch((error) => {
                console.error('Error group addChatRoom.js : ', error);
            });

        }
        
    };    

    const searchUserNameChange = (e) => {
        setSearchUserName(e.target.value);  // input 값 업데이트
    }

    return (
        <CDBContainer style={{width: "25rem", margin:'0', padding:'0' , borderColor:'#A6A6A6'}}>
            <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0' }}>
                {/* 채팅 검색(상대방 userName으로 검색) */}
                <CDBListGroupItem style={{ height: "7rem" , borderColor:'#A6A6A6'}}>
                    <div class=" ">
                        <div class="input-group " style={{marginTop:'7%'}}>
                            <input type="text" class="form-control searchUserName" onChange={searchUserNameChange}/>
                            <div class="input-group-append">
                                <button className="btn btn-primary" onClick={searchButtonClick}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>	
                </CDBListGroupItem>
            </CDBListGroup>
            <CDBListGroup 
                style={{ 
                    width: "25rem", 
                    borderRadius: '0', 
                    overflowY: "auto", 
                    maxHeight: "74vh"
                }}
            >
                <div className="flex-1" style={{ overflowY: "auto" }}></div>            
            {
            searchRoom.length === 0 ? (
                    <CDBListGroupItem style={{ textAlign: 'center', height: "85vh", borderColor:'#A6A6A6'}}>
                        <p style={{verticalAlign: 'middle', marginTop:'50%'}}><b>검색한 회원과의 채팅한 내역이 없습니다.</b></p>
                    </CDBListGroupItem>                                            
            ) : (
            searchRoom.map((room, index) => {
                        
            //const chatUsers = room.userName.filter(name => name !== 'userId3');
            const chatUsers = room.userName
            .filter(user => user.userName !== loginUserName) // loginUserName 제외
            .map(user => user.userName );

            const storeName = room.userName
            .filter(user => user.userName !== loginUserName) // loginUserName 제외
            .map(user=> user.user_type === 'ROLE_STORE' ? user.storeName : '');

            const chatUserType = room.userName
            .filter(user => user.userName !== loginUserName)
            .map(user => user.user_type);

            console.log('chatsearch loginusername : ', loginUserName);
            console.log('chatsearch result : ', chatUsers, ", ",storeName ,", ",chatUserType);

            return (
            <CDBListGroupItem 
            key={index} 
            className="d-flex " 
            style={{ height: "7rem"}} 
            //onClick={() => {onRoomSelect(room.id); onRoomType(room.chatType); onRoomUser(chatUsers);}}>
            onClick={() => {
                onRoomSelect(room.id, chatUsers, room.chatType, chatUserType, storeName);
                console.log('ChatSearch.jsx : ', room.id, chatUsers, room.chatType);}
            } >
                {/*(roomId, users, type, usersType, store) => { */}
                {/*const SendChatMsg = ({ roomId,  type, users, usersRole, storeName }) => { */}
                {/*<CDBBadge color="info">19</CDBBadge>*/}
                <Stack style={{margin:'10px'}}>
                    <b>{chatUsers.join(',')}</b> <br/>
                    {room.msg} {/*<CDBBadge color="primary">19</CDBBadge>*/}
                </Stack>                
            </CDBListGroupItem>
            );
            })
            )
            }
            
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  ChatSearch;