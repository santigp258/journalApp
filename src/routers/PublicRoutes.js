import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router";

export const PublicRoutes = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      component={(props) =>
        !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

PublicRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};
