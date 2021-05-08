import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { Login } from "../components/pages";
import ForgotPassword from "../components/pages/forgotPassword";
import PasswordReset from "../components/pages/passwordReset";
import VerificationCode from "../components/pages/verificationCode";

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
          path={"/forgot_password"}
          component={ForgotPassword}
          isAuthenticated={!!user.logged}
        />
        <PublicRoute
          exact
          path={"/password_reset"}
          component={PasswordReset}
          isAuthenticated={!!user.logged}
        />
        <PublicRoute
          exact
          path={"/verification_code"}
          component={VerificationCode}
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
