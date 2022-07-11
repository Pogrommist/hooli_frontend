import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BaseForm } from "../shared/BaseForm";
import FormInput from "../shared/BaseForm/FormInput";
import { RegistrationFormActions } from "./RegistrationFormActions";
import { useAuth } from '../../services/hooks/use-auth.js'
import Logo from '../../assets/images/logo.svg'
import "./style.scss";

const InputBaseValidation = {
  required: "Пожалуйста заполните поле", 
  minLength: { value : 2, message: "Минимальная длина поля 2 символа"},
  maxLength: { value: 255, message: "Максимальная длина поля 255 символов"},
}

const PasswordValidation = {
  required: "Пожалуйста заполните поле", 
  minLength: { value : 2, message: "Минимальная длина поля 2 символа"},
  maxLength: { value: 255, message: "Максимальная длина поля 255 символов"},
  pattern: {
    value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
    message: "Пароль должен содержать цифру, спецсимвол и заглавную букву"
  }
}

const Registration: React.FC<{}> = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm(
    {
      mode: "onChange"
    }
  );
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const onSubmit = async data => {
    await signUp(data)
    navigate('/')
  }

  return (
    <div className='site-background'>
      <h1 className='base-greeting'>Welcome to Hooli!</h1>
      <BaseForm onSubmit={handleSubmit(onSubmit)} className='registration-form'>
        <img src={Logo} className="base-form__logo" />
        <div className="base-form__inputs">
          <FormInput name="first_name" validation={InputBaseValidation} register={register} placeholder="First name" hasError={errors.first_name}/>
          <FormInput name="last_name" validation={InputBaseValidation} register={register} placeholder="Last name" hasError={errors.last_name} />
          <FormInput type="email" validation={InputBaseValidation} name="email" register={register} placeholder="E-mail" hasError={errors.email} />
          <FormInput type="password" validation={PasswordValidation} name="password" register={register} placeholder="Password" hasError={errors.password} />
        </div>
        <RegistrationFormActions disabled={!isValid}/>
      </BaseForm>        
    </div>
  );
}

export default Registration