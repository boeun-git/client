import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import ChatSpinner from './Component/Spinner';

// SocketContext 생성
const SocketContext = createContext();

// SocketProvider 컴포넌트 - Socket을 하위 컴포넌트들에게 제공
export const SocketProvider = ({ children, userName }) => {
    const [socket, setSocket] = useState(null);
    const socketRef = useRef(null); // ref를 사용하여 소켓 인스턴스를 계속 유지

    useEffect(() => {
        if (!userName) {
            console.warn("SocketProvider: No userName provided.");
            return <ChatSpinner />;
        }

        if (!socketRef.current) {
            // userName이 제공되었을 때만 새 소켓을 연결
            socketRef.current = io("http://localhost:3001", {

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

        // 브라우저 종료/새로고침 시 소켓 연결 해제
        const handleBeforeUnload = () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log('Socket disconnected on page unload');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // 컴포넌트가 언마운트 될 때 소켓 연결 해제
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []); // userName이 변경되었을 때만 효과 적용
    //}, [userName]); // userName이 변경되었을 때만 효과 적용

    return (
        <SocketContext.Provider value={socket} name={userName}>
            {children}
        </SocketContext.Provider>
    );
};

// useSocket 훅 - 다른 컴포넌트에서 socket 사용
export const useSocket = () => useContext(SocketContext);
