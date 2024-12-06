import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
//import ChatRoomList from './component/GetChatRoomList';
import ChatRoomList from './Component/ChatList';
import AddChatRoom from './Component/AddChatRoom';
import ChatRoomListBar from './Component/ChatRoomListBar';
import SendChatMsg from './Component/SendChatMsg';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import "../../style/chat/Chat.css";
import ChatSearch from './Component/ChatSearch';
import StoreSearch from './Component/StoreSearch';
import UserSearch from './Component/UserSearch';

function Chat() {

    const [selectedRoomId, setSelectedRoomId] = useState(null); // 선택된 방의 ID
    const [selectedRoomType, setSelectedRoomType] = useState(null); // 선택된 방의 type
    const [selectedRoomUser, setSelectedRoomUser] = useState(null); // 선택된 방의 user
    const [loginUserName, setLoginUserName] = useState(null); // userName(로그인된)
    const [menuName, setMenuName] = useState(null); // userName(로그인된)
    const [storeName, setStoreName] = useState(null); // userName(로그인된)
    const [showSendChatMsg, setShowSendChatMsg] = useState(false);

    const handleRoomSelect = (roomId) => {
      setSelectedRoomId(roomId); 
      setShowSendChatMsg(true);
        console.log("setShowSendChatMsg : ", showSendChatMsg);        
      console.log("selectedRoomId : ", selectedRoomId);
    };

    const handleRoomId = (roomId) => {
        setSelectedRoomId(roomId); 
        
        console.log("selectedRoomId : ", selectedRoomId);        
    }

    const handleRoomUser = (users) =>{
        setSelectedRoomUser(users); 
        console.log("selectedRoomUser : ", selectedRoomUser);    
      }    

    const handleRoomType = (type) => {
      setSelectedRoomType(type); 
      console.log("selectedRoomType : ", selectedRoomType);
    };

    const addRoomType = (type) => {
        setSelectedRoomType(type); 
        console.log("selectedRoomType : ", selectedRoomType);
      };
    

    const addRoomUser = (users) =>{
      setSelectedRoomUser(users); 
      console.log("selectedRoomUser : ", selectedRoomUser);    
    }

    const handleUserName = (userName) => {
      setLoginUserName(userName); 
      console.log("loginUserName : ", loginUserName);
    };

    const clickMenuName = (menu) => {
      setMenuName(menu); 
      setShowSendChatMsg(false);
      console.log("menuName : ", menuName);
    };

    const clickStore = (getStoreName) => {
      setStoreName(getStoreName);
      setShowSendChatMsg(true);
      console.log("storeName : ", storeName);
    }

    return (
      <div>
        <div className="flex flex-grow h-full chat-container" style={{}}>
        <SocketProvider>
            {/*<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>*/}
            {/*<div className="chat-container d-flex justify-content-center " style={{ height: '100%', marginTop : '0' }}>*/}
            
                <h2>{/*loginUserName*/}</h2>
                <Container>
                <Stack direction="horizontal" gap={1} >
                  <ChatRoomListBar menuName={clickMenuName}/>

                    <div className="p-2" style={{ height: '100%', marginTop : '0' }}>
                      {(menuName === null || menuName === 'chatRoomList' )  && <ChatRoomList onRoomSelect={handleRoomSelect} 
                        onRoomType={handleRoomType} 
                        onRoomUser={handleRoomUser}/>}
                      {menuName === 'chatRoomSearch' && <ChatSearch onRoomSelect={handleRoomSelect} 
                        onRoomType={handleRoomType} 
                        onRoomUser={handleRoomUser}/>}
                      {/*menuName === 'chatRoomList' && <ChatRoomList onRoomSelect={handleRoomSelect}
                        onRoomType={handleRoomType} 
                        onRoomUser={handleRoomUser}/>*/}
                        {menuName === 'storeSearch' && <StoreSearch  getStoreName = {clickStore}/>}
                        {menuName === 'userSearch' && <UserSearch/>}
                       {/* <ChatRoomList 
                        onRoomSelect={handleRoomSelect} 
                        onRoomType={handleRoomType} 
                        onRoomUser={handleRoomUser}/>*/}
                    </div>

                    {/*<div className="p-2" style={{ height: '100%', marginTop : '0' }}>*/}
                        <AddChatRoom 
                        setUser={handleUserName} 
                        addRoomId = {handleRoomId} 
                        addRoomUser = {addRoomUser} 
                        addRoomType={addRoomType}/>
                    {/*</div>*/}
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
            {/*</div>*/}
            

        
        </SocketProvider>
        
        </div>
        
        </div>
    );

}

export default Chat;


