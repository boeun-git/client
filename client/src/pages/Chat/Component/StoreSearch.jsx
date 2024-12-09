import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBContainer } from "cdbreact";
import axios from "axios";
import './List.css';

const StoreSearch = ({getStoreName}) => {
    
    const [searchStore, setSearchStore] = useState('');
    const [searchStoreResult, setSearchStoreResult] = useState('');

    const userName = searchStore;
    const searchButtonClick = () => {
        if(searchStore) {
           axios.get('http://localhost:8080/api-store/getStoreList', {
                params: {
                    searchKeyword: userName  // 서버가 받는 파라미터를 확인하고 보내는 형식이 맞는지 체크
                }
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchStoreResult(response.data);
                console.log('getStoreName : ', response.data);
            })
            .catch((error) => {
                console.error('Error StoreSearch.js : ', error);
            });
        }
    };    

    const searchStoreChange = (e) => {
        setSearchStore(e.target.value);
    }

    return (
    <CDBContainer style={{width: "25rem", margin:'0', padding:'0'}}>
        <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0' }}>
            <CDBListGroupItem style={{ height: "7rem" }}>
                <div class=" p-4">
                    <div class="input-group mb-3">
                        <input type="text" class="form-control searchStore" onChange={searchStoreChange}/>
                        <div class="input-group-append">
                            <button className="btn btn-primary" onClick={searchButtonClick}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>	
            </CDBListGroupItem>
            {
            searchStoreResult.length === 0 ? (
            <CDBListGroupItem className="d-flex " style={{ height: "7rem" }}>
                <center><b>해당되는 가게가 없습니다.</b></center>
            </CDBListGroupItem>                    
            ): (searchStoreResult.map((store, index) => {
                const getStore = store.storeName;

                return (
                <CDBListGroupItem key={index} className="d-flex " style={{ height: "7rem"}} onClick={() => { getStoreName(store.userName);}}>
                     <div class="flex items-center ps-3 " style={{display: 'flex'}}>
                         <div style={{display: 'flex'}}><b>{store.userName} {getStore}</b></div>
                         <div style={{display: 'flex'}}>{store.storeAddr}</div>
                     </div>
                </CDBListGroupItem>
                );
                })
            )
            }
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  StoreSearch;