import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newCity } from "../../services/cities";
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
const CreateMunicipality = () => {
  const history = useHistory();

  const municipalityStorage = JSON.parse(localStorage.getItem("municipality"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = municipalityStorage;

    const createResponse = await newCity(data.cityName, municipality);

    if (createResponse.code === 200 || createResponse.code === 400) {
      alert(createResponse.message);
      history.goBack();
    }
    if (createResponse.status === 401) {
      alert(createResponse.error);
    }
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Crear Ciudad de la Municipalidad {municipalityStorage.name}</h1>

          <h3>Nombre de la Ciudad</h3>
          <input
            type="text"
            placeholder="Nombre de la Ciudad"
            name="cityName"
            ref={register({
              required: {
                value: true,
                message: "*El Nombre de la Ciudad es obligatorio*",
              },
            })}
          />
          <span>{errors?.cityName?.message}</span>

          <input type="submit" value="Crear" />

          <button
            onClick={() => {
              history.goBack();
            }}
          >
            Volver
          </button>
        </form>
      </Container>
    </Box>
  );
};

export default CreateMunicipality;
