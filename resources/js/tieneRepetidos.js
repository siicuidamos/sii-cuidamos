const proyectos = require('../json/Proyectos.json');

for (let index = 0; index < 1000; index++) {
    let element = proyectos[index];
    for (let indey = 0; indey < 2000; indey++) {
        if (index !== indey) {
            let elemen = proyectos[indey];
            if (element.bpin === elemen.bpin &&
                element.region === elemen.region &&
                element.departmento === elemen.departmento &&
                element.proyecto === elemen.proyecto &&
                element.ocad === elemen.ocad &&
                element.sector === elemen.sector &&
                element.estado === elemen.estado &&
                element.sgr === elemen.sgr &&
                element.ejecutor === elemen.ejecutor &&
                element.anioInicioEjecucion === elemen.anioInicioEjecucion &&
                element.anioFinEjecucion === elemen.anioFinEjecucion) {
                console.log(elemen.bpin);
            }
        }


    }

}