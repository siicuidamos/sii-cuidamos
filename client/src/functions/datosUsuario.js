const aes = require('crypto-js/aes');
const utf8 = require('crypto-js/enc-utf8');
const tokenSiiCuidamos = 'tokenSiiCuidamos';
const usuarioSiiCuidamos = 'usuarioSiiCuidamos';

// Obtiene los datos del usuario
function obtenerDatosDeUsuario() {
  const stringUsuario = JSON.parse(localStorage.getItem(usuarioSiiCuidamos));
  const token = obtenerToken();
  if (!stringUsuario || !token) {
    localStorage.clear();
    window.location.reload();
  } else {
    try {
      const usuario = JSON.parse(
        aes.decrypt(stringUsuario, token).toString(utf8)
      );
      if (usuario && usuario.email) {
        return usuario;
      } else {
        localStorage.clear();
        window.location.reload();
      }
    } catch (e) {
      eliminarDatos();
      window.location.reload();
    }
  }
}

// Obtiene el token actual
function obtenerToken() {
  return localStorage.getItem(tokenSiiCuidamos);
}

// Guarda los datos en el local storage
function guardarDatosLogin(datos) {
  localStorage.setItem(tokenSiiCuidamos, datos.token);
  localStorage.setItem(usuarioSiiCuidamos, JSON.stringify(datos.usuario));
}

// Verifica si hay datos presentes
function datosPresentes() {
  return (
    localStorage.getItem(tokenSiiCuidamos) &&
    localStorage.getItem(usuarioSiiCuidamos)
  );
}

// Borra los datos del local storage
function eliminarDatos() {
  localStorage.clear();
}

module.exports = {
  obtenerDatosDeUsuario,
  guardarDatosLogin,
  datosPresentes,
  obtenerToken,
  eliminarDatos
};
