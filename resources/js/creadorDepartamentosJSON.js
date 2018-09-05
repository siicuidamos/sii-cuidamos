const fs = require("fs");

let mapa = require("../json/MapaDeColombia.json");

function compare(a, b) {
    if (a.departamento < b.departamento) return -1;
    if (a.departamento > b.departamento) return 1;
    return 0;
}

mapa.sort(compare);

let deptN = mapa[0].departamento;

let departamento = {
    nombre: deptN,
    municipios: []
};

let depMun = [];

mapa.forEach(element => {
    if (deptN === element.departamento) {
        departamento.municipios.push(element.municipio);
    } else if (deptN !== element.departamento) {
        depMun.push(departamento);
        deptN = element.departamento;
        departamento = {
            nombre: deptN,
            municipios: []
        };
    }
});

fs.writeFileSync("../json/DepartamentosMunicipios.json", JSON.stringify(depMun));