import React, { Component } from 'react';
import axios from 'axios';
import { Hashtag } from 'react-twitter-widgets';
import Comentario from './Comentario';
import { FacebookShareButton } from 'react-share';
import { Link } from 'react-router-dom';
import datosUsuario from '../functions/datosUsuario.js';

const categoriasComentarios = require('../json/CategoriasComentarios.json');

class DetailProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpin: props.match.params.bpin,
      proyecto: null,
      exito: false,
      calificacionPromedio: 0,
      comentarios: [],
      crearComentario: false,
      categoriaSeleccionada: categoriasComentarios[0],
      calificacionSeleccionada: '-',
      comentarioEscrito: '',
      errores: [],
      usuario: datosUsuario.datosPresentes()
        ? datosUsuario.obtenerDatosDeUsuario()
        : null,
      mensaje:
        'Estamos buscando el proyecto en la base de datos. Por favor espera.'
    };
    this.buscarProyecto();
    this.handleChangeCategoria = this.handleChangeCategoria.bind(this);
    this.handleChangeCalificacion = this.handleChangeCalificacion.bind(this);
    this.handleChangeComentario = this.handleChangeComentario.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.apiComentarios = '/vpp/api/comentarios';
  }

  handleSubmit(event) {
    let errores = [];
    if (
      this.state.comentarioEscrito.length < 100 ||
      this.state.comentarioEscrito.length > 500
    ) {
      errores.push(
        <p>&bull;&nbsp;El comentario debe tener entre 100 y 500 caracteres.</p>
      );
    }

    if (
      this.state.calificacionSeleccionada === '-' ||
      this.state.calificacionSeleccionada < 1 ||
      this.state.calificacionSeleccionada > 10
    ) {
      errores.push(<p>&bull;&nbsp;La calificación debe ser entre 1 y 10.</p>);
    }

    if (this.state.usuario && errores.length === 0) {
      axios
        .post(this.apiComentarios + '/crear', {
          texto: this.state.comentarioEscrito,
          categoria: this.state.categoriaSeleccionada,
          calificacion: this.state.calificacionSeleccionada,
          bpin: this.state.bpin,
          nombreDeUsuario: this.state.usuario.nombreDeUsuario,
          sectorUsuario: this.state.usuario.sector,
          nivelEducativoUsuario: this.state.usuario.nivelEducativo
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
              errores: errores
            });
          } else {
            this.setState(
              {
                crearComentario: false
              },
              this.obtenerParticipacionProyecto()
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      this.setState({
        errores: errores
      });
    }

    event.preventDefault();
  }

  cambiarEstadoFormCrearComentario() {
    if (this.state.usuario) {
      this.setState({
        crearComentario: !this.state.crearComentario,
        categoriaSeleccionada: categoriasComentarios[0],
        calificacionSeleccionada: '-',
        comentarioEscrito: ''
      });
    } else {
      document.getElementById('botonParaIniciarSesion').click();
    }
  }

  handleChangeCategoria(event) {
    this.setState({ categoriaSeleccionada: event.target.value });
  }

  handleChangeCalificacion(event) {
    this.setState({ calificacionSeleccionada: event.target.value });
  }

  handleChangeComentario(event) {
    this.setState({ comentarioEscrito: event.target.value });
  }

  buscarProyecto() {
    axios.get('/vpp/api/proyectos/bpin/' + this.state.bpin).then(res => {
      const exito = res.data.exito;
      if (exito) {
        const proyecto = res.data.proyectos[0];
        this.setState({
          exito: exito,
          proyecto: proyecto
        });
        this.obtenerParticipacionProyecto();
      } else {
        let mensaje =
          'No existe un proyecto con código BPIN ' +
          this.state.bpin +
          ' en nuestra base de datos.';
        this.setState({
          exito: exito,
          mensaje: mensaje
        });
      }
    });
  }

  obtenerComentarios() {
    axios.get(this.apiComentarios + '/bpin/' + this.state.bpin).then(res => {
      const exito = res.data.exito;
      if (exito) {
        this.setState({
          comentarios: res.data.comentarios
        });
      }
    });
  }

  obtenerCalificacionPromedio() {
    axios
      .get(
        this.apiComentarios + '/calificacionPromedio/bpin/' + this.state.bpin
      )
      .then(res => {
        const exito = res.data.exito;
        if (exito) {
          const calificacion =
            res.data.calificacionPromedio.calificacionPromedio;
          this.setState({
            calificacionPromedio: calificacion
          });
        }
      });
  }

  obtenerParticipacionProyecto() {
    this.obtenerCalificacionPromedio();
    this.obtenerComentarios();
  }

  validarVideo(bpin, link, sector) {
    if (link === '') {
      let sectorRuta = sector.replace(/ /g, '_').toLowerCase() + '.jpeg';
      return (
        <img
          width="100%"
          height="100%"
          src={require('../images/sectores/' + sectorRuta)}
          alt={sector}
          className="rounded shadow mb-3"
        />
      );
    } else {
      const ruta = 'https://www.youtube.com/embed/' + link.substr(17, 11) + '';
      return (
        <iframe
          title={bpin}
          width="100%"
          height="100%"
          src={ruta}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    }
  }

  mostrarComentarios() {
    if (this.state.comentarios.length > 0) {
      let comentariosProyecto = [];
      this.state.comentarios.forEach(comentario => {
        comentariosProyecto.push(
          <Comentario
            key={
              comentario.fecha +
              comentario.categoria +
              comentario.nombreDeUsuario
            }
            comentario={comentario}
          />
        );
      });

      return comentariosProyecto;
    } else {
      return (
        <div className="alert alert-info mx-auto mt-4" role="alert">
          Aún no hay comentarios para el proyecto en cuestión. Te invitamos a
          que <b>comentes sobre el</b>.
        </div>
      );
    }
  }

  cargarOpcionesCategoria() {
    let opciones = [];
    categoriasComentarios.forEach(categoria => {
      opciones.push(
        <option key={categoria} value={categoria}>
          {categoria}
        </option>
      );
    });
    return opciones;
  }

  formCrearComentario() {
    if (this.state.usuario && this.state.crearComentario) {
      return (
        <div className="col-12">
          <hr />
          <div className="container container-fluid border border-secondary rounded">
            <form className="mt-3 mb-3" onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-4 col-12 form-group ">
                  <label htmlFor="inputState">
                    <b>Categoría del comentario</b>
                  </label>
                  <select
                    id="inputState"
                    className="form-control"
                    onChange={this.handleChangeCategoria}
                    value={this.state.value}
                  >
                    {this.cargarOpcionesCategoria()}
                  </select>
                </div>
                <div className="col-md-8 col-12">
                  <label htmlFor="customRange2">
                    <b>Calificación</b>
                    &nbsp; <i className="fas fa-arrow-right" />{' '}
                    <span className="text-warning font-weight-bold">
                      &nbsp;
                      {this.state.calificacionSeleccionada} de 10
                    </span>
                  </label>
                  <input
                    type="range"
                    className="custom-range"
                    min="1"
                    max="10"
                    id="customRange2"
                    onChange={this.handleChangeCalificacion}
                    value={this.state.value}
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    <b>Texto del comentario </b>
                    &nbsp; <i className="fas fa-arrow-right" />{' '}
                    <span className="text-primary font-weight-bold">
                      &nbsp;
                      {500 - this.state.comentarioEscrito.length} caracteres
                      disponibles
                    </span>
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={this.handleChangeComentario}
                    value={this.state.value}
                  />
                </div>
              </div>
              {this.mostrarError()}
              <button type="submit" className="btn btn-success mr-4">
                <i className="fas fa-check" />
                &nbsp;Crear comentario
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.cambiarEstadoFormCrearComentario()}
              >
                <i className="fas fa-times" />
                &nbsp; Cancelar
              </button>
            </form>
          </div>
          <hr />
        </div>
      );
    }
  }

  mostrarError() {
    if (this.state.errores.length > 0) {
      return (
        <div className="alert alert-danger letra-pequenia" role="alert">
          {this.state.errores}
        </div>
      );
    }
  }

  mostrarProyecto() {
    if (this.state.exito) {
      const proyecto = this.state.proyecto;
      const cal = this.state.calificacionPromedio;
      const nombre = proyecto.nombre;
      const bpin = proyecto.bpin;
      const region = proyecto.region;
      const departamento = proyecto.departamento;
      const municipio = proyecto.municipio;
      const sector = proyecto.sector;
      const ocad = proyecto.ocad;
      const estado = proyecto.estado;
      const sgr = proyecto.sgr;
      const inicio = proyecto.anioInicioEjecucion;
      const fin = proyecto.anioFinEjecucion;
      const link = proyecto.link;
      const url = window.location.href;

      return (
        <div className="container mb-5">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <Link
                  to="/proyectos"
                  className="text-white text-decoration-none"
                >
                  <button className="btn btn-primary text-white">
                    <i className="fas fa-list-ul" />
                    &nbsp;Lista de proyectos
                  </button>
                </Link>
              </div>
              <hr />
              <h3 className="text-center">{nombre}</h3>
              <hr />
            </div>
            <div className="col-12 col-md-4 mb-5">
              {this.validarVideo(bpin, link, sector)}
              <br />
              <div>
                <Hashtag hashtag={'VPP' + bpin} />
                <FacebookShareButton quote={nombre} url={url}>
                  <a className="btn-primary btn-sm text-white" target="_blank">
                    <i className="fab fa-facebook-square" />
                    &nbsp;&nbsp;Compartir
                  </a>
                </FacebookShareButton>
              </div>
              <br />
            </div>
            <div className="col-12 col-md-5 mt-3">
              <p>
                <i className="fas fa-fingerprint" /> &nbsp;
                <b>BPIN: </b> {bpin}
              </p>

              <p>
                <i className="fas fa-map-marker-alt fa-lg text-danger" />
                &nbsp;
                <b>Ubicación: </b> {region}, {departamento}, {municipio}
              </p>

              <p>
                <i className="fas fa-thermometer-half" />
                &nbsp;
                <b>Estado: </b>
                {estado}
              </p>

              <p>
                <i className="fas fa-dollar-sign text-warning" />
                &nbsp;
                <b>Financiado con SGR:</b> {sgr}
              </p>

              <p>
                <i className="fas fa-address-card" />
                &nbsp;
                <b>OCAD: </b> {ocad}
              </p>

              <p>
                <i className="fas fa-list-ul fa-lg text-success" />
                &nbsp;
                <b>Sector: </b> {sector}
              </p>

              <p>
                <i className="fas fa-calendar fa-lg text-primary" />
                &nbsp;
                <b>Horizonte: </b>
                {inicio} - {fin}
              </p>
            </div>
            <div className="col-md-3">
              <h5>Calificación promedio</h5>
              <p>{cal}</p>
              <h5>Número de comentarios</h5>
              <p>{this.state.comentarios.length}</p>
            </div>
            <div className="col-12 mt-2">
              <hr />
            </div>
            <div className="col-md-8 col-12">
              <h2>Comentarios</h2>
            </div>
            <div className="col-md-4 col-12 text-center">
              <button
                className="btn btn-success"
                onClick={() => this.cambiarEstadoFormCrearComentario()}
              >
                <i className="fas fa-plus" />
                &nbsp;Añadir
              </button>
            </div>
            {this.formCrearComentario()}
            <div className="col-12">{this.mostrarComentarios()}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-12">
          <div className="text-center">
            <Link to="/proyectos" className="text-white text-decoration-none">
              <button className="btn btn-primary text-white">
                <i className="fas fa-list-ul" />
                &nbsp;Lista de proyectos
              </button>
            </Link>
          </div>
          <hr />
          <div className="alert alert-info mx-auto mt-4" role="alert">
            {this.state.mensaje}
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.mostrarProyecto()}</div>;
  }
}

export default DetailProyecto;
