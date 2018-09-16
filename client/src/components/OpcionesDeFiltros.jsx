import React, { Component } from 'react';
import Proyectos from './Proyectos';
const departamentos = require('../json/Departamentos.json');
const sectores = require('../json/Sectores.json');
const aniosInicio = require('../json/AniosInicio.json');

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
  }

  cambiarDepartamento(departamento) {
    this.setState({
      departamentoF: this.procesarTexto(departamento)
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
        default:
          return null;
      }
    }
  }

  render() {
    return (
      <div>
        <hr />
        <div className="row">
          <div className="col-lg-4 col-12">
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
          <div className="col-lg-3 col-12">
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
