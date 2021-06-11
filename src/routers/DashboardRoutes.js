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
  EditDepartment,
  EditMunicipality,
  Municipalities,
  Reports,
  SpecificReport,
} from "../components/pages/index";
import { NavBar } from "../components/ui/navBarMaterial";
import {Lists } from "../components/ui/Lists";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../components/ui/themeConfig";

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300, 
    }, 
   },
  appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: "#011B42",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    title: {
      flexGrow: 1,
    },
}));

export const DashboardRoutes = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const classes = useStyles();

  return (
  <ThemeProvider theme={theme}>

    <div className={classes.root}>
            <NavBar/>
            <Drawer 
                className={classes.drawer} 
                variant="permanent" 
                classes={{paper: classes.drawerPaper}}
                anchor="left"
            >
            <div className={classes.toolbar}>
            </div>
            <Divider/>
            <Lists/>
            <Divider/>
            </Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar}>
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
