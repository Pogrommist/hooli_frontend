import React from "react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./style.scss";

export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data)

  return (
    <div className="test">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='hui' type='text' {...register('first_name', { required: true })}/>
        <input type='text' {...register('last_name', { required: true })}/>
        <input type='email' {...register('email', { required: true })}/>
        {errors.email && <span>Please enter a valid E-mail address.</span>}
        <input type='password' {...register('password', { required: true })}/>
        <button>Submit</button>
        <div>
          <Link to='/'>Login Page </Link>
          <Link to='/registration'>Registration</Link>
        </div>
      </form>
    </div>
  );
}