const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const Schema = mongoose.Shcema 

const ComentarioSchema = new Schema({
  texto: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  categoria: {
    type: Number
    required: true
  }
});


const proyectoSchema = new Schema({
  departamento:{
    type: String,
    required: true
  },
  municipio:{
    type: String,
    required: true
  },
  proyecto:{
    type: String,
    required: true
  },
  ocad:{
    type: String,
    required: true
  },
  bpin:{
    type: Number,
    required: true,
    unique: true
  },
  sector:{
    type: String,
    required: true
  },
  estado:{
    type: Boolean,
    required: true
  },
  sgr:{
    type: Number,
    required: true
  },
  ejecutor:{
    type: String,
    required: false
  },
  region:{
    type: String,
    required: true
  },
  anioInicioEjecucion:{
    type: Number,
    required: true
  },
  anioFinEjecucion:{
    type: Number,
    required: true
  },
  link:{
    type: String,
    required: false
  },
  comentarios: {
    type: [ComentarioSchema],
    required: true
  }
});
module.exports = mongoose.model('Proyecto', proyectoSchema, 'proyectos');
