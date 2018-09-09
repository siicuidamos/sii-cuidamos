// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const mongoose = require("mongoose");

// Se define la promesa global de Moongose
mongoose.Promise = global.Promise;

// Se llama a la clase Schema de Moongose
const Schema = mongoose.Schema;

// Se define el schema de un proyecto
const ProyectoSchema = new Schema({
  region: {
    type: String,
    required: true
  },
  departamento: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  ocad: {
    type: String,
    required: true
  },
  bpin: {
    type: String,
    required: true,
    unique: true
  },
  sector: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  sgr: {
    type: String,
    required: true
  },
  ejecutor: {
    type: String,
    required: false,
    default: ''
  },
  anioInicioEjecucion: {
    type: Number,
    required: true
  },
  anioFinEjecucion: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: false,
    default: ''
  }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema, 'proyectos');