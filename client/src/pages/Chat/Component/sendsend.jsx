import React, { useState, useEffect, useRef } from "react";
import "./sendmsg.css";
import { useSocket } from "../Socket";
import axios from "axios";

const SendChatMsg = ({ roomId,  type, users, usersRole, storeName }) => {
  console.log("ROOMID : ", roomId);
  console.log("TYPE : ", type);
  console.log("USERS : ", users);
  console.log("USERSROLE : ", usersRole);
  console.log("STORENAME : ", storeName);
  
  const socket = useSocket();
  const [room, setRoom] = useState("");
  // const [userName, setUserName] = useState('');
  const [chatUserName, setChatUserName] = useState([]);
  const [chatUserNames, setChatUserNames] = useState([]);  
  const [msg, setMsg] = useState("");
  const [imageName, setImageName] = useState(null);
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [receiveImg, setReceiveImg] = useState(null);
  const [preReceiveMsg, setPreReceiveMsg] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState("");
  const [preMsgType, setPreMsgType] = useState([]);
  const [msgType, setMsgType] = useState([]);
  const [onoff, setOnoff] = useState([]);
  const [post, setPost] = useState("");
  const [preTime, setPreTime] = useState([]);  
  const [time, setTime] = useState([]);  
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const [sendRoomId, setSendRoomId] = useState("");
  //setSendRoomId(roomId);
  console.log("sendRoomId : ", sendRoomId);
  const messageEndRef = useRef(null);
  const userName = sessionStorage.getItem("userName");
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    console.log('chatUser post updated : ', post);
  }, [post]);

  useEffect(() => {

    if (sendRoomId !== null && sendRoomId.length > 1){
                axios
                //.get("http://localhost:3001/api/getChatMsg", {
                .get("https://placehere.store/api/getChatMsg", {
                // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
                params: { roomId: sendRoomId, userName: userName},
                })
                .then((response) => {
                // 서버로부터 받은 데이터 처리
                console.log("userName : ", userName);
                setPreReceiveMsg(response.data.data);
                
                const msgTypes = response.data.data.map((item) => item.msg_type);
                setPreMsgType(msgTypes);

                const msgTime = response.data.data.map((item) => item.msg_dt);
                setPreTime(msgTime);
        
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
  },[sendRoomId]);

  useEffect(() => {

    setSendRoomId(roomId);

    console.log("send socketid", socket);
    console.log("send sendRoomId", sendRoomId);
    console.log("send roomId", roomId);
    //console.log("send roomId", roomId.length);
    // API 요청
    if ( roomId != null && roomId.length > 1){
        console.log("notnull sendRoomId : ", sendRoomId);
      axios
        //.get("http://localhost:3001/api/getChatMsg", {
        .get("https://placehere.store/api/getChatMsg", {
          params: { roomId: roomId, userName: userName},
        })
        .then((response) => {
          // 서버로부터 받은 데이터 처리
          console.log("userName : ", userName);
          setPreReceiveMsg(response.data.data);
          
          const msgTypes = response.data.data.map((item) => item.msg_type);
          setPreMsgType(msgTypes);
          const msgTime = response.data.data.map((item) => item.msg_dt);
          setPreTime(msgTime);

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
      console.log('users : ', users, "Array.isArray(users)", Array.isArray(users));
      if(Array.isArray(users)){
        users = users[0] ;
        usersRole = usersRole[0];
      }

      if(Array.isArray(storeName)){
        storeName = storeName[0] ;
      }

    //axios.post('http://localhost:3001/api/addChatRoom', {
      axios.post('https://placehere.store/api/addChatRoom', {
          //userName, 채팅할 회원 아이디
          //chat_user: [userName, users],
          chat_user: [
            {
              userName: userName, 
              //storeName: storeName,
              user_type: role
            },
            { 
              userName: users, 
              storeName: storeName,
              user_type: usersRole
            }
          ],
          //0:단체, 1: 1대1
          chat_type: 1
      })
      .then((response) => {
          // 서버로부터 받은 데이터 처리
          //setChatRoomAdd(response.data.data.data);
          console.log('1:1 addChatRoom.js : ', response.data.data);
        // _id가 바로 존재하는 경우 처리
        if (response.data.data._id) {
            setSendRoomId(response.data.data._id);
            console.log('Found _id:', response.data.data._id);
        } 
        // response.data.data.data[0]._id가 존재하는 경우 처리
        else if (response.data.data[0]._id) {
            //roomId = response.data.data[0]._id.toString();
            setSendRoomId(response.data.data[0]._id);
            console.log('Found _id in data array:', sendRoomId);
        } 
        else {
            // 두 조건에 해당하지 않는 경우 처리
            console.log('Invalid data structure or _id not found');
        }     
      })
      .catch((error) => {
          console.error('Error 1:1 addChatRoom.js : ', error);

          console.error('Error 1:1 addChatRoom.js : ', error.response.data.data);

          setOnoff(error.response.data.data);
      });

    }else{
      console.log('type 0 - users : ' , users);
      
      
      //axios.post('http://localhost:3001/api/addChatRoom', {
      axios.post('https://placehere.store/api/addChatRoom', {
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
        //console.log("socket : ", socket.id);
        console.error('Error group addChatRoom.js : ', error);
        setOnoff(error.response.data.data);
      });
    }
  }, [roomId]);
  //}, [ sendRoomId]);





    useEffect(() => {
        // roomId가 변경될 때마다 메시지와 채팅 사용자 이름 초기화
        setReceiveMsg([]);
        setChatUserName([]);
    }, [sendRoomId, roomId]); // roomId가 변경될 때마다 실행됨

    useEffect(() => {
    //if (socket) {
        console.log("socket : ", socket.id);
        socket.off("receiveMessage");
        socket.off("receiveimage");
        
        socket.on("receiveMessage", (room, msg, chatUserName, msg_type, msg_time) => {
          console.log("Received message:", msg, "From:", chatUserName, "time : ", msg_time);
          
          setRoom(room);
          setChatUserName((prevChatUserName) => [...prevChatUserName, chatUserName]);
          setReceiveMsg((prevMsg) => [...prevMsg, msg]);
          setMsgType((preMsgType) => [...preMsgType, msg_type]);
            // 메시지 시간을 'Asia/Seoul' 타임존으로 변환
            // const date = new Date(msg_time);
            // const koreanTime = date.toLocaleString("ko-KR", {
            //   timeZone: "Asia/Seoul",
            // });             
            //console.log("Received message:", msg, "From:", chatUserName, "koreanTime : ", koreanTime);
          setTime((preTime) => [...preTime, msg_time]);
          console.log("receiveMsg preTime:", preTime);
          console.log("receiveMsg msg_time:", msg_time);
          console.log("receiveMsg time:", time);
            console.log("receiveMsg Received message:", receiveMsg);
          

            //axios.get("http://localhost:3001/api/chkMsg", {
            axios.get("https://placehere.store/api/chkMsg", {
                params: { roomId: room, userName: userName},
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                console.log('chkMsg response: ', response);
            })
            .catch((error) => {
                console.error("Error chkMsg : ", error);
                //console.log("response.data.data : ", response.data.data);
            });

        });

        //io.to(roomId).emit('receiveimage', roomId, imageUrl, sendUser, room_type, msg_type, chatUsers, today.toLocaleString());
        socket.on("receiveimage", (room, msg, chatUserName, room_type, msg_type, chatUsers, msg_time ) => {
            console.log("Received image:", msg, "From:", chatUserName);
            //setReceivedMessage((prevReceivedMessage) => [...prevReceivedMessage, msg]);
            setRoom(room);
            setChatUserName((prevChatUserName) => [...prevChatUserName, chatUserName]);
            setReceiveMsg((prevMsg) => [...prevMsg, msg]);
            setReceiveImg(msg);
            setMsgType((preMsgType) => [...preMsgType, msg_type]);
            // 메시지 시간을 'Asia/Seoul' 타임존으로 변환
            // const date = new Date(msg_time);
            // const koreanTime = date.toLocaleString("ko-KR", {
            //   timeZone: "Asia/Seoul",
            // });              
            setTime((preTime) => [...preTime, msg_time]);

            axios.get("http://localhost:3001/api/chkMsg", {
            //axios.get("https://placehere.store/api/chkMsg", {
                // URL 파라미터로 userId3을 전달 나중에 userName으로 수정
                params: { roomId: room, userName: userName},
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                console.log('chkMsg response: ', response);
            })
            .catch((error) => {
                console.error("Error chkMsg : ", error);
                //console.log("response.data.data : ", response.data.data);
            });

        });
    //}
}, [sendRoomId, roomId]);  // socket이 변경될 때마다 이벤트를 등록하도록 의존성 배열 추가

// receiveMsg 값이 변경될 때마다 로그 출력
  useEffect(() => {
    console.log("Updated receiveMsg:", receiveMsg);
  }, [receiveMsg]); 
  
   // 메시지가 추가될 때마다 스크롤 이동
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receiveMsg, preReceiveMsg]); 

  const fileChange = (e) =>{
    const file = e.target.files[0];
    setImageName(e.target.files[0]);
    setMsg(file.name);
    setIsInputDisabled(true);
  }

  const sendMsg = () => {

    if(imageName !== null){

      const imgEx = imageName.name.split('.').pop().toLowerCase();
      const imageExtensions = ['png', 'jpeg', 'jpg'];
      const videoExtensions = ['mp4', 'mov', 'mwv', 'avi'];
      let fileType = '';
      if (imageExtensions.includes(imgEx)) {
        fileType = 1; // 이미지 파일
      } else if (videoExtensions.includes(imgEx)) {
        fileType = 2; // 비디오 파일
      }
  
      const reader = new FileReader();
      reader.onload = function(e) {
          const imgBuffer = e.target.result;
          const fileName = imageName.name;
          socket.emit('image', roomId, imgBuffer, userName, type, fileType, users, fileName);
      };
      reader.readAsArrayBuffer(imageName); 
      setIsInputDisabled(false);
      setImageName("");
      setMsg("");

    }else if(msg.length > 0){

      socket.emit("sendMsg", sendRoomId, msg, userName, type, 0, users);
      console.log("sendMsg: ", sendRoomId, msg, userName, type, 0, users);
      setMsg("");

    }
  };

  return (
    
    <div className=" h-screen flex flex-col  " 
    style={{height : "88vh"}}>

      {/* <div className="border h-screen flex flex-col max-w-lg mx-auto" style={{height : "76vh"}} > */}
      <div class="bg-blue-500 p-4 text-white flex justify-between items-center" style={{height : "10vh", backgroundColor:"#4880FF"}}>
        <span><b>{/*users.join(', ')*/ (usersRole[0]==="ROLE_USER" || usersRole === "ROLE_USER") ? users : storeName }</b></span>
      </div>
      <div className="border relative inline-block text-left" >
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ height: "68vh", overflowY: "auto"/**/ }}>
          {/* 여기에 스크롤을 추가하려면 div를 사용 */}
          <div className="flex flex-col space-y-2" >
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
                            {
                              room.msg_type === 0 ? (
                                room.msg
                              ) : room.msg_type === 1 ? (
                                <img src={`https://placehere-bucket.s3.ap-northeast-2.amazonaws.com/chat/${room.msg}`} alt="message"  style={{ width:"200px", height:"200px"  ,objectFit:"scale-down"}} />
                              ) : (
                                <video src={`https://placehere-bucket.s3.ap-northeast-2.amazonaws.com/chat/${room.msg}`} controls style={{width:"300px", height:"150px", objectFit:"scale-down"}} />
                              )
                            }
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
                                <p className="text-xs"> {(usersRole[0] === "ROLE_STORE" || usersRole === "ROLE_STORE" )? storeName : room.sender_id }</p>
                                <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                                {
                              room.msg_type === 0 ? (
                                room.msg
                              ) : room.msg_type === 1 ? (
                                <img src={`https://placehere-bucket.s3.ap-northeast-2.amazonaws.com/chat/${room.msg}`} alt="message"  style={{ width:"200px", height:"200px"  ,objectFit:"scale-down"}} />
                              ) : (
                                <video src={`https://placehere-bucket.s3.ap-northeast-2.amazonaws.com/chat/${room.msg}`} controls style={{width:"300px", height:"150px", objectFit:"scale-down"}} />
                              )
                            }
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
                
              room === sendRoomId && (
                
                  chatUserName[index] === userName ? (

                    <div key={index} className="mb-4">
                        <div className="flex justify-end">
                            <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                            {msgType[index] === 0 ? (
                                  msg
                              ) : msgType[index] === 1 ? (
                                <img src={msg} alt="message"  style={{ width:"200px", height:"200px"  ,objectFit:"scale-down"}} />
                              ) : (
                                <video src={msg} controls style={{width:"300px", height:"150px", objectFit:"scale-down"}} />
                              )
                            }
                            </div>
                        </div>
                        <div className="flex justify-end text-xs text-gray-500 mt-1">
                        ({time[index]})
                        </div>
                    </div>
                  ) : (
                    <div key={index} className="mb-4">
                        <div className="flex">
                            <div className="text-black">
                                <p className="text-xs"> {(usersRole[0] === "ROLE_STORE" || usersRole === "ROLE_STORE" )? storeName : chatUserName[index] }</p>
                                <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                             {msgType[index] === 0 ? (
                                    msg
                                ) : msgType[index] === 1 ? (
                                  <img src={msg} alt="message" style={{ width:"200px", height:"200px"  ,objectFit:"scale-down"}} />
                                ) : (
                                  <video src={msg} controls style={{width:"320px", height:"150px", objectFit:"scale-down"}} />
                                )
                              }
                                </div>
                            </div>
                        </div>
                        <div className="flex text-xs text-gray-500 mt-1">
                        ({time[index]})
                        </div>
                    </div>
                  )
                )
            )}
            <div ref={messageEndRef} />
          </div>
        </div>
      {(onoff !== 'offline') ? (
        <div className="bg-white p-4 flex items-center" style={{ height : "9.5vh"}}>
          
          <button
            className=" px-4 py-2 "
            style={{ border: "0px", backgroundColor: "white" }}
            onClick={() => document.getElementById("fileInput").click()}
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
            type="file"
            id="fileInput"
            accept="image/png, image/jpeg, image/jpg, video/mp4, video/mov, video/mwv, video/avi"
            style={{ display: "none" }} // 버튼 클릭 시만 보이게 하기 위해 숨김
            //onChange={(e) => setImageName(e.target.files[0])}
            onChange={fileChange}
            //onChange={(e) => setImageName(e.target.value)}
            // 파일 선택 시 호출될 이벤트 핸들러{/* onChange=handleFileChange*/}
          />

          {/*file && <p>선택한 파일: {file.name}</p>*/}

          <input
            type="text"
            placeholder="입력하세요"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            disabled={isInputDisabled}
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
        <div className=" bg-gray-200 p-4 flex items-center" style={{ height : "9.5vh"}}>
          
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
