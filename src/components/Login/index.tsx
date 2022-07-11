import React from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import FormInput from '../shared/BaseForm/FormInput';
import { BaseForm } from '../shared/BaseForm';
import { LoginFormActions } from './LoginFormActions';
import Logo from '../../assets/images/logo.svg'
import { useAuth } from '../../services/hooks/use-auth'
import './style.scss'

const InputBaseValidation =
{
  required: "Пожалуйста заполните поле", 
  minLength: { value : 2, message: "Минимальная длина поля 2 символа"},
  maxLength: { value: 255, message: "Максимальная длина поля 255 символов"},
}

const LoginPage:React.FC<{}> = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm(
    {
      mode: "onChange"
    }
  );
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const onSubmit = async data => {
    const response = await signIn(data)
    if (typeof response.headers.authorization !== 'undefined') navigate('/home')
  }

  return (
    <div className='site-background'>
      <h1 className='base-greeting'>Welcome to Hooli!</h1>
      <BaseForm className='login-page-form' onSubmit={handleSubmit(onSubmit)}>
        <img src={Logo} className="base-form__logo"/>
        <div className="base-form__inputs">
          <FormInput name="email" validation={InputBaseValidation} register={register} placeholder='E-mail' hasError={errors.email} type="email" className="login-page-form__input" />
          <FormInput type="password" validation={InputBaseValidation} name="password" register={register} placeholder="Password" hasError={errors.password} className="login-page-form__input" />
        </div>
        <LoginFormActions disabled={!isValid}/>
      </BaseForm>
    </div>
  );
}

export default LoginPage
