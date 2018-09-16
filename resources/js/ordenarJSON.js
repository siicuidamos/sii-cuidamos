const sectores = require('../../client/src/json/Sectores.json');
const aniosInicio = require('../../client/src/json/AniosInicio.json');

// Se usa el editor de archivos de NODE
const fs = require('fs');


fs.writeFileSync("../../client/src/json/Sectores.json", JSON.stringify(sectores.sort()));
fs.writeFileSync("../../client/src/json/AniosInicio.json", JSON.stringify(aniosInicio.sort()));