import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: JSON.parse(localStorage.getItem('usuarioVPP')),
      token: localStorage.getItem('tokenVPP')
    };

    this.verificarStorage = this.verificarStorage.bind(this);
  }

  mostrarSeccionAutenticacion() {
    if (this.state.usuario && this.state.token) {
      return (
        <li className="nav-item dropdown pointer">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.usuario.nombreDeUsuario}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a
              className="dropdown-item pointer"
              onClick={() => this.cerrarSesion()}
            >
              Cerrar sesión
            </a>
          </div>
        </li>
      );
    } else {
      const lista = [];

      lista.push(
        <li
          key="loginModalKey"
          className="nav-item navbar-right"
          onClick={() => this.closeToggler()}
        >
          <a
            id="botonParaIniciarSesion"
            className="nav-link pointer"
            data-toggle="modal"
            data-target="#loginModal"
          >
            Iniciar sesión
          </a>
        </li>
      );

      lista.push(
        <li
          key="registroModalKey"
          className="nav-item navbar-right"
          onClick={() => this.closeToggler()}
        >
          <a
            id="botonParaRegistrarse"
            className="nav-link pointer"
            data-toggle="modal"
            data-target="#registroModal"
          >
            Registrarse
          </a>
        </li>
      );

      return lista;
    }
  }

  closeToggler() {
    if (window.innerWidth < 992) {
      document.getElementById('closeToggler').click();
    }
  }

  verificarStorage() {
    if (
      localStorage.getItem('usuarioVPP') &&
      localStorage.getItem('tokenVPP')
    ) {
      this.setState(
        {
          usuario: JSON.parse(localStorage.getItem('usuarioVPP')),
          token: localStorage.getItem('tokenVPP'),
          sesionIniciada: true
        },
        window.location.reload()
      );
    }
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioVPP');
    localStorage.removeItem('tokenVPP');
    this.setState(
      {
        usuario: null,
        token: null,
        sesionIniciada: false
      },
      window.location.reload()
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container container-fluid">
            <NavLink
              to="/proyectos"
              className="navbar-brand d-lg-none d-md-block"
            >
              SII-Cuidamos
            </NavLink>{' '}
            <span className="sr-only">(current)</span>
            <button
              className="navbar-toggler"
              id="closeToggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mx-auto">
                <li className="nav-item" onClick={() => this.closeToggler()}>
                  <NavLink to="/proyectos" className="nav-link">
                    Proyectos
                  </NavLink>
                </li>

                <li className="nav-item" onClick={() => this.closeToggler()}>
                  <NavLink to="/sobreElProyecto" className="nav-link">
                    Sobre el proyecto
                  </NavLink>
                </li>

                <li className="nav-item" onClick={() => this.closeToggler()}>
                  <NavLink to="/ayuda" className="nav-link">
                    Ayuda
                  </NavLink>
                </li>

                {/* <li className="nav-item">
                  <NavLink to="/sobreVPP" className="nav-link">
                    Sobre VPP
                  </NavLink>
                </li>  */}

                {this.mostrarSeccionAutenticacion()}
              </ul>
            </div>
          </div>
        </nav>
        <Login verificar={this.verificarStorage} />
        <Registro verificar={this.verificarStorage} />
      </div>
    );
  }
}

export default Navbar;
