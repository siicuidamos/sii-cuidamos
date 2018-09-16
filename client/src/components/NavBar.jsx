
import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Navbar extends Component {
  render() {
    return (
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" className="navbar-brand">VPP</Link> <span className="sr-only">(current)</span>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto" >

      <li className="nav-item">
        <Link to="/proyectos" className="nav-link">Proyectos</Link>
      </li>    

      <li className="nav-item">
        <Link to="/ayuda" className="nav-link">Ayuda</Link>
      </li>


      <li className="nav-item navbar-right">
        <Link to="/login" className="nav-link">Iniciar Sesión</Link>
      </li>

    </ul>
  </div>
</nav>
    );
  }
}

export default Navbar;




