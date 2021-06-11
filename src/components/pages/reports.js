import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Search } from ".";
import { getReports, updateReportState } from "../../services/reports";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { green } from "@material-ui/core/colors";

import { makeStyles, withStyles } from "@material-ui/core/styles";

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

  const defaultProps = {
    bgcolor: "common.white",
    mt: 5,
  };

  const defaultProps2 = {
    bgcolor: "common.white",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      marginBottom: "10%",
    },
    pos: {
      marginBottom: 12,
    },
    card: {
      flexGrow: 1,
    },
    colorCard: {
      background: "#000",
    },
  }));

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700],
      },
    },
  }))(Button);

  return (
    <Box bgcolor="background.paper" p={2}>
      {user.role !== "DepartmentAdmin" && (
        <div className="container">
          <div class="alert alert-info" role="alert">
            <strong>Informacion: </strong>Solo los Administradores de los
            departamentos pueden añadir detalles a los reportes
          </div>
        </div>
      )}

      <Container>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {filteredReports.map((report) => (
          <ul key={report.id}>
            <div>
              <Divider />
              <Box borderRadius="borderRadius" {...defaultProps}>
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={5}
                >
                  <Grid item xs={6}>
                    <Box
                      borderRadius="borderRadius"
                      {...defaultProps2}
                      boxShadow={2}
                    >
                      <img
                        className="rounded"
                        style={{ height: 355, width: 600 }}
                        src={report.imgURL}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs>
                    <Box bgcolor="common.black" p={1.5} boxShadow={2}>
                      <Box mb={1}>
                        <Typography variant="h2" component="h2" color="#000">
                          Titulo
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="h5" component="h2">
                          {report.title}
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography
                          variant="h4"
                          component="h4"
                          color="primary.dark"
                        >
                          Descripcion
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2" component="p">
                          {report.description}
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography
                          variant="h4"
                          component="h4"
                          color="primary.dark"
                        >
                          Estado
                        </Typography>
                      </Box>
                      <Box mb={1}>
                        <Typography variant="body2" component="p">
                          {report.state}
                          <br />
                        </Typography>
                      </Box>
                      <Divider />
                      <CardActions>
                        <ColorButton
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            replyReport(report, "Aceptado");
                          }}
                        >
                          Aceptar
                        </ColorButton>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            replyReport(report, "Rechazado");
                          }}
                        >
                          Rechazar
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            specificReport(report);
                          }}
                        >
                          Ver más
                        </Button>
                        {user.role === "DepartmentAdmin" && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              reportNewDetail(report);
                            }}
                          >
                            Añadir Nuevo Detalle
                          </Button>
                        )}
                      </CardActions>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </ul>
        ))}
        <Divider />
      </Container>
    </Box>
  );
};

export default Reports;
