import React from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import validator from "validator";
import { useDispatch } from "react-redux";
//import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  //errors
  const dispatch = useDispatch();

  /*   //delete other errors
  useEffect(() => {
    dispatch(removeError("No email"));
  }, [dispatch]); */

  //content ui state
  //const { msgError } = useSelector((state) => state.ui);

  const [formValue, handleInputChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formValue;

  //register onsubmit
  const handleRegister = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(startRegisterWithEmailPassword(email, password, name));
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      Swal.fire("Error", "Name is required", "error");
      return false;
    } else if (!validator.isEmail(email)) {
      Swal.fire("Error", "Is not email. Try valid email", "error");
    } else if (password !== password2 || password.length < 5) {
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
      <h3 className="auth__title">Register</h3>
      <form onSubmit={handleRegister}>
        {/*         {msgError && <div className="auth__alert-error">{msgError}</div>} */}
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
          type="text"
          placeholder="Email"
          name="email"
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
