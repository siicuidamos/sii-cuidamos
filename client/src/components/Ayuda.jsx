import React, { Component } from "react";

class Ayuda extends Component {

  render() {

  
    return (
      <div>
      <h4>Bienvenido a VPP</h4>
      <p>Queremos ayudar a los Colombianos a informarse sobre los proyectos financiados con regalias en el territorio
      nacional y permitirles participar en el seguimiento de los mismos. En esta sección te <b>ayudaremos a entender los 
      términos</b> utilizados en este contexto.
      </p>

      <h5>Información de los proyectos</h5>
      <div>
            <p>
              <i className="fas fa-fingerprint" /> &nbsp;
              <b>BPIN: </b> 20142401060013
              <br/>
              Es el código único que identifica cada uno de los proyectos para el Banco de Programas y Proyectos de Inversión Nacional (BPIN).
            </p>
            <hr/>
            <p>
              <i className="fas fa-map-marker-alt fa-lg text-danger" />
              &nbsp;
              <b>Ubicación: </b>Region Caribe, Bolivar, Rio Viejo 
              <br/>
              Contiene la ubicación del proyecto -Región, Departamento, Municipio -           
              </p>
            <hr/>
            <p>
              <i className="fas fa-thermometer-half" />
              &nbsp;
              <b>Estado: </b> Aprobado
              <br/>
              Indica el estado actual del proyecto. Dicho estado puede ser:
              <br/>
                Aprobado 
              <br/>
                No Aprobado o Desaprobado
              <br/>
                En Verificación
              <br/>
                En Actualizacion
              <br/>
                Formulado Para Registrar
              <br/>
                Viabilidad
              <br/>
                Pendiente De Aprobar Cofinanciador
              <br/>
                No Viable: No se realiza el proyecto porque existen circunstancias por las cuales no se puede llevar a cabo.
              <br/>
                Registrado 
            </p>
            <hr/>
            <p>
              <i className="fas fa-dollar-sign text-warning" />
              &nbsp;
              <b>Financiado con SGR:</b>
            </p>

            <p>
              <i className="fas fa-address-card" />
              &nbsp;a
              <b>OCAD: </b>
            </p>

            <p>
              <i className="fas fa-list-ul fa-lg text-success" />
              &nbsp;
              <b>Sector: </b> 
            </p>

            <p>
              <i className="fas fa-calendar fa-lg text-primary" />
              &nbsp;
              <b>Horizonte: </b>
            </p>      
          </div>

      </div>
    );
  }
}

 export default Ayuda;

