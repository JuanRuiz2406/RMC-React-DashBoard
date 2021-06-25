import React, { useContext } from "react";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { updateUser } from "../../services/user";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
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

const EditPasswordManager = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();
  const user = JSON.parse(localStorage.getItem("userData"));
  console.log(user);

  const onSubmit = async (data) => {
    console.log(user);
    console.log(data);
    if (data.password === data.password2) {
      const manager = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        idCard: user.idCard,
        email: user.email,
        password: data.password,
        direction: user.direction,
        role: user.role,
        state: user.state,
      };
      console.log(data);

      const createResponse = await updateUser(manager);

      if (createResponse.code === 201) {
        Success("Actualizado Correctamente!", createResponse.message);
        setTimeout(() => {
          history.replace("/login");
          localStorage.clear();
          dispatch({
            types: types.logout,
          });
        }, 1000 * 2);
      } else {
        Error("Error al actualizar contraseña");
      }
    } else {
      Error("Las Contraseñas no coinciden, revise por favor");
    }
  };
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
                  history.push("/perfil", {
                    from: "perfil",
                  })
                }
              >
                Perfil
              </Link>
              <Typography color="primary">Editar Contraseña</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>

        <Grid container spacing={4} style={{ marginTop: 10 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box bgcolor="common.white" p={1.5} boxShadow={2}>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h5" gutterBottom>
                  Editar Contraseña
                </Typography>

                <TextField
                  id="standard-password-input"
                  margin="normal"
                  className={classes.title}
                  fullWidth
                  type="password"
                  label="Nueva Contraseña"
                  name="password"
                  inputRef={register({
                    required: "La campo requerido.",
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
                <TextField
                  id="standard-password-input"
                  margin="normal"
                  className={classes.title}
                  fullWidth
                  type="password"
                  label="Nueva Contraseña"
                  name="password2"
                  inputRef={register({
                    required: "La campo requerido.",
                  })}
                  error={Boolean(errors.password2)}
                  helperText={errors.password2?.message}
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

export default EditPasswordManager;

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
