import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useForm } from "react-hook-form";
import { login } from "../../services/user";
import { getDepartmentAdmin } from "../../services/departments";

import logo from "../../images/ReportsMyCityLogin.png";
import { Link as RouterLink } from "react-router-dom";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../ui/themeConfig";
import Button from "@material-ui/core/Button";
import LockOpen from "@material-ui/icons/LockOpen";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { Error } from "../alerts";
import { getMunicipalityByAdmin } from "../../services/municipalities";

const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    handleLogin(data.email, data.password);
  };

  const handleLogin = async (email, password) => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    const loginResponse = await login({
      email: email,
      password: password,
    });

    if (loginResponse.user.role !== "user") {
      if (loginResponse.token != undefined || loginResponse.token != null) {
        localStorage.setItem("token", "Bearer " + loginResponse.token);
        localStorage.setItem("userData", JSON.stringify(loginResponse.user));

        if (loginResponse.user.role === "MunicipalityAdmin") {
          const municipalityResponse = await getMunicipalityByAdmin(
            loginResponse.user.id
          );

          localStorage.setItem(
            "municipality",
            JSON.stringify(municipalityResponse[0])
          );
        } else if (loginResponse.user.role === "DepartmentAdmin") {
          const departmentResponse = await getDepartmentAdmin(
            loginResponse.user.id
          );

          localStorage.setItem(
            "department",
            JSON.stringify(departmentResponse[0])
          );
        }
        dispatch({
          type: types.login,
          payload: {
            token: "Bearer " + loginResponse.token,
            user: loginResponse.user,
          },
        });
      } else {
        Error(loginResponse.message);
      }
    } else {
      Error(
        "Esta es una aplicación Administrativa, no tienes permiso para acceder..."
      );
    }

    history.replace(lastPath);
  };
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "250px", height: "250px" }}
          />
          <Typography className={classes.title} component="h1" variant="h5">
            Inicio de Sesion
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="standard-basic"
              margin="normal"
              fullWidth
              label="Correo Electrónico"
              type="email"
              name="email"
              inputRef={register({
                required: "El Correo Electrónico es requerido.",
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
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

            <Grid container>
              <Grid item xs>
                <Link
                  component={RouterLink}
                  className={classes.forgot}
                  variant="body2"
                  to="/forgot_password"
                >
                  Olvidé mi Contraseña
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.submit}
              fullWidth
              style={{ marginTop: "10%" }}
              variant="contained"
              color="primary"
              endIcon={<LockOpen />}
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Login;

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(45deg, #e3f2fd 10%, #64b5f6 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
    border: 1,
    borderRadius: 8,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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
  containerColor: {
    color: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));
