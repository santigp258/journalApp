import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";

import { firebase } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { NoteLoader } from "../components/notes/NoteLoader";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    //current user
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));

        setChecking(false);
      }
    });
  }, [dispatch, setChecking]);
  if (checking) {
    return <NoteLoader />;
  }
  return (
    <Router>
      <div className="app__container">
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route path="/" exact component={JournalScreen} />
        </Switch>
      </div>
    </Router>
  );
};
