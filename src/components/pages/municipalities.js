import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getMunicipalities } from "../../services/municipalities";

const Municipalities = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));

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

  const refreshPage = () => {
    window.location.reload();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        {municipalities.map((municipalities) => (
          <ul key={municipalities.id}>
            <h2>{municipalities.name}</h2>
            <h4>{municipalities.adress}</h4>
            <h4>{municipalities.email}</h4>
            <h4>{municipalities.telephone}</h4>
            <h4>{municipalities.state}</h4>
            <h4>{municipalities.webSite}</h4>

            <button onClick={() => municipalityDepartments()}>
              Ver Departamentos
            </button>

            <button onClick={() => municipalityCities(municipalities)}>
              Ver Ciudades
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Municipalities;
