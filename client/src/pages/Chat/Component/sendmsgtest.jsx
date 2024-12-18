import React, { useState, useEffect, useRef } from "react";
import "./sendmsg.css";
import { useSocket } from "../Socket";
import axios from "axios";

const SendChatMsg = ({ roomId,  type, users }) => {
  console.log("ROOMID : ", roomId);
  const socket = useSocket();
  const [room, setRoom] = useState("");
  // const [userName, setUserName] = useState('');
  const [chatUserName, setChatUserName] = useState([]);
  const [chatUserNames, setChatUserNames] = useState([]);  
  const [msg, setMsg] = useState("");
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [preReceiveMsg, setPreReceiveMsg] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [onoff, setOnoff] = useState([]);

  const [sendRoomId, setSendRoomId] = useState(roomId || null);

  const messageEndRef = useRef(null); // 이 ref를 사용하여 스크롤 끝으로 이동합니다.

  const userName = sessionStorage.getItem("userName");
  useEffect(() => {
    console.log("send socketid", socket);
    console.log("send sendRoomId", sendRoomId);
    console.log("send roomId", roomId);
    // API 요청
    if (sendRoomId !== null){
      axios
        .get("http://localhost:3001/api/getChatMsg", {
          // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
          params: { data: sendRoomId },
        })
        .then((response) => {
          // 서버로부터 받은 데이터 처리
          console.log("userName : ", userName);
          setPreReceiveMsg(response.data.data);

          console.log("response : ", response);
          console.log("response.data : ", response.data);
          console.log("response.data.data : ", response.data.data);
          console.log("response.data.data[0] : ", response.data.data[0]);
          //console.log('preReceiveMsg : ', preReceiveMsg);
        })
        .catch((error, response) => {
          console.error("Error getChatRoomList.js : ", error);
          //console.log("response.data.data : ", response.data.data);
        });
    }

    // 1대1
    if(type === 1){
      console.log('sendmsg userName : ', userName);
      axios.post('http://localhost:3001/api/addChatRoom', {
          //나중에 userName, 채팅할 회원 아이디로 수정
          //chat_user: [userName, chatUserName],
          //chat_user: [userName, users[0]],
          chat_user: [userName, users],
          //chat_user: ['userId1', 'userId3'],
          //0:단체, 1: 1대1
          chat_type: 1
      })
      .then((response) => {
          // 서버로부터 받은 데이터 처리
          //setChatRoomAdd(response.data.data.data);
          console.log('1:1 addChatRoom.js : ', response.data.data);
          
          
          console.log('response : ', response);
          console.log('response.data : ', response.data);
          console.log('response.data.data : ', response.data.data);
          console.log('response.data.data.data : ', response.data.data.data);
          console.log('response.data.data.data[0] : ', response.data.data.data[0]);
          console.log('response.data.data.data[0]._id : ', response.data.data.data[0]._id);
          setOnoff();
          setSendRoomId(response.data.data.data[0]._id); // _id 추출

          console.log(' addRoomId : ', roomId);
      })
      .catch((error) => {
          console.error('Error 1:1 addChatRoom.js : ', error);

          console.error('Error 1:1 addChatRoom.js : ', error.response.data.data);

          setOnoff(error.response.data.data);
      });
    }else{
      console.log('type 0 - users : ' , users);
      //const chatUserNamesArray = users.split(',').map(user => user.trim()); // 공백 제거
      //console.log(chatUserNamesArray);
      // // POST 요청
      axios.post('http://localhost:3001/api/addChatRoom', {
          //나중에 userName, 채팅할 회원 아이디로 수정
          chat_user: [userName, ...users],
          //chat_user: ['userId1', 'userId3'],
          //0:단체, 1: 1대1
          chat_type: 0
      })
      .then((response) => {
          // 서버로부터 받은 데이터 처리
          console.log("socket : ", socket.id);
          console.log('group addChatRoom.js response.data.data: ', response.data.data);
          console.log('group addChatRoom.js response.data.data._id: ', response.data.data._id);
          //const roomId = response.data.data.data._id; // _id 추출
          setSendRoomId(response.data.data.data._id); // _id 추출

      })
      .catch((error) => {
        console.log("socket : ", socket.id);
          console.error('Error group addChatRoom.js : ', error);
          setOnoff(error.response.data.data);
      });
    }
  //}, [roomId]);
  }, [ sendRoomId, roomId]);





  useEffect(() => {
    // roomId가 변경될 때마다 메시지와 채팅 사용자 이름 초기화
    setReceiveMsg([]);
    setChatUserName([]);
  }, [sendRoomId, roomId]); // roomId가 변경될 때마다 실행됨

  useEffect(() => {
    //if (socket) {
      console.log("socket : ", socket.id);
        socket.off("receiveMessage");
        
        socket.on("receiveMessage", (room, msg, chatUserName) => {
        
        console.log("Received message:", msg, "From:", chatUserName);
        //setReceivedMessage((prevReceivedMessage) => [...prevReceivedMessage, msg]);
        setRoom(room);
        setChatUserName((prevChatUserName) => [...prevChatUserName, chatUserName]);
        setReceiveMsg((prevMsg) => [...prevMsg, msg]);
        console.log("receiveMsg Received message:", receiveMsg);
        
      });
    //}
  //}, []);  // socket이 변경될 때마다 이벤트를 등록하도록 의존성 배열 추가    
 // }, [socket, sendRoomId, roomId]);  // socket이 변경될 때마다 이벤트를 등록하도록 의존성 배열 추가
}, [sendRoomId, roomId]);  // socket이 변경될 때마다 이벤트를 등록하도록 의존성 배열 추가

  useEffect(() => {
    console.log("Updated receiveMsg:", receiveMsg);
  }, [receiveMsg]); // receiveMsg 값이 변경될 때마다 로그 출력
  
  useEffect(() => {
    // receiveMsg 또는 preReceiveMsg가 변경될 때마다 스크롤을 맨 아래로 이동


    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receiveMsg, preReceiveMsg]);  // 메시지가 추가될 때마다 스크롤 이동

  const sendMsg = () => {
    socket.emit("sendMsg", sendRoomId, msg, userName, type, 0, users);
    console.log("sendMsg: ", sendRoomId, msg, userName, type, 0, users);
    setMsg("");
  };

  return (
    
    <div className=" h-screen flex flex-col  " style={{height : "76vh"}}  >
      {/* <div className="border h-screen flex flex-col max-w-lg mx-auto" style={{height : "76vh"}} > */}
      <div class="bg-blue-500 p-4 text-white flex justify-between items-center">
        <span><b>{/*users.join(', ')*/ users}</b></span>
      </div>
      <div className="border relative inline-block text-left" >
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ height: "68vh", overflowY: "auto"/**/ }}
        >
          {/* 여기에 스크롤을 추가하려면 div를 사용 */}
          <div className="flex flex-col space-y-2"  >
            {preReceiveMsg.map((room, index) => {
              // 메시지 시간을 'Asia/Seoul' 타임존으로 변환
              const date = new Date(room.msg_dt);
              const koreanTime = date.toLocaleString("ko-KR", {
                timeZone: "Asia/Seoul",
              });

              return (
                
                  room.sender_id === userName ? (
                    <div key={index} className="">
                        <div className="flex justify-end">
                            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                                {room.msg}
                            </div>
                        </div>
                        <div className="flex justify-end text-xs text-gray-500 mt-1">
                            ({koreanTime})
                        </div>
                    </div>
                  ) : (
                    <div key={index} className="mb-4">
                        <div className="flex">
                            <div className="text-black">
                                <p className="text-xs"> {room.sender_id}</p>
                                <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                                    {room.msg}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-xs text-gray-500 mt-1">
                            ({koreanTime})
                        </div>
                    </div>
                  )


              );
              
            })}


             {receiveMsg.map(
              (msg, index) =>
                //room === roomId && (
              room === sendRoomId && (
                  chatUserName[index] === userName ? (
                    <div key={index} className="mb-4">
                        <div className="flex justify-end">
                            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                                {msg}
                            </div>
                        </div>
                        <div className="flex justify-end text-xs text-gray-500 mt-1">
                        {index}
                        </div>
                    </div>
                  ) : (
                    <div key={index} className="mb-4">
                        <div className="flex">
                            <div className="text-black">
                                <p className="text-xs"> {chatUserName[index]}</p>
                                <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                                    {msg}
                                </div>
                            </div>
                        </div>
                        <div className="flex text-xs text-gray-500 mt-1">
                        {index}
                        </div>
                    </div>
                  )
                )
            )} 


            {/* {receiveMsg.map(
              (msg, index) =>
                room === roomId && (
                  <p key={index}>
                    {" "}
                    {chatUserName[index]} : {msg}{" "}<br/>
                    {receiveMsg[index]}
                  </p>
                )
            )} */}
            <div ref={messageEndRef} />
          </div>
        </div>
      {(onoff !== 'offline') ? (
        <div className="bg-white p-4 flex items-center">
          
          <button
            className=" px-4 py-2 "
            style={{ border: "0px", backgroundColor: "white" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-paperclip"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="입력하세요"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button onClick={sendMsg} className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        ):
        (
          <div className=" bg-gray-200 p-4 flex items-center">
          
          <button disabled 
            className=" px-4 py-2 bg-gray-300 "
            style={{ border: "0px", backgroundColor: "#E5E7EB" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-paperclip"
              viewBox="0 0 16 16"
            >
              <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0z" />
            </svg>
          </button>
          <input
            disabled 
            type="text"
            placeholder="메시지를 보낼 수 없습니다."
            className="bg-white flex-1 border rounded-full px-4 py-2 focus:outline-none "
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <button disabled onClick={sendMsg} className="disabled  bg-gray-500 text-white rounded-full p-2 ml-2 hover:bg-gray-600 focus:outline-none">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
        </div>
        )}
      </div>
    </div>
  );
};
export default SendChatMsg;
