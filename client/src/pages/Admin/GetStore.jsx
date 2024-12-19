import React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, DateField, TabbedShowLayout } from 'react-admin';

export const GetStore = (props) => (

    <Show>
        <TabbedShowLayout>

            <TabbedShowLayout.Tab label="사용자 정보">
                <TextField source="username" label="아이디" />
                <EmailField source="email" label="이메일" />
                <TextField source="regDt" label="가입일" />
                <TextField source="activeStatus" label="활동상태" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="프로필 사진">
                <TextField source="profile_img" label="프로필사진" />
            </TabbedShowLayout.Tab>

        </TabbedShowLayout>


    </Show>





    // <Show {...props}>
    //     <SimpleShowLayout>
    //         <TextField source="username" label="아이디" />
    //         <EmailField source="email" label="이메일" />
    //         <DateField source="regDt" label="가입일" />
    //         <TextField source="activeStatus" label="활동상태" />
    //     </SimpleShowLayout>
    // </Show>
);
