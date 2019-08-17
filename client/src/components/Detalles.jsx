import React, { Component } from 'react';

class Detalles extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container mb-5 mt-4">
        <div className="row bg-dark rounded shadow-lg">
          <div className="col-12">
            <br />
          </div>
          <div className="col-lg-12 col-md-10 col-12 mx-auto">
            <div className="card shadow mb-4">
              <div className="card-body">
                <h3 className="card-title text-center">¿Quiénes somos?</h3>
                <p className="text-justify">
                  “Sii-Cuidamos”, somos un grupo Semillero de Investigación
                  Interdisciplinario, que busca ayudar a tomar consciencia de la
                  responsabilidad de los jóvenes en el seguimiento y cuidado de
                  proyectos que resuelven necesidades de comunidades y que son
                  financiados con recursos públicos.
                </p>
                <p className="text-justify">
                  Sii-Cuidamos, está integrado hasta el momento por un grupo
                  interdisciplinario de estudiantes y docentes de la Universidad
                  de los Andes. por:
                </p>
                <p className="text-justify">
                  En la actualidad Sii-Cuidamos, está conformado
                </p>
                <ul>
                  <li>
                    Julia Hilarión - Profesora Emprendimiento e Innovación
                    Departamento Ingenieria Industrial
                  </li>
                  <li>
                    Gabriel Pinto Pineda - Estudiante de Ingeniería de Sistemas
                    y Computación
                  </li>
                  <li>Santiago Garcia - Estudiante Derecho y Gobierno</li>
                  <li>
                    Sebastian Rodriguez - Estudiante Derecho y Ciencia Política
                  </li>
                  <li>
                    Vivian Gómez Cubillos - Estudiante de Ingeniería de Sistemas
                    y Computación
                  </li>
                  <li>
                    Rafael Forero Alvarado - Estudiante de Ingeniería de
                    Sistemas y Computación
                  </li>
                  <li>
                    Juan Camilo Sanguino Perez – Estudiante de Ingeniería de
                    Sistemas y Computación
                  </li>
                </ul>
                <p className="text-justify">
                  Participaron igualmente en la gestación de esta iniciativa los
                  siguientes estudiantes:
                </p>
                <ul>
                  <li>Santiago Leal - Estudiante Ingenieria Industria</li>
                  <li>Carlos Salcedo - Estudiante Ingenieria Industrial</li>
                  <li>
                    Julio Cruz - Estudiante Ingenieria Industrial e Ingenieria
                    Civil.
                  </li>
                </ul>
                <p className="text-justify">
                  El grupo buscará estimular la participación colaborativa de
                  jóvenes y docentes de otras Universidades, colegios, así como
                  de personas naturales y jurídicas interesadas en formar una
                  sociedad honesta y participativa que busque trabajar
                  colaborativamente en las soluciones de sus necesidades,
                  procurando el mayor cuidando e integridad en el uso de los
                  recursos públicos.
                </p>
                <p className="text-justify">
                  Al grupo le interesa principalmente la formación de ciudadanía
                  de jóvenes, es independiente de cualquier filiación, política.
                </p>
              </div>
            </div>
            <div className="card shadow mb-4">
              <div className="card-body">
                <h3 className="card-title text-center">¿Qué buscamos?</h3>
                <p className="text-justify">
                  Estimular en los jóvenes la consciencia en la participación y
                  seguimiento de proyectos que resuelven necesidades de sus
                  comunidades, financiados con inversión pública (Impuestos de
                  los ciudadanos).
                </p>
              </div>
            </div>
            <div className="card shadow mb-4">
              <div className="card-body ">
                <h3 className="card-title text-center">
                  ¿Cómo planeamos hacerlo?
                </h3>
                <p className="text-justify font-weight-bold">
                  1. Creando sistema de información integral para el Seguimiento
                  de Proyectos Públicos y la participación Ciudadana.
                </p>
                <p className="text-justify">
                  Hasta el momento se ha desarrollado la versión 1.0 del Sistema
                  de Información de Proyectos Públicos, en el cual se puede
                  consultar y retroalimentar proyectos que se encuentren
                  inscritos en el Banco de Proyectos de Inversión (BPIN) del DNP
                </p>
                <p>Nota:</p>
                <ol type="a">
                  <li>
                    Los ingenieros desarrolladores de este sistema, versión 1.0,
                    son: Gabriel Pinto y Vivian Gomez, estudiantes de Ingenieria
                    de Sistemas de la Universidad de los Andes.
                  </li>
                  <li>La base de datos se obtuvo de bases de Datos del DNP.</li>
                  <li>
                    Se está trabajando para integrar en la siguiente versión, la
                    información de pagos del Ministerio de Hacienda y de otras
                    entidades.
                  </li>
                  <li>
                    La licencia es Creative Commons (Atribución, no comercial,
                    compartir igual)
                  </li>
                </ol>
                <hr />
                <p className="text-justify font-weight-bold">
                  2. Creando un módulo de educación dirigida a jóvenes para
                  promover de forma íntegra, la toma de consciencia y
                  responsabilidad en las decisiones relacionadas con los
                  proyectos financiados con recursos públicos (impuestos
                  ciudadanos).
                </p>
                <p className="text-justify">
                  a. Desarrollar piloto de módulo educativo para estudiantes
                  universitarios con componente ético y participación en la
                  versión 1.0 del Sistema de Información de Proyectos Públicos.
                </p>
                <p className="text-justify">
                  b. Se planea crear equipos de jóvenes y docentes, para
                  adelantar investigación interdisciplinaria de proyectos tipo
                  (infraestructura, salud, educación, agricultura, industria,
                  etc.) a fin de establecer costos indicativos, e indicadores de
                  pertinencia, calidad, etc. Lo anterior, para alimentar el
                  sistema de información y participación y desarrollar criterios
                  de referencia para el seguimiento de proyectos.
                </p>
                <p className="text-justify">
                  Se planea diseñar un módulo educativo lúdico para el uso de
                  este sistema, dirigido a jóvenes de colegio, que incorpore
                  además de lo anterior, la construcción de una visión de
                  desarrollo colectiva.
                </p>
                <hr />
                <p className="text-justify font-weight-bold">
                  3. Creando un área responsable de informar y/o presentar los
                  recursos que establezca la Constitución o la Ley, ante las
                  entidades públicas pertinentes con base en las quejas o
                  inquietudes resultantes de la retroalimentación y
                  participación ciudadana a fin de asegurar el cuidado de
                  proyectos y recursos públicos.
                </p>
                <p className="text-justify">
                  Se planea conformar un equipo de estudiantes de derecho y
                  ciencia política para crear este mecanismo de recursos legales
                  y seguimiento, que además mantenga informada a la ciudadanía
                  del seguimiento de estos procesos.
                </p>
              </div>
            </div>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center">
                  Políticas de seguridad Información
                </h3>
                <div className="text-center mt-2">
                  <a
                    className="btn btn-dark text-white text-white text-decoration-none"
                    href={
                      process.env.PUBLIC_URL + '/SII-Cuidamos_Politicas.pdf'
                    }
                    target="blank"
                  >
                    <i className="fas fa-file-pdf" />
                    &nbsp;Ver archivo pdf
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Detalles;
