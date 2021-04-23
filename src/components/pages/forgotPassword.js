import React from "react";
import { useForm } from "react-hook-form";
import {sendVerificationCode } from "../../services/user";

const ForgotPassword = ({ history }) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        const response = await sendVerificationCode(data.email);
        console.log(response);
        if(response.code === 201){
          localStorage.setItem("email", data.email);
          history.replace("verification_code");
        }else{
          <span>{response.message}</span>
        }
        
      };
    return (
        <div>
        <h1>Olvidé Mi Contraseña</h1>
  
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
            
            
          <input type="submit"  value="Envíar Código"/>
        </form>
      </div>
    )
}

export default ForgotPassword
