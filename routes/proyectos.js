// Se usa javascript en modo estricto
"use strict";

// Modelo de un proyecto
const Proyecto = require("../models/proyecto");

module.exports = router => {
    // API para obtener todos los proyectos
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
                } else if (!proyectos || proyectos.length === 0) {
                    res.json({
                        exito: false,
                        mensaje: "No hay proyectos en la base de datos."
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

    // API para obtener los proyectos de un municipio
    router.get("/proyectos/municipio/:municipio/:pagina", (req, res) => {
        let municipio = req.params.municipio;
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;

        if (!municipio) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un municipio válido"
            });
        } else {
            municipio = municipio.replace(/_/g, " ").toUpperCase();
            Proyecto.find({
                    municipio: municipio
                },
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
                            mensaje: "No hay proyectos para el municipio consultado."
                        });
                    } else {
                        res.json({
                            exito: true,
                            proyectos: proyectos
                        });
                    }
                }
            );
        }
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
                },
                (err, proyecto) => {
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
                }
            );
        }
    });

    //API para obtener los proyectos de un departamento
    router.get("/proyectos/departamento/:departamento/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let departamento = req.params.departamento;
        if (!departamento) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un departamento válido"
            });
        } else {
            departamento = departamento.replace(/_/g, " ");
            Proyecto.find({
                    departamento: departamento
                },
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
                    } else if (!proyectos || proyectos.length === 0) {
                        res.json({
                            exito: false,
                            mensaje: "No hay proyectos en la base de datos asociados al departamento " +
                                departamento
                        });
                    } else {
                        res.json({
                            exito: true,
                            proyectos: proyectos
                        });
                    }
                }
            );
        }
    });

    //API para obtener los proyectos por sector
    router.get("/proyectos/sector/:sector/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let sector = req.params.sector;
        if (!sector) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un sector válido"
            });
        } else {
            sector = sector.replace(/_/g, " ").toUpperCase();
            Proyecto.find({
                    sector: sector
                },
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
                    } else if (!proyectos || proyectos.length === 0) {
                        res.json({
                            exito: false,
                            mensaje: "No hay proyectos en la base de datos asociados al sector " +
                                sector
                        });
                    } else {
                        res.json({
                            exito: true,
                            proyectos: proyectos
                        });
                    }
                }
            );
        }
    });

    //API para obtener los proyectos por fecha de inicio
    router.get("/proyectos/anioInicioEjecucion/:anioInicioEjecucion/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let anioInicioEjecucion = req.params.anioInicioEjecucion;
        if (!anioInicioEjecucion) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un año de inicio válido"
            });
        } else if (!anioInicioEjecucion.match(/^[0-9]+$/)) {
            res.json({
                exito: false,
                mensaje: "El año solo puede ser un número."
            });
        } else {
            Proyecto.find({
                    anioInicioEjecucion: anioInicioEjecucion
                },
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
                    } else if (!proyectos || proyectos.length === 0) {
                        res.json({
                            exito: false,
                            proyectos: "No hay proyectos con fecha de inicio " + anioInicioEjecucion
                        });
                    } else {
                        res.json({
                            exito: true,
                            proyectos: proyectos
                        });
                    }
                }
            );
        }
    });

    //API para obtener los proyectos por departamento y sector
    router.get("/proyectos/departamento/:departamento/sector/:sector/:pagina", (req, res) => {
        let pagina = req.params.pagina || 0;
        let limite = pagina * 10;
        let departamento = req.params.departamento;
        let sector = req.params.sector;
        if (!sector) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un sector válido"
            });
        } else if (!departamento) {
            res.json({
                exito: false,
                mensaje: "Debe seleccionar un departamento válido"
            });
        } else {
            sector = sector.replace(/_/g, " ").toUpperCase();
            departamento = departamento.replace(/_/g, " ").toUpperCase();
            Proyecto.find({
                departamento: departamento,
                sector: sector
            }, null, {
                skip: limite,
                limit: 10
            }, (err, proyectos) => {
                if (err) {
                    res.json({
                        exito: false,
                        mensaje: "Se presentó un error en la consulta. Error: " + err
                    });
                } else if (!proyectos || proyectos.length === 0) {
                    res.json({
                        exito: false,
                        proyectos: "No hay proyectos con pertenecientes al departamtno de " + departamento + " y en el sector de " + sector
                    });
                } else {
                    res.json({
                        exito: true,
                        proyectos: proyectos
                    });
                }
            });
        }
    });

    return router;
};