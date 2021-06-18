import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newCity } from "../../services/cities";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Success, Error } from "../alerts";

import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";


const CreateCity = () => {
  const history = useHistory();

  const municipalityStorage = JSON.parse(localStorage.getItem("municipality"));

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = municipalityStorage;

    const createResponse = await newCity(data.cityName, municipality);

    if (createResponse.code === 200) {
      Success("Creado Correctamente!", createResponse.message);
      setTimeout(() => {
        history.goBack();
      }, 1000 * 2);
    }
    if (createResponse.code === 400) {
      Error(createResponse.message);
    }
    if (createResponse.status === 401) {
      Error(createResponse.error);
    }
  };
  const classes = useStyles();
  return (
    <Box bgcolor="background.default" p={2}>
    <Container>
      <Button
        style={{ marginTop: 30 }}
        color="primary"
        onClick={() => {
          history.goBack();
        }}
      >
        <ArrowBackIcon style={{ color: "#0277BD", fontSize: 40 }} /> Volver
      </Button>

      <Grid container spacing={4} style={{ marginTop: 10 }}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box bgcolor="common.white" p={1.5} boxShadow={2}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Typography variant="h5" gutterBottom>
                Crear Ciudad
              </Typography>

              <TextField
                id="standard-basic"
                margin="normal"
                fullWidth
                label="Nombre de la ciudad"
                type="text"
                name="cityName"
                inputRef={register({
                  required: false,
                })}
                error={Boolean(errors.cityName)}
                helperText={errors.cityName?.message}
              />

              <Button
                type="submit"
                className={classes.submit}
                fullWidth
                style={{ marginTop: "10%", background: "#4caf50" }}
                variant="contained"
                endIcon={<AddIcon />}
              >
                Crear
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
  );
};

export default CreateCity;

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
