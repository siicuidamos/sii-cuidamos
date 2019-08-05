import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import OpcionesDeFiltros from './components/OpcionesDeFiltros';
import DetailProyecto from './components/DetailProyecto';
import Ayuda from './components/Ayuda';
import Footer from './components/Footer';
import Detalles from './components/Detalles.jsx';
import LandingPage from './components/LandingPage.jsx';
import AdministradorGuard from './guards/AdministradorGuard.jsx';
import Dashboard from './components/administrador/Dashboard.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container banner">
          <div className="row">
            <div className="col-md-2 col-sm-6">
              <center>
                <img
                  width="60%"
                  height="60%"
                  src={require('./images/logos/siiCuidamosLogo.png')}
                  alt="Logo de la app"
                  className="responsive"
                />
              </center>
            </div>

            <div className="col-md-4 col-sm-6">
              <div className="container container-fluid mt-1">
                <h2 className="text-center mt-4 bannerText">SII-Cuidamos</h2>
              </div>
              <div className="bannerText">
                <b>Compromiso . Comunidad . Responsabilidad</b>
              </div>
            </div>

            <div className="col-6" />
          </div>
        </div>
        <NavBar />

        <div className="container-fluid">
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route exact path="/proyectos" component={OpcionesDeFiltros} />
            <Route path="/proyectos/:bpin" component={DetailProyecto} />
            <Route path="/ayuda" component={Ayuda} />
            <Route path="/sobreElProyecto" component={Detalles} />
            <AdministradorGuard path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        <div class="clear"></div>
        <Footer />
      </div>
    );
  }
}

export default App;
