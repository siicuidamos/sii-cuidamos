import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import OpcionesDeFiltros from './components/OpcionesDeFiltros';
import DetailProyecto from './components/DetailProyecto';
import Ayuda from './components/Ayuda';
import SobreVPP from './components/SobreVPP';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container container-fluid mt-1">
          <h1 className="text-center mt-3">Veeduría de proyectos públicos</h1>
          <hr />
        </div>
        <div className="container container-fluid mb-5">
          <Route exact path="/" component={OpcionesDeFiltros} />
          <Switch>
            <Route exact path="/proyectos" component={OpcionesDeFiltros} />
            <Route path="/proyectos/:bpin" component={DetailProyecto} />
            <Route path="/ayuda" component={Ayuda} />
            <Route path="/sobreVPP" component={SobreVPP} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
