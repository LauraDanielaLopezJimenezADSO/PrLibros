// Validación del formato del correo electrónico
export function validarCorreo(correo) {
    const correoRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return correoRegex.test(correo);
}

// Validación de la contraseña
export function validarContrasena(password, passwordConfirm) {
    if (password !== passwordConfirm) {
        return { valido: false, mensaje: "Las contraseñas no coinciden." };
    }
    if (!/^\d+$/.test(password)) { // Contraseña solo numérica
        return { valido: false, mensaje: "La contraseña debe ser solo numérica." };
    }
    return { valido: true };
}

// validar que el nombre o apellido solo contenga letras y caracteres especiales
export function validarNombreApellido(texto) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;
    return regex.test(texto);
}

export function validarTelefono(telefono) {
    const telefonoRegex = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    return telefonoRegex.test(telefono);
}