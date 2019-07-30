import React, { Component } from 'react';
import axios from 'axios';
const departamentos = require('../json/Departamentos.json');
const sectoresProfesionales = require('../json/SectoresProfesionales.json');

class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      clave: '',
      nivelEducativo: '',
      sector: '',
      departamentoDeOrigen: '',
      departamentoDeResidencia: '',
      nombreDeUsuario: '',
      error: [],
      loading: false
    };

    this.verificar = props.verificar;

    this.handleChangeEmail = this.handleChangeEmail.bind(this);

    this.handleChangeNombreDeUsuario = this.handleChangeNombreDeUsuario.bind(
      this
    );

    this.handleChangeClave = this.handleChangeClave.bind(this);

    this.handleChangeNivelEducativo = this.handleChangeNivelEducativo.bind(
      this
    );

    this.handleChangeSector = this.handleChangeSector.bind(this);

    this.handleDepartamentoDeOrigen = this.handleDepartamentoDeOrigen.bind(
      this
    );

    this.handleDepartamentoDeResidencia = this.handleDepartamentoDeResidencia.bind(
      this
    );

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      loading: true,
      error: []
    });
    let errores = [];
    axios
      .post('/vpp/api/registrarUsuario', {
        email: this.state.email.toLowerCase(),
        clave: this.state.clave,
        nivelEducativo: this.state.nivelEducativo,
        sector: this.state.sector,
        nombreDeUsuario: this.state.nombreDeUsuario,
        origen: this.state.departamentoDeOrigen,
        residencia: this.state.departamentoDeResidencia
      })
      .then(res => {
        let exito = res.data.exito;

        if (!exito) {
          errores.push(
            <p className="mb-0">
              &bull;&nbsp;
              {res.data.mensaje}
            </p>
          );
          this.setState({
            error: errores,
            loading: false
          });
        } else {
          this.setState(
            {
              email: '',
              clave: '',
              nivelEducativo: '',
              sector: '',
              departamentoDeOrigen: '',
              departamentoDeResidencia: '',
              nombreDeUsuario: '',
              error: [],
              loading: false
            },
            () => {
              document.getElementById('cerrarRegistroModal').click();
              alert(res.data.mensaje);
              document.getElementById('botonParaIniciarSesion').click();
            }
          );
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
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

  handleChangeNombreDeUsuario(event) {
    this.setState({ nombreDeUsuario: event.target.value });
  }

  handleChangeClave(event) {
    this.setState({ clave: event.target.value });
  }

  handleChangeNivelEducativo(event) {
    this.setState({ nivelEducativo: event.target.value });
  }

  handleChangeSector(event) {
    this.setState({ sector: event.target.value });
  }

  handleDepartamentoDeOrigen(event) {
    this.setState({ departamentoDeOrigen: event.target.value });
  }

  handleDepartamentoDeResidencia(event) {
    this.setState({ departamentoDeResidencia: event.target.value });
  }

  render() {
    return (
      <div
        className="container-fluid modal fade"
        id="registroModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <center>
                <h5 className="modal-title" id="exampleModalLabel">
                  Regístrate
                </h5>
              </center>
              <button
                type="button"
                id="cerrarRegistroModal"
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
              <p>
                Al registrarte podrás comentar sobre cualquier proyecto que
                desees, compartiendo así tu opinión sobre los proyectos públicos
                de Colombia.
              </p>
              <hr />
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="registroInputEmail">
                    <b>Correo</b>
                  </label>
                  <input
                    disabled={this.state.loading}
                    type="email"
                    className="form-control"
                    id="registroInputEmail"
                    value={this.state.email}
                    onChange={this.handleChangeEmail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombreDeUsuarioInput">
                    <b>Nombre de usuario</b>
                  </label>
                  <input
                    disabled={this.state.loading}
                    type="text"
                    className="form-control"
                    id="nombreDeUsuarioInput"
                    value={this.state.nombreDeUsuario}
                    onChange={this.handleChangeNombreDeUsuario}
                    minLength="3"
                    maxLength="20"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputUser1">
                    <b>Nivel educativo</b>
                  </label>
                  <select
                    disabled={this.state.loading}
                    className="form-control"
                    value={this.state.nivelEducativo}
                    onChange={this.handleChangeNivelEducativo}
                    required
                  >
                    <option value="" />
                    <option value="Basica Primaria">Básica Primaria</option>
                    <option value="Basica Secundaria">Básica Secundaria</option>
                    <option value="Educacion Media">Educación Media</option>
                    <option value="Pregrado">
                      Educación Superior - Pregrado
                    </option>
                    <option value="Postgrado">
                      Educación Superior - Postgrado
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputSector1">
                    <b>Sector profesional</b>
                  </label>
                  <select
                    disabled={this.state.loading}
                    className="form-control"
                    value={this.state.sector}
                    onChange={this.handleChangeSector}
                    required
                  >
                    <option value="" />
                    {sectoresProfesionales.map(sector => {
                      return (
                        <option value={sector} key={sector}>
                          {sector}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <b>Departamento de origen</b>
                  </label>
                  <select
                    disabled={this.state.loading}
                    className="form-control"
                    value={this.state.departamentoDeOrigen}
                    onChange={this.handleDepartamentoDeOrigen}
                    required
                  >
                    <option value="" />
                    {departamentos.map(departamento => {
                      return (
                        <option value={departamento} key={departamento}>
                          {departamento}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>
                    <b>Departamento de residencia</b>
                  </label>
                  <select
                    disabled={this.state.loading}
                    className="form-control"
                    value={this.state.departamentoDeResidencia}
                    onChange={this.handleDepartamentoDeResidencia}
                    required
                  >
                    <option value="" />
                    {departamentos.map(departamento => {
                      return (
                        <option value={departamento} key={2 + departamento}>
                          {departamento}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">
                    <b>Contraseña</b>
                  </label>
                  <input
                    disabled={this.state.loading}
                    type="password"
                    minLength="8"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={this.state.clave}
                    onChange={this.handleChangeClave}
                    required
                  />
                </div>
                {this.mostrarError()}
                <center>
                  {this.state.loading ? (
                    <i className="fas fa-spin fa-spinner fa-2x" />
                  ) : (
                    <button type="submit" className="btn btn-success">
                      Crear cuenta
                    </button>
                  )}
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Registro;
