import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Principal from './components/Principal';
import Proyecto from './components/Proyecto';
import Ayuda from './components/Ayuda';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container container-fluid mb-5 mt-1">
          <h1 className="text-center">Veeduría de proyectos públicos</h1>
        </div>
        <div className="container container-fluid mb-5">
          <Switch>
            <Route exact path="/" component={Principal} />
            <Route path="/proyectos" component={Proyecto} />
            <Route path="/ayuda" component={Ayuda} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
