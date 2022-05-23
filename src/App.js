import React from 'react'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './Components/login'
import Registration from './Components/Registration' 

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
