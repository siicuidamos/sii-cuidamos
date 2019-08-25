import React, { Component } from 'react';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.infoComentarios = this.props.infoComentarios
  }
  render() {
    return (
      <div className="container-fluid my-4 min-vh-100">
        <div className="container">
          <div className="row justify-content-center">
            {/** card de cometarios reportados */}
            <div className="card col-4 mx-3 shadow-sm">
              <div style={{ textDecoration: 'none' }}>
                <div className="card-body px-0 py-0">
                  <div className="row">
                    <div className="container-fluid col-lg-5 col-md-5 bg-dark">
                      <div className=" row justify-content-center far fa-comments fa-6x text-white pt-2" />
                    </div>
                    <div className="container-fluid flex-column col-lg-7 col-md-7 my-auto">
                      <div className="container-fluid">
                        <h1 className="text-center text-dark">
                          {' '}
                          {
                            this.infoComentarios.comentarios
                          }{' '}
                        </h1>
                      </div>
                      <div className="container-fluid">
                        <p className="text-center text-secondary">
                          {' '}
                          Comentarios realizados{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/** card de cometarios reportados */}
            <div className="card shadow-sm col-4 mx-3">
              <div href="" style={{ textDecoration: 'none' }}>
                <div className="card-body px-0 py-0">
                  <div className="row">
                    <div className="container-fluid col-5 bg-dark">
                      <div className=" row justify-content-center fas fa-exclamation-circle fa-6x text-white pt-2" />
                    </div>
                    <div className="container-fluid flex-column col-7">
                      <div className="container-fluid">
                        <h1 className="text-center text-dark">
                          {' '}
                          {
                            this.infoComentarios
                              .comentariosReportados
                          }{' '}
                        </h1>
                      </div>
                      <div className="container-fluid">
                        <p className="text-center text-secondary">
                          {' '}
                          Comentarios reportados{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
