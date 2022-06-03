import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom'
import { axiosInstance } from '../../services/axios'
import './style.scss'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/sign_in', { user: data })
  
  return (
    <div className='site-background'>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='E-mail' type='email' {...register('email', { required: true })}/>
        {errors.email && <span>Please enter a valid E-mail address.</span>}
        <input placeholder='Password' type='password' {...register('password', { required: true })}/>
        <button>Submit</button>
        <div>
          <Link to='/registration'>Registration</Link>
        </div>
      </form>
    </div>
  );
}
