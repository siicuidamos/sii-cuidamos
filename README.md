# Veeduría proyectos públicos
Esta aplicación expone proyectos públicos de inversión de Colombia con el fin de que los ciudadanos le puedan hacer un seguimiento correcto al desarrollo e implementación de estos.

## Integrantes del equipo
- Vivian Gómez
- Gabriel Pinto

## La aplicación se encuentra desplegada en: http://vpp.ineffableinventions.com.co/

## Instructivo para ejecución

### Requisitos

- **Node JS** 

Verificar que este instalado ejecutando "node -v" en el CMD o descargarlo de https://nodejs.org/es/ (versión LTS)

- **Mongo DB**

Es necesario tenerlo para correr la aplicación localmente. Se puede descargar de https://www.mongodb.com/download-center?jmp=nav#community

- **Nodemon (opcional)**

Instalarlo usando en el cmd "npm i -g nodemon". Esta dependencia actualiza el servidor del back apenas detecta cambios.

### Pasos para ejecutar

1) Poner a correr MongoDB, entrando al directorio donde se instalando y ejecutando desde el CMD "mongod".
2) Abrir la carpeta raíz en un CMD.
3) Ejecutar "npm install" para instalar todas las dependencias necesarias.
4) Ejecutar "nodemon index.js" si se cuenta con Nodemon o ejecutar "npm start".
4.1) Tener en cuenta que la base de datos configurada en el repositorio no es la base de datos real. Es una que hace referencia a una instancia local de MongoDB.
5) Abrir otro CMD en la raíz del proyecto y acceder a la carpeta "client".
6) Correr el comando "npm start"
7) La aplicación será abierta de forma automática en http://localhost:3000/

El servidor del back quedará corriendo en http://localhost:8080
