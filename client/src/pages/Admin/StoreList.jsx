import React from 'react'
import { Datagrid, EmailField, List, Pagination, TextField } from 'react-admin';
// import SimpleButton from './SimpleButton';

export const StoreList = (props) => {



return (

  <List {...props} perPage={10} pagination={<Pagination />} >
        <Datagrid>
            {/* <TextField source="id" label="번호" /> */}
            <TextField source="username" label="아이디" />
            <EmailField source="email" label="이메일" />
            <TextField source="regDt" label="가입일" />
            {/* <TextField source="gender" label="성별" /> */}
            <TextField source="activeStatus" label="활동상태" />
            {/* <SimpleButton/> */}
        </Datagrid>
    </List>
);

};