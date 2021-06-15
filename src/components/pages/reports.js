import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Search } from ".";
import { getReports } from "../../services/reports";
import CardReport from "../ui/CardReport";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import { green, red } from "@material-ui/core/colors";
import { Alert } from "@material-ui/lab";

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

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Container m={2}>
          <Alert severity="info">
            <strong>Informacion: </strong>Solo los Administradores de los
            departamentos pueden añadir detalles a los reportes
          </Alert>
        </Container>
      )}

      <Container>
        <div className="mb-3 mt-2">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

        <Grid container spacing={3} className={useStyles.gridContainer}>
          {filteredReports.map((report) => (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardReport report={report} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Reports;
