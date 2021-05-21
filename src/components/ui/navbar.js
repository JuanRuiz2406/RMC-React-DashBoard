import React, { useContext } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/ReportsMyCity.png";
import person from "../../images/avatar.png";

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
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-white">
        <Link className="navbar-brand" to="/user">
          <img className="rounded rounded-circle" src={person} style={{ width: "70px", height: "70px", margin: '0% 10%' }} />
          <Link className="navbar-brand" to="/">Reportes</Link>
          {user.role === "RMCTeam" ? (
            <Link className="navbar-brand" to="/municipalidades">Municipalidades</Link>
          ) : (
            <Link className="navbar-brand" to="/municipalidades">Ver Municipalidad</Link>
          )}


        </Link>

        <span className="navbar-text">
          <img src={logo} style={{ width: "300px", height: "70px" }} />
        </span>


      </nav>
    </div>
  );
};
