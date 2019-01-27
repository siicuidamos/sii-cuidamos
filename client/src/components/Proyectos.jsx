import React, { Component } from 'react';
import axios from 'axios';
import ProyectoGeneral from './ProyectoGeneral';

class Proyectos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departamento: props.departamento,
      bpin: props.bpin,
      municipio: props.municipio,
      anioInicio: props.anioInicio,
      sector: props.sector,
      exito: false,
      mensaje: '',
      proyectos: [],
      pagina: 0,
      ruta: '',
      varios: false
    };

    this.api = '/vpp/api/proyectos/';
    this.departamento = 'departamento/';
    this.municipio = 'municipio/';
    this.sector = 'sector/';
    this.separador = '/';
    this.anioInicio = 'anioInicioEjecucion/';
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.departamento !== this.state.departamento ||
      nextProps.municipio !== this.state.municipio ||
      nextProps.bpin !== this.state.bpin ||
      nextProps.sector !== this.state.sector ||
      nextProps.anioInicio !== this.state.anioInicio ||
      nextProps.bpin !== this.state.bpin
    ) {
      this.setState(
        {
          departamento: nextProps.departamento,
          municipio: nextProps.municipio,
          sector: nextProps.sector,
          anioInicio: nextProps.anioInicio,
          bpin: nextProps.bpin
        },
        () => this.buscarProyectos(0)
      );
    }
  }

  buscarProyectos(valor) {
    let ruta = this.api;

    if (this.state.bpin) {
      ruta += 'bpin' + this.separador + this.state.bpin;
      axios.get(ruta).then(res => {
        const exito = res.data.exito;
        if (exito) {
          this.setState({
            exito: exito,
            proyectos: res.data.proyectos,
            pagina: this.state.pagina + valor,
            ruta: ruta
          });
        } else {
          this.setState({
            exito: exito,
            mensaje: res.data.mensaje,
            proyectos: []
          });
        }
      });
    } else {
      if (this.state.departamento) {
        ruta += this.departamento + this.state.departamento + this.separador;
      }

      if (this.state.municipio) {
        ruta += this.municipio + this.state.municipio + this.separador;
      }

      if (this.state.sector) {
        ruta += this.sector + this.state.sector + this.separador;
      }

      if (this.state.anioInicio) {
        ruta += this.anioInicio + this.state.anioInicio + this.separador;
      }

      axios.get(ruta + (this.state.pagina + valor)).then(res => {
        const exito = res.data.exito;
        if (exito) {
          this.setState({
            exito: exito,
            proyectos: res.data.proyectos,
            pagina: this.state.pagina + valor,
            ruta: ruta,
            varios: true
          });
        } else {
          this.setState({
            exito: exito,
            mensaje: res.data.mensaje,
            proyectos: []
          });
        }
      });
    }
  }

  componentDidMount() {
    this.buscarProyectos(0);
  }

  desplazarEntreProyectos(ruta, valor) {
    if (
      this.state.varios &&
      ((valor === -1 && this.state.pagina >= 1) || valor >= 0)
    ) {
      axios.get(ruta + (this.state.pagina + valor)).then(res => {
        const exito = res.data.exito;
        if (exito) {
          this.setState({
            exito: exito,
            proyectos: res.data.proyectos,
            pagina: this.state.pagina + valor
          });
        } else {
          this.setState({
            exito: exito,
            mensaje: res.data.mensaje
          });
        }
      });
    }

    const element = document.getElementById('projectsNewData');

    element.scrollIntoView();
  }

  botones() {
    let botones = [];

    if (this.state.proyectos.length >= 1) {
      if (this.state.pagina !== 0) {
        botones.push(
          <button
            key="atras"
            className="btn btn-dark mt-3 mr-2"
            type="submit"
            onClick={() => this.desplazarEntreProyectos(this.state.ruta, -1)}
          >
            <i className="fas fa-chevron-left" />
          </button>
        );
      }

      if (this.state.proyectos.length === 10 || this.state.pagina > 0) {
        botones.push(
          <button
            key="centro"
            type="button"
            className="btn btn-outline-dark mt-3 font-weight-bold"
            disabled
          >
            {this.state.pagina + 1}
          </button>
        );
      }

      if (this.state.proyectos.length === 10) {
        botones.push(
          <button
            key="adelanteBloqueado"
            className="btn btn-dark mt-3 ml-2"
            type="submit"
            onClick={() => this.desplazarEntreProyectos(this.state.ruta, 1)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        );
      }
    }

    return botones;
  }

  resultadoBusqueda() {
    if (this.state.proyectos.length > 0) {
      let mostrar = [];
      for (let index = 0; index < this.state.proyectos.length; index++) {
        const proyecto = this.state.proyectos[index];
        mostrar.push(
          <ProyectoGeneral key={proyecto.bpin} proyecto={proyecto} />
        );
      }
      return mostrar;
    } else if (this.state.bpin) {
      return (
        <div className="alert alert-info mx-auto" role="alert">
          No se encontró un proyecto con código <b>{this.state.bpin}</b> en
          nuestra base de datos.
        </div>
      );
    } else {
      return (
        <div className="alert alert-info mx-auto" role="alert">
          No se encontraron proyectos que cumplan con las características
          seleccionadas en nuestra base de datos.
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <hr />
        <div id="projectsNewData" className="row">
          {this.resultadoBusqueda()}
        </div>
        <div className="text-center">{this.botones()}</div>
      </div>
    );
  }
}

export default Proyectos;
