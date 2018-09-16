import React, { Component } from 'react';

class DetailProyecto extends Component {
  render() {
    const proyecto = this.props.proyecto;
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

    function validarVideo() {
      if (link === '') {
        console.log('Ruta imagen= ' + sector);
        //var ruta = '../sectores/' + sector.replace(' ', '_') + '.jpg';
        return (
          <img
            width="100%"
            height="100%"
            src={require('../sectores/Trabajo.jpg')}
            alt={sector}
          />
        );
      } else {
        console.log('Ruta video= ' + link.substr(17, 11));
        const ruta =
          'https://www.youtube.com/embed/' + link.substr(17, 11) + '';
        return (
          <iframe
            title={bpin}
            width="100%"
            height="100%"
            src={ruta}
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          />
        );
      }
    }

    return (
      <div className="containter">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <hr />
          <center>
            <h3>{nombre}</h3>
          </center>
          <hr />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4">{validarVideo()}</div>

            <div className="col-xs-12 col-sm-12 col-md-8">
              <p>
                <i className="fas fa-fingerprint" /> &nbsp;
                <b>BPIN: </b> {bpin}
              </p>

              <p>
                <i className="fas fa-map-marker-alt fa-lg text-danger" />
                &nbsp;
                <b>Ubicación: </b> {region}, {departamento}, {municipio}
              </p>

              <p className="card-text">
                <i className="fas fa-thermometer-half" />
                &nbsp;
                <b>Estado: </b>
                {estado}
              </p>

              <p className="card-text">
                <i className="fas fa-dollar-sign text-warning" />
                &nbsp;
                <b>Financiado con SGR:</b> {sgr}
              </p>

              <p>
                <i className="fas fa-address-card" />
                &nbsp;
                <b>OCAD: </b> {ocad}
              </p>

              <p className="card-text">
                <i className="fas fa-list-ul fa-lg text-success" />
                &nbsp;
                <b>Sector: </b> {sector}
              </p>

              <p className="card-text">
                <i className="fas fa-calendar fa-lg text-primary" />
                &nbsp;
                <b>Horizonte: </b>
                {inicio} - {fin}
              </p>
            </div>
          </div>
          <hr />
        </div>
        <div className="row" />
      </div>
    );
  }
}

export default DetailProyecto;
