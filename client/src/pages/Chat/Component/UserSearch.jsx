import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';
import ChatSpinner from "./Spinner";

const UserSearch = ({getUserName}) => {
    
    const [searchUser, setSearchUser] = useState('');
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const userName = searchUser;
    const searchButtonClick = () => {
        if(searchUser) {
            axios.get('http://localhost:8080/api-user/getUser', {
                params: { username:  userName}  
            })
            //axios.get('http://localhost:8080/api-user/getUserList')
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchUserResult(response.data);
                console.log('getChatRoomUser : ', response.data);
                //list 결과로 onoff 확인하는 것 추가하기
                console.log('Array.isArray(searchUserResult) : ', Array.isArray(searchUserResult));
            })
            .catch((error) => {
                setSearchUserResult([]);
                console.error('Error group addChatRoom.js : ', error);
            });
        }
    };

    // 체크박스를 클릭할 때마다 상태 업데이트
    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;
        if (checked) {
        setCheckedItems((prevItems) => [...prevItems, id]); // 체크한 항목 추가
        } else {
        setCheckedItems((prevItems) => prevItems.filter((item) => item !== id)); // 체크 해제한 항목 제거
        }
    };

    // 유사한 데이터를 찾는 함수 (여기서는 이름에 'term'이 포함된 데이터 찾기)
    const findSimilarData = (term) => {
        //return searchUserResult.filter(item => item.username && item.username.includes(term));
        return searchUserResult;
    };


    const searchUserChange = (e) => {
        setSearchUser(e.target.value);
    }
    
    const handleUserClick = (username) => {
        
        if(username === null){
            <ChatSpinner/>
        }
        console.log("Clicked user: ", username); 
        
        getUserName(username); 

        console.log("Selected room user after click: ");
    };

    return (
    <CDBContainer style={{width: "25rem", margin:'0', padding:'0' , borderColor:'#A6A6A6'}}>
        <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0' }}>
            {/* 채팅 검색(상대방 userName으로 검색) */}
            <CDBListGroupItem style={{ height: "7rem" , borderColor:'#A6A6A6'}}>
                <div class=" ">
                    <div class="input-group " style={{marginTop:'7%'}}>
                        <input type="text" class="form-control searchUser" onChange={searchUserChange} />
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
                maxHeight: "74vh" // 높이를 고정시켜서 스크롤이 발생하도록 합니다.
            }}
        >
            <div className="flex-1" style={{ overflowY: "auto" }}>
            {(searchUserResult.length === 0 ) ? (
                    <CDBListGroupItem style={{ textAlign: 'center', height: "74vh", borderColor:'#A6A6A6'}}>
                        <p style={{verticalAlign: 'middle', marginTop:'50%'}}><b>입력한 내용에 해당되는 회원이 없습니다.</b></p>
                    </CDBListGroupItem>     
            ) : (            
                // 검색 결과가 있을 때
                (!Array.isArray(searchUserResult)) ? (
                    <CDBListGroupItem className="d-flex" style={{ height: "7rem"}}
                    onClick={() => {
                        console.log("searchUserResult: ", searchUserResult); // searchUserResult의 값을 출력
                        handleUserClick(searchUserResult.username);  // handleUserClick 호출
                    }}>
                        <div class="flex items-center ps-3 w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            <b>{searchUserResult.username}</b>
                        </div>
                    </CDBListGroupItem>
                ) :
                (findSimilarData(searchUser).map((user, index) => (
                    user.role === 'ROLE_USER' && (

                        <CDBListGroupItem className="d-flex" style={{ height: "7rem" }}
                            onClick={() => {
                                console.log("onClick triggered");  // 로그로 클릭이 호출되었는지 확인
                                console.log("searchUserResult: ", searchUserResult); // searchUserResult의 값을 출력
                                handleUserClick(searchUserResult.username);  // handleUserClick 호출
                            }}
                        >                          
                            <div class="flex items-center ps-3">
                                <input 
                                    id={user.username} 
                                    type="checkbox" 
                                    value={user.username}
                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                    onChange={handleCheckboxChange} />
                                <label for={user.username} class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"><b>{user.username}</b></label>
                            </div>
                        </CDBListGroupItem>
                    )
                )))
            )}
            </div>
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  UserSearch;