import React, { useContext } from "react";
import { useHistory } from "react-router";
import {
  Box,
  Button,
  Grid,
  Container,
  Typography,
  TextField,
  makeStyles,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { updateUserProfile } from "../../services/user";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "react-hook-form";
import { Success, Error } from "../alerts";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import theme from "../ui/themeConfig";
import { types } from "../../types/types";

const UserProfile = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userData"));
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const manager = {
      id: user.id,
      name: data.name,
      lastname: data.lastname,
      idCard: data.idCard,
      email: data.email,
      password: user.passwordNew,
      direction: data.direction,
      role: user.role,
      state: user.state,
    };
    console.log(manager);
    const createResponse = await updateUserProfile(manager);

    if (createResponse.code === 201) {
      localStorage.setItem("userData", JSON.stringify(manager));
      Success("Actualizado Correctamente!", createResponse.message);
      setTimeout(() => {
        history.push("/perfil", {
          from: "perfil",
        });
      }, 1000 * 2);
    }
    if (createResponse.code === 400) {
      Error(createResponse.message);
    }
    if (createResponse.status === 401) {
      Error(createResponse.error);
    }
  };

  const editPassword = () => {
    history.push("/perfil/editar", {
      from: "perfil",
    });
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
      </Container>
      <Container>
        <Grid container spacing={7} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" gutterBottom>
                  Usuario
                </Typography>

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Nombre del usuario"
                  type="text"
                  name="name"
                  defaultValue={user.name}
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
                  label="Apellido del usuario"
                  type="text"
                  name="lastname"
                  defaultValue={user.lastname}
                  inputRef={register({
                    required: "El apellido es requerido.",
                  })}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Identificacion"
                  type="text"
                  name="idCard"
                  defaultValue={user.idCard}
                  inputRef={register({
                    required: "La identificacion es requerida.",
                  })}
                  error={Boolean(errors.idCard)}
                  helperText={errors.idCard?.message}
                />

                <TextField
                  id="standard-basic"
                  margin="normal"
                  fullWidth
                  label="Dirección"
                  type="text"
                  name="direction"
                  defaultValue={user.direction}
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
                  label="Correo Electrónico"
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  inputRef={register({
                    required: "El correo es requerido.",
                  })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                />

                <Button
                  className={classes.submit}
                  fullWidth
                  style={{
                    marginTop: "10%",
                    background: "#ff9800",
                    color: "#fff",
                  }}
                  variant="contained"
                  onClick={() => editPassword()}
                >
                  Editar Contraseña
                </Button>

                <Button
                  type="submit"
                  className={classes.submit}
                  fullWidth
                  style={{
                    marginTop: "-5%",
                    background: "#03A9F4",
                    color: "#fff",
                  }}
                  variant="contained"
                >
                  Actualizar
                </Button>
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box
              bgcolor="background.default"
              p={1.5}
              style={{ textAlign: "center", alignItems: "center" }}
            >
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Foto de Perfil
                </Typography>
                <Avatar
                  aria-label="perfil"
                  src={user.imgURL}
                  className={classes.large}
                />
              </form>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UserProfile;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(60),
    height: theme.spacing(60),
    alignContent: "center",
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
}));
