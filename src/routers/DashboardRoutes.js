import React from "react";
// import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Cities,
  CreateCity,
  CreateDepartment,
  CreateDetail,
  CreateMunicipality,
  Departments,
  EditAdministrator,
  EditMunicipality,
  Municipalities,
  Reports,
  SpecificReport,
} from "../components/pages/index";
import { NavBar } from "../components/ui/navbar";

export const DashboardRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <NavBar />

      <Switch>
        <Route exact path="/reportes" component={Reports} />
        <Route exact path="/reporte" component={SpecificReport} />

        {/* Rutas RMCTeam */}
        <Route exact path="/municipalidades" component={Municipalities} />
        <Route
          exact
          path="/municipalidades/crear"
          component={CreateMunicipality}
        />

        <Route
          exact
          path="/municipalidades/editar"
          component={EditMunicipality}
        />

        <Route
          exact
          path="/municipalidades/editarAdministrador"
          component={EditAdministrator}
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

        {user.role === "DepartmentAdmin" && (
          <Route
            exact
            path="/reportes/nuevo_detalle"
            component={CreateDetail}
          />
        )}

        <Redirect to="/reportes" />
      </Switch>
    </>
  );
};
