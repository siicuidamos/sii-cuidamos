import React, { Component } from 'react';

class Detalles extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <hr />
        </div>
        <div className="col-10 col-md-10 col-12 mx-auto">
          <div className="card shadow mb-4">
            <div className="card-body">
              <h3 className="card-title text-center">¿Quiénes somos?</h3>
              <p className="text-center">
                Somos un grupo de investigación interdisciplinario que busca
                crear consciencia de la responsabilidad en el desarrollo de
                proyectos colectivos.
              </p>
            </div>
          </div>
          <div className="card shadow mb-4">
            <div className="card-body">
              <h3 className="card-title text-center">¿Qué buscamos?</h3>
              <p className="text-justify">
                Buscamos ser una red social para la participación ciudadana en
                el seguimiento paso a paso, desde la formulación, desarrollo,
                ejecución y operación de los proyectos financiados con los
                impuestos de los ciudadanos de tal forma que se asegure la
                solución de los principales problemas de las comunidades de
                nuestro país en los entornos locales, regionales y nacionales.
              </p>
              <p>
                Este seguimiento buscará tener en cuenta una visión estratégica
                de desarrollo colectivo y sostenible como país y región.
              </p>
              <p>
                De igual forma, este seguimiento buscará que la ciudadanía
                participe asegurando la mayor eficiencia y el mayor beneficio y
                pertinencia de estos proyectos para las comunidades.
              </p>
            </div>
          </div>
          <div className="card shadow">
            <div className="card-body ">
              <h3 className="card-title text-center">¿Cómo lo hacemos?</h3>
              <p className="text-justify">
                En este primer prototipo puedes consultar proyectos que se
                encuentren inscritos en el Banco de Proyectos de Inversión
                (BPIN) que maneja el Departamento Nacional de Planeación (DNP).
                Estamos trabajando para integrar próximamente la información del
                Ministerio de Hacienda.
              </p>
              <p>
                Actualmente puedes consultar proyectos públicos por ubicación
                (departamento y municipio), sector al que pertenece (educación,
                cultura, etc), año de inicio y si usted conoce el código BPIN
                del proyecto, puede consultarlo.
              </p>
              <p>
                La fuente que se presenta en este prototipo cuenta con más de
                10.000 proyectos de inversión pública.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Detalles;
