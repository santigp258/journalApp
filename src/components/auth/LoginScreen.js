import React from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";

import { Link, useHistory } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";

import validator from "validator";
//import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  //history for redirect
  const history = useHistory();

  //dispatch for value. React-redux hook
  const dispatch = useDispatch();

  /*   //delete other errors
  useEffect(() => {
    dispatch(removeError("No email"));
  }, [dispatch]); */

  //hook useForn
  const [formValues, handleInputChange] = useForm({
    email: "santiago123@gmail.com",
    password: "12345",
  });

  //content ui state //msgError
  const { loading } = useSelector((state) => state.ui);
  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();

    //send action
    if (isFormValid()) {
      dispatch(startLoginEmailPassword(email, password));
      history.replace("/");
    }
  };

  //login with Google
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };

  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      Swal.fire("Error", "Is not email. Try valid email", "error");
    } else if (password.trim().length < 5) {
      Swal.fire(
        "Error",
        "Password should be at least 6 characters and match each other",
        "error"
      );
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <h3 className="auth__title">Login</h3>
      <form onSubmit={handleLogin}>
        {/*  {msgError && <div className="auth__alert-error">{msgError}</div>} */}
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
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading}
        >
          Login
        </button>
        <div className="auth__social-networks">
          <p>Login with Social Network</p>
          <div className="google-btn" onClick={handleGoogleLogin}>
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
