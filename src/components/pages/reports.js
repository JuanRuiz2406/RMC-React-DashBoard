import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Search } from ".";
import { getReports, updateReportState } from "../../services/reports";
import Popup from 'reactjs-popup';

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
          <div className="container">
            <div class="alert alert-info" role="alert">
              <strong>Informacion: </strong>Solo los Administradores de los departamentos pueden añadir detalles
              a los reportes
          </div>
          </div>

        )}



        <div className="container">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          {filteredReports.map((report) => (

            <ul key={report.id}>

              <div className="container m-2 border border-secondary rounded">
                <div className="row m-2 justify-content-center align-items-center">
                  <div className="col m-2">
                    <img className="rounded-circle" src={report.imgURL}></img>
                  </div>
                  <div className="col-6">
                    <h4>Titulo:</h4>
                    <p>{report.title}</p>
                    <h6>Descripcion: </h6>
                    <p>{report.description}</p>

                    <h6>Estado:</h6>
                    <p>{report.state}</p>
                  </div>
                  <div className="col justify-content-center align-content-center">

                    <div className="row m-4">
                      <button className="btn btn-success rounded-pill"
                        onClick={() => {
                          replyReport(report, "Aceptado");
                        }}
                      >
                        Aceptar
                    </button>
                    </div>
                    <div className="row m-4">
                      <button
                        className="btn btn-danger rounded-pill"
                        onClick={() => {
                          replyReport(report, "Rechazado");
                        }}
                      >
                        Rechazar
                    </button>
                    </div>
                    <div className="row m-4">
                      <button
                        className="btn btn-info rounded-pill"
                        onClick={() => {
                          specificReport(report);
                        }}
                      >
                        Ver más
                    </button>
                    </div>
                    <div className="row m-4">
                      {user.role === "DepartmentAdmin" && (
                        <button
                          className="rounded-pill"
                          onClick={() => {
                            reportNewDetail(report);
                          }}
                        >
                          Añadir Nuevo Detalle
                        </button>
                      )}
                    </div>

                  </div >


                </div>
              </div>


            </ul>
          ))}
        </div>


      </ul>
    </div>
  );
};

export default Reports;
