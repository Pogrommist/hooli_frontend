import React from 'react'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './components/Login'
import Registration from './components/Registration'

function App() {
  return (
    <>
      <div>
        <Link to='/'>Login Page </Link>
        <Link to='/registration'>Registration</Link>
      </div>
      <Routes>
       <Route path="/" element={ <LoginPage/> }/>
       <Route path="/registration" element={ <Registration/> }/>
      </Routes>
    </>
  );
}

export default App;
