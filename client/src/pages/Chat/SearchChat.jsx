import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBBadge, CDBContainer } from "cdbreact";
import axios from "axios";
import '../../style/chat/List.css';
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
            axios.get('/api/searchChatRoom', {
            //axios.get('http://localhost:3001/api/searchChatRoom', {
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
        setSearchUserName(e.target.value);  
    }

    return (
        <CDBContainer style={{width: "25rem", margin:'0', padding:'0' }}>
            <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0', border:'0px' }}>
                {/* 채팅 검색(상대방 userName으로 검색) */}
                <CDBListGroupItem style={{ height: "7rem" , borderBottom:'1px solid #A6A6A6'}}>
                    <div class=" ">
                        <div class="input-group " style={{marginTop:'7%'}}>
                            <input type="text" class="form-control searchUserName" onChange={searchUserNameChange}  style={{ borderColor:'#A6A6A6',  borderRadius: '7px' }}/>
                            <div class="input-group-append">
                            <button className="btn " onClick={searchButtonClick} >
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
                    maxHeight: "68vh",
                    border:"0"
                }}
            >
                <div className="flex-1" style={{ overflowY: "auto" }}></div>            
            {
            searchRoom.length === 0 ? (
                    <CDBListGroupItem style={{ textAlign: 'center', height: "67vh", border:'0px'}}>
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