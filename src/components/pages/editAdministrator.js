import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/user";
import { Box, Button, Container } from "@material-ui/core";
import { Success, Error } from "../alerts";

const EditAdministrator = () => {
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem("updateAdministrator"));
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const manager = {
      id: userData.id,
      name: data.userName,
      lastname: data.lastName,
      idCard: data.idCard,
      email: data.userEmail,
      password: data.password,
      direction: data.direction,
      role: userData.role,
      state: userData.state,
    };

    const createResponse = await updateUser(manager);

    if (createResponse.code === 201) {
      Success("Actualizado Correctamente!", createResponse.message);
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
          <h1>Editar Encargado</h1>

          <h3>Nombre</h3>
          <input
            type="text"
            placeholder="Nombre del Encargado"
            defaultValue={userData.name}
            name="userName"
            ref={register({
              required: {
                value: true,
                message: "*El Nombre es obligatorio*",
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "*El Nombre solo puede tener letras*",
              },
            })}
          />
          <span>{errors?.userName?.message}</span>

          <h3>Apellido</h3>
          <input
            type="text"
            placeholder="Apellido del Encargado"
            defaultValue={userData.lastname}
            name="lastName"
            ref={register({
              required: {
                value: true,
                message: "*El Apellido es obligatorio*",
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: "*El Apellido solo puede tener letras*",
              },
            })}
          />
          <span>{errors?.lastName?.message}</span>

          <h3>Identificacion</h3>
          <input
            type="text"
            placeholder="Cédula"
            defaultValue={userData.idCard}
            name="idCard"
            ref={register({
              required: {
                value: true,
                message: "*La Cédula es obligatoria*",
              },
            })}
          />
          <span>{errors?.idCard?.message}</span>

          <h3>Correo Electrónico</h3>
          <input
            type="text"
            placeholder="Email"
            defaultValue={userData.email}
            name="userEmail"
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
          <span>{errors?.userEmail?.message}</span>

          <h3>Contraseña</h3>
          <input
            type="password"
            placeholder="Contraseña"
            defaultValue={userData.passdecode}
            name="password"
            ref={register({
              required: {
                value: true,
                message: "*La Contraseña es obligatoria*",
              },
              minLength: {
                value: 8,
                message: "*La Contraseña debe tener mínimo 8 caracteres*",
              },
            })}
          />
          <span>{errors?.password?.message}</span>

          <h3>Dirección</h3>
          <input
            type="text"
            placeholder="Dirección"
            defaultValue={userData.direction}
            name="direction"
            ref={register({
              required: {
                value: true,
                message: "*La Dirección es obligatoria*",
              },
            })}
          />
          <span>{errors?.direction?.message}</span>

          <input type="submit" value="Editar" />
        </form>
      </Container>
    </Box>
  );
};

export default EditAdministrator;
