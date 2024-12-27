import React from 'react';
import './Header.css';

const Header = () => {
  const sessionUserName = sessionStorage.getItem('userName');
  const sessionUserRole = sessionStorage.getItem('role');

  const logout = () =>{
    
    //session 전부 지우기
    sessionStorage.clear();      
    window.location.href = '/user/logout'; 
    //window.location.href = 'http://localhost:8080/user/logout'; 

  }

  return (
    <header className="header-wrap">
      <div className="header">
        <div className="headerMain">
          <div className="logo">
            <a id="home" href="/">
              <img className="logoImg" src="./logo.png" alt="Logo" />
            </a>
          </div>

          {sessionUserName ? (
            <div className="login">
              <ul className="loginMenu">
                {sessionUserRole === 'ROLE_USER' && (
                  <li className="non-side-bar">
                    <a href="#">
                      <img src="./icon_chat.png" alt="Chat Icon" />
                    </a>
                  </li>
                )}
                {sessionUserRole === 'ROLE_USER' && (
                  <li className="non-side-bar">
                    <a href="/getStoreLikeList">
                      <img src="./icon_heart_red.png" alt="Heart Icon" />
                    </a>
                  </li>
                )}
                <li className="non-side-bar">
                  <span style={{ fontWeight: 'bold' }} className=" me-2">
                    {sessionUserName}
                  </span>
                </li>
                <li id="/user/setting" className="non-side-bar">
                  <a href="/user/setting">
                    <img className="logout" src="./settings.png" alt="Settings Icon" />
                  </a>
                </li>
                <li id="logout">
                  <a href="#"  onClick={logout}>
                    <img className="logout" src="./logout.png" alt="Logout Icon" />
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="login">
              <ul className="loginMenu">
                <li id="login" className="non-side-bar">
                  <a href="/user/login">
                  {/* <a href="https://placehere.store/user/login"> */}
                    <img className="login" src="./login.png" alt="Login Icon" />
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
        <hr className="centerLine" />
        <div className="headerCategory">
          <div className="category">
            <ul className="categoryList">
              <li>
                {/* <a href="https://placehere.store/searchStore">가게 검색</a> */}
                <a href="/searchStore">가게 검색</a>
              </li>
              <li>
                {/* <a href="https://placehere.store/review/getReviewList">커뮤니티</a> */}
                <a href="/review/getReviewList">커뮤니티</a>
              </li>
              <li>
                {sessionUserName && (
                  <div>
                    {sessionUserRole === 'ROLE_USER' && (
                      // <a href="https://placehere.store/reservation/getRsrvUserList">예약</a>
                      <a href="/reservation/getRsrvUserList">예약</a>
                    )}
                    {sessionUserRole === 'ROLE_STORE' && (
                      // <a href="https://placehere.store/reservation/getRsrvStoreList">예약</a>
                      <a href="/reservation/getRsrvStoreList">예약</a>
                    )}
                  </div>
                )}
              </li>
              {sessionUserName && (sessionUserRole === 'ROLE_USER' || sessionUserRole === 'ROLE_POINT') && (
                <li>
                  {/* <a href="https://placehere.store/product/listProduct">포인트 상점</a> */}
                  <a href="/product/getProductList">포인트 상점</a>
                </li>
              )}
              {sessionUserName && sessionUserRole === 'ROLE_STORE' && (
                <li>
                  {/* <a href="https://placehere.store/store/getMyStore">가게관리</a> */}
                  <a href="/store/getMyStore">가게관리</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <hr className="lastLine"  />
      </div>


    </header>
  );
};

export default Header;
