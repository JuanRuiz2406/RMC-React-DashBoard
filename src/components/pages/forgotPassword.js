import React from "react";
import { useForm } from "react-hook-form";
import { sendVerificationCode } from "../../services/user";
import logo from "../../images/ReportsMyCityLogin.png";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../ui/themeConfig";
import Button from "@material-ui/core/Button";
import Send from "@material-ui/icons/Send";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Success, Error } from "../alerts";

const ForgotPassword = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await sendVerificationCode(data.email);
    console.log(response);
    if (response.code === 201) {
      localStorage.setItem("email", data.email);
      Success(response.message);
      history.replace("password_reset");
    } else {
      Error(response.message);
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
            Recuperacion de Contraseña
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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

            <Button
              type="submit"
              className={classes.submit}
              fullWidth
              style={{ marginTop: "10%" }}
              variant="contained"
              color="primary"
              endIcon={<Send />}
            >
              Enviar Codigo
            </Button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPassword;

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
}));
