import React, { Component, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Login from './autenticacion/Login';
import Registro from './autenticacion/Registro';
import datosUsuario from '../functions/datosUsuario.js';
import imagenLogo from '../images/logos/siiCuidamosLogo.png';

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
          <div
            className="nav-link dropdown-toggle text-light"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.usuario.nombreDeUsuario}
          </div>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            {this.state.usuario.rol === 'administrador' ? (
              <Link className="dropdown-item pointer" to={`/dashboard`}>
                Dashboard
              </Link>
            ) : (
              ''
            )}
            <div
              className="dropdown-item pointer"
              onClick={() => this.cerrarSesion()}
            >
              Cerrar sesión
            </div>
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
          <div
            id="botonParaIniciarSesion"
            className="nav-link pointer text-light"
            data-toggle="modal"
            data-target="#loginModal"
          >
            <button className="btn text-light shadow-none">
              <i className="fas fa-sign-in-alt " />
              &nbsp;Iniciar sesión
            </button>
          </div>
        </li>
      );

      lista.push(
        <li
          key="registroModalKey"
          className="nav-item navbar-right nolist"
          onClick={() => this.closeToggler()}
        >
          <div
            id="botonParaRegistrarse"
            className="nav-link pointer text-light"
            data-toggle="modal"
            data-target="#registroModal"
          >
            <button
              id="botonRegistro"
              className="btn btn-outline-light shadow-none"
            >
              <i className="fas fa-user-plus" />
              &nbsp;Registrarse
            </button>
          </div>
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
    window.location.reload();
  }

  render() {
    return (
      <Fragment>
        <nav
          id="siiCuidamosNavbar"
          className="navbar navbar-expand-lg navbar-dark bg-dark shadow justify-content-center"
        >
          <Link
            to={`/`}
            className="navbar-brand d-flex w-50 mr-auto"
            align="center"
          >
            <img
              src={imagenLogo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            />
            &nbsp;Sii-Cuidamos
          </Link>
          <button
            id="closeToggler"
            className="navbar-toggler shadow-none"
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
            className="navbar-collapse collapse w-100"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav w-100 justify-content-center">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact={true}
                  to={''}
                  onClick={() => {
                    this.closeToggler();
                  }}
                >
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/proyectos`}
                  onClick={() => {
                    this.closeToggler();
                  }}
                >
                  Proyectos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/sobreElProyecto`}
                  onClick={() => {
                    this.closeToggler();
                  }}
                >
                  Sobre nosotros
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/ayuda`}
                  onClick={() => {
                    this.closeToggler();
                  }}
                >
                  Ayuda
                </NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
              {this.mostrarSeccionAutenticacion()}
            </ul>
          </div>
        </nav>
        <Login verificar={this.verificarStorage} />
        <Registro verificar={this.verificarStorage} />
      </Fragment>
    );
  }
}

export default Navbar;
