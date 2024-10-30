
import solicitud from './ajax.js';
import { validarCorreo, validarContrasena } from './validaciones.js'; // Importar las validaciones

async function loginAdmin() {
    const correo = document.getElementById('loginCorreo').value;
    const password = document.getElementById('loginPassword').value;

    // Validar el correo
    if (!validarCorreo(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return; // Impedir el envío
    }

    // Validar la contraseña
    if (!password) {
        alert("La contraseña no puede estar vacía.");
        return; // Impedir el envío
    }

    try {
        const response = await fetch('../../server/db.json'); 
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        const usuarios = data.usuarios; // Accede al array de usuarios

        // Verificar si usuarios es array
        if (!Array.isArray(usuarios)) {
            throw new Error("La respuesta no es un array.");
        }

        const usuarioEncontrado = usuarios.find(usuario => usuario.correo === correo && usuario.password === password);

        if (usuarioEncontrado) {
            alert("Inicio de sesión exitoso.");
            window.location.href = "../client/assets/html/main/mainScreenHome.html"; // usuario a la página principal
        } else {
            alert("El correo o la contraseña son incorrectos.");
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al intentar iniciar sesión.");
    }
}

// Agregar un listener al botón después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("loginBtn"); // Asegúrate de que este ID sea correcto
    if (loginBtn) {
        loginBtn.addEventListener("click", loginAdmin);
    } else {
        console.error("El botón de login no se encontró en el DOM.");
    }
});
