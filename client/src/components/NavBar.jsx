
import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">VPP</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto" >

      <li className="nav-item active">
        <Link to="/"  className="nav-link">Principal</Link> <span className="sr-only">(current)</span>
      </li>

      <li className="nav-item">
        <Link to="/proyectos" className="nav-link">Proyectos</Link>
      </li>    

      <li className="nav-item">
        <Link to="/registro" className="nav-link">Registro</Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link">Iniciar Sesión</Link>
      </li>
    </ul>
  </div>
</nav>
    );
  }
}

export default Navbar;




