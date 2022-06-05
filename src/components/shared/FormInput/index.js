import React from "react";

export default function InputForm ({label, require, register, type='text', name, className="base-form__input", placeholder, hasError}) {
		  return (
			<>
				{label && <label>{label}</label>}
				<input className={`'base-form__input' ${className} ${hasError ? `${className}--invalid` : ''}`} type={type} placeholder={placeholder} {...register(name, { require })}/>	
			</>
		)
}