import React from 'react'
import { Datagrid, DateField, EmailField, Filter, FunctionField, List, Pagination, TextField, TextInput } from 'react-admin';
// import SimpleButton from './SimpleButton';


const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="아이디" source="username" alwaysOn />
    </Filter>
);

export const StoreList = (props) => {



return (

  <List {...props} perPage={10} pagination={<Pagination />} filters={<UserFilter />} >
        <Datagrid bulkActionButtons={false}>
            <TextField source="username" label="아이디" />
            <EmailField source="email" label="이메일" />
            <DateField source="regDt" label="가입일"/>
            
        
            <FunctionField
                        label="활동 상태"
                        render={record => {
                          switch (record.activeStatus) {
                            case "ACTIVE":
                              return "활동 가능";
                            case "INACTIVE":
                              return "휴면 계정";
                            case "DELETED":
                              return "탈퇴 계정";
                            default:
                              return "알 수 없음";
                          }
                        }}
                      />
        </Datagrid>
    </List>
);

};