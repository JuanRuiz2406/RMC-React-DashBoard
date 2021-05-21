import React from "react";
// import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Cities,
  CreateCity,
  CreateDepartment,
  CreateMunicipality,
  Departments,
  Home,
  Municipalities,
  Reports,
} from "../components/pages/index";
import { NavBar } from "../components/ui/navbar";

export const DashboardRoutes = () => {
  return (
    <>
      <NavBar />

      <Switch>
        <Route exact path="/reportes" component={Reports} />
        <Route exact path="/reporte" component={Home} />

        {/* Rutas RMCTeam */}
        <Route exact path="/municipalidades" component={Municipalities} />
        <Route
          exact
          path="/municipalidades/crear"
          component={CreateMunicipality}
        />

        <Route
          exact
          path="/municipalidades/departamentos"
          component={Departments}
        />
        <Route
          exact
          path="/municipalidades/departamentos/crear"
          component={CreateDepartment}
        />

        <Route exact path="/municipalidad/ciudades" component={Cities} />
        <Route
          exact
          path="/municipalidades/ciudades/crear"
          component={CreateCity}
        />

        {/* Rutas MunicipalityAdmin */}

        <Redirect to="/reportes" />
      </Switch>
    </>
  );
};
