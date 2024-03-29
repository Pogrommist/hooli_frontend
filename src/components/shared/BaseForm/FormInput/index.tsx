import React from "react";
import { FieldError } from "react-hook-form";
import './style.scss'

interface FormInputType {
	label?: string;
	register: Function;
	type?: string;
	name: string;
	className?: string;
	placeholder?: string;
	hasError: FieldError;
	validation?: object;
}
const FormInput:React.FC<FormInputType> = ({label, validation={}, register, type='text', name, className="base-form__input", placeholder, hasError}:FormInputType) => {
	return (
	<div className="base-form-input-field">
		{label && <label>{label}</label>}
		<input className={`'base-form__input' ${className} ${hasError ? `${className}--invalid` : ''}`} type={type} placeholder={placeholder} {...register(name, validation)}/>
		{hasError && (<p className="base-form__input__error">{hasError.message}</p>)}
	</div>
)
}

export default FormInput