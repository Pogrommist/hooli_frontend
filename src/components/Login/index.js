import React from 'react'
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../services/axios'
import FormInput from '../shared/BaseForm/FormInput';
import { BaseForm } from '../shared/BaseForm';
import { LoginFormActions } from './LoginFormActions';
import Logo from '../../assets/images/logo.svg'
import './style.scss'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/sign_in', { user: data })
  
  return (
    <div className='site-background'>
      <h1 className='base-greeting'>Welcome to Hooli!</h1>
      <BaseForm className='login-page-form' onSubmit={handleSubmit(onSubmit)}>
        <img src={Logo} className="base-form__logo"/>
        <div className="base-form__inputs">
          <FormInput name="email" required register={register} placeholder="E-mail" hasError={errors.email}/>
          <FormInput type="password" name="password" required register={register} placeholder="Password" hasError={errors.password}/>
        </div>
        <LoginFormActions/>
      </BaseForm>
    </div>
  );
}
