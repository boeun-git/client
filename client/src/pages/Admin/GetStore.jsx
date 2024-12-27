import React from 'react';
import { Show, SimpleShowLayout, TextField, EmailField, DateField, TabbedShowLayout, FunctionField, ImageField } from 'react-admin';

export const GetStore = (props) => (

    <Show>
        <TabbedShowLayout>

        <TabbedShowLayout.Tab label="점주회원 상세 정보">
          <div style={styles.container}>
            <table style={styles.table}>
              <tbody>
                <tr>
                  <th style={styles.th}>아이디</th>
                  <td style={styles.td}><TextField source="username" /></td>
                </tr>
                <tr>
                  <th style={styles.th}>이메일</th>
                  <td style={styles.td}><EmailField source="email" /></td>
                </tr>
                <tr>
                  <th style={styles.th}>가입일</th>
                  <td style={styles.td}><DateField source="regDt" /></td>
                </tr>
                <tr>
                  <th style={styles.th}>로그인일시</th>
                  <td style={styles.td}><DateField source="loginDt" /></td>
                </tr>
                
                <tr>
                  <th style={styles.th}>활동 상태</th>
                  <td style={styles.td}>
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
                    </td>
                </tr>
               
              </tbody>
            </table>
          </div>
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

// 스타일 객체
const styles = {
    // 기존 스타일 유지
    imageTd: {
      textAlign: "center", // 수평 중앙 정렬
    },
    imageContainer: {
      display: "inline-block", // 텍스트와 이미지를 하나로 묶음
      textAlign: "center", // 내부 요소 정렬
    },
    centeredTh: {
      verticalAlign: "middle", // 수직 중앙 정렬
      padding: "10px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f4f4f4",
      fontWeight: "bold",
      width: "30%",
    },
   
    container: {
      minHeight: "100px", // 최소 높이 설정 (필요에 따라 변경)
      maxHeight: "90vh", // 최대 높이 설정 (화면의 90%까지만 확장)
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f9f9f9",
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f4f4f4",
      fontWeight: "bold",
      width: "30%",
    },
    td: {
      textAlign: "left",
      padding: "10px",
      borderBottom: "1px solid #ddd",
      width: "70%",
    },
  };
  
