import { Datagrid, DateField, List, TextField } from "react-admin";

export const RsrvList = (props) => (

    <List {...props}>
        <Datagrid>
            <TextField source="rsrvNo" label="예약번호" />
            <TextField source="userName" label="예약자 이름" />
            <TextField source="rsrvStatus" label="예약상태" />
            <DateField source="rsrvDt" label="예약일" />
            <TextField source="rsrvPerson" label="예약인수"/>
            <TextField source="rsrvReq" label="예약 요청 사항"/>
            {/* <TextField source="reason" label="환불 사유"/> */}
            {/* <DateField source="rsrvCreateTime" label="예약 요청 일" /> */}
            <TextField source="storeName" label="매장명"/>
            {/* <TextField source="storeAddr" label="매장주소"/> */}
            {/* <TextField source="rsrvNumber" label="예약자 전화번호"/> */}
        </Datagrid>
    </List>

);