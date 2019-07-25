import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid parent">
      <div className="row ">
          <div className="col-md-6 col-sm-12 child ">
            <h1 className="text-white"><b>Bienvenido</b></h1> 
            <br/>
            <h5 className="text-white">Haz parte de SII - Cuidamos, un lugar para participar y crear comunidad.</h5> 
          </div>
          <div className="col-md-6 col-sm-12 child">
            <div class="box3 sb14">Descubre cómo trabajamos
              <button className="btn btn-outline-light"><i class="fas fa-play"></i>&nbsp;Ver video</button>
            </div>
          </div>
       </div> 
       <div className="row logorreg">
         <div className="col-12 logorreg-button">
          <center>
           <h6 className="text-white ">Únete! registrate y participa, o haz parte del grupo interdisciplinario envíandonos un correo a contacto@siicuidamos.org </h6> 
           </center>
         </div>
       </div>
      </div>
    );
  }
}

export default LandingPage;