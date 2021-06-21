import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { newMunicipality } from "../../services/municipalities";
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Success, Error } from "../alerts";

import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const CreateMunicipality = () => {
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const municipality = {
      name: data.name,
      adress: data.address,
      email: data.email,
      telephone: data.telephone,
      webSite: data.webSite,
    };
    const manager = {
      name: data.userName,
      lastname: data.lastName,
      idCard: data.idCard,
      email: data.userEmail,
      password: data.password,
      passdecode: data.password,
      direction: data.direction,
      role: "MunicipalityAdmin",
      state: "activo",
    };
    console.log(municipality);
    console.log(manager);
    const createResponse = await newMunicipality(municipality, manager);

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
                  Municipalidad
                </Typography>

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre de Municipalidad"
                  type="text"
                  name="name"
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
                  name="telephone"
                  inputRef={register({
                    required: "El numero de telefono es requerido.",
                  })}
                  error={Boolean(errors.telephone)}
                  helperText={errors.telephone?.message}
                />
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Sitio Web"
                  type="text"
                  name="webSite"
                  inputRef={register({
                    required: false,
                  })}
                  error={Boolean(errors.webSite)}
                  helperText={errors.webSite?.message}
                />

                <IconButton
                  className={classes.next}
                  fullWidth
                  style={{ marginTop: "10%", marginLeft: "90%" }}
                >
                  <ArrowForwardIcon
                    style={{ color: "#4caf50", fontSize: 40 }}
                  />
                </IconButton>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Encargado
                </Typography>
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre del Encargado"
                  type="text"
                  name="userName"
                  inputRef={register({
                    required: "El nombre es requerido.",
                  })}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Apellido del Encargado"
                  type="text"
                  name="lastName"
                  inputRef={register({
                    required: "El apellido es requerido.",
                  })}
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Tarjeta de Identificacion"
                  type="text"
                  name="idCard"
                  inputRef={register({
                    required: "La tarjeta de identificaion es requerida.",
                  })}
                  error={Boolean(errors.idCard)}
                  helperText={errors.idCard?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Correo del encargado"
                  type="email"
                  name="userEmail"
                  inputRef={register({
                    required: "El correo es requerido.",
                  })}
                  error={Boolean(errors.userEmail)}
                  helperText={errors.userEmail?.message}
                />

                <TextField
                  id="standard-password-input"
                  margin="normal"
                  className={classes.title}
                  fullWidth
                  type="password"
                  label="Contraseña"
                  name="password"
                  inputRef={register({
                    required: "La contraseña es requerida.",
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Direccion"
                  type="text"
                  name="direction"
                  inputRef={register({
                    required: "La tarjeta de identificaion es requerida.",
                  })}
                  error={Boolean(errors.direction)}
                  helperText={errors.direction?.message}
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

export default CreateMunicipality;

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
