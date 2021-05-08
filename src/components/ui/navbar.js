import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("userData"));

export const NavBar = () => {
  return (
    <div className="container">
      Navbar
      <Link to="/">Home</Link>
      <Link to="/reporte">Reporte</Link>

      {user.role === "RMCTeam" &&
        <Link to="/reporte">Municipalidades *pendiente*</Link>
      }
    </div>
  );
};
