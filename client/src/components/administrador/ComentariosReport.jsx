import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class ComentariosReport extends Component {
  constructor(props) {
    super(props);
    this.infoComentarios = this.props.infoComentarios;
    this.verComentariosReportados = this.verComentariosReportados.bind(this);
  }
  verComentariosReportados() {
    let divs = [];
    if (this.infoComentarios.comentariosReportados !== 0) {
      var array = this.infoComentarios.listaComentariosReportados
      array.forEach(element => {
        divs.push(
          <Link to={"/proyectos/"+ element.bpin} key={element._id} style={{ textDecoration: 'none' }}>
            <div className="shadow card col-11 mx-2 my-3 proyecto-general">
              <div className="row">
                <h5 className="card-title col-10 py-4 px-4 text-dark">
                  {' '}
                  {element.texto}{' '}
                </h5>
                <div className="container-fluid flex-column col-2 bg-secondary">
                  <div className="container-fluid">
                    <div className=" row justify-content-center far fa-comment-dots fa-3x text-white pt-2" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
        console.log(element)
      });
      return divs
    } else {
      return (
        <div className="container-fluid">
          <div className="row alert alert-success col-12 text-center justify-content-center mt-3" role="alert">
            No se han encontrado comentarios reportados
          </div>
          <div className="row justify-content-center far fa-thumbs-up fa-10x col-12 text-secondary my-5" />
        </div>
      );
    }
  }
  render() {
    return (
      <div className="container-fluid flex-column my-2 min-vh-100">
        {this.verComentariosReportados()}
      </div>
    );
  }
}
