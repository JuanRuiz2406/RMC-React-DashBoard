import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getCities, deleteCity } from "../../services/cities";
import { Box, Button, Grid, Container, Typography } from "@material-ui/core";
import { ConfirmDelete } from "../alerts";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const Cities = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));
  console.log(municipality);
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const apiCities = await getCities(municipality.id);
    console.log(apiCities.city);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box bgcolor="background.default" p={2}>
      <Container>
        <Button
          style={{ marginTop: 30 }}
          onClick={() => {
            history.goBack();
          }}
        >
          <ArrowBackIcon style={{ color: "#0277BD", fontSize: 40 }} /> Volver
        </Button>
        <Button
          style={{ marginTop: 30 }}
          onClick={() =>
            history.push("/municipalidades/ciudades/crear", {
              from: "municipalidades/ciudades",
            })
          }
        >
          <AddIcon style={{ color: "#4caf50", fontSize: 40 }} /> Crear
        </Button>

        {cities.map((city) => (
          <ul key={city.id}>
            <div>
              <Grid item xs>
                <Box bgcolor="common.white" p={1.5} boxShadow={1}>
                  <Grid item xs={12}>
                    <Typography variant="h2" component="h2">
                      {city.name}
                    </Typography>
                  </Grid>
                  <Button
                    style={{ marginTop: 30 }}
                    color="primary"
                    onClick={() => editCity(city)}
                  >
                    <EditIcon style={{ color: "#0277BD" }} /> Editar
                  </Button>
                  <Button
                    style={{ marginTop: 30 }}
                    color="secondary"
                    onClick={() => deleteCitySelected(city.id)}
                  >
                    <DeleteIcon style={{ color: "#FF0000" }} /> Eliminar
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
