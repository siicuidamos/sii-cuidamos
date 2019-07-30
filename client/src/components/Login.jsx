import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      clave: '',
      error: [],
      loading: false
    };

    this.verificar = props.verificar;

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangeClave = this.handleChangeClave.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    let errores = [];
    this.setState({
      error: [],
      loading: true
    });

    axios
      .post('/vpp/api/iniciarSesion', {
        email: this.state.email.toLowerCase(),
        clave: this.state.clave
      })
      .then(res => {
        let exito = res.data.exito;
        if (!exito) {
          errores.push(
            <p className="mb-0" key="primerErrorLogin">
              &bull;&nbsp;
              {res.data.mensaje}
            </p>
          );
          this.setState({
            error: errores,
            loading: false
          });
        } else {
          this.setState({
            loading: false
          });
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
      .catch(error => {
        console.log(error);
        this.setState({
          error: [
            <p className="mb-0" key="primerErrorLogin">
              &bull;&nbsp;Se presentó un error realizando la petición
            </p>
          ],
          loading: false
        });
      });

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

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
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
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title" id="exampleModalLabel">
                ¡Bienvenido!
              </h5>
              <button
                type="button"
                id="cerrarLoginModal"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="text-light" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="emailInput">
                    <b>Correo</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    value={this.state.value}
                    onChange={this.handleChangeEmail}
                    disabled={this.state.loading}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="loginInputPassword">
                    <b>Contraseña</b>
                  </label>
                  <input
                    type="password"
                    minLength="8"
                    maxLength="35"
                    className="form-control"
                    id="loginInputPassword1"
                    value={this.state.value}
                    onChange={this.handleChangeClave}
                    autoComplete="password"
                    disabled={this.state.loading}
                    required
                  />
                </div>
                {this.mostrarError()}
                <center>
                  {this.state.loading ? (
                    <i className="fas fa-spin fa-spinner fa-2x" />
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Iniciar sesión
                    </button>
                  )}
                </center>
                <br />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
