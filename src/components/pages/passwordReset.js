import React from "react";
import { useForm } from "react-hook-form";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import logo from "../../images/ReportsMyCity.png"

const PasswordReset = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    console.log(data.password1);
    console.log(data.password2);
    if (data.password1 === data.password2) {
      console.log("passed");
    } else {
      console.log("las contraseñas no coinciden");
    }
  };
  return (
    <div className="row justify-content-center align-item-center" style={{ marginTop: '5%' }}>
      <div className="col-8 text-center align-self-center rounded">
        <div className="row justify-content-center">
          <div className="col-auto text-center align-self-center border border-3 border-secondary bg-white rounded" style={{ marginTop: '2%', marginBottom: '2%', padding: '2% 10%' }}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Restablecer Contraseña</h2>

              <img src={logo} style={{ width: '300px', height: '100px' }} />

              <div className="form-group text-start" style={{ marginTop: '5%', marginBottom: '5%' }}>
                <label>Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                  name="password1"
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

              <div className="form-group text-start" style={{ marginTop: '5%', marginBottom: '5%' }}>
                <label>Confirmar Contraseña</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                  name="password2"
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


              <button type="submit" className="btn btn-outline-primary">Iniciar Sesión</button>
            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset
