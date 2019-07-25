# Sii-Cuidamos

Esta aplicación expone proyectos públicos de inversión de Colombia con el fin de que los ciudadanos le puedan hacer un seguimiento correcto al desarrollo e implementación de estos.

## Colaboradores

- Gabriel Pinto

  **Página personal:** https://gabrielpinto.me

- Vivian Gómez

  **Página personal:** https://viviangomezcubillos.herokuapp.com

## Links de importancia

**Desplegada en:** http://www.siicuidamos.org

## Descripción

En Sii-Cuidamos todos los ciudadanos pueden conocer la información más relevante de más de 20.000 proyectos de inversión pública. De cada proyecto pueden conocer: nombre, BPIN, ubicación (región, departamento y municipio), estado, el monto de SGR, OCAD, sector al que pertenece, fecha de inicio, fecha de finalización y en algunos casos, un video representantivo del estado actual del proyecto.

Una vez registrado en el sistema, se podrán comentar los proyectos en diferentes categorías y a su vez calificarlo a partir de cada una de estás categorías.

Es posible a su vez compartir el link del proyecto que esta siendo visto en redes y escribir en redes sobre el proyecto usando un hastag específico.

## Objetivo

Buscamos informar a la ciudadanía, en especial a los colombianos, sobre lo que sucede con los diferentes proyectos del país para que puedan darle un correcto seguimiento al cumplimiento de estos.

## Tecnologías utilizadas

El proyecto fue desarrollado usando el stack MERN.

- **Mongo DB**: Se utilizo una base de datos no relacional de MongoDB que está desplegada en https://mlab.com/
- **Express**: Una infraestructura web rápida, minimalista y flexible para Node.js, que nos permite trabajar con el front y el back en JavaScript. https://expressjs.com/es/
- **React JS**: Una librería que permite cosas increíbles y que fue utilizada para la creación del front de la aplicación. https://reactjs.org/
- **Node JS**: Una de las herramientas más poderosas del mercado que usa JavaScript y que permite tener un servidor back totalmente funcional. Todas las peticiones son realizadas desde acá. https://nodejs.org/es/

A su vez, se usaron varias dependencias instaladas por medio de NPM.

- Moongose JS
- Body Parser
- BCrypt Node JS
- JSON Web TokeN
- React-router-dom
- Bootstrap

Entre otras que pueden ser observadas en los package.json de la aplicación.

Finalmente, la aplicación se encuentra despleagada en https://heroku.com/ pero se usa un dominio personalizado para acceder a ella. Que en este caso es http://siicuidamos.org/

## Instructivo para ejecución

### Requisitos

- **Node JS**

Verificar que este instalado ejecutando "node -v" en el CMD o descargarlo de https://nodejs.org/es/ (versión LTS)

- **Mongo DB**

Es necesario tenerlo para correr la aplicación localmente. Se puede descargar de https://www.mongodb.com/download-center?jmp=nav#community

- **Nodemon (opcional)**

Instalarlo usando en el cmd "npm i -g nodemon". Esta dependencia actualiza el servidor del back apenas detecta cambios.

### Pasos para ejecutar - Desarrollo

1. Poner a correr MongoDB, entrando al directorio donde se instaló y ejecutando desde el CMD "mongod".
2. Abrir la carpeta raíz en un CMD.
3. Ejecutar "npm install" para instalar todas las dependencias necesarias.
4. Ejecutar "npm run dev" si se cuenta con Nodemon o ejecutar "npm start".
   4.1) Tener en cuenta que la base de datos configurada en el repositorio no es la base de datos real. Es una que hace referencia a una instancia local de MongoDB.
5. Abrir otro CMD en la raíz del proyecto y acceder a la carpeta "client".
6. Instalar las dependencias necesarias con "npm i".
7. Correr el comando "npm start"
8. La aplicación será abierta de forma automática en http://localhost:3000/

El servidor del back quedará corriendo en http://localhost:8080

### Probar con datos de producción

Con el fin de poder probar la aplicación con la base de datos de producción, se debe editar el archivo "env.js" encontrado en la raíz del proyecto en la sección de "development", y modificar la variable de "databaseUri" por la uri que apunta a la base de datos de producción. **LA URI DE PRODUCCIÓN NO SE DEBE SUBIR AL REPOSITORIO**


