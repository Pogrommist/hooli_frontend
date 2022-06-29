import { axiosInstance } from "../axios";

export const signInRequest = async ({ email, password }) => {
  return await axiosInstance.post('users/sign_in', { user: { email, password } })
}

export const signUpRequest = async ({ first_name, last_name, email, password }) => {
  return await axiosInstance.post('users/', { user: { email, password, first_name, last_name } })
}