// Se usa javascript en modo estricto
"use strict;"

// Se usa el editor de archivos de NODE
const fs = require('fs');

// Se usa Mongoose, una herramienta de modelado de objetos de MongoDB diseñada para trabajar en un ambiente asíncrono
const mongoose = require("mongoose");

// JSON con los proyectos
const proyectos = require('../json/Proyectos.json');

// Requerido para la conexión
const db = mongoose.connection;

// Instancia del esquema de los proyectos
const Proyecto = require("../../models/proyecto");

// Arreglos con los proyectos procesados
let proyectosProcesados = [];

// Cuerpo de un proyecto procesado
let proyectoProcesado;

// Sectores de los proyectos 
let sectores = [];

// Estados de los proyectos
let estados = [];

// Ejecutores de los proyectos
let ejecutores = [];

// OCADs de los proyectos
let ocads = [];

// BPINs de los proyectos
let bpins = [];

// Anios de inicio de los proyectos
let aniosInicio = [];

// Anios de fin de los proyectos
let aniosFin = [];

// Mapa general de los proyectos. Región -> Departamento -> Municipio
let mapaProyectos = [];

function compare(a, b) {
    if (a.link > b.link)
        return -1;
    if (a.link < b.link)
        return 1;
    return 0;
}

proyectos.sort(compare);


// Iterador sobre los proyectos para pulir los datos 
for (let index = 0; index < proyectos.length; index++) {
    const proyectoJson = proyectos[index];

    let sector = primerLetraMayuscula(proyectoJson.sector);
    agregarElementoTexto(sector, sectores);

    let estado = validar(proyectoJson.estado);
    agregarElementoTexto(estado, estados);

    let ocad = validar(proyectoJson.ocad);
    agregarElementoTexto(ocad, ocads);

    let ejecutor = validar(proyectoJson.ejecutor);
    agregarElementoTexto(ejecutor, ejecutores);

    let anioInicio = proyectoJson.anioInicioEjecucion;
    agregarElementoTexto(anioInicio, aniosInicio);

    let anioFin = proyectoJson.anioFinEjecucion;
    agregarElementoTexto(anioFin, aniosFin);

    let region = primerasLetrasMayusculas(proyectoJson.region);
    let departamento = primerasLetrasMayusculas(proyectoJson.departmento);
    let municipio = primerasLetrasMayusculas(proyectoJson.municipio);

    agregarAlMapa(region, departamento, municipio);

    proyectoProcesado = {
        'region': region,
        'departamento': departamento,
        'municipio': municipio,
        'nombre': primerLetraMayuscula(proyectoJson.proyecto),
        'ocad': ocad,
        'bpin': proyectoJson.bpin,
        'sector': sector,
        'estado': estado,
        'sgr': proyectoJson.sgr,
        'ejecutor': ejecutor,
        'anioInicioEjecucion': Number(anioInicio),
        'anioFinEjecucion': Number(anioFin),
        'link': proyectoJson.link
    };
    proyectosProcesados.push(proyectoProcesado);
    console.log(index);
}

console.log("Se empiezan a remover los duplicados");

// Remueve los proyectos repetidos por BPIN
let proyectosNuevos = proyectosProcesados;
//console.log('Tamaño original: ' + proyectosProcesados.length + ' - Nuevo tamaño: ' + proyectosNuevos.length + ' - Repetidos: ' + (proyectosProcesados.length - proyectosNuevos.length));

// Configuracion a usar para evitar errores por deprecated
mongoose.set('useCreateIndex', true);

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/proyectosveeduria', {
    useNewUrlParser: true
});

// Imprime los errores en la conexión
db.on('error', console.error.bind(console, 'connection error:'));

// Verifica que la conexión haya sido exitosa
db.once('open', function () {
    console.log("Connection exitosa. Se empiezan a agregar los proyectos");

    // Guarda todos los proyectos en la colleción
    Proyecto.insertMany(proyectosNuevos, function (err, docs) {
        if (err) {
            return console.error(err);
        } else {
            console.log("Se han insertado todos los proyectos. Se procede a crear los archivos JSON.");
            crearJSONs();
            console.log("Finalizo exitosamente la creación de los archivos JSON.");
        }
    });
});

