import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newDetail } from "../../services/reports";
import { Success, Error } from "../alerts";

const CreateDetail = () => {
  const history = useHistory();

  const departmentStorage = JSON.parse(localStorage.getItem("department"));
  const reportStorage = JSON.parse(localStorage.getItem("report"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const department = departmentStorage[0];
    const report = reportStorage;

    const createResponse = await newDetail(data.detail, department, report);

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Crear Detalle del Reporte {reportStorage.name}</h1>

        <h3>Detalle del Reporte</h3>
        <input
          type="text"
          placeholder="Detalle del Reporte"
          name="detail"
          ref={register({
            required: {
              value: true,
              message: "*El Detalle del Reporte es obligatorio*",
            },
          })}
        />
        <span>{errors?.detail?.message}</span>

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

export default CreateDetail;
