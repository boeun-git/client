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
  };

  return (
    <div style={{margin:'0', padding:'0',  border:'1px solid red', display: 'flex', height: '100vh', marginTop:'0'/*, overflow: 'scroll initial' */}}>
      <CDBSidebar
        textColor="#fff"
        /*backgroundColor="#4880FF"*/
        backgroundColor="#4880FF"
        toggled = "false"
        style={{margin:'0', padding:'0'/*' marginLeft: '40%'200px'*/ }} // 원하는 간격으로 변경
      >


        <CDBSidebarContent className="sidebar-content" style={{/*border: '1px solid black'*/}}>
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
          </CDBSidebarMenu>
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