const fs = require('fs');

let jsonLinks = require('../json/BaseDeDatosVideos.json');
let json = require('../json/EnlacesProyectosPorEntidad.json')['rows'];

for (let x = 0; x < jsonLinks.length; x++) {
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
let fs = require('fs');
fs.writeFileSync("../json/Proyectos.json", data);