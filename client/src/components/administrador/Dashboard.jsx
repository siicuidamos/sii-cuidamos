import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numeroPagina: 1,
      comentariosGeneral: [],
      infoComentarios: {}
    };
    this.comentariosPorProyecto = this.comentariosPorProyecto.bind(this);
    this.verComentariosReportados = this.verComentariosReportados.bind(this);
  }
  componentDidMount() {
    var comentariosGeneral2 = [];
    var pagina = this.state.numeroPagina + "";
    axios.get("/vpp/api/proyectos/" + pagina).then(res => {
      var arrayProyectos = res.data.proyectos;
      arrayProyectos.forEach(element => {
        var bpinProyecto = element.bpin;
        var contenido = {
          bpin: bpinProyecto,
          numeroComentarios: 0,
          comentarios: [],
          nombreProyecto: element.nombre,
          divG: []
        };
        axios.get("/comentarios/bpin/" + bpinProyecto).then(res => {
          if (res.data.exito == true) {
            contenido.numeroComentarios = res.data.comentarios.length;
            contenido.comentarios = res.data.comentarios;
          }
          comentariosGeneral2.push(contenido);
          this.setState({ comentariosGeneral: comentariosGeneral2 });
        })
      });
    })
    axios.get("/comentarios/dashboard/cantidad").then(res => {
      this.setState({
        infoComentarios: res.data
      })
      console.log(this.state);
    })
  }

  comentariosPorProyecto() {
    let divs = [];
    if (this.state.comentariosGeneral.length !== 0) {
      const array = this.state.comentariosGeneral;
      array.forEach(contenido => {
        var link = "/proyectos/" + contenido.bpin;
        divs.push(
          <Link to={link} style={{ textDecoration: "none" }} >
            <div className="shadow card col-11 mx-2 my-3 proyecto-general" key={contenido.bpin}>
              <div className="row">
                <h5 className="card-title col-10 py-4 px-4 text-dark"> {contenido.nombreProyecto} </h5>
                <div className="container-fluid flex-column col-2 bg-secondary">
                  <div className="container-fluid">
                    <div className=" row justify-content-center far fa-comment-dots fa-3x text-white pt-2"></div>
                  </div>
                  <div className="container-fluid">
                    <h4 className="text-center text-white mt-2"> {contenido.numeroComentarios} </h4>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      });
    }
    return divs;
  }
  verComentariosReportados() {
    let divs = [];
    if (this.state.infoComentarios.comentariosReportados !== 0) {
      divs.push(
        <div>

        </div>
      );
    }
    else {
      return (
        <div className="container-fluid">
          <div className="row alert alert-success col-12 text-center justify-content-center" role="alert">
            No se han encontrado comentarios reportados
          </div>
          <div className="row justify-content-center far fa-thumbs-up fa-10x col-12 text-secondary"></div>
        </div>

      );
    }
  }
  render() {
    return (
      <div className="container-fluid px-0">
        <div className="row">
          <div className="col-2 bg-secondary px-0 py-0 mx-0 my-0">
            <div className="list-group" id="list-tab" role="tablist">
              <a className="list-group-item list-group-item-action list-group-item-secondary active" id="list-dashboard-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">DashBoard</a>
              <a className="list-group-item list-group-item-action list-group-item-secondary" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Comentarios Realizados</a>
              <a className="list-group-item list-group-item-action list-group-item-secondary" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages">Comentarios Reportados</a>
            </div>
          </div>
          <div className="col-10">
            <div className="tab-content" id="nav-tabContent">
              <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-dashboard-list">
                <div className="container-fluid my-4 min-vh-100">
                  <div className="container">
                    <div className="row justify-content-center">
                      {/** card de cometarios reportados */}
                      <div className="card col-4 mx-3 shadow-sm">
                        <a href="" style={{ textDecoration: "none" }}>
                          <div className="card-body px-0 py-0">
                            <div className="row">
                              <div className="container-fluid col-5 bg-dark" >
                                <div className=" row justify-content-center far fa-comments fa-6x text-white pt-2 ">
                                </div>
                              </div>
                              <div className="container-fluid flex-column col-7 my-auto">
                                <div className="container-fluid">
                                  <h1 className="text-center text-dark"> {this.state.infoComentarios.comentarios} </h1>
                                </div>
                                <div className="container-fluid">
                                  <p className="text-center text-secondary"> Comentarios realizados </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>

                      {/** card de cometarios reportados */}
                      <div className="card shadow-sm col-4 mx-3">
                        <a href="" style={{ textDecoration: "none" }}>
                          <div className="card-body px-0 py-0">
                            <div className="row">
                              <div className="container-fluid col-5 bg-dark" >
                                <div className=" row justify-content-center fas fa-exclamation-circle fa-6x text-white pt-2">
                                </div>
                              </div>
                              <div className="container-fluid flex-column col-7">
                                <div className="container-fluid">
                                  <h1 className="text-center text-dark"> {this.state.infoComentarios.comentariosReportados} </h1>
                                </div>
                                <div className="container-fluid">
                                  <p className="text-center text-secondary"> Comentarios reportados </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <div className="container-fluid flex-column my-5 min-vh-100">
                  <div>
                    {this.comentariosPorProyecto()}
                  </div>
                </div>
              </div>
              <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <div className="container-fluid flex-column my-2 min-vh-100">
                  {this.verComentariosReportados()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
