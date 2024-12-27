import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
import ChatRoomList from './GetChatList.jsx';
import ChatRoomListBar from './ChatRoomSideBar.jsx';
import SendChatMsg from './SendChatMsg.jsx';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import "../../style/chat/Chat.css";
import ChatSearch from './SearchChat.jsx';
import StoreSearch from './SearchStore.jsx';
import UserSearch from './SearchUser.jsx';
import { useLocation } from 'react-router-dom';
import Header from '../../Header';
import ChatSpinner from './Spinner.jsx';
import axios from 'axios';

const Chat = () => {
    // react/chat?name=username&role=userrole
    const queryParams = new URLSearchParams(useLocation().search);
    const name = queryParams.get('name');
    const role = queryParams.get('role') || '';
    //const storeId = queryParams.get('storeId');
    const [clickStoreName, setClickStoreName] = useState(null); 
    const initialStoreId = queryParams.get('storeId');
    
    // storeId 상태 관리
    const [storeId, setStoreId] = useState(initialStoreId);

    useEffect(() => {

        const initUser = () => {
            const sessionUserName = sessionStorage.getItem("userName") || name;
            const sessionUserRole = sessionStorage.getItem("role") || role;
    
            setLoginUserName(sessionUserName);
            setLoginUserRole(sessionUserRole);
            
            //가게상세페이지에서 채팅으로 넘어왔을 때
            //if(storeId !== null && storeId.length > 0){
            if(storeId !== null){
                axios.get('/api-store/getStore',{
                //axios.get('http://localhost:8080/api-store/getStore',{
                    params: { storeId:  storeId}  
                })
                .then((response) => {
                    // 서버로부터 받은 데이터 처리
                    setClickRoomUser( response.data.userName);
                    setClickStoreName(response.data.storeName);
                    console.log('initUser storeName : ', clickStoreName);
                    //list 결과로 onoff 확인하는 것 추가하기
                    console.log('Array.isArray(clickStoreName) : ', Array.isArray(clickStoreName));
                    setClickRoomType(1);
                    setShowSendChatMsg(true);
                })
                .catch((error) => {
                    setClickStoreName();
                    console.error('Error group addChatRoom.js : ', error);
                });
            }
            
            if (!sessionUserName || sessionUserName === null) {
                //값이 없으면 홈페이지로
                //window.location.href = "http://localhost:8080/"; 
                window.location.href = "/";
                
            }
            
        };
    
        initUser();
    }, []);

    

	const [clickRoomId, setClickRoomId] = useState(null); 
	const [clickRoomType, setClickRoomType] = useState(null); 
	const [clickRoomUser, setClickRoomUser] = useState(null); 
    const [loginUserName, setLoginUserName] = useState(null); 
    const [loginUserRole, setLoginUserRole] = useState(null);     
    const [menuName, setMenuName] = useState(null); 
    const [showSendChatMsg, setShowSendChatMsg] = useState(false);
	const [clickRoomUserRole, setClickRoomUserRole] = useState(null);

    // sessionStorage
    useEffect(() => {
        // sessionStorage
        const storedUserName = sessionStorage.getItem("userName") || name;
        const storedRole = sessionStorage.getItem("role") || role;

        setLoginUserName(storedUserName);
        setLoginUserRole(storedRole);

        sessionStorage.setItem("userName", storedUserName);
        sessionStorage.setItem("role", storedRole);

        if(!sessionStorage.getItem("userName")){
            <ChatSpinner/>
        }

    }, [name, role]);

    // 채팅목록 - 채팅방 선택했을 때 - ChatRoomList,
    const handleRoomSelect = (roomId, users, type, usersType, store) => {
        setStoreId(null);
        setClickRoomId(roomId);
        setClickRoomUser(users); 
        setClickRoomType(type);
        setClickRoomUserRole(usersType);
        setClickStoreName(store);
        setShowSendChatMsg(true);
        
    };

    useEffect(() => { 
        console.log("useEffect start ====================", clickRoomId);
        console.log("Selected Room ID:", clickRoomId);
        console.log("Selected Room Users:", clickRoomUser);
        console.log("Selected Room Type:", clickRoomType);
        console.log("Selected clickRoomUserRole:", clickRoomUserRole);
        console.log("Selected clickStoreName:", clickStoreName);
        console.log("useEffect end ====================", clickRoomId);        
    }, [clickRoomId, clickRoomUser, clickRoomType, clickRoomUserRole, clickStoreName]);
    
    const handleRoomUser = (users) =>{
        // setSelectedRoomUser(users); 
        // console.log("selectedRoomUser : ", selectedRoomUser);
        setClickRoomUser(users); 
        console.log("selectedRoomUser : ", clickRoomUser);
      }    

    const handleRoomType = (type) => {
        setClickRoomType(type); 
        console.log("selectedRoomType : ", clickRoomType);
    };
   
    //사이드 메뉴 클릭 시
    const clickMenuName = (menu) => {
        setMenuName(menu); 
        setShowSendChatMsg(false);
    };

    //가게 검색 후 나온 가게 클릭 시
    const clickStore = (Id, Name) => {
        //setStoreName(getStoreName);
        if(Id === null){
            return <ChatSpinner/>
        }

        //1초
        setTimeout(() => {
            setStoreId(null);
            setClickRoomUser(Id);
            setShowSendChatMsg(true);
            setClickRoomId("");
            setClickRoomType(1);
            setClickStoreName(Name);
            setClickRoomUserRole("ROLE_STORE");            
            console.log("storeId : ", Id);
            console.log("storeName : ", Name);
        }, 1000);

    }

    useEffect(() => {
        console.log("Updated storeName:", clickStoreName);
    }, [clickStoreName]);

    const clickUser = (getUserName) => {

        if(getUserName === null){
            return <ChatSpinner/>
        }

        setTimeout(() => {
            console.log("clickUser getUserName: ", getUserName);
            setStoreId(null);
            setClickRoomUser(getUserName);
            console.log("clickUser clickRoomUser: ", clickRoomUser);
            setClickRoomId("");
            setClickStoreName();
            if (Array.isArray(getUserName)) {
                if(getUserName.length === 1){
                    setClickRoomType(1);
                }else{
                    setClickRoomType(0);
                }
            } else {
                setClickRoomType(1);
            }
            
            setClickRoomUserRole("ROLE_USER");
            console.log("clickUser clickRoomUser: ", clickRoomUser);
            
            setShowSendChatMsg(true);
            console.log("clickUser clickRoomUser: ", clickRoomUser);  
          
        }, 1000);

    }

    if (!loginUserName) {
        return <ChatSpinner/>
    }

    return (
        <div className='body' >
            {/* <div className='head'> */}
                <Header/>
            {/* </div> */}
            <div className='chat-container' >
                
                <SocketProvider userName={name}>
                    <Container>
                    <Stack className='stack' direction="horizontal" >
                        <div style={{ height: '100%', marginTop : '0' }}>
                            <ChatRoomListBar className='sidebar' menuName={clickMenuName}/>
                        </div>
                        <div style={{ height: '88.5vh', marginTop : '0' , borderRight:'0', borderBottom:'1px solid #A6A6A6', borderTop:'1px solid #4880FF'}}>
                            {(menuName === null || menuName === 'chatRoomList' )  && 
                            <ChatRoomList onRoomSelect={handleRoomSelect} />}
                            {menuName === 'chatRoomSearch' && 
                            <ChatSearch onRoomSelect={handleRoomSelect} />}
                            {menuName === 'storeSearch' && 
                            <StoreSearch  getStoreName = {clickStore}/>}
                            {menuName === 'userSearch' && 
                            <UserSearch getUserName={clickUser}/>}
                        </div>
                        <div style={{ width:'100%', height: '88.5vh', marginTop : '0' , border:'1px solid #A6A6A6', borderTop:'1px solid #4880FF'}}>
                        {showSendChatMsg === true && (storeId === null)  && 
                            <SendChatMsg 
                                roomId={clickRoomId} 
                                type={clickRoomType} 
                                users={clickRoomUser}
                                usersRole={clickRoomUserRole}
                                storeName={clickStoreName}
                                userName={loginUserName} />}
                        {showSendChatMsg === true && storeId && 
                            <SendChatMsg 
                                roomId= {null}
                                type={clickRoomType}
                                users={clickRoomUser}
                                usersRole='ROLE_STORE'
                                storeName={clickStoreName}
                                userName={loginUserName} />}
                        </div>                        
                    </Stack>
                    </Container>
                </SocketProvider>
            </div>
        </div>
    );
};

export default Chat;