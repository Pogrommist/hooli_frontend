
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
}

export interface UserSignInParams {
  email: string;
  password: string;
}

export interface UserSignUpParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserUpdateParams {
  first_name: string;
  last_name: string;
}