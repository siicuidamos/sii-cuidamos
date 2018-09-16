const mapa = require('../../client/src/json/MapaProyecto.json');

const departamentosJSON = [];

// Se usa el editor de archivos de NODE
const fs = require('fs');

mapa.forEach(region => {
    const departamentos = region.departamentos;
    departamentos.forEach(departamento => {
        departamentosJSON.push(departamento.departamento);
    });
});

departamentosJSON.sort();


fs.writeFileSync("../../client/src/json/Departamentos.json", JSON.stringify(departamentosJSON));