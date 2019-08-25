import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
class Comentario extends Component {
  constructor(props) {
    super(props);

    this.comentario = this.props.comentario;
    this.apiComentarios = '/vpp/api/comentarios';
    this.accionesUsuario = this.accionesUsuario.bind(this);
    this.reportarComentario = this.reportarComentario.bind(this);
  }

  componentDidMount() { }

  editar(comentario) {

  }

  reportarComentario()
  {
    Swal.fire({
      title: 'Desea reportar este comentario',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'cancelar',
      confirmButtonText: 'confirmar'
    }).then((result) => {
      if (result.value) {
        Axios.put("/comentarios/reportar/id/" + this.comentario._id,{}).then(res =>{
          Swal.fire(
            'Reportado!',
            res.data.mensaje ,
            'success'
          )
        })
      }
    })
  }

  borrar() {
    this.props.borrarComentario();
  }

  accionesUsuario( usuarioLogeado, propietarioComentario) {
    var listaBotones = []
    if(usuarioLogeado != null)
    {
    if (usuarioLogeado && usuarioLogeado.nombreDeUsuario === propietarioComentario) {
      listaBotones.push(

        <div className="row justify-content-end mr-2 my-1">
          <button className="btn btn-outline-danger btn-sm" onClick={() => this.borrar()}>
            <i className="far fa-trash-alt"></i>
          </button>
          <button className="btn btn-outline-success btn-sm mx-1" onClick={() => this.editar()}>
            <i className="fas fa-edit" />
          </button>
          <button className="btn btn-outline-warning btn-sm" onClick={() => this.reportarComentario()}>
            <i className="fas fa-exclamation-circle"></i>
          </button>
        </div>
      )
    }
    if (usuarioLogeado && usuarioLogeado.nombreDeUsuario !== propietarioComentario) {
      listaBotones.push(
        <div className="row justify-content-end mr-2 my-1">
          <button className="btn btn-outline-warning btn-sm" onClick={() => this.borrar()}>
            <i className="fas fa-exclamation-circle"></i>
          </button>
        </div>
      )
    }}
    return listaBotones
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
                {this.accionesUsuario(usuarioLogeado, nombreDeUsuario)}              
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
