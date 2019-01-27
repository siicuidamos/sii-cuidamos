import React, { Component, Fragment } from 'react';

class Informacion extends Component {
  render() {
    return (
      <Fragment>
        <p>
          Somos una <b>red social</b> para la participación ciudadana en el{' '}
          <b>seguimiento de los proyectos financiados con los impuestos</b> de
          los ciudadanos de tal forma que se asegure la solución de los
          principales problemas de las comunidades de nuestro país.
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
