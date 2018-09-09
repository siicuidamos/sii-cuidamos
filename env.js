// Se usa Node.js File System Module, que permite trabajar con los archivos del sistema.
const fs = require('fs');

// Se mira si la carpeta public existe, ya que en ese caso se usa la configuración del modo en producción (production).
if (fs.existsSync('./public')) {
    process.env.NODE_ENV = 'production';
    process.env.databaseUri = process.env.MONGODB_URI;
    process.env.databaseName = 'production database: proyectosveeduria';
} else {
    process.env.NODE_ENV = 'development';
    process.env.databaseUri = 'mongodb://admin:lanata123@ds143932.mlab.com:43932/proyectosveeduria'; // Base de datos real
    process.env.databaseName = 'development database: proyectosveeduria';
}
