import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useForm } from "react-hook-form";

const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    handleLogin();
  };
  console.log(errors);

  const handleLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    dispatch({
      type: types.login,
      payload: {
        name: "Juan",
        email: "juan@email.com",
      },
    });

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
          name="Email"
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
        <span>{errors?.Email?.message}</span>

        <h3>Contraseña</h3>
        <input
          type="password"
          placeholder="Contraseña"
          name="Password"
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
        <span>{errors?.Password?.message}</span>

        <input type="submit" />
      </form>

      {/* <button onClick={handleLogin}>Iniciar Sesión</button> */}
    </div>
  );
};

export default Login;
