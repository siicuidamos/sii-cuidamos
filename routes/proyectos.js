// Modelo de un proyecto
const Proyecto = require("../models/proyecto");

module.exports = router => {
    // API para obtener todos los proyectos a partir de la pagina
    router.get("/proyectos/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        Proyecto.find({},
            null, {
                skip: limite,
                limit: 10
            },
            (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
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
                            proyectos: "Se supera el valor máximo de los datos."
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

    // API para obtener un proyecto por BPIN
    router.get("/proyectos/bpin/:bpin", (req, res) => {
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
            Proyecto.findOne({
                bpin: bpin
            }, (err, proyecto) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (!proyecto) {
                    res.json({
                        exito: false,
                        mensaje: "No existe un proyecto asociado al BPIN " + bpin
                    });
                } else {
                    res.json({
                        exito: true,
                        proyecto: proyecto
                    });
                }
            });
        }
    });

    //API para obtener por departamentos
    router.get("/proyectos/departamento/:departamento/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let departamento = req.params.departamento.toUpperCase();
        departamento = departamento.replace("_"," ");
        Proyecto.find({ departamento:departamento},
            null, {
                skip: limite,
                limit: 10
            },
            (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (!proyectos) {
                    res.json({
                        exito: false,
                        mensaje: "No hay proyectos en la base de datos."
                    });
                } else if (proyectos.length === 0) {
                    res.json({
                        exito: false,
                        proyectos: "Se supera el valor máximo de los datos."
                    });
                } else {
                    res.json({
                        exito: true,
                        proyectos: proyectos
                    });
                }
            }
        );
    });

    //API para obtener proyecto por sector
    router.get("/proyectos/sector/:sector/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let sector = req.params.sector.toUpperCase();
        sector = sector.replace("_"," ");
        Proyecto.find({sector:sector},
            null, {
                skip: limite,
                limit: 10
            },
            (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (!proyectos) {
                    res.json({
                        exito: false,
                        mensaje: "No hay proyectos en la base de datos."
                    });
                } else if (proyectos.length === 0) {
                    res.json({
                        exito: false,
                        proyectos: "Se supera el valor máximo de los datos."
                    });
                } else {
                    res.json({
                        exito: true,
                        proyectos: proyectos
                    });
                }
            }
        );
    });
       
    //API obtener proyectos por fecha de inicio
    router.get("/proyectos/anioInicioEjecucion/:anioInicioEjecucion/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let anioInicioEjecucion = req.params.anioInicioEjecucion;
        Proyecto.find({anioInicioEjecucion:anioInicioEjecucion},
            null, {
                skip: limite,
                limit: 10
            },
            (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (proyectos.length === 0) {
                    res.json({
                        exito: false,
                        proyectos: "No hay proyectos correspondientes a la fecha de inicio ingresada."
                    });
                } else {
                    res.json({
                        exito: true,
                        proyectos: proyectos
                    });
                }
            }
        );
    });




    return router;
};