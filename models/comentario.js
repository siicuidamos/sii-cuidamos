"use strict;"

// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const mongoose = require("mongoose");

// Se define la promesa global de Moongose
mongoose.Promise = global.Promise;

// Se llama a la clase Schema de Moongose
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  bpin: {
    type: String,
    required: true
  },
  texto: {
    type: String,
    required: true
  },
  nombreDeUsuario: {
    type: String,
    required: true
  },
  sectorUsuario: {
    type: String,
    required: true
  },
  nivelEducativoUsuario: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true,
    default: obtenerFecha()
  },
  categoria: {
    type: String,
    required: true
  },
  calificacion: {
    type: Number,
    required: true
  },
  reportado:{
    type: Boolean,
    required: false,
    default: false
  }
});

function obtenerFecha() {
  let fecha = new Date();

  let anio = fecha.getFullYear();

  let mes = fecha.getMonth() + 1;
  mes = (mes < 10 ? "0" : "") + mes;

  let dia = fecha.getDate();
  dia = (dia < 10 ? "0" : "") + dia;

  return dia + "/" + mes + "/" + anio;
}

module.exports = mongoose.model("Comentario", comentarioSchema, "comentarios");