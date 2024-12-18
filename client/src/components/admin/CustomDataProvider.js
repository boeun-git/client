// src/customDataProvider.js
import axios from "axios";
import simpleRestProvider from "ra-data-simple-rest";

// 기본 REST Provider
//const dataProvider = simpleRestProvider("http://localhost:8080/api-admin"); https://placehere.store/
const dataProvider = simpleRestProvider("https://placehere.store/api-admin"); 

// 확장된 customDataProvider
const CustomDataProvider = {
  ...dataProvider,

  // 목록 조회 (getList)
  getList: (resource, params) => {

    // 일반회원 리스트
    if (resource === "getUserList") {

        console.log(resource);
        console.log(params);

        //const url = `http://localhost:8080/api-admin/getUserList`;
        const url = `https://placehere.store/api-admin/getUserList`;
        

        return axios.get(url)
            .then((response) => {
                const data = response.data;

                console.log("서버에서 가져온 data ::", data);

                return {
                    data: data.data, // 사용자 목록
                    total: data.total, // 총 사용자 수
                };
            })
            .catch((error) => {
                console.error("Error ::", error);
                throw error;
            });
    }

    // 점주회원리스트
    if (resource === "getStoreList") {

        console.log(resource);
        console.log(params);

        //const url = `http://localhost:8080/api-admin/getStoreList`;
        const url = `https://placehere.store/api-admin/getStoreList`;

        return axios.get(url)
            .then((response) => {
                const data = response.data;

                console.log("서버에서 가져온 data ::", data);

                return {
                    data: data.data, // 사용자 목록
                    total: data.total, // 총 사용자 수
                };
            })
            .catch((error) => {
                console.error("Error :: ", error);
                throw error;
            });
    }

    // 예약 리스트
    if (resource === "getRsrvList") {

      console.log(resource);

      //const url = `http://localhost:8080/api-admin/getRsrvList`;
      const url = `https://placehere.store/api-admin/getRsrvList`;

      console.log("url chk :: " + url);

      return axios.get(url)
          .then((response) => {
              const data = response.data;

              console.log("서버에서 가져온 data ::", data);

              const rawData = Array.isArray(data) ? data : data.data;

              const transformedData = rawData.map((item) => ({
                id: item.rsrvNo, // React-Admin에서 필요한 id 필드
                ...item,
            }));

            console.log("transformedData :: ", transformedData);

              return {
                  // data: data.data, // 사용자 목록
                  // total: data.total, // 총 사용자 수
                  data: transformedData, 
                  total: transformedData.length
              };
          })
          .catch((error) => {
              console.error("Error ::", error);
              throw error;
          });
  }
    return dataProvider.getList(resource, params);
},

  // 상세보기 (getOne)
  getOne: (resource, params) => {
  
    console.log('resource - getOne ', resource);
    console.log('params - getOne ', params);

    // 이전 resource
    // 예시, getUserList, getStoreList, getRsrvList
    if (resource === "getStoreList") {

      console.log("resource :: ", resource);
      console.log("params :: ", params);

      //const url = `http://localhost:8080/api-admin/getUser?id=${params.id}`;
      const url = `https://placehere.store/api-admin/getUser?id=${params.id}`;


      return axios
            .get(url)
            .then((response) => {
                const data = response.data;
                console.log("getUser Data :: ", data);

                return {
                    data: { id: params.id, ...data }, // id 필드는 필수
                };
            })
            .catch((error) => {
                console.error("Error fetching details: ", error);
                throw error;
            });
    }

    // 예약 목록에서 왔을 때의 조건
    if (resource === "getRsrvList") {

      console.log("resource :: ", resource);
      console.log("params :: ", params);

      //const url = `http://localhost:8080/api-admin/getRsrv?rsrvNo=${params.id}`;
      const url = `https://placehere.store/api-admin/getRsrv?rsrvNo=${params.id}`;


      return axios
            .get(url)
            .then((response) => {
                const data = response.data;
                console.log("getRsrv Data :: ", data);

                return {
                    data: { id: params.id, ...data }, // id 필드는 필수
                };
            })
            .catch((error) => {
                console.error("Error fetching details: ", error);
                throw error;
            });
    }
      
    return dataProvider.getOne(resource, params);
  },

  // 데이터 수정 (update)
  // update: (resource, params) => {
  //   if (resource === "getUserList") {
  //     const url = `http://localhost:8080/api-admin/updateUser`;
  //     return fetch(url, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(params.data), // 수정된 데이터 전송
  //     })
  //       .then((response) => response.json())
  //       .then((data) => ({ data }));
  //   }
  //   return dataProvider.update(resource, params);
  // },
};

export default CustomDataProvider;