// Funciones implementadas

// Pone la primer letra de un string
function primerLetraMayuscula(palabra) {
    palabra = palabra.toLowerCase();
    return palabra.charAt(0).toUpperCase() + palabra.substring(1);
}

// Transforma las primeras letras de todas las palabras a mayuscula
function primerasLetrasMayusculas(palabraMayuscula) {
    let arregloDePalabras = palabraMayuscula.toLowerCase().split(' ');
    for (let index = 0; index < arregloDePalabras.length; index++) {
        const palabra = arregloDePalabras[index];

        arregloDePalabras[index] = palabra.charAt(0).toUpperCase() + palabra.substring(1);
    }
    return arregloDePalabras.join(' ');
}

// Mira si la palabra es null o vacía y trabaja con ella
function validar(palabra) {
    if (palabra === null || palabra === " ") {
        return "Por definir";
    } else {
        return primerasLetrasMayusculas(palabra);
    }
}

// Función para remover los duplicados a partir de un parametro
function removerDuplicados(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

// Agrega un nuevo sector en caso de que no exista
function agregarElementoTexto(elemento, arreglo) {
    if (arreglo.indexOf(elemento) === -1) {
        arreglo.push(elemento);
    }
}

function agregarAlMapa(region, departamento, municipio) {

    // Se busca el indice de la región asociada
    let regionIndex = mapaProyectos.findIndex(elementoRegion => elementoRegion.region === region);
    let regionP;

    // Si no existe, se crea un nuevo objeto región con departamento y municipio asociado
    if (regionIndex === -1) {
        regionP = {
            region: region,
            departamentos: [{
                departamento: departamento,
                numProyectos: 1,
                municipios: [{
                    municipio: municipio,
                    numProyectos: 1
                }]
            }],
            numProyectos: 1
        };
        mapaProyectos.push(regionP);
    } else {
        regionP = mapaProyectos[regionIndex]; // Se obtiene el objeto
        regionP.numProyectos++; // Se aumenta el número de proyectos asociados a la región
        let departamentosRegion = regionP.departamentos;

        // Se busca el indice del departamento
        let departamentoIndex = departamentosRegion.findIndex(elementoDepartamento => elementoDepartamento.departamento === departamento);
        let departamentoP;

        // Si no existe, se crea y se agrega incluido el municipio
        if (departamentoIndex === -1) {
            departamentoP = {
                departamento: departamento,
                numProyectos: 1,
                municipios: [{
                    municipio: municipio,
                    numProyectos: 1
                }]
            };
            departamentosRegion.push(departamentoP);
        } else {
            departamentoP = departamentosRegion[departamentoIndex]; // Se obtiene el objeto
            departamentoP.numProyectos++; // Se aumenta el número de proyectos asociados al departamento
            let municipiosDepartamento = departamentoP.municipios;

            // Se busca el municipio
            let municipioIndex = municipiosDepartamento.findIndex(elementoMunicipio => elementoMunicipio.municipio === municipio);
            let municipioP;

            // Si no existe, se crea y se agrega
            if (municipioIndex === -1) {
                municipioP = {
                    municipio: municipio,
                    numProyectos: 1
                };
                municipiosDepartamento.push(municipioP);
            } else {
                municipioP = municipiosDepartamento[municipioIndex];
                municipioP.numProyectos++; // Se aumenta el número de proyectos asociados al municipio
            }
        }
    }
}

function crearJSONs() {
    fs.writeFileSync("../json/Sectores.json", JSON.stringify(sectores));
    fs.writeFileSync("../json/Ejecutores.json", JSON.stringify(ejecutores));
    fs.writeFileSync("../json/Estados.json", JSON.stringify(estados));
    fs.writeFileSync("../json/Ocads.json", JSON.stringify(ocads));
    fs.writeFileSync("../json/AniosInicio.json", JSON.stringify(aniosInicio));
    fs.writeFileSync("../json/AniosFin.json", JSON.stringify(aniosFin));
    fs.writeFileSync("../json/MapaProyecto.json", JSON.stringify(mapaProyectos));
}