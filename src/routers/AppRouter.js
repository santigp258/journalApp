import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
export const AppRouter = () => {
    return (
        <Router>
      <div className="app__container">
        <Switch>
          <Route
            path="/auth"
            component={AuthRouter}
          />
          <Route
            path="/"
            exact
            component={JournalScreen}
          />
        </Switch>
      </div>
    </Router>
    )
}
