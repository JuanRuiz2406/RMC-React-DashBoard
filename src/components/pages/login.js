import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);

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

      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default Login;
