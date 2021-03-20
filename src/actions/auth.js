import { types } from "../types/types";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(login(email, password));
  };
};

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
