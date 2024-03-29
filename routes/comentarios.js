// Se usa javascript en modo estricto
"use strict";

// Modelo de un proyecto
const Comentario = require("../models/comentario");

// Modelo de un proyecto
const Proyecto = require("../models/proyecto");

// Filtro de lenguaje
var Filter = require('bad-words'),
  filter = new Filter();



filter.addWords("Hijueputa", "Gonorrea", "Malparido", "Tarado", "Bobo", "Estupido", "Idiota", "Mongolico", "Atolondrado", "Pichurria", "Gonorriento", "Percanta", "Pirovo", "Zunga", "Guisa", "Marica", "Maricon", "Perra", "Sapo Hijueputa", "Huevon", "Guevon", "BalurdoLoca", "Imbecil", "Lampara", "Ñero", "Garbimba", "Simplon", "Gorsofia", "Gurrupleta", "Piroberta", "Guache", "Gasofia", "Hueva", "Gueba", "Care Chimba", "Chunchurria", "Pendejo", "Corroncho", "Care Monda", "Zorra", "Fufa", "Fufurufa", "Mierda", "Jodanse", "Jodete", "Coscorria", "Bazofia", "Garnupia", "Atontado", "Cretino", "Baboso", "Bobalicon", "Tontarro, ", "Bruto", "Insensato", "Mamerto", "Puberto", "Culicagado", "Menso", "Lerdo", "Muergano", "Tarado", "Lambon", "Zuripanta", "Puta",
  "hijueputa", "gonorrea", "malparido", "tarado", "bobo", "estupido", "idiota", "mongolico", "atolondrado", "pichurria", "gonorriento", "percanta", "pirovo", "zunga", "guisa", "marica", "maricon", "perra", "sapo hijueputa", "huevon", "guevon", "balurdoloca", "imbecil", "lampara", "ñero", "garbimba", "simplon", "gorsofia", "gurrupleta", "piroberta", "guache", "gasofia", "hueva", "gueba", "care chimba", "chunchurria", "pendejo", "corroncho", "care monda", "zorra", "fufa", "fufurufa", "mierda", "jodanse", "jodete", "coscorria", "bazofia", "garnupia", "atontado", "cretino", "baboso", "bobalicon", "tontarro, ", "bruto", "insensato", "mamerto", "puberto", "culicagado", "menso", "lerdo", "muergano", "tarado", "lambon", "zuripanta", "puta",
  " hijueputa", " gonorrea", " malparido", " tarado", " bobo", " estupido", " idiota", " mongolico", " atolondrado", " pichurria", " gonorriento", " percanta", " pirovo", " zunga", " guisa", " marica", " maricon", " perra", " sapo hijueputa", " huevon", " guevon", " balurdoloca", " imbecil", " lampara", " ñero", " garbimba", " simplon", " gorsofia", " gurrupleta", " piroberta", " guache", " gasofia", " hueva", " gueba", " care chimba", " chunchurria", " pendejo", " corroncho", " care monda", " zorra", " fufa", " fufurufa", " mierda", " jodanse", " jodete", " coscorria", " bazofia", " garnupia", " atontado", " cretino", " baboso", " bobalicon", " tontarro, ", " bruto", " insensato", " mamerto", " puberto", " culicagado", " menso", " lerdo", " muergano", " tarado", " lambon", " zuripanta", " puta",
  " hijueputa ", " gonorrea ", " malparido ", " tarado ", " bobo ", " estupido ", " idiota ", " mongolico ", " atolondrado ", " pichurria ", " gonorriento ", " percanta ", " pirovo ", " zunga ", " guisa ", " marica ", " maricon ", " perra ", " sapo hijueputa ", " huevon ", " guevon ", " balurdoloca ", " imbecil ", " lampara ", " ñero ", " garbimba ", " simplon ", " gorsofia ", " gurrupleta ", " piroberta ", " guache ", " gasofia ", " hueva ", " gueba ", " care chimba ", " chunchurria ", " pendejo ", " corroncho ", " care monda ", " zorra ", " fufa ", " fufurufa ", " mierda ", " jodanse ", " jodete ", " coscorria ", " bazofia ", " garnupia ", " atontado ", " cretino ", " baboso ", " bobalicon ", " tontarro, ", " bruto ", " insensato ", " mamerto ", " puberto ", " culicagado ", " menso ", " lerdo ", " muergano ", " tarado ", " lambon ", " zuripanta ", " puta ",
  "hijueputa ", "gonorrea ", "malparido ", "tarado ", "bobo ", "estupido ", "idiota ", "mongolico ", "atolondrado ", "pichurria ", "gonorriento ", "percanta ", "pirovo ", "zunga ", "guisa ", "marica ", "maricon ", "perra ", "sapo hijueputa ", "huevon ", "guevon ", "balurdoloca ", "imbecil ", "lampara ", "ñero ", "garbimba ", "simplon ", "gorsofia ", "gurrupleta ", "piroberta ", "guache ", "gasofia ", "hueva ", "gueba ", "care chimba ", "chunchurria ", "pendejo ", "corroncho ", "care monda ", "zorra ", "fufa ", "fufurufa ", "mierda ", "jodanse ", "jodete ", "coscorria ", "bazofia ", "garnupia ", "atontado ", "cretino ", "baboso ", "bobalicon ", "tontarro, ", "bruto ", "insensato ", "mamerto ", "puberto ", "culicagado ", "menso ", "lerdo ", "muergano ", "tarado ", "lambon ", "zuripanta ", "puta ");

