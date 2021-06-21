import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getDepartments } from "../../services/departments";
import {
  Box,
  Button,
  Grid,
  Container,
  makeStyles,
  Breadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CardDepartament from "../ui/CardDepartament";

const Departments = () => {
  const history = useHistory();

  const municipality = JSON.parse(localStorage.getItem("municipality"));

  const [departments, setDepartments] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    const apiDepartments = await getDepartments(municipality.id);

    setDepartments(apiDepartments);
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const useStyles = makeStyles((theme) => ({
    gridContainer: {
      marginTop: "20%",
      color: "#011B42",
    },
  }));

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <Box bgcolor="background.default" p={2}>
      <Container>
        <Grid container>
          <Grid item xs={6} sm={6} md={8} lg={9}>
            <Button
              style={{ marginTop: 30, marginBottom: 30 }}
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIcon style={{ color: "#0277BD", fontSize: 40 }} />{" "}
              Volver
            </Button>
            <Button
              style={{ marginTop: 30, marginBottom: 30 }}
              onClick={() => {
                history.push("/municipalidades/departamentos/crear");
              }}
            >
              <AddIcon style={{ color: "#4caf50", fontSize: 40 }} /> Crear
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={3}>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 40 }}>
              <Link
                color="inherit"
                onClick={() =>
                  history.push("/", {
                    from: "reportes",
                  })
                }
              >
                Inicio
              </Link>
              <Link
                color="inherit"
                onClick={() =>
                  history.push("/municipalidades", {
                    from: "municipalidades",
                  })
                }
              >
                Municipalidades
              </Link>
              <Typography color="primary">Departamentos</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={3} className={useStyles.gridContainer}>
          {departments.map((department) => (
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <CardDepartament department={department} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Departments;
