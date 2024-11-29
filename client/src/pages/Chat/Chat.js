/*import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');  // 서버 주소

function Chat() {
    const [socketId, setSocketId] = useState('');

    useEffect(() => {
        // 서버에서 socket.id를 받아서 상태에 저장
        socket.on('socketId', (id) => {
            setSocketId(id);
        });

        return () => {
            socket.off('socketId');  // cleanup on unmount
        };
    }, []);

    return (
        <div>
            <h2>Your Socket ID: {socketId}</h2>
            <p>This is the unique ID of your connection to the server.</p>
        </div>
    );
}

export default Chat;*/
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatRoomList from './Component/GetChatRoomList';
import AddChatRoom from './Component/AddChatRoom';

const socket = io('http://localhost:3001');  // 서버 주소

function Chat() {
    const [userName, setuserName] = useState('user123');  // 임시 사용자 ID
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([]);

    useEffect(() => {
        // 사용자가 로그인할 때 서버에 userId를 전송
        socket.emit('registerUser', userName);

        // 메시지 수신 이벤트
        socket.on('receiveMessage', (message) => {
            setReceivedMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();  // cleanup on unmount
        };
    }, [userName]);

    const sendMessage = (chatUserName, message) => {
        socket.emit('sendMessageToUser', chatUserName, message);
    };

    return (
        
        <div>
            <div>
                <ChatRoomList/>
            </div>
            <div>
                <AddChatRoom/>
            </div>
            
            <h2>메세지 보내는 화면</h2>
            
            <div>
                
                {receivedMessages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            {/* 내가 나에게 보내는 메세지 */}
            <button onClick={() => sendMessage('user123', 'Hello user123!')}>
                전송
            </button>
        </div>
    );
}

export default Chat;

