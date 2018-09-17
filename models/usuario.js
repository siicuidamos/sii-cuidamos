"use strict;"

// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const mongoose = require("mongoose");

// Se define la promesa global de Moongose
mongoose.Promise = global.Promise;

// Se llama a la clase Schema de Moongose
const Schema = mongoose.Schema;

// Se usa BCrypt Node JS, este ermite el cifrado de texto
const bcrypt = require("bcrypt-nodejs");

// Se veirifica que la longitud el correo debe ser de minimo 5
let emailValidadorLongitud = email => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

// Se verifica que sea un email valido
let emailValido = (email) => {
    if (!email) {
        return false;
    } else {
        var regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

// Se verifica la longitud del nombre de usuario. Que este entre 3 y 15 caracteres
let nombreDeUsuarioValidadorLongitud = (nombreDeUsuario) => {
    if (!nombreDeUsuario) {
        return false;
    } else {
        if (nombreDeUsuario.length < 3 || nombreDeUsuario.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

// Se verifica que sea un nombre de usuario valido
let nombreDeUsuarioValido = (nombreDeUsuario) => {
    if (!nombreDeUsuario) {
        return false;
    } else {
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        return regExp.test(nombreDeUsuario);
    }
};

// Se verifica la longitud de la clave. Debe tener entre 8 y 30 caracteres 
let claveValidadorLongitud = (clave) => {
    if (!clave) {
        return false;
    } else {
        if (clave.length < 8 || clave.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

// Se definen los validadores del correo
const emailValidadores = [{
    validator: emailValidadorLongitud,
    message: 'El correo debe tener entre 5 y 35 caracteres.',
}, {
    validator: emailValido,
    message: 'El correo ingreado no es válido.'
}];

// Se definen los validadores del nombre de usuario
const nombreDeUsuarioValidadores = [{
    validator: nombreDeUsuarioValidadorLongitud,
    message: 'El nombre de usuario debe tener entre 3 y 15 caracteres.'
}, {
    validator: nombreDeUsuarioValido,
    message: 'El nombre de usuario solo puede tener números y letras.'
}];

// Se definen los validadores de la clave
const claveValidadores = [{
    validator: claveValidadorLongitud,
    message: 'La contraseña debe tener entre 8 y 35 caracteres.'
}];

// Se define el schema del usuario
const UsuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: emailValidadores
    },
    nombreDeUsuario: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: nombreDeUsuarioValidadores
    },
    clave: {
        type: String,
        required: true,
        unique: false,
        validate: claveValidadores
    },
    sector: {
        type: String,
        required: true,
        unique: false
    },
    nivelEducativo: {
        type: String,
        required: true,
        unique: false
    },
    departamentoDeOrigen: {
        type: String,
        required: true,
        unique: false
    },
    departamentoDeResidencia: {
        type: String,
        required: true,
        unique: false
    },
    roles: {
        type: [String],
        default: ['ciudadano'],
        unique: false
    }
});

// Se hace para encriptar la clave antes de que sea guardada
UsuarioSchema.pre('save', function (next) {
    //Si la clave no ha sido modificada, no se hace nada
    if (!this.isModified('clave')) {
        return next();
    }

    // Se encripta la clave
    bcrypt.hash(this.clave, null, null, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.clave = hash;
        next();
    })
});

// Compara la clave al iniciar sesión
UsuarioSchema.methods.compararClave = function (clave) {
    return bcrypt.compareSync(clave, this.clave);
};

// Se exporta el modelo
module.exports = mongoose.model('Usuario', UsuarioSchema, 'usuarios');