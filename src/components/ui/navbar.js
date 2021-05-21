import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("userData"));

export const NavBar = () => {
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    history.replace("/login");

    dispatch({
      type: types.logout,
    });
  };

  return (
    <div className="container">
      Navbar
      <Link to="/">Reportes</Link>
      {user.role === "RMCTeam" ? (
        <Link to="/municipalidades">Municipalidades</Link>
      ) : (
        <Link to="/municipalidades">Ver Municipalidad</Link>
      )}
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};
