import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
import ChatRoomList from './Component/ChatList';
import ChatRoomListBar from './Component/ChatRoomListBar';
//import SendChatMsg from './Component/SendChatMsg';
import SendChatMsg from './Component/sendmsg';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import "../../style/chat/Chat.css";
import ChatSearch from './Component/ChatSearch';
import StoreSearch from './Component/StoreSearch';
import UserSearch from './Component/UserSearch';
import { useParams } from 'react-router-dom';

function Chat() {

    //query로 넘겨받은 userName, role
    const { name, role } = useParams(); 
    // 선택된 방의 ID, 방 ID
    const [selectedRoomId, setSelectedRoomId] = useState(null); 
    // 선택된 방의 type, 방 type 
    const [selectedRoomType, setSelectedRoomType] = useState(null); 
    // 선택된 방의 user
    const [selectedRoomUser, setSelectedRoomUser] = useState(null); 
    //name으로 변경
    const [loginUserName, setLoginUserName] = useState(null); 
    // 선택한 사이드바
    const [menuName, setMenuName] = useState(null); 
    // 가게 userName
    const [storeName, setStoreName] = useState(null); 
    const [showSendChatMsg, setShowSendChatMsg] = useState(false);
    
    // sessionStorage 사용
    sessionStorage.setItem("userName", name); 
    sessionStorage.setItem("role", role); 

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
      setStoreName(getStoreName);
      setShowSendChatMsg(true);
      setSelectedRoomId("");
      setSelectedRoomType(1);
      console.log("storeName : ", storeName);
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
      <div>
        <div className="flex flex-grow h-full chat-container" style={{}}>
          <SocketProvider userName={name}>
            <Container>
              <Stack direction="horizontal" gap={1} >
                <ChatRoomListBar menuName={clickMenuName}/>
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
                  {showSendChatMsg === true  && 
                  <SendChatMsg 
                    roomId={selectedRoomId} 
                    type={selectedRoomType} 
                    users={selectedRoomUser} 
                    userName={loginUserName} />}
                </div>
              </Stack>
            </Container>
          </SocketProvider>
      </div>  
    </div>
    );

}

export default Chat;


