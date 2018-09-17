import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProyectoGeneral extends Component {
  constructor(props) {
    super(props);

    this.proyecto = this.props.proyecto;
  }

  render() {
    const bpin = this.proyecto.bpin;
    const nombre = this.proyecto.nombre;
    const region = this.proyecto.region;
    const departamento = this.proyecto.departamento;
    const municipio = this.proyecto.municipio;
    const sector = this.proyecto.sector;
    const inicio = this.proyecto.anioInicioEjecucion;
    const fin = this.proyecto.anioFinEjecucion;

    return (
      <div className="col-12 mt-4">
        <Link to={'/proyectos/' + bpin} style={{ textDecoration: 'none' }}>
          <div className="card w-100 shadow text-dark">
            <div className="card-body">
              <p className="card-title font-weight-bold">{nombre}</p>
              <hr />

              <p className="card-text">
                <i className="fas fa-fingerprint" />
                &nbsp;
                <b>BPIN: </b>
                {bpin}
              </p>

              <p className="card-text">
                <i className="fas fa-map-marker-alt fa-lg text-danger" />
                &nbsp;
                {region}, {departamento}, {municipio}
              </p>
              <p className="card-text">
                <i className="fas fa-list-ul fa-lg text-primary" />
                &nbsp;
                {sector}
              </p>
              <p className="card-text">
                <i className="fas fa-calendar fa-lg text-success" />
                &nbsp;
                {inicio} - {fin}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default ProyectoGeneral;
