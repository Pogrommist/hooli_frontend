import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosInstance } from '../../services/axios'
import "./style.scss";

export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/', { user: data })
  
  return (
    <div className='site-background'>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='First name' type='text' {...register('first_name', { required: true })}/>
        <input placeholder='Last name' type='text' {...register('last_name', { required: true })}/>
        <input placeholder='E-mail' type='email' {...register('email', { required: true })}/>
        {errors.email && <span>Please enter a valid E-mail address.</span>}
        <input placeholder='Password' type='password' {...register('password', { required: true })}/>
        <button>Submit</button>
        <div>
          <Link to='/'>Login Page </Link>
        </div>
      </form>
    </div>
  );
}