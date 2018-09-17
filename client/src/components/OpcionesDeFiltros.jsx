import React, { Component } from 'react';
import Proyectos from './Proyectos';
const departamentos = require('../json/Departamentos.json');
const sectores = require('../json/Sectores.json');
const aniosInicio = require('../json/AniosInicio.json');
const departamentosMunicipio = require('../json/MapaProyecto.json');

class OpcionesDeFiltros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamentoF: '',
      bpinF: '',
      municipioF: '',
      anioInicioF: '',
      sectorF: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.departamentoMunicipios = [];
  }

  cambiarDepartamento(departamento) {
    if (departamento === '') {
      this.cambiarMunicipio('');
    } else {
      let departamentoB = departamentosMunicipio.find(dpto => {
        return dpto.departamento === departamento;
      });

      if (departamentoB) {
        this.departamentoMunicipios = departamentoB.municipios;
      }
    }

    this.setState({
      departamentoF: this.procesarTexto(departamento)
    });
  }

  cambiarMunicipio(municipio) {
    this.setState({
      municipioF: this.procesarTexto(municipio)
    });
  }

  cambiarSector(sector) {
    this.setState({
      sectorF: this.procesarTexto(sector)
    });
  }

  cambiarAnioInicio(anio) {
    this.setState({
      anioInicioF: anio
    });
  }

  mostrarMunicipiosDepartamento(departamento) {
    if (departamento !== '') {
      return (
        <div className="dropdown mb-3">
          <button
            className="btn btn-outline-info dropdown-toggle mr-2 mb-2"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Municipio
          </button>
          {this.indicador(this.state.municipioF, 4)}
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.departamentoMunicipios.map(municipio => {
              return (
                <a
                  key={municipio.municipio}
                  className="dropdown-item pointer"
                  onClick={this.cambiarMunicipio.bind(
                    this,
                    municipio.municipio
                  )}
                >
                  {municipio.municipio}
                </a>
              );
            })}
          </div>
        </div>
      );
    }
  }

  procesarTexto(texto) {
    return texto.replace(' ', '_');
  }

  revertirTexto(texto) {
    return texto.replace('_', ' ');
  }

  indicador(valor, opcion) {
    if (valor !== '') {
      switch (opcion) {
        case 1:
          return (
            <button
              type="button"
              className="btn btn-outline-danger mb-2"
              onClick={this.cambiarDepartamento.bind(this, '')}
            >
              {this.revertirTexto(valor)}
              &nbsp;
              <i className="fas fa-times-circle" />
            </button>
          );
        case 2:
          return (
            <button
              type="button"
              className="btn btn-outline-danger mb-2"
              onClick={this.cambiarSector.bind(this, '')}
            >
              {this.revertirTexto(valor)}
              &nbsp;
              <i className="fas fa-times-circle" />
            </button>
          );
        case 3:
          return (
            <button
              type="button"
              className="btn btn-outline-danger mb-2"
              onClick={this.cambiarAnioInicio.bind(this, '')}
            >
              {this.revertirTexto(valor)}
              &nbsp;
              <i className="fas fa-times-circle" />
            </button>
          );
        case 4:
          return (
            <button
              type="button"
              className="btn btn-outline-danger mb-2"
              onClick={this.cambiarMunicipio.bind(this, '')}
            >
              {this.revertirTexto(valor)}
              &nbsp;
              <i className="fas fa-times-circle" />
            </button>
          );
        default:
          return null;
      }
    }
  }

  handleChange(event) {
    this.setState({ bpinF: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <form>
              <div className="form-row">
                <div className="col-lg-4 col-md-5 input-group mb-3">
                  <input
                    type="number"
                    className="form-control"
                    value={this.state.value}
                    onChange={this.handleChange}
                    placeholder="Ingresa el BPIN del proyecto"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    maxLength="18"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      id="button-addon2"
                      disabled
                    >
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-lg-4 col-md-6 col-12">
            <div className="dropdown mb-3">
              <button
                className="btn btn-info dropdown-toggle mr-2 mb-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Ubicación
              </button>
              {this.indicador(this.state.departamentoF, 1)}
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {departamentos.map(departamento => {
                  return (
                    <a
                      key={departamento}
                      className="dropdown-item pointer"
                      onClick={this.cambiarDepartamento.bind(
                        this,
                        departamento
                      )}
                    >
                      {departamento}
                    </a>
                  );
                })}
              </div>
            </div>
            {this.mostrarMunicipiosDepartamento(this.state.departamentoF)}
          </div>
          <div className="col-lg-5 col-12">
            <div className="dropdown mb-3">
              <button
                className="btn btn-primary dropdown-toggle mr-2 mb-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sector
              </button>
              {this.indicador(this.state.sectorF, 2)}
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {sectores.map(sector => {
                  return (
                    <a
                      key={sector}
                      className="dropdown-item pointer"
                      onClick={this.cambiarSector.bind(this, sector)}
                    >
                      {sector}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <div className="dropdown mb-3">
              <button
                className="btn btn-success dropdown-toggle mr-2 mb-2"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Año de inicio
              </button>
              {this.indicador(this.state.anioInicioF, 3)}
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                {aniosInicio.map(anio => {
                  return (
                    <a
                      key={anio}
                      className="dropdown-item pointer"
                      onClick={this.cambiarAnioInicio.bind(this, anio)}
                    >
                      {anio}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Proyectos
          bpin={this.state.bpinF}
          departamento={this.state.departamentoF}
          municipio={this.state.municipioF}
          sector={this.state.sectorF}
          anioInicio={this.state.anioInicioF}
        />
      </div>
    );
  }
}

export default OpcionesDeFiltros;
