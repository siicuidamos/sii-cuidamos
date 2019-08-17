import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class RestablecerContrasena extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      newPassword: '',
      verificationCode: '',
      validUser: false,
      loading: false
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleVerificationCodeChange = this.handleVerificationCodeChange.bind(
      this
    );

    this.handleEmailVerificationSubmit = this.handleEmailVerificationSubmit.bind(
      this
    );
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleNewPasswordChange(event) {
    this.setState({
      newPassword: event.target.value
    });
  }

  handleVerificationCodeChange(event) {
    this.setState({
      verificationCode: event.target.value
    });
  }

  handleEmailVerificationSubmit(event) {
    this.setState({
      loading: true
    });

    axios
      .post('/vpp/api/obtenerCodigo', {
        email: this.state.email.toLowerCase()
      })
      .then(res => {
        let success = res.data.exito;
        if (success) {
          alert(res.data.mensaje);
          this.setState({
            loading: false,
            validUser: true
          });
        } else {
          alert(res.data.mensaje);
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        alert('Se presentó un error obteniendo el código');
        this.setState({
          loading: false
        });
      });

    event.preventDefault();
  }

  handleResetPasswordSubmit(event) {
    this.setState({
      loading: true
    });

    axios
      .post('/vpp/api/restablecerContrasena', {
        email: this.state.email.toLowerCase(),
        contrasena: this.state.newPassword,
        codigo: this.state.verificationCode
      })
      .then(res => {
        let success = res.data.exito;
        if (success) {
          alert(res.data.mensaje);
          this.setState({
            loading: false
          });
          document.getElementById('botonParaIniciarSesion').click();
          this.props.history.push('/');
        } else {
          alert(res.data.mensaje);
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        alert('Se presentó un error restableciendo la contraseña');
        this.setState({
          loading: false
        });
      });

    event.preventDefault();
  }

  render() {
    const spinner = <i className="fas fa-spin fa-spinner fa-2x" />;

    return (
      <div className="row">
        <div className="col-12 mt-3 text-center">
          <br />
        </div>
        <div className="col-12 text-center montserrat mb-2">
          <h5>Restablecer contraseña</h5>
        </div>
        <div className="col-lg-3 col-10 mx-auto open-sans">
          <div className="card shadow trans-blue-border">
            <div className="card-body">
              <p className="text-justify">
                Una vez tu correo sea validado, debes ingresar a tu bandeja de
                entrada y copiar el código de verificación que te enviamos.
              </p>

              {!this.state.validUser ? (
                <Fragment>
                  <form onSubmit={this.handleEmailVerificationSubmit}>
                    <div className="form-group">
                      <label
                        className="col-form-label"
                        htmlFor="resetTransformaccionesEmail"
                      >
                        <b>Dirección de correo</b>
                      </label>
                      <div className="input-group">
                        <input
                          id="resetTransformaccionesEmail"
                          name="resetTransformaccionesEmail"
                          type="email"
                          className="form-control"
                          value={this.state.email}
                          onChange={this.handleEmailChange}
                          disabled={this.state.loading}
                          required
                        />
                      </div>
                    </div>
                    {!this.state.loading ? (
                      <div className="text-center">
                        <button
                          className="btn btn-info mt-2 mb-2"
                          type="submit"
                        >
                          <i className="fas fa-envelope" />
                          &nbsp;Obtener código
                        </button>
                      </div>
                    ) : (
                      ''
                    )}
                  </form>
                </Fragment>
              ) : (
                <form onSubmit={this.handleResetPasswordSubmit}>
                  <div className="form-group">
                    <label
                      className="col-form-label"
                      htmlFor="resetTransformaccionesVerificationCode"
                    >
                      <b>Código de verificación</b>
                    </label>
                    <div className="input-group">
                      <input
                        id="resetTransformaccionesVerificationCode"
                        name="resetTransformaccionesVerificationCode"
                        type="number"
                        className="form-control"
                        value={this.state.verificationCode}
                        onChange={this.handleVerificationCodeChange}
                        disabled={this.state.loading}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      className="col-form-label"
                      htmlFor="resetTransformaccionesPassword"
                    >
                      <b>Nueva contraseña</b>
                    </label>
                    <div className="input-group">
                      <input
                        id="resetTransformaccionesPassword"
                        name="resetTransformaccionesPassword"
                        type="password"
                        className="form-control"
                        minLength="8"
                        value={this.state.newPassword}
                        onChange={this.handleNewPasswordChange}
                        disabled={this.state.loading}
                        required
                      />
                    </div>
                  </div>
                  {!this.state.loading ? (
                    <div className="text-center">
                      <button
                        className="btn btn-success mt-2 mb-2"
                        type="submit"
                      >
                        Cambiar contraseña
                      </button>
                    </div>
                  ) : (
                    ''
                  )}
                </form>
              )}
              <div className="text-center mt-2">
                {this.state.loading ? spinner : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RestablecerContrasena);
