import { useEffect, useState } from 'react';
import { SocketProvider } from './Socket';
import ChatRoomList from './Component/GetChatRoomList';
import AddChatRoom from './Component/AddChatRoom';
import ChatRoomListBar from './Component/ChatRoomListBar';
import SendChatMsg from './Component/SendChatMsg';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
//import "../../style/Chat.css";

function Chat() {

    const [selectedRoomId, setSelectedRoomId] = useState(null); // 선택된 방의 ID
    const [selectedRoomType, setSelectedRoomType] = useState(null); // 선택된 방의 type
    const [selectedRoomUser, setSelectedRoomUser] = useState(null); // 선택된 방의 user
    const [loginUserName, setLoginUserName] = useState(null); // userName(로그인된)

    const handleRoomSelect = (roomId) => {
      setSelectedRoomId(roomId); 
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

    return (
        <div className="flex flex-grow h-full">
        <SocketProvider>
            {/*<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>*/}
            {/*<div className="chat-container d-flex justify-content-center " style={{ height: '100%', marginTop : '0' }}>*/}
            
                <h2>{/*loginUserName*/}</h2>
<Container>
                <Stack direction="horizontal" className="chat-container" gap={1} >
                    <div className="p-2 sm-auto" style={{ height: '100%', marginTop : '0' }}> 
                        {/*<ChatRoomListBar/>*/}
                        <ChatRoomListBar />
                    </div>
                    <div className="p-2" style={{ height: '100%', marginTop : '0' }}>
                        <ChatRoomList 
                        onRoomSelect={handleRoomSelect} 
                        onRoomType={handleRoomType} 
                        onRoomUser={handleRoomUser}/>
                    </div>
                    <div className="p-2" style={{ height: '100%', marginTop : '0' }}>
                        {<AddChatRoom 
                        setUser={handleUserName} 
                        addRoomId = {handleRoomId} 
                        addRoomUser = {addRoomUser} 
                        addRoomType={addRoomType}/>}
                    </div>
                    <div className='p-2' style={{ height: '100%', marginTop : '0' }}>
                        <SendChatMsg 
                        roomId={selectedRoomId} 
                        type={selectedRoomType} 
                        users={selectedRoomUser} 
                        userName={loginUserName} />
                    </div>
                </Stack>    
                </Container>                
            {/*</div>*/}
        
        </SocketProvider>
        </div>
    );

}

export default Chat;


