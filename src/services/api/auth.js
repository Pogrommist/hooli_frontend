import { axiosInstance } from "../axios";

export const signInRequest = async ({ email, password }) => {
  return await axiosInstance.post('users/sign_in', { user: { email, password } })
}

export const signUpRequest = async ({ first_name, last_name, email, password }) => {
  return await axiosInstance.post('users/', { user: { email, password, first_name, last_name } })
}

export const uploadAvatarRequest = async (avatar_url) => {
  if (localStorage.getItem('token') == null) return
  const token = localStorage.getItem('token')
  return await axiosInstance.post('/users/upload_avatar', { avatar_url }, { headers: { 'Authorization': token } })
}