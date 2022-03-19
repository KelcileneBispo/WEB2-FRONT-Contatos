import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Logon from '../src/pages/Logon';
import Cadastro from './pages/Cadastro';
import Inicial from './pages/Inicial';
import Contato from './pages/Contato';


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/"  element={<Logon/>} />
                <Route  path="cadastro" element={<Cadastro/>} />
                <Route  path="inicial" element={<Inicial/>} />
                <Route  path='contato/:id' element={<Contato/>} />              
            </Routes>
        </BrowserRouter>
    );
}