import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateDepartment } from "../../services/departments";

const EditDepartment = () => {
  const history = useHistory();

  const departmentData = JSON.parse(localStorage.getItem("department"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const department = {
      id: departmentData.id,
      name: data.name,
      description: data.description,
      email: data.email,
      telephone: data.telephone,
      state: departmentData.state,
    };

    const updateResponse = await updateDepartment(
      department,
      departmentData.manager,
      departmentData.municipality
    );

    if (updateResponse.code === 200) {
      alert(updateResponse.message);
      history.goBack();
    }
    if (updateResponse.status === 401) {
      alert(updateResponse.error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Editar Departamento</h1>

        <h3>Nombre</h3>
        <input
          type="text"
          placeholder="Nombre del Departamento"
          defaultValue={departmentData.name}
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
          defaultValue={departmentData.description}
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
          defaultValue={departmentData.email}
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
          defaultValue={departmentData.telephone}
          name="telephone"
          ref={register({
            required: {
              value: true,
              message: "*El teléfono es obligatorio*",
            },
          })}
        />
        <span>{errors?.telephone?.message}</span>

        <input type="submit" value="Editar" />

        <button
          onClick={() => {
            history.push("/municipalidades/departamentos");
          }}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default EditDepartment;
