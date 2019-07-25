import React from 'react';
import { Link } from 'react-router-dom';


class Footer extends React.Component {
    state = {
        images: [],
    };

   render() {
    return(
         <footer className="footer-distributed row">
          <div className="col-md-8 col-sm-12">
           <div className="row">             
             <div className="col-md-6 col-sm-12">
               <center>
                    <img 
                    width="50 %"
                    height="40%"
                    src={require('../images/logos/uniandes.png')}
                    alt="Logo uniandes"
                    className="responsive"
                    />
                </center>      
             </div>

             <div className="col-md-6 col-sm-12">
             <center>
                  <p className="footer-company-about">
                  <span>Sii-Cuidamos </span>
                  Semillero de Investigación Interdisciplinario.
                  <br/>
                  De la comunidad, para la comunidad.
                  <hr/>               
                </p>
                </center>
             </div>
            </div>
          </div>

            <div className="col-md-4 col-sm-12">
              <center>
                  <p className="footer-company-about">
                      <span>Síguenos en </span>
                  </p>

                  <div >

                      <a href="#">
                      <img 
                      width="8%"
                      height="8%"
                      src={require('../images/logos/facebook-icon.png')}
                      alt="Logo uniandes"
                      className="responsive"
                      />
                      </a>
                      <a href="#">
                      <img 
                      width="8%"
                      height="8%"
                      src={require('../images/logos/icon-instagram.png')}
                      alt="Logo uniandes"
                      className="responsive"
                      />
                      </a>
                      <a href="#">
                      <img 
                      width="8%"
                      height="8%"
                      src={require('../images/logos/icon-twitter.png')}
                      alt="Logo uniandes"
                      className="responsive"
                      />
                      </a>
                  </div>
              </center>
           

            </div>
            </footer>                           
    )
 }
}

export default Footer;

