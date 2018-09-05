// Modelo de un proyecto
const Proyecto = require('../models/proyecto');

module.exports = (router) => {

    // API para obtener todos los proyectos a partir de la pagina
    router.get('/proyectos/:pagina', (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        Proyecto.find({},
            null, {
                skip: limite,
                limit: 10,
            },
            (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: err
                    });
                } else {
                    if (!proyectos) {
                        res.json({
                            exito: false,
                            mensaje: "No hay proyectos en la base de datos."
                        });
                    } else if (proyectos.length === 0) {
                        res.json({
                            exito: false,
                            proyectos: 'Se supera el valor máximo de los datos.'
                        });
                    } else {
                        res.json({
                            exito: true,
                            proyectos: proyectos
                        });
                    }
                }
            }
        );

    });
    return router;
};