import { DateField, EmailField, FunctionField, Show, TabbedShowLayout, TextField } from "react-admin";

export const GetRsrv = (props) => (

    <Show>
        <TabbedShowLayout>

            <TabbedShowLayout.Tab label="예약 상세 정보">
            <div style={styles.container}>
                <table style={styles.table}>
                <tbody>
                    <tr>
                        <th style={styles.th}>예약번호</th>
                        <td style={styles.td}><TextField source="rsrvNo" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약자 이름</th>
                        <td style={styles.td}><TextField source="userName" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약상태</th>
                        <td style={styles.td}><TextField source="rsrvStatus" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약일</th>
                        <td style={styles.td}><DateField source="rsrvDt" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약인수</th>
                        <td style={styles.td}><TextField source="rsrvPerson" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약 요청 사항</th>
                        <td style={styles.td}><TextField source="rsrvReq" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>환불 사유</th>
                        <td style={styles.td}><TextField source="reason" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약 요청일</th>
                        <td style={styles.td}><DateField source="rsrvCreateTime" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>매장명</th>
                        <td style={styles.td}><TextField source="storeName" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>매장주소</th>
                        <td style={styles.td}><TextField source="storeAddr" /></td>
                    </tr>
                    <tr>
                        <th style={styles.th}>예약자 전화번호</th>
                        <td td style={styles.td}>
                        <FunctionField
                            source="rsrvNumber"
                            render={(record) => {
                            if (!record.rsrvNumber) return ''; // 데이터가 없는 경우 처리
                            const number = record.rsrvNumber.replace(/\D/g, ''); // 숫자만 추출
                            return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'); // 포맷팅
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