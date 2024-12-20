import React from "react";
import { Datagrid, DateField, Filter, FunctionField, List, Pagination, TextField, TextInput } from "react-admin";

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="아이디" source="username" alwaysOn />
    </Filter>
);

export const RsrvList = (props) => (

    <List {...props} perPage={10} pagination={<Pagination />} filters={<UserFilter />} >
        <Datagrid bulkActionButtons={false}>
            <TextField source="rsrvNo" label="예약번호" /> 
            {/* <TextField source="storeId" label="가게번호" />  */}
            <TextField source="userName" label="예약자 이름" /> 
            <TextField source="rsrvStatus" label="예약상태" /> 
            <DateField source="rsrvDt" label="예약일" /> 
            {/* <TextField source="rsrvPerson" label="예약인수"/>  */}
            {/* <TextField source="rsrvReq" label="예약 요청 사항"/>  */}
            {/* <TextField source="reason" label="환불 사유"/>  */}
            <DateField source="rsrvCreateTime" label="예약 요청일" /> 
            <TextField source="storeName" label="매장명"/> 
            {/* <TextField source="storeAddr" label="매장주소"/> */}
            {/* <TextField source="amount" label="가격"/>  */}
            <FunctionField
                source="rsrvNumber"
                render={(record) => {
                if (!record.rsrvNumber) return ''; // 데이터가 없는 경우 처리
                const number = record.rsrvNumber.replace(/\D/g, ''); // 숫자만 추출
                return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 포맷팅
                }}
            />
        </Datagrid>
    </List>

);