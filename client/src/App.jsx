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
            <div className="col-lg-1 offset-md-4 col-md-1 offset-md-4 col-sm-12 py-0 px-0">
              <center>
                <img
                  width="100px"
                  height="100%"
                  src={require('./images/logos/siiCuidamosLogo.png')}
                  alt="Logo de la app"
                />
              </center>
            </div>
            <div className="col-md-4 col-sm-12 py-0 px-0 mb-2" align="left">
              <h2 className="text-center mt-4 bannerText">SII-Cuidamos</h2>
              <div className="bannerText">
                <b>Compromiso . Comunidad . Responsabilidad</b>
              </div>
            </div>
          </div>
        </div>
        <NavBar />

        <div className="container-fluid px-0">
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route exact path="/proyectos" component={OpcionesDeFiltros} />
            <Route path="/proyectos/:bpin" component={DetailProyecto} />
            <Route path="/ayuda" component={Ayuda} />
            <Route path="/sobreElProyecto" component={Detalles} />
            <AdministradorGuard path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
