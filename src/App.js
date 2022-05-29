import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './components/Login/index.js'
import Registration from './components/Registration/index.js'
import './app.scss'

function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={ <LoginPage/> }/>
       <Route path="/registration" element={ <Registration/> }/>
      </Routes>
    </>
  );
}

export default App;
