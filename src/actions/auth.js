import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";

import Swal from "sweetalert2";
//login email and password
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(finishLoading());
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => {
        dispatch(finishLoading());
        Swal.fire("Error", err.message, "error");
      });
  };
};

//register email and password
export const startRegisterWithEmailPassword = (email, password, name) => {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        //define displayName
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((err) => Swal.fire("Error", err.message, "error"));
  };
};

//login with Google
export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => dispatch(login(user.uid, user.displayName)))
      .catch((error) => console.log("error", error));
  };
};

//return login action
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => {
  return async (dispatch) => {
    //firebase logout
    await firebase.auth().signOut();

    dispatch(logout());
  };
};

//local logout
export const logout = () => {
  return {
    type: types.logout,
  };
};
