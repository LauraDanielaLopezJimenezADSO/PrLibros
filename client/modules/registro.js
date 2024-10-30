import { URL } from "./config.js";
import { envia } from "./ajax.js";
import { validarCorreo, validarContrasena } from './validaciones.js'; 


async function registrarAdmin() {
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    // Validar el correo
    if (!validarCorreo(correo)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return; // Impedir el envío
    }

    // Validar contraseñas
    const resultadoValidacion = validarContrasena(password, passwordConfirm);
    if (!resultadoValidacion.valido) {
        alert(resultadoValidacion.mensaje);
        return; // Impedir el envío
    }

    // Datos del usuario administrador
    const adminData = {
        correo: correo,
        password: password
    };

    // Enviar al servidor
    try {
        await envia("usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adminData)
        });
        alert("Admin creado exitosamente.");
        window.history.pushState({}, '', 'login.html');

        const response = await fetch('login.html');
        const html = await response.text();
        document.open();
        document.write(html);
        document.close();
    } catch (error) {
        console.error("Error al registrar admin:", error);
    }

    
}

// Agregar un listener al botón después de que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrarBtn").addEventListener("click", registrarAdmin);
});
