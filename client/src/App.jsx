import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import OpcionesDeFiltros from './components/OpcionesDeFiltros';
import DetailProyecto from './components/DetailProyecto';
import Ayuda from './components/Ayuda';
import Detalles from './components/Detalles.jsx';
import LandingPage from './components/LandingPage.jsx';
import AdministradorGuard from './guards/AdministradorGuard.jsx';
import Dashboard from './components/administrador/Dashboard.jsx';
import RestablecerContrasena from './components/autenticacion/RestablecerContrasena.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />

        <div className="container-fluid px-0">
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route
              path="/restablecerContrasena"
              component={RestablecerContrasena}
            />
            <Route exact path="/proyectos" component={OpcionesDeFiltros} />
            <Route path="/proyectos/:bpin" component={DetailProyecto} />
            <Route path="/ayuda" component={Ayuda} />
            <Route path="/sobreElProyecto" component={Detalles} />
            <AdministradorGuard path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
