import React from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  //dispatch for value. React-redux hook
  const dispatch = useDispatch();

  //hook useForn
  const [formValues, handleInputChange] = useForm({
    email: "santigp258@gmail.com",
    password: "1234",
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    //send action
    dispatch(startLoginEmailPassword(email, password));
  };
  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with Social Network</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link to="/auth/register" className="link">
          Create a new account
        </Link>
      </form>
    </>
  );
};
