import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <li key="loginModalKey" className="nav-item navbar-right">
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
        <li key="registroModalKey" className="nav-item navbar-right">
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
            <Link to="/proyectos" className="navbar-brand">
              VPP
            </Link>{' '}
            <span className="sr-only">(current)</span>
            <button
              className="navbar-toggler"
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
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/proyectos" className="nav-link">
                    Proyectos
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/ayuda" className="nav-link">
                    Ayuda
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link to="/sobreVPP" className="nav-link">
                    Sobre VPP
                  </Link>
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
