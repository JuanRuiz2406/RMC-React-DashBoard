import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useForm } from "react-hook-form";
import { login } from "../../services/user";
import { Link } from "react-router-dom";
import { getDepartmentAdmin } from "../../services/departments";

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

        dispatch({
          type: types.login,
          payload: {
            token: "Bearer " + loginResponse.token,
            user: loginResponse.user,
          },
        });
      }
    }

    history.replace(lastPath);
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Correo Electrónico</h3>
        <input
          type="text"
          placeholder="Email"
          name="email"
          ref={register({
            required: {
              value: true,
              message: "*El Correo Electrónico es obligatorio*",
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "*El Correo Electrónico debe tener un formato válido*",
            },
          })}
        />
        <span>{errors?.email?.message}</span>

        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          ref={register({
            required: {
              value: true,
              message: "*La Contraseña es obligatoria*",
            },
            minLength: {
              value: 8,
              message: "*La Contraseña debe tener mínimo 8 caracteres*",
            },
          })}
        />
        <span>{errors?.password?.message}</span>

        <input type="submit" value="Iniciar Sesión" />
      </form>

      <Link to="/forgot_password">Olvidé mi Contraseña</Link>
    </div>
  );
};

export default Login;
