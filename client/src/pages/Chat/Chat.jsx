import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
import ChatRoomList from './Component/ChatList';
import ChatRoomListBar from './Component/ChatRoomListBar';
//import SendChatMsg from './Component/SendChatMsg';
//import SendChatMsg from './Component/sendmsg';
//import SendChatMsg from './Component/sendmsgtest.jsx';
import SendChatMsg from './Component/sendsend.jsx';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import "../../style/chat/Chat.css";
import ChatSearch from './Component/ChatSearch';
import StoreSearch from './Component/StoreSearch';
import UserSearch from './Component/UserSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Header';
import ChatSpinner from './Component/Spinner.jsx';

const Chat = () => {
    // react/chat?name=username&role=userrole
    const queryParams = new URLSearchParams(useLocation().search);
    const name = queryParams.get('name');
    const role = queryParams.get('role');  

    useEffect(() => {

        const initUser = () => {
            const sessionUserName = sessionStorage.getItem("userName") || name;
            const sessionUserRole = sessionStorage.getItem("role") || role;
    
            setLoginUserName(sessionUserName);
            setLoginUserRole(sessionUserRole);
    
            if (!sessionUserName) {
                //값이 없으면 홈페이지로
                window.location.href = "http://localhost:8080/";
                
            }
        };
    
        initUser();
    }, []);

    
    // 선택된 방의 ID, 방 ID
    //const [selectedRoomId, setSelectedRoomId] = useState(null); 
	const [clickRoomId, setClickRoomId] = useState(null); 
    // 선택된 방의 type, 방 type 
    //const [selectedRoomType, setSelectedRoomType] = useState(null); 
	const [clickRoomType, setClickRoomType] = useState(null); 
    // 선택된 방의 user
    //const [selectedRoomUser, setSelectedRoomUser] = useState(null); 
	const [clickRoomUser, setClickRoomUser] = useState(null); 
    
    const [loginUserName, setLoginUserName] = useState(null); 
    const [loginUserRole, setLoginUserRole] = useState(null);     
    // 선택한 사이드바
    const [menuName, setMenuName] = useState(null); 
    // 가게 userName
    //const [storeName, setStoreName] = useState(null); 
	const [clickStoreName, setClickStoreName] = useState(null); 
    const [showSendChatMsg, setShowSendChatMsg] = useState(false);
    //const [chatRole, setChatRole] = useState(null);
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
        //setSelectedRoomId(roomId);
        //setSelectedRoomUser(users); 
        //setSelectedRoomType(type); 
        //setChatRole(usersType);
        //setStoreName(store);
        //setShowSendChatMsg(true);
        setClickRoomId(roomId);
        setClickRoomUser(users); 
        setClickRoomType(type);
        setClickRoomUserRole(usersType);
        setClickStoreName(store);
        setShowSendChatMsg(true);

    };

    useEffect(() => { //clickRoomId
        //console.log("useEffect start ====================", selectedRoomId);
        //console.log("useEffect\n Selected Room ID:", selectedRoomId);
        //console.log("Selected Room Users:", selectedRoomUser);
        //console.log("Selected Room Type:", selectedRoomType);
        //console.log("Selected usersType:", chatRole);
        //console.log("Selected storeName:", storeName);
        //console.log("useEffect end ====================", selectedRoomId);

        console.log("useEffect start ====================", clickRoomId);
        console.log("Selected Room ID:", clickRoomId);
        console.log("Selected Room Users:", clickRoomUser);
        console.log("Selected Room Type:", clickRoomType);
        console.log("Selected clickRoomUserRole:", clickRoomUserRole);
        console.log("Selected clickStoreName:", clickStoreName);
        console.log("useEffect end ====================", clickRoomId);        
    //}, [selectedRoomId, selectedRoomUser, selectedRoomType, chatRole, storeName]);
    }, [clickRoomId, clickRoomUser, clickRoomType, clickRoomUserRole, clickStoreName]);
    
    const handleRoomUser = (users) =>{
        // setSelectedRoomUser(users); 
        // console.log("selectedRoomUser : ", selectedRoomUser);
        setClickRoomUser(users); 
        console.log("selectedRoomUser : ", clickRoomUser);
      }    

    const handleRoomType = (type) => {
    //   setSelectedRoomType(type); 
    //   console.log("selectedRoomType : ", selectedRoomType);
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
            //setSelectedRoomUser(Object.values(selectedRoomUser)); 
            // setSelectedRoomUser(Id);
            // setShowSendChatMsg(true);
            // setSelectedRoomId("");
            // setSelectedRoomType(1);
            // setStoreName(Name);
            // setChatRole("ROLE_STORE");
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

    // useEffect(() => {
    //     console.log("Updated storeName:", storeName);
    // }, [storeName]);
    useEffect(() => {
        console.log("Updated storeName:", clickStoreName);
    }, [clickStoreName]);

    const clickUser = (getUserName) => {

        //setUserName(getUserName);

        if(getUserName === null){
            return <ChatSpinner/>
        }

        setTimeout(() => {
            console.log("clickUser getUserName: ", getUserName);

            //setSelectedRoomUser(getUserName);
            //setSelectedRoomUser(Object.values(selectedRoomUser)); 
            //console.log("clickUser selectedRoomUser: ", selectedRoomUser);
            //setSelectedRoomId("");

            // if (Array.isArray(getUserName)) {
            //     if(getUserName.length === 1){
            //         setSelectedRoomType(1);
            //     }else{
            //     setSelectedRoomType(0);
            //     }
            // } else {
            //     setSelectedRoomType(1);
            // }
            
            // setChatRole("ROLE_USER");            
            // //selectedRoomUser.toCharArray()
            // console.log("clickUser selectedRoomUser: ", selectedRoomUser);
            
            // setShowSendChatMsg(true);
            // //setShowSendChatMsg(false);
            // console.log("clickUser selectedRoomUser: ", selectedRoomUser);

            setClickRoomUser(getUserName);
            console.log("clickUser clickRoomUser: ", clickRoomUser);
            setClickRoomId("");
            
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
            <div className='head'>
                <Header/>
            </div>
            <div className='chat-container' >
                
                <SocketProvider userName={name}>
                    <Container>
                    <Stack className='stack' direction="horizontal" >
                        <div style={{ height: '100%', marginTop : '0' }}>
                            <ChatRoomListBar className='sidebar' menuName={clickMenuName}/>
                        </div>
                        <div style={{ height: '86vh', marginTop : '0' , border:'1px solid #A6A6A6'}}>
                            {(menuName === null || menuName === 'chatRoomList' )  && 
                            <ChatRoomList onRoomSelect={handleRoomSelect} />}
                            {menuName === 'chatRoomSearch' && 
                            <ChatSearch onRoomSelect={handleRoomSelect} />}
                            {menuName === 'storeSearch' && 
                            <StoreSearch  getStoreName = {clickStore}/>}
                            {menuName === 'userSearch' && 
                            <UserSearch getUserName={clickUser}/>}
                        </div>
                        <div style={{ width:'100%', height: '86vh', marginTop : '0' , border:'1px solid #A6A6A6'}}>
                        {/* {showSendChatMsg === true  && 
                            <SendChatMsg 
                                roomId={selectedRoomId} 
                                type={selectedRoomType} 
                                users={selectedRoomUser}
                                usersRole={chatRole}
                                storeName={storeName}
                                userName={loginUserName} />} */}
                        {showSendChatMsg === true  && 
                            <SendChatMsg 
                                roomId={clickRoomId} 
                                type={clickRoomType} 
                                users={clickRoomUser}
                                usersRole={clickRoomUserRole}
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