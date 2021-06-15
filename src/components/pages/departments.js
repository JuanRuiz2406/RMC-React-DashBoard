import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { deleteDepartment, getDepartments } from "../../services/departments";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Container,
  Typography,
  withStyles,
  makeStyles,
  CardActions,
  ColorButton,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ConfirmDelete } from "../alerts";

const Departments = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const [departments, setDepartments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const apiDepartments = await getDepartments(municipality.id);

    setDepartments(apiDepartments);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const editDepartment = (department) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("department", JSON.stringify(department));
    }

    history.push("/municipalidades/departamentos/editar", {
      from: "municipalidades/departamentos",
    });
  };

  const editDepartmentAdministrator = (department) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(department.manager)
      );
    }

    history.push("/municipalidades/departamentos/editarAdministrador", {
      from: "municipalidades",
    });
  };

  const deleteDepartmentSelected = async (departmentId) => {
    ConfirmDelete(
      "¿Estás seguro de eliminar este departamento?",
      "No podrás deshacer esta acción",
      deleteDepartment(departmentId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  return (
    <Box bgcolor="background.paper" p={2}>
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </Button>
        <ColorButton
          variant="contained"
          color="primary"
          onClick={() => {
            history.push("/municipalidades/departamentos/crear");
          }}
        >
          Crear
        </ColorButton>

        {departments.map((department) => (
          <ul key={department.id}>
            <div>
              <Grid item xs>
                <Box bgcolor="common.black" p={1.5} boxShadow={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h2">
                      {department.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      {department.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      {department.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      {department.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h2">
                      {department.telephone}
                    </Typography>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editDepartment(department)}
                  >
                    Editar Departamento
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editDepartmentAdministrator(department)}
                  >
                    Editar Administrador
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteDepartmentSelected(department.id)}
                  >
                    Eliminar Departamento
                  </Button>
                </Box>
              </Grid>
            </div>
          </ul>
        ))}
      </Container>
    </Box>
  );
};

export default Departments;
