import React, { Component } from "react";
import ProyectoGeneral from "./ProyectoGeneral.jsx";
import axios from "axios";

class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
          exito: null,
          mensaje: "",
          proyectos: [],
          pagina: 0
        };
      }  
    
      componentDidMount() {
        this.proyectosSiguiente(0);
      }

      proyectosSiguiente(valor) {
        if((valor === -1 && this.state.pagina >= 1) || valor >= 0)  {
            axios.get("/vpp/api/proyectos/" + (this.state.pagina + valor)).then(res => {
                const exito = res.data.exito;
                if (exito){
                  this.setState({ exito: exito, proyectos: res.data.proyectos });
                  this.setState({
                    pagina : this.state.pagina + valor
                });
                } else {
                  this.setState({ exito: exito, mensaje: res.data.mensaje });
                }     
            });
        }
      }

       

      render() {
        const botones = <div className="text-center">
        <button className="btn btn-info mt-3 mr-2" type="submit" onClick={() => this.proyectosSiguiente(-1)}><i className="fas fa-chevron-left"></i></button>
        <button type="button" className="btn btn-outline-info mt-3 font-weight-bold" disabled>{this.state.pagina + 1}</button>
        <button className="btn btn-info mt-3 ml-2" type="submit" onClick={() => this.proyectosSiguiente(1)}><i className="fas fa-chevron-right"></i></button>
        </div>;
        return this.state.exito ? (
        <div>
            {botones}
            <div className="row">
            {this.state.proyectos.map(proyecto => {
                return <ProyectoGeneral key={proyecto.bpin} proyecto={proyecto}/> ;
            })}
            </div>
            {botones}
        </div>) : 
        (<div>
          <hr/>
          <h3 className="text-center">Los proyectos públicos están siendo cargados. Por favor espera <i className="far fa-smile-beam text-warning"></i></h3>
        </div>);
      }
}

export default Inicio;