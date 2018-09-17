import React from 'react';
import { Switch, Route } from 'react-router-dom';
import OpcionesDeFiltros from './OpcionesDeFiltros';
import DetailProyecto from './DetailProyecto';

const Proyecto = () => (
  <Switch>
    <Route exact path="/proyectos" component={OpcionesDeFiltros} />
    <Route path="/proyectos/:bpin" component={DetailProyecto} />
  </Switch>
);

export default Proyecto;
