import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import OpcionesDeFiltros from './components/OpcionesDeFiltros';
import DetailProyecto from './components/DetailProyecto';
import Ayuda from './components/Ayuda';
import SobreVPP from './components/SobreVPP';
import Footer from './components/Footer';
import Detalles from './components/Detalles.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container container-fluid mt-1">
          <h2 className="text-center mt-4">
            Seguimiento ciudadano de proyectos de inversión pública
          </h2>
          <p className="text-center small">Prototipo 1</p>
        </div>
        <div id="projectsContainer" className="container container-fluid mb-5">
          <Route exact path="/" component={OpcionesDeFiltros} />
          <Switch>
            <Route exact path="/proyectos" component={OpcionesDeFiltros} />
            <Route path="/proyectos/:bpin" component={DetailProyecto} />
            <Route path="/ayuda" component={Ayuda} />
            <Route path="/sobreElProyecto" component={Detalles} />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
