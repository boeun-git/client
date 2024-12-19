import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import { UserList } from './pages/Admin/UserList';
import { GetUser } from './pages/Admin/GetUser';
import CustomDataProvider from './components/admin/CustomDataProvider';
import { StoreList } from './pages/Admin/StoreList';
import { GetStore } from './pages/Admin/GetStore';
import { RsrvList } from './pages/Admin/RsrvList';
import { GetRsrv } from './pages/Admin/GetRsrv';
import Chat from './pages/Chat/Chat';
import { BatchList } from './pages/Admin/BatchList';

const App = () => (

  // basename 추가
  <BrowserRouter basename='/react'>
    <Routes>
      <Route  path='/chat' element={<Chat />}/>     
      <Route
        path="/*"
        element={
          <Admin dataProvider={CustomDataProvider}>
            <Resource 
              name="getUserList" 
              list={UserList} 
              show={GetUser}
              options={{ label: '일반회원 목록' }} 
            />
            <Resource 
              name="getStoreList" 
              list={StoreList} 
              show={GetStore} 
              options={{ label: '점주회원 목록' }} 
            />
            <Resource 
              name="getRsrvList" 
              list={RsrvList} 
              show={GetRsrv} 
              options={{ label: '예약 목록' }} 
            />
            <Resource 
              name="getBatchList" 
              list={BatchList} 
              options={{ label: '배치 목록' }} 
            />
          </Admin>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default App;