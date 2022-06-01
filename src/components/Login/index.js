import React from 'react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div>
      <form>
        <input type='email' name='e-mail'/>
        <input type='password' name='password'/>
        <button>Submit</button>
        <div>
          <Link to='/registration'>Registration</Link>
        </div>
      </form>
    </div>
  );
}