module.exports = router => {

  // API para crear un comentario nuevo
  router.post("/comentarios/crear", (req, res) => {
    let body = req.body;

    if (!body) {
      res.json({
        exito: false,
        mensaje: "No existe un cuerpo en la petición."
      });
    } else {
      if (!body.texto) {
        res.json({
          exito: false,
          mensaje: "Debe existir un texto en el comentario."
        });
      } else if (body.texto.length < 100 || body.texto.length > 500) {
        res.json({
          exito: false,
          mensaje: "El comentario debe tener entre 100 y 500 caracteres."
        });
      } else if (body.calificacion < 1 || body.calificacion > 10) {
        res.json({
          exito: false,
          mensaje: "La calificacion debe ser entre 1 y 10."
        });
      } else if (!body.calificacion) {
        res.json({
          exito: false,
          mensaje: "Debe existir una calificación para el comentario."
        });
      } else if (!body.categoria) {
        res.json({
          exito: false,
          mensaje: "Debe existir una categoría para el comentario."
        });
      } else if (!body.bpin) {
        res.json({
          exito: false,
          mensaje: "Debe existir un BPIN del proyecto asociado al comentario."
        });
      } else if (!body.nombreDeUsuario) {
        res.json({
          exito: false,
          mensaje: "Debe existir un nombre de usuario en el comentario."
        });
      } else if (!body.sectorUsuario) {
        res.json({
          exito: false,
          mensaje: "Debe existir un sector asociado al usuario del comentario."
        });
      } else if (!body.nivelEducativoUsuario) {
        res.json({
          exito: false,
          mensaje: "Debe existir un nivel educativo asociado al usuario del comentario."
        });
      } else {

        //Filtro de lenguaje del comentario
        let textoFiltrado = filter.clean(body.texto);

        // Se verifica que el proyecto exista antes que nada
        let bpin = body.bpin;
        Proyecto.findOne({
          bpin: bpin
        },
          (err, proyecto) => {
            if (err) {
              res.json({
                exito: false,
                mensaje: "Se presentó un error buscando el proyecto para agregar el comentario. Error: " + err
              });
            } else if (!proyecto) {
              res.json({
                exito: false,
                mensaje: "No existe un proyecto asociado al BPIN " + bpin + ". No fue posible crear el comentario"
              });
            } else {

              let categoria = body.categoria;
              let nombreDeUsuario = body.nombreDeUsuario;

              // Se mira si el usuario ya realizó un comentario para la categoría y proyecto indicado
              Comentario.findOne({
                categoria: categoria,
                nombreDeUsuario: nombreDeUsuario,
                bpin: bpin
              }, (err, comentario) => {
                if (err) {
                  res.json({
                    exito: false,
                    mensaje: "Se presentó un error y no fue posible agregar el comentario. Error: " + err
                  });
                } else if (comentario) {
                  res.json({
                    exito: false,
                    mensaje: "El usuario " + nombreDeUsuario + " ya realizó un comentario para el proyecto con bpin " + bpin + " en la categoría de " + categoria,
                    comentario: comentario
                  });
                } else if (!comentario) {
                  let comentario = new Comentario({
                    bpin: proyecto.bpin,
                    texto: textoFiltrado,
                    nombreDeUsuario: nombreDeUsuario,
                    sectorUsuario: body.sectorUsuario,
                    nivelEducativoUsuario: body.nivelEducativoUsuario,
                    categoria: categoria,
                    calificacion: body.calificacion
                  });

                  comentario.save(err => {
                    if (err) {
                      res.json({
                        exito: false,
                        mensaje: "No fue posible crear el comentario. Error: " + err
                      });
                    } else {
                      res.json({
                        exito: true,
                        mensaje: "El comentario ha sido creado."
                      });
                    }
                  });
                }
              });
            }
          }
        );
      }
    }
  });

  // Api para obtener todos los comentarios de un proyecto
  router.get("/comentarios/bpin/:bpin", (req, res) => {
    let bpin = req.params.bpin;

    if (!bpin) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar un código BPIN para realizar las busquedas."
      });
    } else if (!bpin.match(/^[0-9]+$/)) {
      res.json({
        exito: false,
        mensaje: "El BPIN solo puede ser un número."
      });
    } else {
      Comentario.find({
        bpin: bpin
      }, null, (err, comentarios) => {
        if (err) {
          res.json({
            exito: false,
            mensaje: "Se presentó un error en la consulta. Error: " + err
          });
        } else if (!comentarios || comentarios.length === 0) {
          res.json({
            exito: false,
            mensaje: "No hay comentarios para el proyecto con bpin " + bpin
          });
        } else {
          res.json({
            exito: true,
            comentarios: comentarios
          });
        }
      });
    }
  });

  // API para eliminar un comentario
  router.get("/comentarios/bpin/:bpin/id/:id", (req, res) => {
    var cuerpo = {};
    Comentario.findOneAndRemove({ _id: req.params.id }, (err, offer) => {
      if (err) {
        cuerpo.exito = false;
        cuerpo.mensaje = "";
      }
      res.json("")
    })
  })

  // API para obtener los comentarios de un proyecto por BPIN y categoría
  router.get("/comentarios/bpin/:bpin/categoria/:categoria/:pagina", (req, res) => {
    let pagina = req.params.pagina || 0;
    let limite = pagina * 10;
    let bpin = req.params.bpin;
    let categoria = req.params.categoria;
    if (!bpin) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar un código BPIN para realizar las busquedas."
      });
    } else if (!bpin.match(/^[0-9]+$/)) {
      res.json({
        exito: false,
        mensaje: "El BPIN solo puede ser un número."
      });
    } else if (!categoria) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar la categoría de los comentarios a consultar."
      });
    } else {
      Comentario.find({
        bpin: bpin,
        categoria: categoria
      }, null, {
          skip: limite,
          limit: 10
        },
        (err, comentarios) => {
          if (err) {
            res.json({
              exito: false,
              mensaje: "Se presentó un error en la consulta. Error: " + err
            });
          } else if (!comentarios || comentarios.length === 0) {
            res.json({
              exito: false,
              mensaje: "No hay comentarios para el proyecto con bpin " + bpin + " en la categoría " + categoria
            });
          } else {
            res.json({
              exito: true,
              comentarios: comentarios
            });
          }
        });
    }
  });

  // API para obtener la calificación promedio de un proyecto por BPIN
  router.get("/comentarios/calificacionPromedio/bpin/:bpin", (req, res) => {
    let bpin = req.params.bpin;
    if (!bpin) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar un código BPIN para realizar las busquedas."
      });
    } else if (!bpin.match(/^[0-9]+$/)) {
      res.json({
        exito: false,
        mensaje: "El BPIN solo puede ser un número."
      });
    } else {
      Comentario.aggregate([{
        $match: {
          bpin: bpin
        }
      }, {
        $group: {
          _id: "$bpin",
          calificacion: {
            $avg: "$calificacion"
          }
        }
      }],
        (err, calificacionPromedio) => {
          if (err) {
            res.json({
              exito: false,
              mensaje: "Se presentó un error en la consulta. Error: " + err
            });
          } else if (calificacionPromedio.length === 0) {
            res.json({
              exito: false,
              calificacionPromedio: {
                proyectoBPIN: bpin,
                calificacionPromedio: 0
              }
            });
          } else {

            res.json({
              exito: true,
              calificacionPromedio: {
                proyectoBPIN: bpin,
                calificacionPromedio: calificacionPromedio[0].calificacion
              }
            });
          }
        }
      );
    }
  });

  //API para obtener la calificación promedio de un proyecto, por bpin y categoria de comentario
  router.get("/comentarios/calificacionPromedioXCategoria/bpin/:bpin/categoria/:categoria", (req, res) => {
    let categoria = req.params.categoria;
    let bpin = req.params.bpin;
    if (!bpin) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar un código BPIN para realizar las busquedas."
      });
    } else if (!bpin.match(/^[0-9]+$/)) {
      res.json({
        exito: false,
        mensaje: "El BPIN solo puede ser un número."
      });
    } else if (!categoria) {
      res.json({
        exito: false,
        mensaje: "Debe ingresar la categoría de los comentarios a consultar."
      });
    } else {
      Comentario.aggregate([{
        $match: {
          bpin: bpin,
          categoria: categoria
        }
      }, {
        $group: {
          _id: "$bpin",
          calificacion: {
            $avg: "$calificacion"
          }
        }
      }],
        (err, calificacionPromedio) => {
          if (err) {
            res.json({
              exito: false,
              mensaje: "Se presentó un error en la consulta. Error: " + err
            });
          } else if (calificacionPromedio.length === 0) {
            res.json({
              exito: false,
              mensaje: "No hay resultados para los parámetros ingresados (bpin: " + bpin + " , categoría: " + categoria + ")"
            });
          } else {

            res.json({
              exito: true,
              calificacionPromedio: {
                proyectoBPIN: bpin,
                categoria: categoria,
                calificacionPromedio: calificacionPromedio[0].calificacion
              }
            });
          }
        }
      );
    }
  });

  //API para consultar el numero de comentarios reportados y no reportados, ademas retorna la lista de comentarios reportados
  router.get("/comentarios/dashboard/cantidad", (req, res) => {
    let reportado = req.params.reportados;
    var resp = {
      comentarios: 0,
      comentariosReportados: 0,
      listaComentariosReportados: {}
    };
    Comentario.find({ reportado: true }, (error, data) => {
      resp.comentariosReportados = data.length;
      resp.listaComentariosReportados = data;
      Comentario.countDocuments({}, (error1, data1) => {
        resp.comentarios = data1;
        res.json(resp);
      })
    })
  })

  //API para reportar un comentario
  router.put('/comentarios/reportar/id/:id', (req, res) => {
    let idComentario = req.params.id;
    Comentario.findByIdAndUpdate(idComentario, { reportado: true }, (err, data) => {
      if (err) {
        res.json({
          exito: false,
          mensaje: "Se presentó un error al realizar el reporte. Error: " + err
        })
      }
      else {
        res.json({
          exito: true,
          mensaje: "Se realizó el reporte de manera exitosa"
        })
      }
    })
  })

  router.delete('/comentarios/bpin/:bpin/categoria/:categoria/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    let bpin = req.params.bpin;
    let categoria = req.params.categoria;

    Comentario.deleteOne({
      nombreDeUsuario: nombre,
      bpin: bpin,
      categoria: categoria
    })
      .exec()
      .then(result => {
        res.status(200).json({ result });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    console.log("ENtra")

  });

  router.put('/comentarios/bpin/:bpin/categoria/:categoria/:nombre', (req, res) => {
    let nombre = req.params.nombre;
    let bpin = req.params.bpin;
    let categoria = req.params.categoria;

    Comentario.findOneAndUpdate(
      {
        nombreDeUsuario: nombre,
        bpin: bpin,
        categoria: categoria
      },
      req.body,
      { new: true },
      (err, todo) => {
        console.log(todo)
        if (err) return res.status(500).send(err);
        return res.send(todo);
      }
    );
  });
  return router;
};