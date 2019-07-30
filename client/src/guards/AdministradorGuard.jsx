import datosUsuario from '../functions/datosUsuario.js';
import { Route, Redirect } from 'react-router-dom';
import React from 'react';

const AdministradorGuard = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      datosUsuario.esAdministrador() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

export default AdministradorGuard;
