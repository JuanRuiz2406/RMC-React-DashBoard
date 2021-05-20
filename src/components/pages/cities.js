import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getCities } from "../../services/cities";

const Cities = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    const apiCities = await getCities(municipality.id);

    setCities(apiCities);
    setLoading(false);
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
          history.push("/municipalidades/ciudades/crear", {
            from: "municipalidades/ciudades",
          })
        }
      >
        Crear
      </button>

      <ul>
        {cities.map((cities) => (
          <ul key={cities.id}>
            <h2>text h2 {cities.name}</h2>
            <h4>text h4 {cities.name}</h4>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
