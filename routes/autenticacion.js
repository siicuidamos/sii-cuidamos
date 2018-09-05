// Modelo del usuario
const Usuario = require('../models/usuario');

// Tokens seguros para transmitir datos en la web
const jwt = require('jsonwebtoken');

// Configuración de la base de datos
const config = require('../configurations/database');

module.exports = (router) => {

    // API para el registro de usuarios en la base de datos
    router.post('/registrarUsuario', (req, res) => {

        // Cuerpo de la peticion
        let body = req.body;

        if (!body.email) { // Revisa que se haya ingresado un correo
            res.json({
                exito: false,
                mensaje: 'Debe ingresar un correo.'
            });
        } else if (!body.nombreDeUsuario) { // Revisa que se haya ingresado un nombre de usuario
            res.json({
                exito: false,
                mensaje: 'Debe ingresar un nombre de usuario.'
            });
        } else if (!body.clave) { // Revisa que se haya ingresado una clave
            res.json({
                exito: false,
                mensaje: 'Debe ingresar una clave.'
            });
        } else if (!body.nivelEducativo) { // Revisa que se haya ingresado un nivel educativo
            res.json({
                exito: false,
                mensaje: 'Debe ingresar el nivel educativo máximo alcanzado o el actual.'
            });
        } else if (!body.sector) {
            res.json({
                exito: false,
                mensaje: 'Debe ingresar el sector al que pertenece.'
            });
        } else if (!body.departamentoDeOrigen) { // Revisa que se haya ingresado un departamento de origen
            res.json({
                exito: false,
                mensaje: 'Debe ingresar el nombre de su departamento de origen.'
            });
        } else if (!body.departamentoDeResidencia) { // Revisa que se haya ingresado el departamento en el que reside actualmente
            res.json({
                exito: false,
                mensaje: 'Debe ingresar el nombre del departamento en el que reside actualmente.'
            });
        } else {
            // Crea el objeto de usuario
            let usuario = new Usuario({
                email: body.email.toLowerCase(),
                nombreDeUsuario: body.nombreDeUsuario.toLowerCase(),
                clave: body.clave,
                sector: body.sector,
                nivelEducativo: body.nivelEducativo,
                departamentoDeOrigen: body.departamentoDeOrigen,
                departamentoDeResidencia: body.departamentoDeResidencia
            });

            usuario.save((err) => { // Guarda el nuevo usuario en la base de datos
                if (err) {
                    if (err.code === 11000) { // Mira si el error es por un duplicado
                        res.json({
                            exito: false,
                            mensaje: 'El nombre de usuario o el correo ingresado ya han sido tomados.'
                        });
                    } else if (err.errors) { // Mira si hay errores de validacion
                        let errores = err.errors; // Objeto con los errores de validacion
                        if (errores.email) { // Mira si son errores del email
                            res.json({
                                exito: false,
                                mensaje: errores.email.message
                            });
                        } else if (errores.nombreDeUsuario) { // Mira si son errores del nombre de usuario
                            res.json({
                                exito: false,
                                mensaje: errores.nombreDeUsuario.message
                            });
                        } else if (errores.clave) { // Mira si son errores de la clave
                            res.json({
                                exito: false,
                                mensaje: errores.clave.message
                            });
                        } else { // Errores no contemplados
                            res.json({
                                exito: false,
                                mensaje: err
                            });
                        }
                    } else { // Error no relacionado con la validacion
                        res.json({
                            exito: false,
                            mensaje: 'No fue posible crear el usuario. Error: ' + err
                        });
                    }
                } else {
                    res.json({
                        exito: true,
                        mensaje: 'Usuario correctamente creado.'
                    });
                }
            });
        }
    });

    return router;
};