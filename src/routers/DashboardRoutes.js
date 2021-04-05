import React from "react";
// import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";

import { Home, Reports } from "../components/pages/index";
import { NavBar } from "../components/ui/navbar";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />

      <Switch>
        <Route exact path="/reportes" component={Reports} />
        <Route exact path="/reporte" component={Home} />

        <Redirect to="/reportes" />
      </Switch>
    </>
  );
};
