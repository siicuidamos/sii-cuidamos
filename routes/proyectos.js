// Modelo de un proyecto
const Proyecto = require('../models/proyecto');

module.exports = (router) => {
    router.post('/subirProyectos', (req, res) => {

        let body = req.body;

        let proyecto = new Proyecto({
            region: body.region,
            departamento: body.departamento,
            municipio: body.municipio,
            nombre: body.nombre,
            ocad: body.ocad,
            bpin: body.bpin,
            sector: body.sector,
            sgr: body.sgr,
            ejecutor: body.ejecutor,
            estado: body.estado,
            anioInicioEjecucion: Number(body.anioInicioEjecucion),
            anioFinEjecucion: Number(body.anioFinEjecucion),
            link: body.link
        });

        proyecto.save((err) => {
            if (err) {
                if (err.code === 11000) { // Mira si el error es por un duplicado
                    res.json({
                        exito: false,
                        mensaje: 'El proyecto asociado a dicho BPIN ya ha sido guardado'
                    });
                } else {
                    res.json({
                        exito: false,
                        mensaje: 'Se presentó un error al guardar el proyecto. Error: ' + err
                    });
                }
            } else {
                res.json({
                    exito: true,
                    mensaje: 'Proyecto guardado correctamente.'
                });
            }
        });
    });

    router.get('/proyectos', (req, res) => {
        res.json({
            exito: true,
            mensaje: 'Proyectos'
        });
    });
    return router;
};