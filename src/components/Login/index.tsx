import React from 'react'
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../services/axios/index.tsx';
import FormInput from '../shared/BaseForm/FormInput/index.tsx';
import { BaseForm } from '../shared/BaseForm/index.tsx';
import { LoginFormActions } from './LoginFormActions/index.tsx';
import Logo from '../../assets/images/logo.svg'
import './style.scss'

export default function LoginPage(): React.FC {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/sign_in', { user: data })
  
  return (
    <div className='site-background'>
      <h1 className='base-greeting'>Welcome to Hooli!</h1>
      <BaseForm className='login-page-form' onSubmit={handleSubmit(onSubmit)}>
        <img src={Logo} className="base-form__logo"/>
        <div className="base-form__inputs">
          <FormInput name="email" required register={register} placeholder={true} hasError={errors.email}/>
          <FormInput type="password" name="password" required register={register} placeholder="Password" hasError={errors.password}/>
        </div>
        <LoginFormActions/>
      </BaseForm>
    </div>
  );
}
