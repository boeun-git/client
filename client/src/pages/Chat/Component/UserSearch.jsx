import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';

const UserSearch = () => {
    
    const [searchUser, setSearchUser] = useState('');
    const [searchUserResult, setSearchUserResult] = useState([]);

    const userName = searchUser;
    const searchButtonClick = () => {
        if(searchUser) {
            axios.get('http://localhost:3001/api/searchChatRoom', {
                params: { data:  userName}  
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchUserResult(response);
                console.log('getChatRoomUser : ', response);
                
            })
            .catch((error) => {
                console.error('Error group addChatRoom.js : ', error);
            });

        }
        
    };    

    const searchUserChange = (e) => {
        setSearchUser(e.target.value);  // input 값 업데이트
    }

    return (
    <CDBContainer style={{width: "25rem", margin:'0', padding:'0'}}>
        <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0' }}>
            {/* 채팅 검색(상대방 userName으로 검색) */}
            <CDBListGroupItem style={{ height: "7rem" }}>
                <div class=" p-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control searchUser" onChange={searchUserChange}/>
                        <div class="input-group-append">
                        <button className="btn btn-primary" onClick={searchButtonClick}>
                  <i className="fas fa-search"></i>
                </button>
                        </div>
                    </div>
                </div>	
            </CDBListGroupItem>

            {
                searchUserResult.length === 0 ? (
                    <CDBListGroupItem className="d-flex " style={{ height: "7rem" }}>
                        <center><b>해당되는 회원이 없습니다.</b></center>
                    </CDBListGroupItem>                    
                    
                ) : (
                    searchUserResult.map((store, index) => {
                        /*
                        const chatUsers = room.userName.filter(name => name !== 'userId3');*/

                        return (
                            <CDBListGroupItem key={index} className="d-flex " style={{ height: "7rem"}}>

                            </CDBListGroupItem>
                        );
                    })
                )
            }
            
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  UserSearch;