import React, { useState, useEffect } from "react";
import { Search } from ".";
<<<<<<< HEAD
import { getReports } from "../../services/reports";
import CardReport from "../ui/CardReport";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { red } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";
=======
import { getReports, updateReportState } from "../../services/reports";
>>>>>>> parent of 74efc78 (Vista reportes semi terminada)

const filterReports = (reports, query) => {
  if (!query) {
    return reports;
  }

  return reports.filter((report) => {
    const toFilter = report.state.toLowerCase();
    return toFilter.includes(query);
  });
};

const Reports = () => {
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

  if (loading) {
    return <div>Loading...</div>;
  }

<<<<<<< HEAD
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    gridContainer: {
      marginTop: "10%",
      color: "#011B42",
    },
  }));

  return (
    <Box bgcolor="background.default" p={2}>
      {user.role !== "DepartmentAdmin" && (
        <Container m={2}>
          <Alert severity="info">
            <strong>Informacion: </strong>Solo los Administradores de los
            departamentos pueden añadir detalles a los reportes
          </Alert>
        </Container>
      )}

      <Container>
        <Box component="span" mt={4}>
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </Box>

        <Grid container spacing={3} className={useStyles.gridContainer}>
          {filteredReports.map((report) => (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardReport report={report} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
=======
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
            <img src={report.imgURL}></img>
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
>>>>>>> parent of 74efc78 (Vista reportes semi terminada)
  );
};

export default Reports;
