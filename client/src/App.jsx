import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import { BrowserRouter } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import { UserList } from './pages/Admin/UserList';
import { GetUser } from './pages/Admin/GetUser';
import CustomDataProvider from './components/admin/CustomDataProvider';
import { StoreList } from './pages/Admin/StoreList';
import { GetStore } from './pages/Admin/GetStore';
import { RsrvList } from './pages/Admin/RsrvList';
import { GetRsrv } from './pages/Admin/GetRsrv';


const App = () => (

  <BrowserRouter>
    <Admin dataProvider={CustomDataProvider}>

      <Resource 
        name="getUserList" 
        list={UserList} 
        show={GetUser}
        // edit={UserEdit}
        options={{ label: '일반회원 목록' }} />

      <Resource 
        name="getStoreList" 
        list={StoreList} 
        show={GetStore} 
        options={{ label: '점주회원 목록' }} />

      <Resource 
        name="getRsrvList" 
        list={RsrvList} 
        show={GetRsrv} 
        options={{ label: '예약 목록' }} />


    </Admin>
  </BrowserRouter>
);

export default App;
