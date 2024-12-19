// src/UserShow.js
import React from "react";
import { TextField, List, Datagrid, DateField, Pagination } from "react-admin";

export const BatchList = (props) => (
  <List {...props} perPage={10} pagination={<Pagination />} >
    <Datagrid>
          <TextField source="id" label="배치번호" />
          <TextField source="batchName" label="배치 이름" />
          <TextField source="status" label="상태" />
          <DateField source="execDt" label="실행일" />
      </Datagrid>
  </List>
);
