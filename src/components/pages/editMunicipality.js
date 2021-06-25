import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateMunicipality } from "../../services/municipalities";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import { Success, Error } from "../alerts";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const EditMunicipality = () => {
  const history = useHistory();

  const municipalityData = JSON.parse(localStorage.getItem("municipality"));
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = {
      id: municipalityData.id,
      name: data.name,
      adress: data.address,
      email: data.email,
      telephone: data.phone,
      state: municipalityData.state,
      webSite: data.webSite,
    };

    const updateResponse = await updateMunicipality(
      municipality,
      municipalityData.manager
    );
    console.log(updateResponse);
    if (updateResponse.code === 200) {
      Success("Actualizado Correctamente!", updateResponse.message);
      setTimeout(() => {
        history.goBack();
      }, 1000 * 2);
    }
    if (updateResponse.code === 400) {
      Error(updateResponse.message);
    }
    if (updateResponse.status === 401) {
      Error(updateResponse.error);
    }
  };

  const classes = useStyles();
  return (
    <Box bgcolor="background.default" p={2}>
      <Container>
        <Grid container>
          <Grid item xs={6} sm={6} md={8} lg={8}>
            <Button
              style={{ marginTop: 30 }}
              color="primary"
              onClick={() => {
                history.goBack();
              }}
            >
              <ArrowBackIcon style={{ color: "#0277BD", fontSize: 40 }} />{" "}
              Volver
            </Button>
          </Grid>
          <Grid item xs={6} sm={6} md={4} lg={4}>
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
              <Typography color="primary">Editar Municipalidad</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Municipalidad
                </Typography>

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre de Municipalidad"
                  type="text"
                  name="name"
                  defaultValue={municipalityData.name}
                  inputRef={register({
                    required: "El nombre es requerido.",
                  })}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Direccion"
                  type="text"
                  name="address"
                  defaultValue={municipalityData.adress}
                  inputRef={register({
                    required: "El correo es requerido.",
                  })}
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Correo"
                  type="email"
                  name="email"
                  defaultValue={municipalityData.email}
                  inputRef={register({
                    required: "El correo es requerido.",
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Numero de telefono"
                  type="number"
                  name="phone"
                  defaultValue={municipalityData.telephone}
                  inputRef={register({
                    required: "El numero de telefono es requerido.",
                  })}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                />
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Sitio Web"
                  type="text"
                  name="web"
                  defaultValue={municipalityData.webSite}
                  inputRef={register({
                    required: false,
                  })}
                  error={Boolean(errors.web)}
                  helperText={errors.web?.message}
                />

                <Button
                  type="submit"
                  className={classes.submit}
                  fullWidth
                  style={{
                    marginTop: "10%",
                    background: "#4caf50",
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  Actualizar
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EditMunicipality;

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
    },
    textField: {
      width: "25ch",
    },
    button: {
      margin: theme.spacing(1),
    },
  },
  form: {
    marginLeft: "10%",
    marginRight: "10%",
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  forgot: {
    color: theme.palette.primary.main,
    marginTop: theme.spacing(8),
  },
  title: {
    color: theme.palette.text.secondary,
  },
  next: {
    margin: theme.spacing(3, 0, 5),
  },
}));
