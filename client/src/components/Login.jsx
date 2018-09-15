import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usuario: "",
      contrasenia: ""
    };
  }

  validateForm() {
    return this.state.usuario.length > 0 && this.state.contrasenia.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }



  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="usuario" bsSize="large">
            <ControlLabel>usuario</ControlLabel>
            <FormControl
              autoFocus
              type="usuario"
              value={this.state.usuario}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="contrasenia" bsSize="large">
            <ControlLabel>contrasenia</ControlLabel>
            <FormControl
              value={this.state.contrasenia}
              onChange={this.handleChange}
              type="contrasenia"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
export default Login;
