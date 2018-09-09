const proyectos = require('../json/Proyectos.json');
let proyectosNuevoss = [];
let proyectoBody;

for (let index = 0; index < proyectos.length; index++) {
    const proyecto = proyectos[index];
    proyectoBody = {
        'region': proyecto.region,
        'departamento': proyecto.departmento,
        'municipio': proyecto.municipio,
        'nombre': proyecto.proyecto,
        'ocad': proyecto.ocad,
        'bpin': proyecto.bpin,
        'sector': proyecto.sector,
        'estado': proyecto.estado,
        'sgr': proyecto.sgr,
        'ejecutor': proyecto.ejecutor,
        'anioInicioEjecucion': Number(proyecto.anioInicioEjecucion),
        'anioFinEjecucion': Number(proyecto.anioFinEjecucion),
        'link': proyecto.link
    };
    proyectosNuevoss.push(proyectoBody);

}

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}


let proyectosNuevos = removeDuplicates(proyectosNuevoss, 'bpin');
console.log('Tamaño original: ' + proyectosNuevoss.length + ' - Nuevo tamaño: ' + proyectosNuevos.length + ' - Repetidos: ' + (proyectosNuevoss.length - proyectosNuevos.length));


const mongoose = require('mongoose');

// make a connection
mongoose.connect('mongodb://admin:leonardo123@ds143932.mlab.com:43932/proyectosveeduria', {
    useNewUrlParser: true
});

// get reference to database
const db = mongoose.connection;

// Se llama a la clase Schema de Moongose
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successful!");

    function obtenerFecha() {

        let fecha = new Date();

        let anio = fecha.getFullYear();

        let mes = fecha.getMonth() + 1;
        mes = (mes < 10 ? "0" : "") + mes;

        let dia = fecha.getDate();
        dia = (dia < 10 ? "0" : "") + dia;

        return dia + '/' + mes + '/' + anio;
    };


    const ComentarioSchema = new Schema({
        texto: {
            type: String,
            required: true
        },
        nombreDeUsuario: {
            type: String,
            required: true
        },
        sectorUsuario: {
            type: String,
            required: true
        },
        nivelEducativoUsuario: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true,
            default: obtenerFecha()
        },
        categoria: {
            type: String,
            required: true
        }
    });

    // define Schema
    const ProyectoSchema = new Schema({
        region: {
            type: String,
            required: true
        },
        departamento: {
            type: String,
            required: true
        },
        municipio: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        ocad: {
            type: String,
            required: true
        },
        bpin: {
            type: Number,
            required: true,
            unique: true
        },
        sector: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        sgr: {
            type: String,
            required: true
        },
        ejecutor: {
            type: String,
            required: false,
            default: ''
        },
        anioInicioEjecucion: {
            type: Number,
            required: true
        },
        anioFinEjecucion: {
            type: Number,
            required: true
        },
        link: {
            type: String,
            required: false,
            default: ''
        },
        comentarios: {
            type: [ComentarioSchema],
            default: []
        }
    });

    // compile schema to model
    const Proyectox = mongoose.model('Proyecto', ProyectoSchema, 'proyectos');

    // save multiple documents to the collection referenced by Book Model
    Proyectox.collection.insertMany(proyectosNuevos, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Multiple documents inserted to Collection");
        }
    });

});