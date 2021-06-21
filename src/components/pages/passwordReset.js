import React from "react";
import { useForm } from "react-hook-form";
import logo from "../../images/ReportsMyCityLogin.png";
import { verificationCode } from "../../services/user";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../ui/themeConfig";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import UpdateIcon from "@material-ui/icons/Update";

const PasswordReset = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    if (data.password1 === data.password2) {
      console.log("passed");
      const response = await verificationCode(
        localStorage.getItem("email"),
        data.code,
        data.password2
      );
      console.log(response);
      if (response.code === 201) {
        history.replace("login");
      }
    } else {
      console.log("las contraseñas no coinciden");
    }
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
            Verificacion y Cambio de Contraseña
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="standard-basic"
              margin="normal"
              fullWidth
              label="Codigo de verificacion"
              type="code"
              name="code"
              inputRef={register({
                required: "El codigo es obligatorio.",
              })}
              error={Boolean(errors.code)}
              helperText={errors.email?.message}
            />

            <TextField
              id="standard-password-input"
              margin="normal"
              className={classes.title}
              fullWidth
              type="password"
              label="Contraseña"
              name="password1"
              inputRef={register({
                required: "La contraseña es requerida.",
              })}
              error={Boolean(errors.password1)}
              helperText={errors.password1?.message}
            />

            <TextField
              id="standard-password-input"
              margin="normal"
              className={classes.title}
              fullWidth
              type="password"
              label="Contraseña"
              name="password2"
              inputRef={register({
                required: "La contraseña es requerida.",
              })}
              error={Boolean(errors.password2)}
              helperText={errors.password2?.message}
            />

            <Button
              type="submit"
              className={classes.submit}
              fullWidth
              style={{ marginTop: "10%" }}
              variant="contained"
              color="primary"
              endIcon={<UpdateIcon />}
            >
              Actualizar Contraseña
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default PasswordReset;

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
