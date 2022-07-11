import { axiosInstance } from "../axios";
import { UserSignInParams, User, UserSignUpParams, UserUpdateParams } from "../../models/user.model";
import { AxiosResponse } from "axios";


export const signInRequest = async ({ email, password }:UserSignInParams):Promise<AxiosResponse<User>> => {
  return await axiosInstance.post<User>('users/sign_in', { user: { email, password } })
}

export const signUpRequest = async ({ first_name, last_name, email, password }: UserSignUpParams):Promise<AxiosResponse<User>> => {
  return await axiosInstance.post<User>('users/', { user: { email, password, first_name, last_name } })
}

export const uploadAvatarRequest = async (avatar_url:string):Promise<AxiosResponse<User>>  => {

  const token = localStorage.getItem('token')
  return await axiosInstance.post<User>('/users/upload_avatar', { avatar_url }, { headers: { 'Authorization': token } })
}

export const updateUserSettingsRequest = async (user:UserUpdateParams):Promise<AxiosResponse<User>> => {
  
  const token = localStorage.getItem('token')
  return await axiosInstance.post<User>('/users/update_user_info', { user }, { headers: { 'Authorization': token } })
}