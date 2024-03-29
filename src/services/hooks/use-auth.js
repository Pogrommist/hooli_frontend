import React, { useState, useContext, createContext } from "react";
import { signInRequest, signUpRequest } from "../api/auth";

export const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState({});

  const setUserLocal = userData => setUser(userData)

  const signIn = async params => {
    const response = await signInRequest(params)
    setUser(response.data);
    localStorage.setItem('token', response.headers.authorization)
    if (response.data) localStorage.setItem('user', JSON.stringify(response.data))
    return response
  };
  const signUp = async params => {
    const response = await signUpRequest(params)
    setUser(response.data);
    return response
  };

  const validateToken = () => localStorage.getItem('token') !== null

  const logout = callback => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    callback()
  }

  return {
    user,
    signIn,
    signUp,
    logout,
    validateToken,
    setUserLocal
  };
}