/*import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';


const ChatRoomListBar = () => {
  return (
    <ButtonGroup vertical>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
      <Button>Button</Button>
    </ButtonGroup>
  );
}

export default ChatRoomListBar;

const ChatRoomListBar = () => {
    return (
        <div>
            
        </div>
    );
};

export default ChatRoomListBar;*/
import Nav from 'react-bootstrap/Nav';

function StackedExample() {
  return (
    <Nav variant="pills" defaultActiveKey="/home" className="flex-column" style={{border:'1px black solid'}}>
      <Nav.Link href="/home">채팅목록</Nav.Link>
      <Nav.Link eventKey="link-1">채팅검색</Nav.Link>
      <Nav.Link eventKey="link-2">회원검색</Nav.Link>
      <Nav.Link eventKey="link-3">가게검색</Nav.Link>
    </Nav>
  );
}

export default StackedExample;
/*import React from "react";
import '../../../style/Sidebar.css';

function Sidebar({ activeMenu, setActiveMenu }) {
  const menus = ["채팅 목록", "채팅 검색", "회원 검색", "가게 검색"];

  return (
    <div className="sidebar">
      <ul>
        {menus.map((menu) => (
          <li
            key={menu}
            className={activeMenu === menu ? "active" : ""}
            onClick={() => setActiveMenu(menu)}
          >
            {menu}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;*/
