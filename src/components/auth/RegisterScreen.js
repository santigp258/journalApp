import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";

export const RegisterScreen = () => {
  const [formValue, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValue;
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      console.log("Correct");
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.log("is required");
      return false;
    }
    return true;
  };
  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        <div className="auth__alert-error">Hello</div>
        <input
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          autoComplete="off"
        />
        <input
          className="auth__input"
          type="password"
          onChange={handleInputChange}
          placeholder="Password"
          name="password"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already Registered?
        </Link>
      </form>
    </>
  );
};
