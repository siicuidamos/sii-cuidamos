import React, { Component } from "react";
import { Redirect, Link, Route, Switch } from "react-router-dom";
import Inicio from "./components/Inicio";
import NavBar from "./components/NavBar.jsx";
import Principal from "./components/Principal";
import DetailProyecto from "./components/DetailProyecto";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container container-fluid mb-5 mt-1">
        <h1 className="text-center">Veeduría de proyectos públicos</h1>
        </div>
        <Switch>
          <Route exact path="/" component={Principal} />
          <Route path="/proyectos" component={Inicio} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
