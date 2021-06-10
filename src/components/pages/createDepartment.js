import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newDepartment } from "../../services/departments";

const CreateDepartment = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const department = {
      name: data.name,
      description: data.description,
      email: data.email,
      telephone: data.telephone,
      state: "activo",
    };
    const manager = {
      code: "",
      codeDate: "",
      name: data.userName,
      lastname: data.lastName,
      idCard: data.idCard,
      email: data.userEmail,
      password: data.password,
      passdecode: data.password,
      direction: data.direction,
      role: "DepartmentAdmin",
      state: "activo",
    };

    const createResponse = await newDepartment(
      department,
      manager,
      municipality
    );

    if (createResponse.code === 200) {
      alert(createResponse.message);
      history.goBack();
    }
    if (createResponse.status === 401) {
      alert(createResponse.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Crear Departamento</h1>

        <h3>Nombre</h3>
        <input
          type="text"
          placeholder="Nombre del Departamento"
          name="name"
          ref={register({
            required: {
              value: true,
              message: "*El Nombre es obligatorio*",
            },
          })}
        />
        <span>{errors?.name?.message}</span>

        <h3>Descripción</h3>
        <input
          type="text"
          placeholder="Descripción del Departamento"
          name="description"
          ref={register({
            required: {
              value: true,
              message: "*La descripción es obligatoria*",
            },
          })}
        />
        <span>{errors?.description?.message}</span>

        <h3>Correo Electrónico</h3>
        <input
          type="text"
          placeholder="ejemplo@departamento.com"
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

        <h1>Crear Encargado</h1>

        <h3>Nombre</h3>
        <input
          type="text"
          placeholder="Nombre del Encargado"
          name="userName"
          ref={register({
            required: {
              value: true,
              message: "*El Nombre del Encargado es obligatorio*",
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
          name="direction"
          ref={register({
            required: {
              value: true,
              message: "*La Dirección es obligatoria*",
            },
          })}
        />
        <span>{errors?.direction?.message}</span>

        <input type="submit" value="Crear" />

        <button
          onClick={() => {
            history.goBack();
          }}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default CreateDepartment;
