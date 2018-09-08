// Modelo de un proyecto
const Comentario = require("../models/comentario");
const Proyecto = require("../models/proyecto");

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
      } else if (body.texto.length < 80 || body.texto.length > 500) {
        res.json({
          exito: false,
          mensaje: "El comentario debe tener entre 80 y 500 caracteres."
        });
      } else if(body.calificacion < 1 || body.calificacion>5){
        res.json({
          exito: false,
          mensaje: "La calificacion debe ser entre 1 y 5."
        });
      } else if (!body.calificacion)  {
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
      } else if (!body.sectorUsuario) {
        res.json({
          exito: false,
          mensaje: "Debe existir un sector asociado al usuario del comentario."
        });
      } else {
        let comentario = new Comentario({
          bpin: body.bpin,
          texto: body.texto,
          nombreDeUsuario: body.nombreDeUsuario,
          sectorUsuario: body.sectorUsuario,
          nivelEducativoUsuario: body.nivelEducativoUsuario,
          categoria: body.categoria,
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
    }
  });

  //API para obtener la calificación promedio de un proyecto, por bpin y categoria de comentario
  router.get("/comentarios/calificacionPromedioXCategoria/bpin/:bpin/categoria/:categoria", (req, res) => {
    let categoria = req.params.categoria;
    let bpin = req.params.bpin;
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        Comentario.aggregate([{ $match : { bpin:bpin, categoria : categoria} }, { $group: { _id: "$bpin", calificacionPromedio: {$avg: "$calificacion"} }}],
            (err, calificacionPromedio) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (calificacionPromedio.length === 0) {
                    res.json({
                        exito: false,
                        mensaje: "No hay resultados para los parámetros ingresados (bpin: "+ bpin+" , categoría: "+categoria+")"
                    });
                }else {
                    res.json({
                        exito: true,
                        calificacionPromedio: calificacionPromedio
                    });
                }
            }
        );
    });

  return router;
};