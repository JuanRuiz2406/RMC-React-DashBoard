import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Cities,
  CreateCity,
  CreateDepartment,
  CreateDetail,
  CreateMunicipality,
  Departments,
  EditAdministrator,
  EditCity,
  EditDepartment,
  EditMunicipality,
  Municipalities,
  Reports,
  SpecificReport,
  UserProfile,
} from "../components/pages/index";
import { NavBar } from "../components/ui/navBarMaterial";
import { Lists } from "../components/ui/Lists";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/ui/themeConfig";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerPaper: {
    background: "#011B42",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 50,
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(7),
  },
  title: {
    flexGrow: 1,
  },
  bg: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const DashboardRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <NavBar />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
        >
          <div className={classes.toolbar}></div>
          <Divider />
          <Lists />
          <Divider />
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar}>
            <Switch>
              <Route exact path="/reportes" component={Reports} />
              <Route exact path="/reporte" component={SpecificReport} />

              <Route exact path="/perfil" component={UserProfile} />

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

              <Route
                exact
                path="/municipalidades/departamentos/editar"
                component={EditDepartment}
              />

              <Route
                exact
                path="/municipalidades/departamentos/editarAdministrador"
                component={EditAdministrator}
              />

              <Route exact path="/municipalidad/ciudades" component={Cities} />

              <Route
                exact
                path="/municipalidades/ciudades/crear"
                component={CreateCity}
              />

              <Route
                exact
                path="/municipalidades/ciudades/editar"
                component={EditCity}
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
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
