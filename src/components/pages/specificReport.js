import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { getDetails, updateReportState } from "../../services/reports";
import { types } from "../../types/types";

const SpecificReport = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("userData"));
  const report = JSON.parse(localStorage.getItem("report"));

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const apiDetails = await getDetails(report.id);

    setDetails(apiDetails);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    history.replace("/login");

    dispatch({
      type: types.logout,
    });
  };

  const replyReport = async (report, newState) => {
    const response = await updateReportState(report, newState);

    console.log(response);

    refreshPage();
  };

  const reportNewDetail = (report) => {
    localStorage.setItem("report", JSON.stringify(report));

    history.push("/reportes/nuevo_detalle", {
      from: "reportes",
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{report.title}</h2>
      <h4>{report.description}</h4>
      <h4>{report.privacy}</h4>
      <h4>{report.state}</h4>
      <h5>
        {report.coordenates.latitude} {report.coordenates.longitude}
      </h5>

      <ul>
        <h2>Detalles:</h2>

        {details.length > 0 ? (
          details.map((details) => (
            <ul key={details.id}>
              <h2>{details.updateDetail}</h2>
              <h4>{details.updateDetail}</h4>
            </ul>
          ))
        ) : (
          <h4>No hay Detalles sobre este Reporte</h4>
        )}
        <button
          onClick={() => {
            replyReport(report, "Aceptado");
          }}
        >
          Aceptar
        </button>

        <button
          onClick={() => {
            replyReport(report, "Rechazado");
          }}
        >
          Rechazar
        </button>

        {user.role === "DepartmentAdmin" && (
          <button
            onClick={() => {
              reportNewDetail(report);
            }}
          >
            Añadir Nuevo Detalle
          </button>
        )}
      </ul>
    </div>
  );
};

export default SpecificReport;
