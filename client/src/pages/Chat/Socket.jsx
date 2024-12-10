import React, { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

// SocketContext 생성
const SocketContext = createContext();

// SocketProvider 컴포넌트 - Socket을 하위 컴포넌트들에게 제공
export const SocketProvider = ({ children, userName })=> {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (userName) {
            const socketInstance = io("http://localhost:3001", {
                transports: ['websocket'], // 연결에 WebSocket 사용
                query: { userName } // userName을 쿼리로 전달
            });

            // 연결된 소켓 ID 로그 출력
            socketInstance.on('connect', () => {
                console.log('Connected with socket id:', socketInstance.id);
            });

            setSocket(socketInstance);

            // 컴포넌트가 언마운트 될 때 소켓 연결 해제
            return () => {
                socketInstance.disconnect();
            };
        }
    }, [userName]); //socket

    return (
        <SocketContext.Provider value={socket} name={userName }>
            {children}
        </SocketContext.Provider>
    );
};

// useSocket 훅 - 다른 컴포넌트에서 socket 사용
export const useSocket = () => useContext(SocketContext);
