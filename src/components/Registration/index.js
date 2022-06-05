import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { axiosInstance } from '../../services/axios'
import InputForm from "../shared/FormInput";
import Logo from '../../assets/images/logo.svg'
import "./style.scss";

// ToDo: Move the input and it's styles into 'shared' folder

// const Input = ({ label, register, required, type = 'text', name, className = 'registration-form__input', placeholder, hasError }) => (
//   <>
//     { label && <label>{label}</label>}
//     <input className={`${className} ${hasError ? `${className}--invalid` : ''}`} type={type} {...register(name, { required })} placeholder={placeholder}/>
//   </>
// );

export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/', { user: data })

  return (
    <div className='site-background'>
      <form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
        <img src={Logo} className="registration-form__logo" />
        <div className="registration-form__inputs">
          <InputForm name="first_name" required register={register} placeholder="First name" hasError={errors.first_name} />
          <InputForm name="last_name" required register={register} placeholder="Last name" hasError={errors.last_name} />
          <InputForm type="email" name="email" required register={register} placeholder="E-mail" hasError={errors.email} />
          <InputForm type="password" name="password" required register={register} placeholder="Password" hasError={errors.password} />
        </div>
        <div className="registration-form__actions">
          <div className="registration-form__action_item">
            <input type="checkbox" className="registration-form__action_item__checkbox" />
            <span className="registration-form__action_item__link">I agree witn <a href="#">terms and conditions</a></span>
          </div>
          <div className="registration-form__action_item">
            <button className="registration-form__action_item__button">Sign Up</button>
          </div>
          <div className="registration-form__action_item">
          <span className="registration-form__action_item__link">Alreasdy have account? <Link to='/'>Sign in </Link></span>
          </div>
        </div>
      </form>
    </div>
  );
}