import React, { Component } from 'react';
class Comentario extends Component {
  constructor(props) {
    super(props);

    this.comentario = this.props.comentario;
    this.apiComentarios = '/vpp/api/comentarios';
  }

  componentDidMount() {}

  editar(comentario) {}

  borrar() {
    this.props.borrarComentario();
  }

  render() {
    const { usuarioLogeado } = this.props;

    const fecha = this.comentario.fecha;
    const texto = this.comentario.texto;
    const nombreDeUsuario = this.comentario.nombreDeUsuario;
    const sectorUsuario = this.comentario.sectorUsuario;
    const calificacion = this.comentario.calificacion;
    const categoria = this.comentario.categoria;

    return (
      <div className="col-12 mt-4">
        <div className="card w-100 shadow text-dark">
          <div className="card-body">
            <div className="row">
              <div className="col-md-9 borde-comentario">
                <p className="card-text">{texto}</p>
                {usuarioLogeado
                  ? usuarioLogeado.nombreDeUsuario === nombreDeUsuario && (
                      <div>
                        {/* <button
                      className="btn btn-outline-success btn-sm m-1"
                      onClick={() => this.editar()}
                    >
                      <i className="fas fa-edit" />
                    </button> */}
                        <button
                          className="btn btn-outline-danger btn-sm m-1"
                          onClick={() => this.borrar()}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </div>
                    )
                  : ''}
              </div>
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <i className="far fa-clock" />
                    &nbsp;
                    {fecha}
                  </div>
                  <div className="col-md-6 col-12">
                    <i className="fas fa-star" />
                    &nbsp;
                    {calificacion}
                  </div>
                  <div className="col-12">
                    <i className="far fa-list-alt" />
                    &nbsp;
                    {categoria}
                    <br />
                    <i className="fas fa-flask" />
                    &nbsp;
                    {sectorUsuario}
                    <br />
                    <i className="fas fa-user" />
                    &nbsp;
                    {nombreDeUsuario}
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
export default Comentario;
