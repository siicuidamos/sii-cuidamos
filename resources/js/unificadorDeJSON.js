// Se usa javascript en modo estricto
"use strict";

const fs = require('fs');

let jsonLinks = require('../json/BaseDeDatosVideos.json')['rows'];
let json = require('../json/EnlacesProyectosPorEntidad.json');

console.log(json.length);
console.log(jsonLinks.length);

for (let x = 0; x < jsonLinks.length; x++) {
    console.log(x);
    let bpin = jsonLinks[x]['bpin'];
    let link = jsonLinks[x]['link'];

    for (let j = 0; j < json.length; j++) {
        const bpinJ = json[j]['bpin'];
        if (bpinJ === bpin) {
            json[j]['link'] = link;
        }
    }

}

let data = JSON.stringify(json);
fs.writeFileSync("../json/Proyectos.json", data);

console.log('Listo');