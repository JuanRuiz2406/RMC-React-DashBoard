import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="container">
      Navbar
      <Link to="/login">Login</Link>
      <Link to="/">Home</Link>
      <Link to="/contrasena_olvidada">Olvidé mi Contraseña</Link>
    </div>
  );
};
