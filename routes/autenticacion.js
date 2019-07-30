// Se usa javascript en modo estricto
'use strict';

// Algoritmo para cifrar
const AES = require('crypto-js/aes');

// Modelo del usuario de cognito
const UsuarioCognito = require('../models/usuarioCognito');

// Objeto de amazon cognito
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const poolData = {
  UserPoolId: process.env.userPoolId, // Your user pool id here
  ClientId: process.env.clientId // Your client id here
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Configuración de la base de datos
const config = require('../configurations/database');

module.exports = router => {
  // API para el registro de usuarios en la base de datos
  router.post('/registrarUsuario', (req, res) => {
    // Cuerpo de la peticion
    const body = req.body;

    if (!body.email) {
      // Revisa que se haya ingresado un correo
      res.json({
        exito: false,
        mensaje: 'Debes ingresar un correo.'
      });
    } else if (!body.nombreDeUsuario) {
      // Revisa que se haya ingresado un nombre de usuario
      res.json({
        exito: false,
        mensaje: 'Debes ingresar un nombre de usuario.'
      });
    } else if (!body.clave) {
      // Revisa que se haya ingresado una clave
      res.json({
        exito: false,
        mensaje: 'Debes ingresar una clave.'
      });
    } else if (!body.nivelEducativo) {
      // Revisa que se haya ingresado un nivel educativo
      res.json({
        exito: false,
        mensaje:
          'Debes ingresar el nivel educativo máximo alcanzado o el actual.'
      });
    } else if (!body.sector) {
      res.json({
        exito: false,
        mensaje: 'Debes ingresar el sector al que perteneces.'
      });
    } else if (!body.origen) {
      // Revisa que se haya ingresado un departamento de origen
      res.json({
        exito: false,
        mensaje: 'Debes ingresar el nombre de tu departamento de origen.'
      });
    } else if (!body.residencia) {
      // Revisa que se haya ingresado el departamento en el que reside actualmente
      res.json({
        exito: false,
        mensaje:
          'Debes ingresar el nombre del departamento en el que resides actualmente.'
      });
    } else {
      // Revisa si el nombre de usuario ingresado es válido
      if (validarNombreDeUsuario(body.nombreDeUsuario)) {
        // Revisa si ya existe un usuario con el nombre de usuario ingresado
        UsuarioCognito.findOne(
          { nombreDeUsuario: body.nombreDeUsuario },
          null,
          (err, usuario) => {
            // Si se presenta un error en la consulta lanza un error
            if (err) {
              console.log(err);

              res.json({
                exito: false,
                mensaje: 'Se presentó un error realizando el registro.'
              });
            } else if (usuario) {
              // Si ya existe un usuario con el nombre de usuario indicado lanza un error
              res.json({
                exito: false,
                mensaje: 'El nombre de usuario ingresado ya ha sido tomado.'
              });
            } else {
              // Define los atributos que posee el usuario
              const attributeList = [];

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'email',
                  Value: body.email
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:nivelEducativo',
                  Value: body.nivelEducativo
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:sector',
                  Value: body.sector
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:origen',
                  Value: body.origen
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:residencia',
                  Value: body.residencia
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:rol',
                  Value: 'usuario'
                })
              );

              attributeList.push(
                new AmazonCognitoIdentity.CognitoUserAttribute({
                  Name: 'custom:username',
                  Value: body.nombreDeUsuario
                })
              );

              // Guarda el nuevo usuario en Cognito
              userPool.signUp(
                body.email.toLowerCase(),
                body.clave,
                attributeList,
                null,
                (error, result) => {
                  if (error) {
                    // Lanza el error en caso de que se presente uno
                    console.log(error);
                    if (error.code === 'UsernameExistsException') {
                      res.json({
                        exito: false,
                        mensaje:
                          'Ya existe un usuario registrado con ese correo.'
                      });
                    } else {
                      res.json({
                        exito: false,
                        mensaje: 'Se presentó un error en el registro'
                      });
                    }
                  } else {
                    // Guarda el nuevo usuario en mongo. Independiente de lo que sucede le dice al usuario que el registro fue válido
                    const nuevoUsuario = new UsuarioCognito({
                      idCognito: result.userSub,
                      nombreDeUsuario: body.nombreDeUsuario,
                      email: body.email.toLowerCase()
                    });

                    nuevoUsuario.save(errorGuardando => {
                      if (errorGuardando) {
                        console.log(errorGuardando);
                        console.log(
                          'Error guardando usuario: ' + result.userSub
                        );
                      } else {
                        console.log('Usuario guardado: ' + result.userSub);
                      }
                      res.json({
                        exito: true,
                        mensaje:
                          'Usuario creado exitosamente. Por favor verifica tu correo.'
                      });
                    });
                  }
                }
              );
            }
          }
        );
      } else {
        res.json({
          exito: false,
          mensaje:
            'El nombre de usuario ingresado no es válido. Solo se permiten valores alfanúmericos.'
        });
      }
    }
  });

  // API para el inicio de sesion
  router.post('/iniciarSesion', (req, res) => {
    // Cuerpo de la peticion
    const body = req.body;

    if (!body.email) {
      // Revisa que se haya ingresado un nombre de usuario
      res.json({
        exito: false,
        mensaje: 'Debes ingresar un correo válido.'
      });
    } else if (!body.clave) {
      // Revisa que se haya ingresado una clave
      res.json({
        exito: false,
        mensaje: 'Debes ingresar una contraseña.'
      });
    } else {
      // Inicializa los datos base para la autenticación del usuario
      const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        {
          Username: body.email,
          Password: body.clave
        }
      );

      const userData = {
        Username: body.email,
        Pool: userPool
      };

      const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

      // Inicia sesión y retorna el token de sesión y los datos del usuario
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: result => {
          const idToken = result.getIdToken();
          const payload = idToken.payload;
          const token = idToken.getJwtToken();
          const datosUsuario = {
            email: payload.email,
            nombreDeUsuario: payload['custom:username'],
            sector: payload['custom:sector'],
            nivelEducativo: payload['custom:nivelEducativo'],
            departamentoDeOrigen: payload['custom:origen'],
            departamentoDeResidencia: payload['custom:residencia'],
            rol: payload['custom:rol']
          };

          let datosUsuarioString = JSON.stringify(datosUsuario);
          datosUsuarioString = AES.encrypt(
            datosUsuarioString,
            token.toString()
          ).toString();

          res.json({
            exito: true,
            mensaje: '¡Bienvenido ' + payload['custom:username'] + '!',
            token: token,
            usuario: datosUsuarioString
          });
        },
        onFailure: err => {
          console.log(err);

          res.json({
            exito: false,
            mensaje: handleCognitoErorrCode(err)
          });
        }
      });
    }
  });

  return router;
};

function validarNombreDeUsuario(nombreDeUsuario) {
  if (!nombreDeUsuario) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(nombreDeUsuario);
  }
}

function handleCognitoErorrCode(error) {
  switch (error.code) {
    case 'NotAuthorizedException':
      return 'La contraseña ingresada es incorrecta';
    case 'UserNotFoundException':
      return 'No existe un usuario con el correo ingresado';
    case 'LimitExceededException':
      return 'El correo que ingresaste no es válido y fue temporalmente bloqueado Intenta de nuevo más tarde';
    case 'CodeMismatchException':
      return 'El código ingresado no es válido. Por favor intenta de nuevo';
    case 'UserNotConfirmedException':
      return 'No has confirmado tu cuenta. Por favor revisa tu correo';
    case 'UsernameExistsException':
      return 'Ya existe un usuario con el correo ingresado';
    default:
      return 'Error en el procedimiento';
  }
}
