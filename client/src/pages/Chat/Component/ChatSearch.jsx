import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBBadge, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';


const ChatSearch = ({onRoomSelect, onRoomType, onRoomUser}) => {
    
    const [searchUserName, setSearchUserName] = useState('');
    const [searchRoom, setSearchRoom] = useState([]);

    const userName = sessionStorage.getItem("userName")+','+ searchUserName;

    const searchButtonClick = () => {
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
    <CDBContainer style={{width: "25rem", margin:'0', padding:'0'}}>
        <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0' }}>
            {/* 채팅 검색(상대방 userName으로 검색) */}
            <CDBListGroupItem style={{ height: "7rem" }}>
                <div class=" p-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control searchUserName" onChange={searchUserNameChange}/>
                        <div class="input-group-append">
                            <button className="btn btn-primary" onClick={searchButtonClick}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>	
            </CDBListGroupItem>
            
            {
            searchRoom.length === 0 ? (
            <CDBListGroupItem className="d-flex " style={{ height: "7rem" }}>
                <center><b>채팅한 내역이 없습니다.</b></center>
            </CDBListGroupItem>                            
            ) : (
            searchRoom.map((room, index) => {
                        
            const chatUsers = room.userName.filter(name => name !== 'userId3');

            return (
            <CDBListGroupItem key={index} className="d-flex " style={{ height: "7rem"}} onClick={() => {onRoomSelect(room.id); onRoomType(room.chatType); onRoomUser(chatUsers);}}>
                <b>{chatUsers.join(',')}</b>
                <br/><br/>
                <p>{room.msg}</p> {/*<CDBBadge color="info">19</CDBBadge>*/}
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