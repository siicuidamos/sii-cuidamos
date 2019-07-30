'use strict;';

// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const mongoose = require('mongoose');

// Se define la promesa global de Moongose
mongoose.Promise = global.Promise;

// Se llama a la clase Schema de Moongose
const Schema = mongoose.Schema;

// Se define el schema del usuario
const UsuarioCognitoSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  nombreDeUsuario: {
    type: String,
    required: true,
    unique: true
  },
  idCognito: {
    type: String,
    unique: true,
    required: true
  }
});

// Se exporta el modelo
module.exports = mongoose.model(
  'UsuarioCognito',
  UsuarioCognitoSchema,
  'usuariosCognito'
);
