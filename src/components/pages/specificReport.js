import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getDetails, updateReportState } from "../../services/reports";
import Map from "../ui/map";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const SpecificReport = () => {
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
    <Container>
      <Box bgcolor="common.black" p={1.5} mt={2}>
        <Grid item xs={12} direction="row" alignContent="center">
          <Grid item xs>
            <Grid item xs={3}>
              <h2>Título:</h2>
              <h6>{report.title}</h6>
            </Grid>
            <Grid item xs={3}>
              <h4>Descripción:</h4>
              <h6>{report.description}</h6>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid item xs={3}>
              <h4>Privacidad</h4>
              <h6>{report.privacy}</h6>
            </Grid>
            <Grid item xs={3}>
              <h4>Estado:</h4>
              <h6>{report.state}</h6>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
        </Grid>

        <Grid item>
          <h4>Imagen:</h4>
          <img
            className="rounded"
            style={{ height: 400, width: 800 }}
            src={report.imgURL}
          ></img>

          <h4>Ubicación:</h4>
          <Map />

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
        </Grid>
      </Box>
    </Container>
  );
};

export default SpecificReport;
