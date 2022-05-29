import React from 'react'

export default function LoginPage() {
  return (
    <div>
      <form>
        <input type='email' name='e-mail'/>
        <input type='password' name='password'/>
        <button>Submit</button>
      </form>
    </div>
  );
}
