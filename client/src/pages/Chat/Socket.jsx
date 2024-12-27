import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatSpinner from './Spinner';

const SocketContext = createContext();
export const SocketProvider = ({ children, userName }) => {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null);

    useEffect(() => {
        if (!userName) {
            return <ChatSpinner />;
        }

        if (!socketRef.current) {
            //socketRef.current = io("http://localhost:3001", {
            socketRef.current = io("wss://placehere.store", {  //이거로 주석 풀기
                transports: ['websocket'],
                query: { userName },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
            });

            // 연결된 소켓 ID 로그 출력
            socketRef.current.on('connect', () => {
                console.log('Connected with socket id:', socketRef.current.id);
            });

            setSocket(socketRef.current); // 상태를 통해 하위 컴포넌트에 소켓 전달
        }

        const handleBeforeUnload = () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Socket disconnected on page unload');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
    //}, [userName]);

    return (
        <SocketContext.Provider value={socket} name={userName}>
            {children}
        </SocketContext.Provider>
    );
};

// useSocket 훅 - 다른 컴포넌트에서 socket 사용
export const useSocket = () => useContext(SocketContext);
