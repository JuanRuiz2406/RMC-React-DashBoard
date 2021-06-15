import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  getMunicipalities,
  deleteMunicipality,
} from "../../services/municipalities";
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
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ConfirmDelete } from "../alerts";

const Municipalities = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user")).user;

  const [municipalities, setMunicipalities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  const fetchMunicipalities = async () => {
    const apiMunicipalities = await getMunicipalities();

    setMunicipalities(apiMunicipalities);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const municipalityDepartments = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/departamentos", {
      from: "municipalidades",
    });
  };

  const municipalityCities = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidad/ciudades", {
      from: "municipalidades",
    });
  };

  const editMunicipality = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/editar", {
      from: "municipalidades",
    });
  };

  const editMunicipalityAdministrator = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(municipality.manager)
      );
    }

    history.push("/municipalidades/editarAdministrador", {
      from: "municipalidades",
    });
  };

  const deleteMunicipalitySelected = async (municipalityId) => {
    ConfirmDelete(
      "¿Estás seguro de eliminar esta municipalidad?",
      "No podrás deshacer esta acción",
      deleteMunicipality(municipalityId)
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const defaultProps = {
    bgcolor: "common.white",
    mt: 5,
  };

  const defaultProps2 = {
    bgcolor: "common.white",
  };

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
        <ColorButton
          variant="contained"
          color="primary"
          onClick={() =>
            history.push("/municipalidades/crear", {
              from: "municipalidades",
            })
          }
        >
          Crear
        </ColorButton>

        {municipalities.map((municipality) => (
          <ul key={municipality.id}>
            <div>
              <Grid item xs>
                <Box bgcolor="common.black" p={1.5} boxShadow={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h2">
                      {municipality.name}
                    </Typography>
                  </Grid>
                  <Box item xs={6}>
                    <Typography variant="h5" component="p">
                      {municipality.adress}
                    </Typography>
                  </Box>
                  <Box item xs={6}>
                    <Typography variant="h5" component="p">
                      {municipality.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" component="p">
                      {municipality.telephone}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" component="p">
                      {municipality.state}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" component="p">
                      {municipality.website}
                    </Typography>
                  </Box>
                  <Divider />
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => municipalityDepartments(municipality)}
                    >
                      Ver Departamentos
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => municipalityCities(municipality)}
                    >
                      Ver Ciudades
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => editMunicipality(municipality)}
                    >
                      Editar Municipalidad
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        editMunicipalityAdministrator(municipality)
                      }
                    >
                      Editar Administrador
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() =>
                        deleteMunicipalitySelected(municipality.id)
                      }
                    >
                      Eliminar Municipalidad
                    </Button>
                  </CardActions>
                </Box>
              </Grid>
            </div>
          </ul>
        ))}
      </Container>
    </Box>
  );
};

export default Municipalities;
