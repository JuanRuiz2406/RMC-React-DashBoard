import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Search } from ".";
import { getReports, updateReportState } from "../../services/reports";

const filterReports = (reports, query) => {
  if (!query) {
    return reports;
  }

  return reports.filter((reports) => {
    const toFilter = reports.state.toLowerCase();
    return toFilter.includes(query);
  });
};

const Reports = () => {
  const history = useHistory();
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");

  const user = JSON.parse(localStorage.getItem("userData"));

  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = filterReports(reports, searchQuery);

  const fetchReports = async () => {
    const apiReports = await getReports();

    setReports(apiReports);
    setLoading(false);
  };

  const refreshPage = () => {
    window.location.reload();
  };

  const replyReport = async (report, newState) => {
    const response = await updateReportState(report, newState);

    console.log(response);

    refreshPage();
  };

  const specificReport = (report) => {
    localStorage.setItem("report", JSON.stringify(report));

    history.push("/reporte", {
      from: "reportes",
    });
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

        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {filteredReports.map((report) => (
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
                specificReport(report);
              }}
            >
              Ver más
            </button>
          </ul>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
