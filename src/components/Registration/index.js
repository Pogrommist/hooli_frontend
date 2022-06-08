import React from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../services/axios'
import { BaseForm } from "../shared/BaseForm";
import FormInput from "../shared/BaseForm/FormInput";
import { RegistrationFormActions } from "./RegistrationFormActions";
import Logo from '../../assets/images/logo.svg'
import "./style.scss";

// ToDo: Move the input and it's styles into 'shared' folder


export default function Registration() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => axiosInstance.post('users/', { user: data })

  return (
    <div className='site-background'>
      <h1 className='base-greeting'>Welcome to Hooli!</h1>
      <BaseForm onSubmit={handleSubmit(onSubmit)} isRegistration>
        <img src={Logo} className="base-form__logo" />
        <div className="base-form__inputs">
          <FormInput name="first_name" required register={register} placeholder="First name" hasError={errors.first_name} />
          <FormInput name="last_name" required register={register} placeholder="Last name" hasError={errors.last_name} />
          <FormInput type="email" name="email" required register={register} placeholder="E-mail" hasError={errors.email} />
          <FormInput type="password" name="password" required register={register} placeholder="Password" hasError={errors.password} />
        </div>
        <RegistrationFormActions />
      </BaseForm>        
    </div>
  );
}