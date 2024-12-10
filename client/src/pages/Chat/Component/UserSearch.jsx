import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';

const UserSearch = ({getUserName}) => {
    
    const [searchUser, setSearchUser] = useState('');
    const [searchUserResult, setSearchUserResult] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);

    const userName = searchUser;
    const searchButtonClick = () => {
        if(searchUser) {
            //axios.get('http://localhost:8080/api-user/getUser', {
            //    params: { username:  userName}  
            //})
            axios.get('http://localhost:8080/api-user/getUserList')
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchUserResult(response.data);
                console.log('getChatRoomUser : ', response.data);
                //list 결과로 onoff 확인하는 것 추가하기

            })
            .catch((error) => {
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
        return searchUserResult.filter(item => item.username && item.username.includes(term));
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
            {(searchUserResult.length === 0 ) ? (
            <CDBListGroupItem className="d-flex " style={{ height: "7rem" }}>
                <center><b>해당되는 회원이 없습니다.</b></center>
            </CDBListGroupItem>                    
            ) : (            
                // 검색 결과가 있을 때
                findSimilarData(searchUser).map((user, index) => (
                    ( user.role !== 'ROLE_USER') ? (
                        <></>
                    ):(
                        <CDBListGroupItem
                            key={index}
                            className="d-flex"
                            style={{ height: "7rem" }}
                            /*onClick={() => { getUserName(user.username); }}*/
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
                ))
            )}
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  UserSearch;