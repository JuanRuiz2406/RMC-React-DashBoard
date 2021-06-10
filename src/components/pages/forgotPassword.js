import React, {useState} from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { sendVerificationCode } from "../../services/user";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import logo from "../../images/ReportsmycityTransp.png";

import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from "../ui/themeConfig";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import Button from '@material-ui/core/Button';
import Send from "@material-ui/icons/Send";
import Link from '@material-ui/core/Link';


const ForgotPassword = ({ history }) => {

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async () => {
    const response = await sendVerificationCode(values.email);
    console.log(response);
    if (response.code === 201) {
      localStorage.setItem("email", values.email);
      history.replace("password_reset");
    } else {
      <span>{response.message}</span>
    }

  };

  const [values, setValues] = useState({
    amount: "",
    email: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });


  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div
        className="row justify-content-center align-item-center"
        style={{
          paddingTop: "5%",
          paddingBottom: "18%",
          backgroundColor: "#011B42",
        }}
      >
        <div className="col-8 text-center align-self-center rounded">
          <div className="row justify-content-center">
            <div
              className="col-auto text-center align-self-center border border-2 rounded"
              style={{ marginTop: "2%", marginBottom: "2%", padding: "2% 10%", background: "#032D6B" }}
            >
              <form
                className={classes.root}
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <img src={logo} style={{ width: "250px", height: "250px" }} />
                <div
                  className="form-group text-start"
                  style={{ marginTop: "3%", marginBottom: "5%" }}
                >
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    <InputLabel htmlFor="standard-adornment-password">
                      Correo
                    </InputLabel>
                    <Input
                      id="standard-adornment-password"
                      label="Correo"
                      type="text"
                      value={values.email}
                      onChange={handleChange("email")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <AlternateEmailIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>

                <Button type="submit" className={classes.button} style={{marginTop: '10%'}} variant="contained"
                  color="primary" endIcon={<Send/>}>
                  Enviar codigo
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>

  )
}

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
}));
