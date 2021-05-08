import React from "react";
import { useForm } from "react-hook-form";

const PasswordReset = ({ history }) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        console.log(data.password1);
        console.log(data.password2);
        if(data.password1 === data.password2){
            console.log("passed");
        }else{
            console.log("las contraseñas no coinciden");
        }
      };
    return (
        <div>
        <h1>Restablecer Contraseña</h1>
        <form onSubmit={handleSubmit(onSubmit)}>

          <h3>Contraseña</h3>
          <input
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

          <h3>Confirmar Contraseña</h3>
          <input
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
  
          <input type="submit" />
        </form>
      </div>
    )
}

export default PasswordReset
