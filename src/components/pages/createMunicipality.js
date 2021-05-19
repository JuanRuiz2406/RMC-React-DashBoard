import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";

const CreateMunicipality = () => {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    // handleLogin(data.email, data.password);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const createMunicipality = () => {
    history.replace("/municipalidades/crear");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Crear Municipalidad</h1>

        <h3>Nombre</h3>
        <input
          type="text"
          placeholder="Nombre de Municipalidad"
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
          name="website"
          ref={register({})}
        />
        <span>{errors?.website?.message}</span>

        <h1>Crear Encargado</h1>

        <h3>Nombre</h3>
        <input
          type="text"
          placeholder="Nombre del Encargado"
          name="name"
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
        <span>{errors?.name?.message}</span>

        <h3>Apellidos</h3>
        <input
          type="text"
          placeholder="Apellidos del Encargado"
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

        <h3>Correo Electrónico</h3>
        <input
          type="text"
          placeholder="Email"
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

        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña"
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


        <input type="submit" value="Crear" />
      </form>
    </div>
  );
};

export default CreateMunicipality;
