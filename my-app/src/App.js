import React from 'react';

import './global.css';
import Router from './router';

import AuthContextComponent from '../src/contexts/auth';

function App() {
  return (
    <AuthContextComponent>
          <Router/>
    </AuthContextComponent>
   
  );
}

export default App;
