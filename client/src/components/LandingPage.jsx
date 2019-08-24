import React, { Component } from 'react';
import ModalVideo from 'react-modal-video';
import imagenLogo from '../images/logos/siiCuidamosLogo.png';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <div id="landingPageContainer" className="container-fluid bg-whitesmoke">
        <div className="row landing-page-container-row text-white bg-dark-opaque">
          <div className="col-12">
            <h1 className=" mb-3 mt-4 text-center">Sii-Cuidamos</h1>
          </div>
          <div className="col-12 text-center">
            <img
              className="logo-sii-cuidamos-landing"
              src={imagenLogo}
              alt="Logo de Sii-Cuidamos"
            />
          </div>
          <div className="col-12 text-center mt-3">
            <h6>
              <b>Compromiso - Responsabilidad - Comunidad&nbsp;</b>
            </h6>
          </div>
          <div className="col-lg-6 mx-auto text-center mt-1">
            <h5>
              Somos un semillero de Investigación Interdisciplinario que busca
              estimular en los jóvenes el cuidado de proyectos y recursos
              públicos.
            </h5>
          </div>
          <div className="col-12 mt-1" />
          <div className="col-md-2" />
          <div className="col-md-5 text-center">
            <div className="box3 sb14 bg-info">
              Conoce cómo trabajamos
              <button
                id="butonAbrirVideoModal"
                className="btn btn-outline-light mt-2 shadow"
                onClick={this.openModal}
              >
                <i className="fas fa-play" />
                &nbsp;Ver video
              </button>
            </div>
          </div>
          <div className="col-12" />
          <div className="col-md-5" />
          <div className="col-md-5 text-center mb-2">
            <div className="box3 sb13 bg-primary">
              Apórtale a tu comunidad
              <Link to={'/proyectos'}>
                <button
                  id="butonAbrirVideoModal"
                  className="btn btn-outline-light mt-2 shadow"
                >
                  <i className="fas fa-thumbtack" />
                  &nbsp;Explorar proyectos
                </button>
              </Link>
            </div>
          </div>
          <div className="col-12 text-center text-white logorreg p-3 mt-2">
            <h6 className="mt-0 mb-0">
              ¡Únete! Regístrate y participa, o haz parte del grupo
              interdisciplinario envíandonos un correo a{' '}
              <a href="mailto:contacto@siicuidamos.org">
                contacto@siicuidamos.org
              </a>
            </h6>
          </div>
        </div>
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId="oZg0pxebB4A"
          onClose={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }
}

export default LandingPage;
