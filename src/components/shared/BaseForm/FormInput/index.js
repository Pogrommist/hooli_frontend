import React from "react";
import './style.scss'

export default function FormInput ({label, required, register, type='text', name, className="base-form__input", placeholder, hasError}) {
		  return (
			<>
				{label && <label>{label}</label>}
				<input className={`'base-form__input' ${className} ${hasError ? `${className}--invalid` : ''}`} type={type} placeholder={placeholder} {...register(name, { required })}/>	
			</>
		)
}