import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getCities, deleteCity } from "../../services/cities";
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

const Cities = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const apiCities = await getCities(municipality.id);

    setCities(apiCities);
    setLoading(false);
  };

  const editCity = (city) => {
    localStorage.setItem("city", JSON.stringify(city));

    history.push("/municipalidades/ciudades/editar", {
      from: "municipalidades/departamentos",
    });
  };

  const deleteCitySelected = async (cityId) => {
    ConfirmDelete(
      "¿Estás seguro de eliminar esta ciudad?",
      "No podrás deshacer esta acción",
      deleteCity(cityId)
    );
    deleteCity(cityId);
  };

  const refreshPage = () => {
    window.location.reload();
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
          onClick={() =>
            history.push("/municipalidades/ciudades/crear", {
              from: "municipalidades/ciudades",
            })
          }
        >
          Crear
        </ColorButton>

        {cities.map((city) => (
          <ul key={city.id}>
            <div>
              <Grid item xs>
                <Box bgcolor="common.black" p={1.5} boxShadow={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h2">
                      {city.name}
                    </Typography>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => editCity(city)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteCitySelected(city.id)}
                  >
                    Eliminar
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

export default Cities;

/* 
    <div>
      <button
        onClick={() =>
          history.push("/municipalidades/ciudades/crear", {
            from: "municipalidades/ciudades",
          })
        }
      >
        Crear
      </button>

      <button
        onClick={() => {
          history.goBack();
        }}
      >
        Volver
      </button>

      <ul>
        {cities.map((cities) => (
          <ul key={cities.id}>
            <h2>{cities.name}</h2>
          </ul>
        ))}
      </ul>
    </div>
*/
