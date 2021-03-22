import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { NoteLoader } from "../components/notes/NoteLoader";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { loadNotes } from "../helpers/loadNotes";
import { setNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  //show loader
  const [checking, setChecking] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(true); //true for no errors

  useEffect(() => {
    //current user
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        //dipatch user information
        dispatch(login(user.uid, user.displayName));

        //hidden loader
        setChecking(false);

        //authenticated
        setIsLoggedIn(true);

        //notes data
        const notes = await loadNotes(user.uid);
        dispatch(setNotes(notes));
      } else {
        //hidden loader
        setChecking(false);
        //no auth
        setIsLoggedIn(false);
      }
    });
  }, [dispatch, setChecking, isLoggedIn]);

  if (checking) {
    return <NoteLoader />;
  }
  return (
    <Router>
      <div className="app__container">
        <Switch>
          <PublicRoutes
            path="/auth"
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
          />
          <PrivateRoutes
            path="/"
            exact
            component={JournalScreen}
            isAuthenticated={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
};
