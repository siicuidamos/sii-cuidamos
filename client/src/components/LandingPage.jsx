import React, { Component} from 'react';
import ModalVideo from 'react-modal-video'

class LandingPage extends Component {
  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    this.setState({isOpen: true})
  }

  render() {
    return (
      <div className="container-fluid parent">
      <ModalVideo channel='youtube' isOpen={this.state.isOpen} videoId='oZg0pxebB4A' onClose={() => this.setState({isOpen: false})} />
      <div className="row ">
          <div className="col-md-6 col-sm-12 child ">
            <h1 className="text-white"><b>Bienvenido</b></h1> 
            <br/>
            <h5 className="text-white">Haz parte de SII - Cuidamos, un lugar para participar y crear comunidad.</h5> 
          </div>
          <div className="col-md-6 col-sm-12 child">
            <div class="box3 sb14">Descubre cómo trabajamos
              <button className="btn btn-outline-light" onClick={this.openModal}><i class="fas fa-play"></i>&nbsp;Ver video</button>
            </div>
          </div>
       </div> 
       <div className="row logorreg">
         <div className="col-12 logorreg-button">
          <center>
           <h6 className="text-white ">Únete! registrate y participa, o haz parte del grupo interdisciplinario envíandonos un correo a <a href="mailto:contacto@siicuidamos.org">contacto@siicuidamos.org</a></h6> 
           </center>
         </div>
       </div>
      </div>

      
    );
  }
}

export default LandingPage;