import React from "react";
import { useForm } from "react-hook-form";
import {verificationCode } from "../../services/user";

const VerificationCode = ({ history }) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = async (data) => {
        console.log(data.code);
        console.log(localStorage.getItem("email"));
        const response = await verificationCode(localStorage.getItem("email"), data.code);
        console.log(response);
        if(response.code === 201){
          history.replace("password_reset");
        }else{
          <span>{response.message}</span>
        }
        
      };
    return (
        <div>
        <h1>Verificación de Código</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Código</h3>
          <input
            type="text"
            placeholder="código"
            name="code"
            ref={register({
              required: {
                value: true,
                message: "*El Código es obligatorio*",
              },
              minLength: {
                value: 8,
                message: "*El código debe de contener 8 caracteres*",
              },
            })}
          />
          <span>{errors?.code?.message}</span>
            
            
          <input type="submit"  value="Envíar Código"/>
        </form>

      </div>

    )
}

export default VerificationCode
