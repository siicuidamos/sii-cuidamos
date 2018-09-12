import React, { Component } from "react";

class ProyectoGeneral extends Component {

  render() {
    const proyecto = this.props.proyecto;
    const nombre = proyecto.nombre;
    const region = proyecto.region;
    const departamento = proyecto.departamento;
    const municipio = proyecto.municipio;
    const sector = proyecto.sector;

    return (
      <div className="col-12 mt-4">
        <div className="card w-100 shadow">
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <hr />
            <p className="card-text">
              <b>Región: </b> {region} - 
              <b> Departamento: </b>{departamento} -
              <b> Municipio: </b>{municipio}
            </p>
            <p className="card-text">
                <b>Sector: </b> {sector}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProyectoGeneral;
