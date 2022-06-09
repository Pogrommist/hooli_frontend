import React from 'react';
import { Link } from 'react-router-dom';

export function LoginFormActions() {
	return(
		<div className="base-form__actions base-form__actions--login-page">
			<div className="base-form__action_item">
				<input type="checkbox" className="base-form__action_item__checkbox" />
				<span className="base-form__action_item__text">Remember Me</span>
			</div>
			<div className="base-form__action_item">
				<button className="base-form__action_item__button">Sign In</button>
			</div>
			<div>
				<span className='base-form__action_item__forgot'>Forgot password?</span>
			</div>
			<div className="base-form__action_item">
				<span className="base-form__action_item__link">Don’t have an account?<Link to='/registration'>Sign up </Link></span>
			</div>
		</div>
	)
} 