import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  getMunicipalities,
  deleteMunicipality,
} from "../../services/municipalities";

const Municipalities = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user")).user;

  const [municipalities, setMunicipalities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMunicipalities();
  }, []);

  const fetchMunicipalities = async () => {
    const apiMunicipalities = await getMunicipalities();

    setMunicipalities(apiMunicipalities);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const municipalityDepartments = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/departamentos", {
      from: "municipalidades",
    });
  };

  const municipalityCities = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidad/ciudades", {
      from: "municipalidades",
    });
  };

  const editMunicipality = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem("municipality", JSON.stringify(municipality));
    }

    history.push("/municipalidades/editar", {
      from: "municipalidades",
    });
  };

  const editMunicipalityAdministrator = (municipality) => {
    if (user.role === "RMCTeam") {
      localStorage.setItem(
        "updateAdministrator",
        JSON.stringify(municipality.manager)
      );
    }

    history.push("/municipalidades/editarAdministrador", {
      from: "municipalidades",
    });
  };

  const deleteMunicipalitySelected = async (municipalityId) => {
    const createResponse = await deleteMunicipality(municipalityId);

    if (createResponse.code === 200) {
      alert(createResponse.message);
      refreshPage();
    }

    if (createResponse.code === 400) {
      alert(createResponse.message);
    }

    if (createResponse.status === 401) {
      alert(createResponse.error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <button
        onClick={() =>
          history.push("/municipalidades/crear", {
            from: "municipalidades",
          })
        }
      >
        Crear
      </button>

      <ul>
        {municipalities.map((municipality) => (
          <ul key={municipality.id}>
            <h2>{municipality.name}</h2>
            <h4>{municipality.adress}</h4>
            <h4>{municipality.email}</h4>
            <h4>{municipality.telephone}</h4>
            <h4>{municipality.state}</h4>
            <h4>{municipality.webSite}</h4>

            <button onClick={() => municipalityDepartments(municipality)}>
              Ver Departamentos
            </button>

            <button onClick={() => municipalityCities(municipality)}>
              Ver Ciudades
            </button>

            <button onClick={() => editMunicipality(municipality)}>
              Editar Municipalidad
            </button>

            <button onClick={() => editMunicipalityAdministrator(municipality)}>
              Editar Administrador
            </button>

            <button onClick={() => deleteMunicipalitySelected(municipality.id)}>
              Eliminar Municipalidad
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Municipalities;
