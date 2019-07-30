import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Registro from './Registro';
import datosUsuario from '../functions/datosUsuario.js';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: datosUsuario.datosPresentes()
        ? datosUsuario.obtenerDatosDeUsuario()
        : null,
      token: datosUsuario.obtenerToken()
    };

    this.verificarStorage = this.verificarStorage.bind(this);
  }

  mostrarSeccionAutenticacion() {
    if (this.state.usuario && this.state.token) {
      return (
        <li className="nav-item dropdown pointer nolist">
          <a
            className="nav-link dropdown-toggle text-light"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.usuario.nombreDeUsuario}
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {this.state.usuario.rol === 'administrador' ? (
              <Link className="dropdown-item pointer" to={`/dashboard`}>
                Dashboard
              </Link>
            ) : (
              ''
            )}
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
          className="nav-item navbar-right nolist"
          onClick={() => this.closeToggler()}
        >
          <a
            id="botonParaIniciarSesion"
            className="nav-link pointer text-light"
            data-toggle="modal"
            data-target="#loginModal"
          >
            <button className="btn btn-outline-info">
              <i class="fas fa-sign-in-alt " />
              &nbsp;Iniciar sesión
            </button>
          </a>
        </li>
      );

      lista.push(
        <li
          key="registroModalKey"
          className="nav-item navbar-right nolist"
          onClick={() => this.closeToggler()}
        >
          <a
            id="botonParaRegistrarse"
            className="nav-link pointer text-light"
            data-toggle="modal"
            data-target="#registroModal"
          >
            <button className="btn text-info">
              <i class="fas fa-user-plus" />
              &nbsp;Registrarse
            </button>
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
    if (datosUsuario.datosPresentes()) {
      this.setState(
        {
          usuario: datosUsuario.obtenerDatosDeUsuario(),
          token: datosUsuario.obtenerToken(),
          sesionIniciada: true
        },
        window.location.reload()
      );
    }
  }

  cerrarSesion() {
    datosUsuario.eliminarDatos();
    this.setState({
      usuario: null,
      token: null,
      sesionIniciada: false
    });
  }

  render() {
    return (
      <div>
        <div>
          <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark"
            align="center"
          >
            <Link to={`/`} className="navbar-brand marg" align="center">
              {' '}
              Sii-Cuidamos{' '}
            </Link>
            <button
              id="closeToggler"
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar"
              aria-controls="navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="navbar">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to={`/proyectos`}>
                    Proyectos
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/sobreElProyecto`}>
                    Sobre nosotros
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={`/ayuda`}>
                    {' '}
                    Ayuda
                  </Link>
                </li>
              </ul>
              {this.mostrarSeccionAutenticacion()}
            </div>
          </nav>
        </div>
        <Login verificar={this.verificarStorage} />
        <Registro verificar={this.verificarStorage} />
      </div>
    );
  }
}

export default Navbar;
