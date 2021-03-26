import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

const Home = () => {

    const { dispatch } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {

        history.replace('/login');
        
        dispatch({
            type: types.logout
        });
    }

    return (
        <div>
            <h1>Home, Bienvenido a RMC </h1>

            <button
                onClick={ handleLogout }
            >
                Cerrar Sesión
            </button>
        </div>
    )
}

export default Home
