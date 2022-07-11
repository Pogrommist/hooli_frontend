import React, { useState, useContext, createContext } from "react";
import { signInRequest, signUpRequest, uploadAvatarRequest, updateUserSettingsRequest } from "../api/auth";
import { User, UserSignInParams, UserSignUpParams, UserUpdateParams } from "../../models/user.model";

export const authContext = createContext(null);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const [user, setUser] = useState({});

  const setUserLocal = (userData: User) => setUser(userData)

  const signIn = async (params:UserSignInParams) => {
    const response = await signInRequest(params)
    setUser(response.data);
    localStorage.setItem('token', response.headers.authorization)
    if (response.data) localStorage.setItem('user', JSON.stringify(response.data))
    return response
  };
  
  const signUp = async (params: UserSignUpParams) => {
    const response = await signUpRequest(params)
    setUser(response.data);
    return response
  };

  const validateToken = ():boolean => localStorage.getItem('token') !== null

  const logout = (callback: Function) => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    callback()
  }

  const uploadAvatar = async (avatar:string) => {
    const response = await uploadAvatarRequest(avatar)
    await setUser(response.data);
    await saveUserLocal(response.data)

    return response
  };

  const saveUserLocal = async (userData:User) => {
    await localStorage.setItem('user', JSON.stringify(userData))
  }

  const updateUserSettings = async (userData: UserUpdateParams) => {
    const response = await updateUserSettingsRequest(userData)
    await setUser(response.data);
    await saveUserLocal(response.data)
    
    return response
  }

  return {
    user,
    signIn,
    signUp,
    logout,
    validateToken,
    setUserLocal,
    uploadAvatar,
    updateUserSettings
  };
}