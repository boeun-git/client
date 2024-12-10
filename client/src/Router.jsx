import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Chat from './pages/Chat/Chat';

const Router = () => {

    return (

        <BrowserRouter>
            <Routes>
                {/*-  < Route path='/' element={<Components />}/> > 
                
                */}
                <Route path='/admin' element={<Admin />}/>
                <Route  path='/chat/:name/:role' element={<Chat />}/>
            </Routes>
        </BrowserRouter>

    );

};

export default Router;