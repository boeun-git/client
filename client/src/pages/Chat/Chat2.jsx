import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
import ChatRoomList from './Component/ChatList';
import ChatRoomListBar from './Component/ChatRoomListBar';
//import SendChatMsg from './Component/SendChatMsg';
import SendChatMsg from './Component/sendmsg';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
//import "../../style/chat/Chat.css";
import ChatSearch from './Component/ChatSearch';
import StoreSearch from './Component/StoreSearch';
import UserSearch from './Component/UserSearch';
import { useLocation } from 'react-router-dom';
import Header from '../../Header';


function Chat() {
  const location = useLocation();

  // 쿼리 파라미터를 가져옵니다
  const queryParams = new URLSearchParams(location.search);
  if(queryParams === null){
    console.log('null');
  }else{console.log('queryParams', queryParams);

  }
  const name = queryParams.get('name');
  const role = queryParams.get('role');

  useEffect(() => {
    // sessionStorage에서 값 가져오기
    // const storedUserName = sessionStorage.getItem("userName") || name;
    // const storedRole = sessionStorage.getItem("role") || role;

    // // 상태 업데이트
    // setLoginUserName(storedUserName);
    // setLoginUserRole(storedRole);

    // sessionStorage에 값을 저장
    // sessionStorage.setItem("userName", storedUserName);
    // sessionStorage.setItem("role", storedRole);

    console.log('session : ' , sessionStorage.getItem("userName"), ',', sessionStorage.getItem("role"));
    console.log('query : ' , name, ',', role);
  
  }, [name, role]);

  console.log('session : ' , sessionStorage.getItem("userName"), ',', sessionStorage.getItem("role"));
  console.log('query : ' , name, ',', role);   

    // 선택된 방의 ID, 방 ID
    const [selectedRoomId, setSelectedRoomId] = useState(null); 
    // 선택된 방의 type, 방 type 
    const [selectedRoomType, setSelectedRoomType] = useState(null); 
    // 선택된 방의 user
    const [selectedRoomUser, setSelectedRoomUser] = useState(null); 
    //name으로 변경
    const [loginUserName, setLoginUserName] = useState(null); 
    const [loginUserRole, setLoginUserRole] = useState(null);     
    // 선택한 사이드바
    const [menuName, setMenuName] = useState(null); 
    // 가게 userName
    const [storeName, setStoreName] = useState(null); 
    const [showSendChatMsg, setShowSendChatMsg] = useState(false);
    
    if (sessionStorage.getItem("userName") === null || sessionStorage.getItem("userName") !== name){
      sessionStorage.setItem("userName", name);
      sessionStorage.setItem("role", role);

      console.log('session : ' , sessionStorage.getItem("userName"), ',', sessionStorage.getItem("role"));
      console.log('query : ' , name, ',', role);   
    }

    // if(sessionStorage.getItem("userName") !== name){
    //   setLoginUserName(name);
    //   setLoginUserRole(role);
    //   sessionStorage.setItem("userName", name);
    //   sessionStorage.setItem("role", role);      
  
    // }    

  // sessionStorage에서 값을 가져와 상태에 설정 (초기값 설정)
  useEffect(() => {
    // sessionStorage에서 값 가져오기


    // const storedUserName = sessionStorage.getItem("userName") || name;
    // const storedRole = sessionStorage.getItem("role") || role;

    // // 상태 업데이트
    // setLoginUserName(storedUserName);
    // setLoginUserRole(storedRole);

    // sessionStorage에 값을 저장
    // sessionStorage.setItem("userName", storedUserName);
    // sessionStorage.setItem("role", storedRole);

    console.log('session : ' , sessionStorage.getItem("userName"), ',', sessionStorage.getItem("role"));
    console.log('query : ' , name, ',', role);
  
  }, [name]);


    // 채팅목록 - 채팅방 선택했을 때
    const handleRoomSelect = (roomId) => {
        setSelectedRoomId(roomId);
        setShowSendChatMsg(true);
        console.log("setShowSendChatMsg : ", showSendChatMsg);        
        console.log("selectedRoomId : ", selectedRoomId);
    };

    const handleRoomUser = (users) =>{
        setSelectedRoomUser(users); 
        console.log("selectedRoomUser : ", selectedRoomUser);    
      }    

    const handleRoomType = (type) => {
      setSelectedRoomType(type); 
      console.log("selectedRoomType : ", selectedRoomType);
    };

    const clickMenuName = (menu) => {
      setMenuName(menu); 
      setShowSendChatMsg(false);
      console.log("menuName : ", menuName);
    };

    const clickStore = (getStoreName) => {
      //setStoreName(getStoreName);
      setSelectedRoomUser(getStoreName); 
      setShowSendChatMsg(true);
      setSelectedRoomId("");
      setSelectedRoomType(1);
      console.log("storeName : ", storeName);
      console.log("setSelectedRoomUser : ", selectedRoomUser);
    }

    const clickUser = (getUserName) => {
      //setUserName(getUserName);
      setSelectedRoomUser(getUserName); 
      setSelectedRoomId("");
      if (getUserName.length === 1){
        setSelectedRoomType(1);
      }else{
        setSelectedRoomType(0);
      }
      console.log("clickUser : ", getUserName);          
      setShowSendChatMsg(true);
      console.log("clickUser : ", selectedRoomUser);
    }
  
    return (

      <div className='body' style={{ display: 'flex', flexDirection: 'column', height: '100vh' , border:'1px solid black' ,   position: 'relative'}}>
        <Header />
        <div className="flex flex-grow h-full chat-container" style={{border:'1px solid blue' , flexGrow: 1,   width: '100%', height: '100%',  boxSizing: 'border-box'}}>
          <SocketProvider userName={name}>
            <Container>
              <Stack direction="horizontal" gap={1} >
                <ChatRoomListBar menuName={clickMenuName} style={{}}/>
                <div className="p-2" style={{ height: '100%', marginTop : '0' }}>
                  {(menuName === null || menuName === 'chatRoomList' )  && 
                  <ChatRoomList onRoomSelect={handleRoomSelect} 
                    onRoomType={handleRoomType} 
                    onRoomUser={handleRoomUser}/>}
                  {menuName === 'chatRoomSearch' && 
                  <ChatSearch onRoomSelect={handleRoomSelect} 
                    onRoomType={handleRoomType} 
                    onRoomUser={handleRoomUser}/>}
                  {menuName === 'storeSearch' && <StoreSearch  getStoreName = {clickStore}/>}
                  {menuName === 'userSearch' && <UserSearch getUserName={clickUser}/>}
                </div>
                <div className='p-2' style={{ height: '100%', marginTop : '0' }}>
                  {/*showSendChatMsg === true  && 
                  <SendChatMsg 
                  roomId={selectedRoomId} 
                  type={selectedRoomType} 
                  users={selectedRoomUser} 
                  userName={loginUserName}/>*/}
                    <SendChatMsg 
                    roomId='6747de19e6eee1da0d3d0082' 
                    type='0' 
                    users={['userId1', 'userId4']}
                    userName= 'userId3'                    
                    ></SendChatMsg>
                </div>
              </Stack>
            </Container>
          </SocketProvider>
      </div>  
    </div>
    );

}

export default Chat;
