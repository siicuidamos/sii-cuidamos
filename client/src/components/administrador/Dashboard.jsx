import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ComentariosReport from './ComentariosReport';
import Home from './Home';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoComentarios: {}
    };
  }
  componentDidMount() {
    axios.get('/comentarios/dashboard/cantidad').then(res => {
      this.setState({
        infoComentarios: res.data
      });
    });
  }

  render() {
    return (
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-md-2 col-lg-2 col-sm-12 bg-secondary px-0 py-0 mx-0 my-0">
            <div className="list-group" role="tablist">
              <NavLink exact to={"/dashboard"} className="list-group-item list-group-item-action list-group-item-secondary" activeClassName="active">
                DashBoard
             </NavLink>
              <NavLink to={"/dashboard/home"} className="list-group-item list-group-item-action list-group-item-secondary" activeClassName="active">
                Comentarios Reportados
             </NavLink>
            </div>
          </div>
          <div className="col-lg-10 col-md-10 col-sm-12">
            <Switch>
              <Route exact path={"/dashboard"} component={() => <Home infoComentarios={this.state.infoComentarios} />}></Route>
              <Route path={"/dashboard/home"} component={() => <ComentariosReport infoComentarios={this.state.infoComentarios} />}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
