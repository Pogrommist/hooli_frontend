import React from "react";
import { FieldError } from "react-hook-form";
import './style.scss'

interface FormInputType {
	label?: string;
	required: boolean;
	register: Function;
	type?: string;
	name: string;
	className?: string;
	placeholder?: string;
	hasError: FieldError;
}
const FormInput:React.FC<FormInputType> = ({label, required, register, type='text', name, className="base-form__input", placeholder, hasError}:FormInputType) => {
	return (
	<>
		{label && <label>{label}</label>}
		<input className={`'base-form__input' ${className} ${hasError ? `${className}--invalid` : ''}`} type={type} placeholder={placeholder} {...register(name, { required })}/>	
	</>
)
}

export default FormInput