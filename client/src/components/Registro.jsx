import React, { Component } from 'react';
import axios from 'axios';
const departamentos = require('../json/Departamentos.json');

class Registro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      nombreDeUsuario: '',
      clave: '',
      nivelEducativo: 'Basica Primaria',
      sector: 'Ingenieria',
      departamentoDeOrigen: 'Amazonas',
      departamentoDeResidencia: 'Amazonas',
      error: []
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
    let errores = [];

    if (this.state.email.length < 5) {
      errores.push(
        <p>&bull;&nbsp;El nombre de correo debe tener al menos 5 carateres.</p>
      );
    }

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
        .post('/vpp/api/registrarUsuario', {
          email: this.state.email,
          nombreDeUsuario: this.state.nombreDeUsuario,
          clave: this.state.clave,
          nivelEducativo: this.state.nivelEducativo,
          sector: this.state.sector,
          departamentoDeOrigen: this.state.departamentoDeOrigen,
          departamentoDeResidencia: this.state.departamentoDeResidencia
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
            alert('Ya estás registrado en VPP');
            document.getElementById('cerrarRegistroModal').click();
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
            <div className="modal-header">
              <center>
                <h5 className="modal-title" id="exampleModalLabel">
                  Bienvenido a VPP
                </h5>
              </center>
              <button
                type="button"
                id="cerrarRegistroModal"
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
                  <label htmlFor="exampleInputEmail">
                    <b>Correo</b>
                  </label>
                  <input
                    type="mail"
                    className="form-control"
                    id="exampleInputEmail"
                    value={this.state.value}
                    onChange={this.handleChangeEmail}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    <b>Nombre de usuario</b>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={this.state.value}
                    onChange={this.handleChangeNombreDeUsuario}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputUser1">
                    <b>Nivel educativo</b>
                  </label>
                  <select
                    className="form-control"
                    value={this.nivelEducativo}
                    onChange={this.handleChangeNivelEducativo}
                  >
                    <option value="Basica Primaria">Básica Primaria</option>
                    <option value="Basica Secundaria">Básica Secundaria</option>
                    <option value="Educacion Media">Educación Media</option>
                    <option value="Pregrado">
                      Educación Superior-Pregrado
                    </option>
                    <option value="Postgrado">
                      Educación Superior - Postgrado
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputSector1">
                    <b>Sector</b>
                  </label>
                  <select
                    className="form-control"
                    value={this.sector}
                    onChange={this.handleChangeSector}
                  >
                    <option value="Ingenieria">Ingeniería</option>
                    <option value="Economia">Economía</option>
                    <option value="Ciencias Sociales">Ciencias Sociales</option>
                    <option value="Trabajo Social">Trabajo Social</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputDO1">
                    <b>Departamento de origen</b>
                  </label>
                  <select
                    className="form-control"
                    value={this.departamentoDeResidencia}
                    onChange={this.handleDepartamentoDeOrigen}
                  >
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
                  <label htmlFor="exampleInputDO1">
                    <b>Departamento de residencia</b>
                  </label>
                  <select
                    className="form-control"
                    value={this.departamentoDeResidencia}
                    onChange={this.handleDepartamentoDeResidencia}
                  >
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
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={this.state.value}
                    onChange={this.handleChangeClave}
                    required
                  />
                </div>
                {this.mostrarError()}
                <center>
                  <button type="submit" className="btn btn-success">
                    Registrarte
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
export default Registro;
