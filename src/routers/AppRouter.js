import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home, Login, PasswordReset } from "../components/pages/index";

export const AppRouter = () => {
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
        <Route component={Home} path="/" exact />
        <Route component={PasswordReset} path="/contrasena_olvidada" />
      </Switch>
    </Router>
  );
}
