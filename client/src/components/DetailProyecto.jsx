import React, { Component } from "react";

class DetailProyecto extends Component {

  render() {

    const { match } = this.props;

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

    function validarVideo(){
    	if(link===""){
    		var ruta= '../sectores/'+sector+'.jpg';
    		return (<img width="30%" height="40%" src={ruta} ></img>)
    	}
    	else
    	{
        return (<iframe width="30%" height="40%" src={link}></iframe>);
    	}
    }

    return (
      <div className="containter">

      		<div className="col-xs-12 col-sm-12 col-md-12">
      		 <hr/>
           <center>
             <h3>{nombre}</h3>
           </center>
           <hr/>
          </div>


          <div  className="container">
          <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4">
            	{validarVideo()}
            </div>

            <div className="col-xs-8 col-sm-8 col-md-8">
            <p>
             <i className="fas fa-fingerprint"></i> &nbsp;<b>BPIN: </b> {bpin}
            </p>

            <p>
             <i className="fas fa-map-marker-alt fa-lg text-danger"></i>&nbsp;
              <b>Ubicación: </b> {region}, {departamento}, {municipio}
            </p>

            <p className="card-text">
            <i className="fas fa-thermometer-half"></i>&nbsp;<b>Estado: </b>{estado}
            </p>

            <p className="card-text">
            <i className="fas fa-dollar-sign text-warning"></i>&nbsp;<b>Financiado con SGR:</b> {sgr}
            </p>

            <p>
             <i className="fas fa-address-card"></i>&nbsp;<b>OCAD: </b> {ocad}
            </p>
        
            <p className="card-text">
            <i className="fas fa-list-ul fa-lg text-success"></i>&nbsp;<b>Sector: </b> {sector}
            </p>

            <p className="card-text">
            <i className="fas fa-calendar fa-lg text-primary"></i>&nbsp;<b>Horizonte: </b>{inicio} - {fin}
            </p>
            </div>
          </div>
          <hr/>
         </div>
         <div className="row">
         </div>
      </div>
    );
  }
}

 export default DetailProyecto;
