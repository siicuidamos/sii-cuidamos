import React, { Component } from 'react';
//import { BrowserRouter as Router, Route } from "react-router-dom";
import Inicio from './components/Inicio';
//import Navbar from './components/Navbar';

class App extends Component {
  render() {
    return (
      <div>
        <div className="container container-fluid mb-5 mt-1">
          <h1 className="text-center">Veeduría de proyectos públicos</h1>
          <Inicio />
        </div>
      </div>
    );
  }
}

export default App;
