import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { Login, PasswordReset } from "../components/pages";

import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <PublicRoute
          exact
          path={"/login"}
          component={Login}
          isAuthenticated={!!user.logged}
        />
        <PublicRoute
          exact
          path={"/contrasena_olvidada"}
          component={PasswordReset}
          isAuthenticated={!!user.logged}
        />

        <PrivateRoute
          path="/"
          component={DashboardRoutes}
          isAuthenticated={!!user.logged}
        />
      </Switch>
    </Router>
  );
};
