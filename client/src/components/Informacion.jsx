import React, { Component, Fragment } from 'react';

class Informacion extends Component {
  render() {
    return (
      <Fragment>
        <p>
          Semillero de Investigación Interdisciplinario para estimular en los
          jóvenes el cuidado de proyectos y recursos públicos.
        </p>

        <p className="mb-4">
          Actualmente puedes consultar proyectos públicos por <u>ubicación</u>{' '}
          (departamento y municipio), <u>sector al que pertenece</u> (educación,
          cultura, etc), <u>año de inicio</u> y si usted conoce el código{' '}
          <u>BPIN</u> del proyecto, puede consultarlo.
        </p>
      </Fragment>
    );
  }
}

export default Informacion;
