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
                <b>Aprobado: </b> Esta listo para empezar la ejecución o ya está en ejecución.
              <br/>
                <b>No Aprobado o Desaprobado: </b> No se realizará el proyecto.
              <br/>
                <b>En Verificación: </b> Está siendo revisado por el OCAD.
              <br/>
                <b>En Actualizacion: </b> Se está actualizando cierta Información del proyecto.
              <br/>
                <b>Formulado Para Registrar: </b> Ha sido presentado, pero no revisado.
              <br/>
                <b>En Viabilidad: </b>El proyecto es viable y podría ser Aprobado.
              <br/>
                <b>Pendiente De Aprobar Cofinanciador</b>
              <br/>
                <b>No Viable: </b> No se realiza el proyecto porque existen circunstancias por las cuales no se puede llevar a cabo.
              <br/>
            </p>
            <hr/>
            <p>
              <i className="fas fa-dollar-sign text-warning" />
              &nbsp;
              <b>Financiado con SGR:</b> $4.925.387.756,00
              <br/>
              Indica el monto de dinero del Sistema General de Regalías (SGR) con el cual será financiado el proyecto
            </p>

            <hr/>
            <p>
              <i className="fas fa-address-card" />
              &nbsp;
              <b>OCAD: </b>Corporación Autónoma Regional Del Río Grande De La Magdalena - Cormagdalena
              <br/>
              Es la organización encargada de evalúar, viabilizar, aprobar y priorizar los programas y proyectos que serán financiados con recursos del Sistema General de Regalías
            </p>
            <hr/>

            <p>
              <i className="fas fa-list-ul fa-lg text-success" />
              &nbsp;
              <b>Sector: </b>Ambiente y desarrollo sostenible
              <br/>
              Es el área a la cual se busca ayudar con el proyecto.
            </p>
            <hr/>

            <p>
              <i className="fas fa-calendar fa-lg text-primary" />
              &nbsp;
              <b>Horizonte: </b> 2010 - 2018
              <br/>
              Es el tiempo que se establece que durará el proyecto, tiene un año de inicio (tras la aprobación del proyecto) y un año en el que se estima que finalizará.
            </p>

          </div>

      </div>
    );
  }
}

 export default Ayuda;

