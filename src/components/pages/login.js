import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useForm } from "react-hook-form";
import { login, getUserByEmail } from "../../services/user";

const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    handleLogin(data.email, data.password);
  };

  const handleLogin = async (email, password) => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    const token = await login({
      email: email,
      password: password,
    });

    handleUser(email);

    history.replace(lastPath);
  };

  const handleUser = async (email) => {
    const user = await getUserByEmail(email);

    if (localStorage.getItem("token") !== undefined) {
      dispatch({
        type: types.login,
        payload: {
          token: localStorage.getItem("token"),
          user: localStorage.getItem("userData"),
        },
      });
    }
  }

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

        <input type="submit" />
      </form>

      {/* <button onClick={handleLogin}>Iniciar Sesión</button> */}
    </div>
  );
};

export default Login;
