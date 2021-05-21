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
    <div className="row justify-content-center align-item-center" style={{ marginTop: '5%' }}>
      <div className="col-8 text-center align-self-center rounded">
        <div className="row justify-content-center">
          <div className="col-auto text-center align-self-center border border-3 border-secondary bg-white rounded" style={{ marginTop: '2%', marginBottom: '2%', padding: '2% 10%' }}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Bienvenido</h2>

              <img src={logo} style={{ width: '300px', height: '100px' }} />
              <div className="form-group text-start" style={{ marginTop: '5%', marginBottom: '5%' }}>
                <label>Correo Electrónico</label>
                <input
                  className="form-control"
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
              </div>

              <div className="form-group text-start" style={{ marginTop: '5%', marginBottom: '5%' }}>
                <label>Contraseña</label>
                <input
                  className="form-control"
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
              </div>
              <div className="text-start">
                <Link to="/forgot_password"><p>Olvidé mi Contraseña</p></Link>
              </div>

              <button type="submit" className="btn btn-outline-primary">Iniciar Sesión</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
