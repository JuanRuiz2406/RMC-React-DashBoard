import React from "react";
import { useForm } from "react-hook-form";
import { sendVerificationCode } from "../../services/user";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import logo from "../../images/ReportsMyCity.png"

const ForgotPassword = ({ history }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await sendVerificationCode(data.email);
    console.log(response);
    if (response.code === 201) {
      localStorage.setItem("email", data.email);
      history.replace("password_reset");
    } else {
      <span>{response.message}</span>
    }

  };
  return (
    <div className="row justify-content-center align-item-center" style={{ marginTop: '5%' }}>
      <div className="col-8 text-center align-self-center rounded">
        <div className="row justify-content-center">
          <div className="col-auto text-center align-self-center border border-3 border-secondary bg-white rounded" style={{ marginTop: '2%', marginBottom: '2%', padding: '2% 10%' }}>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Olvidé Mi Contraseña</h2>

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


              <button type="submit" className="btn btn-outline-primary">Enviar codigo</button>
            </form>

          </div>
        </div>
      </div>
    </div>

  )
}

export default ForgotPassword
