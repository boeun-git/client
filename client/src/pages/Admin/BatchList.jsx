// src/UserShow.js
import React from "react";
import { TextField, List, Datagrid, DateField, Pagination } from "react-admin";

export const BatchList = (props) => (
  <List {...props} perPage={10} pagination={<Pagination />} >
    <Datagrid bulkActionButtons={false}>
          <TextField source="id" label="배치번호" />
          <TextField source="batchName" label="배치 이름" />
          <TextField source="status" label="상태" />
          <DateField 
              source="execDt" 
              label="실행일" 
              showTime 
              options={{ 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  second: '2-digit', 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit' 
              }} 
          />
      </Datagrid>
  </List>
);
