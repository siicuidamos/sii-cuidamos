import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-dark raleway f-18 text-white">
        <div className="container container-fluid">
          <div className="row">
            <div
              className="col-xl-6 col-lg-7 col-md-6 mt-4 col-12"
              id="desarrollado"
            >
              <p className="text-justify font-weight-bold">Desarrollado por</p>
              <a
                className="zoom-tilt"
                href="http://ineffableinventions.com.co/"
                target="blank"
              >
                <img
                  className="mw-280 img-fluid"
                  src={require('../images/logos/ineffableInventions.png')}
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
