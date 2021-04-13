import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { getReports, updateReportState } from "../../services/reports";
import { types } from "../../types/types";

const Reports = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
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
          </ul>
        ))}
      </ul>

      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Reports;
