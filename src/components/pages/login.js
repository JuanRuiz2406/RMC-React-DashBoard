import React, { useContext, useState } from "react";
import clsx from "clsx"
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useForm } from "react-hook-form";
import { login } from "../../services/user";
import { Link } from "react-router-dom";
import { getDepartmentAdmin } from "../../services/departments";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/ReportsmycityLogo.png";

import TextField from '@material-ui/core/TextField';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from '../ui/themeConfig';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

//materia





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

    if (loginResponse.token !== undefined) {
      localStorage.setItem("token", "Bearer " + loginResponse.token);
      localStorage.setItem("userData", JSON.stringify(loginResponse.user));

      if (loginResponse.user.role === "DepartmentAdmin") {
        const departmentResponse = await getDepartmentAdmin(
          loginResponse.user.id
        );

        console.log(departmentResponse);
        localStorage.setItem("department", JSON.stringify(departmentResponse));
      }
      dispatch({
        type: types.login,
        payload: {
          token: "Bearer " + loginResponse.token,
          user: loginResponse.user,
        },
      });
    }

    history.replace(lastPath);
  };
  const classes = useStyles();

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
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

  return (
    
<ThemeProvider theme={theme}>
    <div
      className="row justify-content-center align-item-center"
      style={{ paddingTop: "5%", paddingBottom: "16%", backgroundColor: "#011B42" }}
    >
      <div className="col-8 text-center align-self-center rounded">
        <div className="row justify-content-center">
          <div
            className="col-auto text-center align-self-center border border-3 rounded"
            style={{ marginTop: "2%", marginBottom: "2%", padding: "2% 10%" }}
          >
            
            <form className={classes.root} noValidate onSubmit={handleSubmit(onSubmit)}>

              <img src={logo} style={{ width: "200px", height: "200px" }} />
              <div
                className="form-group text-start"
                style={{ marginTop: "5%", marginBottom: "5%" }}
              >
                 <FormControl className={clsx(classes.margin, classes.textField)}>
               <InputLabel htmlFor="standard-adornment-password">Correo</InputLabel>
                <Input
                  id="standard-adornment-password"
                  label="Correo"
                  type='text'
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                      >
                        <AlternateEmailIcon />
                      </IconButton>
                    </InputAdornment>
            }
          />
          </FormControl>
              </div>

              <div
                className="form-group text-start"
                style={{ marginTop: "5%", marginBottom: "5%" }}
              >
              <FormControl className={clsx(classes.margin, classes.textField)}>
               <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  label="Contraseña"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
            }
          />
          </FormControl>
              </div>
              <div className="text-start">
                <Link to="/forgot_password">
                  <p>Olvidé mi Contraseña</p>
                </Link>
              </div>

              <button type="submit" className="btn btn-outline-primary">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
    
  );
};

export default Login;



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
    textField: {
      width: '25ch',
    },
  },

}));


