import React, { useState } from "react";
import { CDBListGroup, CDBListGroupItem, CDBContainer } from "cdbreact";
import axios from "axios";
import '../../style/chat/List.css';
import Stack from "react-bootstrap/esm/Stack";

const StoreSearch = ({getStoreName}) => {
    
    const [searchStore, setSearchStore] = useState('');
    const [searchStoreResult, setSearchStoreResult] = useState('');

    const userName = searchStore;
    const searchButtonClick = () => {
        if(searchStore) {
            axios.get('/api-store/getStoreList', {
            //axios.get('http://localhost:8080/api-store/getStoreList', {            
                params: {
                    searchKeyword: userName  // 서버가 받는 파라미터를 확인하고 보내는 형식이 맞는지 체크
                }
            })
            .then((response) => {
                // 서버로부터 받은 데이터 처리
                setSearchStoreResult(response.data);
                console.log('StoreSearch response : ', response);
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
    <CDBContainer style={{width: "25rem", margin:'0', padding:'0' }}>
        <CDBListGroup style={{margin:'0', padding:'0', width: "25rem", borderRadius: '0', border:'0px' }}>
            {/* 채팅 검색(상대방 userName으로 검색) */}
            <CDBListGroupItem style={{ height: "7rem" , borderBottom:'1px solid #A6A6A6'}}>
                <div class=" ">
                    <div class="input-group " style={{marginTop:'7%'}}>
                        <input type="text" class="form-control searchStore" onChange={searchStoreChange}  style={{ borderColor:'#A6A6A6',  borderRadius: '7px' }}/>
                        <div class="input-group-append">
                            <button className="btn " onClick={searchButtonClick} >
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>	
            </CDBListGroupItem>
            </CDBListGroup>
            <CDBListGroup 
                style={{ 
                    width: "25rem", 
                    borderRadius: '0', 
                    overflowY: "auto", 
                    maxHeight: "75vh",
                    border:"0"
                }}
            >
                <div className="flex-1" style={{ overflowY: "auto" }}>
            {
            searchStoreResult.length === 0 ? (
                    <CDBListGroupItem style={{ textAlign: 'center', height: "67vh", border:'0px'}}>
                        <p style={{verticalAlign: 'middle', marginTop:'50%'}}><b>입력한 내용에 해당되는 가게가 없습니다.</b></p>
                    </CDBListGroupItem>                
            ): (searchStoreResult.map((store, index) => {
                const getStore = store.storeName;

                return (
                <CDBListGroupItem key={index} className="d-flex " style={{ height: "7rem"}} onClick={() => { getStoreName(store.userName, getStore);}}>
                    <Stack style={{margin:'10px'}}>
                         <b>{getStore}</b><br/>
                         {store.storeAddr}
                    </Stack>    
                </CDBListGroupItem>
                );
                })
            )
            }
            </div>
        </CDBListGroup>
    </CDBContainer>
  );
};
export default  StoreSearch;