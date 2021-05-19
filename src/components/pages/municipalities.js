import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getMunicipalities } from "../../services/municipalities";

const Municipalities = () => {
  const history = useHistory();

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

  const createMunicipality = () => {
    history.replace("/municipalidades/crear");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {municipalities.map((municipalities) => (
          <ul key={municipalities.id}>
            <h2>{municipalities.name}</h2>
            <h4>{municipalities.adress}</h4>
            <h4>{municipalities.email}</h4>
            <h4>{municipalities.telephone}</h4>
            <h4>{municipalities.schedule}</h4>
            <h4>{municipalities.webSite}</h4>

            <button
              onClick={() => {
                createMunicipality();
              }}
            >
              Crear
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Municipalities;
