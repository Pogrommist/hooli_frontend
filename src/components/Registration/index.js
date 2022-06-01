import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import validator from 'validator';
import { Link } from "react-router-dom";
import "./style.scss";

export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data)

  return (
    <div className="test">
      <form onSubmit={handleSubmit(onSubmit)}>
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