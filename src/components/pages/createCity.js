import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newCity } from "../../services/cities";
import { Box, Button, Container } from "@material-ui/core";
import { Success, Error } from "../alerts";

const CreateCity = () => {
  const history = useHistory();

  const municipalityStorage = JSON.parse(localStorage.getItem("municipality"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = municipalityStorage;

    const createResponse = await newCity(data.cityName, municipality);

    if (createResponse.code === 200) {
      Success("Creado Correctamente!", createResponse.message);
      setTimeout(() => {
        history.goBack();
      }, 1000 * 2);
    }
    if (createResponse.code === 400) {
      Error(createResponse.message);
    }
    if (createResponse.status === 401) {
      Error(createResponse.error);
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
        </form>
      </Container>
    </Box>
  );
};

export default CreateCity;
