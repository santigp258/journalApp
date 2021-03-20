import React from 'react'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  return (
    <>
    <h3 className="auth__title">Register</h3>
    <form action="">
      <input
        className="auth__input"
        type="text"
        placeholder="Email"
        name="email"
        autoComplete="off"
      />
      <input
        className="auth__input"
        type="password"
        placeholder="Name"
        name="name"
        autoComplete="off"
      />
      <input
        className="auth__input"
        type="password"
        placeholder="Password"
        name="password"
      />
      <input
        className="auth__input"
        type="text"
        placeholder="Confirm password"
        name="confirmPassword"
      />
      <button type="submit" className="btn btn-primary btn-block mb-5" >
        Register
      </button>
    
      <Link to="/auth/login" className="link">Already Registered?</Link>
    </form>
  </>
  )
}

