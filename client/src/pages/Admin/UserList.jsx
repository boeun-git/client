import { Datagrid, DateField, EmailField, FunctionField, List, Pagination, ReferenceField, TextField, TextInput } from 'react-admin';
// import { List, SimpleList } from 'react-admin';

// userList를 사용자 커스텀이 가능하게 만들어준다!!


// props를 넘겨받아 부모 컴포너느로 부터 제공된 데이터와 설정을 활용한다.
// 괄호에 props 입력해줘야 한다.
export const UserList = (props) => (


    <List {...props} perPage={10} pagination={<Pagination />}  >
        <Datagrid bulkActionButtons={false}>
            <TextField source="username" label="아이디" />
            {/* <ReferenceField source="username" label="아이디" /> */}
            <EmailField source="email" label="이메일" />
            <DateField source="regDt" label="가입일"/>
            
            <FunctionField
                source="gender"
                label="성별"
                render={(record) => {
                    if (!record.gender) return '알 수 없음'; 
                    return record.gender === 'M' ? '남자' : record.gender === 'F' ? '여자' : '알 수 없음';
                }}
            />
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
    
    // <List {...props}>
    //     <Datagrid>
    //         <TextField source="아이디" />
    //         <TextField source="name" />
    //         <TextField source="username" />
    //         <EmailField source="email" />
    //         <TextField source="address.street" />
    //         <TextField source="phone" />
    //         <TextField source="website" />
    //         <TextField source="company.name" />
    //     </Datagrid>
    // </List>

    // 리스트는 props를 전달받아 데이터로드, 페이징, 필터링의 기능을 제공한다.
    // 위에서 전달받은 props이다
    // <List {...props}>
    //     <SimpleList
    //         primaryText={(record) => record.username}
    //         secondaryText={(record) => record.username}
    //         tertiaryText={(record) => record.email}
    //     />
    // </List>
);