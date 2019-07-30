import React, { Component, Fragment } from 'react';

class Informacion extends Component {
  render() {
    return (
      <Fragment>
        <p>
          Somos un semillero de Investigación Interdisciplinario que busca
          estimular en los jóvenes el cuidado de proyectos y recursos públicos.
        </p>

        <p className="mb-4">
          Actualmente puedes consultar proyectos públicos por <u>ubicación</u>{' '}
          (departamento y municipio), <u>sector al que pertenece</u> (educación,
          cultura, etc), <u>año de inicio</u> y si conoces el código <u>BPIN</u>{' '}
          del proyecto, puedes consultarlo.
        </p>
      </Fragment>
    );
  }
}

export default Informacion;
