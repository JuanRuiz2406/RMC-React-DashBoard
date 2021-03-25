import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { Login, PasswordReset } from "../components/pages/index";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="container">
        Navbar
        <Link to="/login">Login</Link>
        <Link to="/">Home</Link>
        <Link to="/contrasena_olvidada">Olvidé mi Contraseña</Link>
      </div>
      <Switch>
        <Route component={Login} path={"/login"} exact />
        <Route component={PasswordReset} path="/contrasena_olvidada" />
        <PrivateRoute
          component={DashboardRoutes}
          path="/"
          isAuthenticated={!!user.logged}
        />
      </Switch>
    </Router>
  );
};
