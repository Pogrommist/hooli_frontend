import React from 'react'
import {
  Route,
  Navigate,
  Routes
} from "react-router-dom";

import LoginPage from '../../components/Login'
import Registration from '../../components/Registration'
import Homepage from '../../pages/Homepage';
import { ProvideAuth, useAuth } from '../hooks/use-auth';

export const AppRoutes = () => {
  
  const PrivateRoute = ({ children }) => useAuth().validateToken() ? children : <Navigate to="/" />

  return (
    <>
    <ProvideAuth>
      <Routes>
       <Route path="/" element={<LoginPage/>} /> 
       <Route path="/registration" element={<Registration/>} />
       <Route path="/home" element={<PrivateRoute><Homepage /></PrivateRoute>} />
      </Routes>
    </ProvideAuth>
  
    </>
  )
}

