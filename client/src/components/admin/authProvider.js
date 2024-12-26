import axios from "axios";
import Cookies from 'js-cookie'
import { redirect } from "react-router";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const authProvider = {

    login: async ({ username, password }) => {

        console.log("username : " + username);
        console.log("password : " + password);

        try {
            // 백엔드 로그인 요청
            const response = await axios.post(`http://localhost:8080/admin-login?username=${username}&password=${password}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('response :: ', response);

            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;

            // 💍 JWT
            const accessToken = authorization.replace("Bearer ", "");

            console.log(`status : ${status}`);
            console.log(`headers : ${headers}`);
            console.log(`jwt : ${accessToken}`);

            if( status === 200 ) {

                // 로그인 체크 함수에서 쿠키를 이용하여 사용자 정보를 얻기 위해 여기서 쿠키를 넘겨준다.
        
                // 로그인 체크
                // 여기서 쿠키를 꺼내야함
                // loginCheck()

                alert('로그인 성공');
        
                // Swal.alert("로그인 성공", "메인 화면으로 이동합니다", "success",
                //   redirect("/")
                // )
        
                // 메인 페이지로 이동
                
        
              }
            const { token } = accessToken;
            console.log('token :: ' + accessToken);
    
            if (accessToken) {

                console.log('token 1');
                // JWT 토큰을 localStorage에 저장
                // localStorage.setItem('accessToken', accessToken);
                Cookies.set("accessToken", accessToken);
                console.log('Token saved successfully');
                
            } else {
                throw new Error('No token received');
            }

            const accessTokenChk = Cookies.get("accessToken");
            console.log(`accessTokenChk : ${accessTokenChk}`);
            console.log(`쿠키에 JWT(accessToken) 이 저장되어 있음`);
            // redirect("/react/getUserList");
            // window.location.href = "/react/getUserList";

    
        } catch (error) {
            // 에러 처리
            console.error('Login error: ', error);
            if (error.response) {
                // 서버에서 응답이 있지만 오류가 있는 경우
                console.error('Error response:', error.response.data);
            } else if (error.request) {
                // 요청은 했지만 응답이 없는 경우
                console.error('Error request:', error.request);
            } else {
                // 그 외의 에러
                console.error('Error message:', error.message);
            }
            throw new Error('Invalid credentials');
        }
    },

    logout: () => {
        Cookies.remove("accessToken");  // 로그아웃 시 쿠키에서 토큰 제거
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = Cookies.get("accessToken");
        if (token) {
            return Promise.resolve();  // 인증 성공
        } else {
            return Promise.reject("Unauthorized");  // 인증 실패
        }
    },

    // 오류 처리
    checkError: (error) => {
        return Promise.resolve();
    },

    // 권한 확인
    getPermissions: () => Promise.resolve(),
    
};

export default authProvider;
