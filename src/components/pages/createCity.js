import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newCity } from "../../services/cities";

const CreateMunicipality = () => {
  const history = useHistory();

  const municipalityStorage = JSON.parse(localStorage.getItem("municipality"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = municipalityStorage;

    const createResponse = await newCity(data.cityName, municipality);

    if (createResponse.code === 200 || createResponse.code === 400) {
      alert(createResponse.message);
    }
    if (createResponse.status === 401) {
      alert(createResponse.error);
    }
  };

  return (
    <div>
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
    </div>
  );
};

export default CreateMunicipality;
