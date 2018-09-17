import React, { Component } from 'react';
import axios from 'axios';
import { Hashtag } from 'react-twitter-widgets';
import Comentario from './Comentario';
const categoriasComentarios = require('../json/CategoriasComentarios.json');

class DetailProyecto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpin: props.match.params.bpin,
      proyecto: null,
      exito: false,
      calificacionPromedio: 0,
      comentarios: []
    };
    this.buscarProyecto();
    this.apiComentarios = '/vpp/api/comentarios/';
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
        this.setState({
          exito: exito
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
      .get(this.apiComentarios + 'calificacionPromedio/bpin/' + this.state.bpin)
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
      console.log('Ruta imagen= ' + sector);
      var ruta = '../sectores/' + sector.replace(' ', '_') + '.jpg';
      return (
        <img
          width="100%"
          height="100%"
          src={require('../sectores/Trabajo.jpg')}
          alt={sector}
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
        <h3>
          Aún no hay comentarios para el proyecto en cuestión. Te invitamos a
          que comentes sobre el.
        </h3>
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

      return (
        <div className="row">
          <div className="col-12">
            <hr />
            <h3 className="text-center">{nombre}</h3>
            <hr />
          </div>
          <div className="col-12 col-md-4 mb-5">
            {this.validarVideo(bpin, link, sector)}
            <br />
            <Hashtag hashtag={'PPV' + bpin} />
            <br />
          </div>
          <div className="col-12 col-md-5">
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
          <div className="col-lg-12">
            <h2>Comentarios</h2>
            {this.mostrarComentarios()}
          </div>
        </div>
      );
    } else {
      return <h1>Cargando</h1>;
    }
  }

  render() {
    return <div>{this.mostrarProyecto()}</div>;
  }
}

export default DetailProyecto;
