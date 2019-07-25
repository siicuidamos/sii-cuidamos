import React, { Component, Fragment } from 'react';

class LandingPage extends Component {
  render() {
    return (
      <div classNameName="container">
        <div className="bd-example">
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
{/*             <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
 */}            </ol>
            <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={require('../images/slides/community.jpeg')} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                <h5><b>Creémos en los Colombianos</b></h5>
                <p>Por eso queremos que hagas parte de nuestra comunidad, regístrate y participa.</p>
                </div>
            </div>
            <div className="carousel-item">
                <img src={require('../images/slides/devTeam.jpg')} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                <h5><b>¡ÚNETE!</b></h5>
                <p>Somos una comunidad interdisciplinaria, así que envía un correo con tu interés a contacto@siicuidamos.org</p>
                </div>
            </div>
{/*             <div className="carousel-item">
                <img src={require('../images/slides/3.PNG')} className="d-block w-100" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
            </div> */}
            </div>
            <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
            </a>
        </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;