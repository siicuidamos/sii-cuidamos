import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Inicio from "./components/Inicio";

class App extends Component {

  render() {
    return (
      <div className="container container-fluid mb-5 mt-1">
      <Router>
         <Route exact path="/" component={Inicio} />
      </Router>
      </div>
    );
  }
}

export default App;
