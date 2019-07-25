import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';


class LandingPage extends Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-12 parent">
        <img 
                 width="100%"
                 height="100%"
                 src={require('../images/slides/ht1.jpg')}
                 alt="gente hablando"
                 className="responsive"
                 />
        </div>  
        <div className="col-6 child-element-left">
        <h1 className="text-white"><b>Bienvenido</b></h1> 
        <hr/>
        <h5 className="text-white">Haz parte de si cuidamos, un lugar para participar y crear comunidad.</h5> 
        </div>
        <div className="col-6  child-element-right">
        <div class="box3 sb14">Descubre cómo trabajamos
        <button className="btn btn-outline-light"><i class="fas fa-play"></i>&nbsp;Ver video</button>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default LandingPage;