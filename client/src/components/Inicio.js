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
        this.proyectosSiguiente(1);
      }

      proyectosSiguiente(valor) {
        axios.get("http://localhost:8080/vpp/api/proyectos/" + this.state.pagina).then(res => {
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

      render() {
        return this.state.exito ? (
        <div>
            <div className="text-center">
                <button className="btn btn-primary mt-3 mr-2" type="submit" onClick={() => this.proyectosSiguiente(-1)}><i class="fas fa-chevron-left"></i></button>
                <button type="button" className="btn btn-outline-primary mt-3" disabled>{this.state.pagina}</button>
                <button className="btn btn-primary mt-3 ml-2" type="submit" onClick={() => this.proyectosSiguiente(1)}><i class="fas fa-chevron-right"></i></button>
            </div>
            <div className="row">
            {this.state.proyectos.map(proyecto => {
                return <ProyectoGeneral key={proyecto.bpin} proyecto={proyecto}/> ;
            })}
            </div>
        </div>) : 
        (<div>
          {this.state.mensaje}
        </div>);
      }
}

export default Inicio;