import React from 'react';
import { Link } from "react-router-dom";

export function RegistrationFormActions() {
	return(
		<div className="base-form__actions">
			<div className="base-form__action_item">
				<input type="checkbox" className="base-form__action_item__checkbox" />
				<span className="base-form__action_item__link">I agree witn <a href="#">terms and conditions</a></span>
			</div>

			<div className="base-form__action_item">
				<button className="base-form__action_item__button">Sign Up</button>
			</div>

			<div className="base-form__action_item">
				<span className="base-form__action_item__link">Already have account? <Link to='/'>Sign in </Link></span>
			</div>
		</div>
	)
}