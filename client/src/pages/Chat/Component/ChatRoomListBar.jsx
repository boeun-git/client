import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarMenu,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ menuName }) => {
  const menuClick = (menu) => {
    // 클릭한 메뉴에 따라 상태 변경
    menuName(menu);
    console.log('ChatRoomListBar : ', menu);
  };
  const role = sessionStorage.getItem("role");

  return (
    <div style={{margin:'0', padding:'0', display: 'flex', height: '86vh', marginTop:'0' }}>
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#4880FF"
        toggled = "false"
        style={{margin:'0', padding:'0'}}
      >
        <CDBSidebarContent className="sidebar-content">
        {//role이 user일 때 채팅목록, 채팅검색, 회원검색, 가게검색
        (role === 'ROLE_USER' ) ? (
          <CDBSidebarMenu>
            <NavLink  activeClassName="activeClicked" onClick={() => menuClick('chatRoomList')}>
              <b><center>채팅<br/>목록</center></b>
              <hr/>
            </NavLink>
            <NavLink exact activeClassName="activeClicked" onClick={() => menuClick('chatRoomSearch')}>
              <b><center>채팅<br/>검색</center></b>
              <hr/>
            </NavLink>
            <NavLink exact activeClassName="activeClicked"  onClick={() => menuClick('userSearch')}>
              <b><center>회원<br/>검색</center></b>
              <hr/>
            </NavLink>
            <NavLink exact activeClassName="activeClicked" onClick={() => menuClick('storeSearch')}>
              <b><center>가게<br/>검색</center></b>
              <hr/>
            </NavLink>
          </CDBSidebarMenu> ):(
            //role이 user가 아닐 때(store) 채팅목록, 채팅검색
          <CDBSidebarMenu>
            <NavLink  activeClassName="activeClicked" onClick={() => menuClick('chatRoomList')}>
              <b><center>채팅<br/>목록</center></b>
              <hr/>
            </NavLink>
            <NavLink exact activeClassName="activeClicked" onClick={() => menuClick('chatRoomSearch')}>
              <b><center>채팅<br/>검색</center></b>
              <hr/>
            </NavLink>
          </CDBSidebarMenu>)}
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;