import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateMunicipality } from "../../services/municipalities";
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
const EditMunicipality = () => {
  const history = useHistory();

  const municipalityData = JSON.parse(localStorage.getItem("municipality"));
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = {
      id: municipalityData.id,
      name: data.name,
      adress: data.adress,
      email: data.email,
      telephone: data.telephone,
      state: municipalityData.state,
      webSite: data.website,
    };

    const createResponse = await updateMunicipality(
      municipality,
      municipalityData.manager
    );

    if (createResponse.code === 200) {
      alert(createResponse.message);
      history.goBack();
    }

    if (createResponse.code === 400) {
      alert(createResponse.message);
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
          <h1>Editar Municipalidad</h1>

          <h3>Nombre</h3>
          <input
            type="text"
            placeholder="Nombre de Municipalidad"
            defaultValue={municipalityData.name}
            name="name"
            ref={register({
              required: {
                value: true,
                message: "*El Nombre es obligatorio*",
              },
            })}
          />
          <span>{errors?.name?.message}</span>

          <h3>Dirección</h3>
          <input
            type="text"
            placeholder="Dirección de Municipalidad"
            defaultValue={municipalityData.adress}
            name="adress"
            ref={register({
              required: {
                value: true,
                message: "*La dirección es obligatoria*",
              },
            })}
          />
          <span>{errors?.adress?.message}</span>

          <h3>Correo Electrónico</h3>
          <input
            type="text"
            placeholder="ejemplo@municipalidad.com"
            defaultValue={municipalityData.email}
            name="email"
            ref={register({
              required: {
                value: true,
                message: "*El Correo Electrónico es obligatorio*",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "*El Correo Electrónico debe tener un formato válido*",
              },
            })}
          />
          <span>{errors?.email?.message}</span>

          <h3>Teléfono</h3>
          <input
            type="text"
            placeholder="Número de teléfono"
            defaultValue={municipalityData.telephone}
            name="telephone"
            ref={register({
              required: {
                value: true,
                message: "*El teléfono es obligatorio*",
              },
            })}
          />
          <span>{errors?.telephone?.message}</span>

          <h3>Sitio Web</h3>
          <input
            type="text"
            placeholder="www.municipalidad.com"
            defaultValue={municipalityData.webSite}
            name="website"
            ref={register({})}
          />
          <span>{errors?.website?.message}</span>

          <input type="submit" value="Editar" />

          <button
            onClick={() => {
              history.push("/municipalidades");
            }}
          >
            Volver
          </button>
        </form>
      </Container>
    </Box>
  );
};

export default EditMunicipality;
