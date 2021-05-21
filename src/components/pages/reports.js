import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { getReports, updateReportState } from "../../services/reports";
import { types } from "../../types/types";

const Reports = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("userData"));

  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const apiReports = await getReports();

    setReports(apiReports);
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
      <ul>
        {user.role !== "DepartmentAdmin" && (
          <h4>
            Solo los Administradores de los departamentos pueden añadir detalles
            a los reportes
          </h4>
        )}

        {reports.map((report) => (
          <ul key={report.id}>
            <h2>{report.title}</h2>
            <h4>{report.description}</h4>
            <h4>{report.state}</h4>
            <h5>
              {report.coordenates.latitude} {report.coordenates.longitude}
            </h5>

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

            <button
              onClick={() => {
                replyReport(report, "Aceptado");
              }}
            >
              Ver más *falta*
            </button>
          </ul>
        ))}
      </ul>

      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Reports;
