import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getDepartments } from "../../services/departments";

const Departments = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const [departments, setDepartments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const apiDepartments = await getDepartments(municipality.id);

    setDepartments(apiDepartments);
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
          history.push("/municipalidades/departamentos/crear", {
            from: "municipalidades/departamentos",
          })
        }
      >
        Crear
      </button>

      <h2>Depts</h2>

      <ul>
        {departments.map((departments) => (
          <ul key={departments.id}>
            <h2>{departments.name}</h2>
            <h4>{departments.description}</h4>
            <h4>{departments.email}</h4>
            <h4>{departments.state}</h4>
            <h4>{departments.telephone}</h4>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
