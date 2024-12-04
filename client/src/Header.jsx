import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div>
        <header class="header-wrap">
            <div class="header">
                <div class="headerMain">
                    <div class="logo">
                        <a id="home" href="/"><img class="logoImg" src="/logo.png"/></a>
                    </div>
                    <div class="login">
                        <ul class="loginMenu">
                            <li class="non-side-bar"><span id="username" class="text-white me-2">username</span></li>
                            <li id="login" class="non-side-bar"><a href="/login">로그인</a></li>
                            <li id="join" class="non-side-bar"><a href="/join">회원가입</a></li>
                        </ul>
                    </div>
                </div>
                <hr class="centerLine"/>
                <div class="headerCategory">
                    <div class="category">
                        <ul class="categoryList">
                            <li><a href="/searchStore">가게 검색</a></li>
                            <li><a href="#">커뮤니티</a></li>
                            <li><a href="#">예약</a></li>
                            <li><a href="#">포인트 상점</a></li>
                            <li><a href="/store/getMyStore">가게관리</a></li>
                        </ul>
                    </div>
                </div>
                <hr class="lastLine"/>
            </div>
            <div class="small_header">
                <div class="small_headerCategory">
                    <div class="small_category">
                        <ul class="small_categoryList">
                            <li class="small_logo">
                                {/*<a href="/"><img class="logoImg" src="/images/logo.png" style={{transform: 'scale(0.8)', transform-origin: 'center'}}/></a>*/}
                                <a href="/"><img class="logoImg" src="/images/logo.png" /></a>
                            </li>
                            <li><a href="/searchStore">가게 검색</a></li>
                            <li><a href="#">커뮤니티</a></li>
                            <li><a href="#">예약</a></li>
                            <li><a href="#">포인트 상점</a></li>
                            <li><a href="/store/getMyStore">가게관리</a></li>
                        </ul>
                    </div>

                </div>
                <hr class="lastLine"/>
            </div>
        </header>
        </div>
    );
};

export default Header;