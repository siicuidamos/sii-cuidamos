import React, { Component } from "react";

class detailProyecto extends Component {

  render() {
    const proyecto = this.props.proyecto;
    const nombre = proyecto.nombre;
    const bpin = proyecto.bpin;
    const region = proyecto.region;
    const departamento = proyecto.departamento;
    const municipio = proyecto.municipio;
    const sector = proyecto.sector;
    const inicio = proyecto.anioInicioEjecucion;
    const fin = proyecto.anioFinEjecucion;

    return (
      <div>
          <h1>{nombre}</h1>
          <div  class="container">
            <div class="col-xs-12 col-sm-12 col-md-4">

            </div>

            <div class="col-xs-12 col-sm-12 col-md-8">
            <p>
             <i className="fas fa-map-marker-alt fa-lg text-danger"></i>&nbsp;
              {region}, {departamento}, {municipio}
            </p>
        
            <p className="card-text">
            <i className="fas fa-list-ul fa-lg text-primary"></i>&nbsp;{sector}
            </p>
            <p className="card-text">
            <i className="fas fa-calendar fa-lg text-success"></i>&nbsp;{inicio} - {fin}
            </p>
            </div>
          </div>
      </div>
    );
  }
}

 export default detailProyecto;
