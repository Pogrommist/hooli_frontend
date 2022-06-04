import React, { ReactElement } from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './components/Login'
import Registration from './components/Registration'
import Homepage from './pages/Homepage';
import './app.scss'

function App () {
  return (
    <>
      <Routes>
       <Route path="/" element={ <LoginPage/> } />
       <Route path="/registration" element={ <Registration/> }/>
       <Route path="/home" element={ <Homepage/> } />
      </Routes>
    </>
  );
}

export default App;
