// Se usa crypto que permite funcionalidades criptograficas
const crypto = require('crypto').randomBytes(256).toString('hex');

// Configuración de la base de datos
module.exports = {
    uri: process.env.databaseUri,
    secret: crypto,
    db: process.env.databaseName
}