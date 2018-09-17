import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombreDeUsuario: '',
      clave: '',
      error: []
    };

    this.verificar = props.verificar;

    this.handleChangeNombreDeUsuario = this.handleChangeNombreDeUsuario.bind(
      this
    );

    this.handleChangeClave = this.handleChangeClave.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let errores = [];
    if (
      this.state.nombreDeUsuario.length < 3 ||
      this.state.nombreDeUsuario.length > 15
    ) {
      errores.push(
        <p>
          &bull;&nbsp;El nombre de usuario debe tener entre 3 y 15 carateres.
        </p>
      );
    }

    if (this.state.clave.length < 8 || this.state.clave.length > 30) {
      errores.push(
        <p>&bull;&nbsp;La contraseña debe tener entre 8 y 35 carateres.</p>
      );
    }

    if (errores.length === 0) {
      axios
        .post('/vpp/api/iniciarSesion', {
          nombreDeUsuario: this.state.nombreDeUsuario,
          clave: this.state.clave
        })
        .then(res => {
          let exito = res.data.exito;
          if (!exito) {
            errores.push(
              <p>
                &bull;&nbsp;
                {res.data.mensaje}
              </p>
            );
            this.setState({
              error: errores
            });
          } else {
            let data = res.data;
            let usuario = data.usuario;
            delete usuario.clave;
            delete usuario._id;
            localStorage.setItem('tokenVPP', data.token);
            localStorage.setItem('usuarioVPP', JSON.stringify(data.usuario));
            document.getElementById('cerrarLoginModal').click();
            this.verificar();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        error: errores
      });
    }

    event.preventDefault();
  }

  mostrarError() {
    if (this.state.error.length > 0) {
      return (
        <div className="alert alert-danger letra-pequenia" role="alert">
          {this.state.error}
        </div>
      );
    }
  }

  handleChangeNombreDeUsuario(event) {
    this.setState({ nombreDeUsuario: event.target.value });
  }

  handleChangeClave(event) {
    this.setState({ clave: event.target.value });
  }

  render() {
    return (
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-sm"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Bienvenido a VPP
              </h5>
              <button
                type="button"
                id="cerrarLoginModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nombreDeUsuarioInput">
                    <b>Nombre de usuario</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreDeUsuarioInput"
                    value={this.state.value}
                    onChange={this.handleChangeNombreDeUsuario}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginInputPassword">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="loginInputPassword1"
                    value={this.state.value}
                    onChange={this.handleChangeClave}
                    required
                  />
                </div>
                {this.mostrarError()}
               <center>
                <button type="submit" className="btn btn-success">
                  Iniciar sesión
                </button>
               </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
