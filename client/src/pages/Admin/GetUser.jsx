// src/UserShow.js
import React from "react";
import { Show, SimpleShowLayout, TextField, EmailField } from "react-admin";

export const GetUser = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="username" label="아이디" />
      <EmailField source="email" label="이메일" />
      <TextField source="regDt" label="가입일" />
      <TextField source="activeStatus" label="활동 상태" />
    </SimpleShowLayout>
  </Show>
);
