import React from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/user";
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
const EditAdministrator = () => {
  const history = useHistory();

  const userData = JSON.parse(localStorage.getItem("updateAdministrator"));
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const manager = {
      id: userData.id,
      name: data.userName,
      lastname: data.lastName,
      idCard: data.idCard,
      email: data.userEmail,
      password: data.password,
      direction: data.direction,
      role: userData.role,
      state: userData.state,
    };

    const createResponse = await updateUser(manager);

    if (createResponse.code === 201) {
      Success("Actualizado Correctamente!", createResponse.message);
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
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
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
              <Typography color="primary">Editar Administrador</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Editar Encargado
                </Typography>
                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre del Encargado"
                  type="text"
                  name="userName"
                  defaultValue={userData.name}
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
                  defaultValue={userData.lastname}
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
                  defaultValue={userData.idCard}
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
                  defaultValue={userData.email}
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
                  defaultValue={userData.password}
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
                  defaultValue={userData.direction}
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
                  style={{ marginTop: "10%", background: "#4caf50", color: "#fff" }}
                  variant="contained"
                >
                  Editar
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EditAdministrator;

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
