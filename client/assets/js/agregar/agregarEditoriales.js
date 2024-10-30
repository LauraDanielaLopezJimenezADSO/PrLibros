import { envia } from '../../../modules/ajax.js';
import { validarCorreo, validarNombreApellido, validarTelefono } from '../../../modules/validaciones.js';

document.addEventListener("DOMContentLoaded", () => {
    const formAgregarEditorial = document.getElementById("formAgregarEditorial");

    formAgregarEditorial.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        const nombreEditorial = document.getElementById("nombreEditorial").value.trim();
        const telefonoEditorial = document.getElementById("telefonoEditorial").value.trim();
        const correoEditorial = document.getElementById("correoEditorial").value.trim();

        // Validaciones
        if (!validarNombreApellido(nombreEditorial)) {
            alert("El nombre de la editorial solo debe contener letras y caracteres especiales.");
            return;
        }

        if (!validarTelefono(telefonoEditorial)) {
            alert("El teléfono de la editorial no es válido.");
            return;
        }

        if (!validarCorreo(correoEditorial)) {
            alert("El formato del correo electrónico es incorrecto.");
            return;
        }

        // Verificar si la editorial ya existe
        const editorialesExistentes = await obtenerEditorialesExistentes();
        const existeEditorial = editorialesExistentes.some(editorial => 
            editorial.nombre.toLowerCase() === nombreEditorial.toLowerCase()
        );

        if (existeEditorial) {
            alert("Ya existe una editorial con este nombre. Por favor, elige un nombre diferente.");
            return;
        }

        // Si hay validaciones exitosas, aquí iría la lógica para guardar la editorial
        try {
            const editorialData = {
                nombre: nombreEditorial,
                telefono: telefonoEditorial,
                correo: correoEditorial,
                estado: "activo"
            };

            // Llama a la función para guardar la editorial en la base de datos
            const response = await envia("editoriales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editorialData) // Convierte el objeto a JSON
            });

            console.log("Respuesta del servidor:", response); 

            // Verificar respuesta
            if (response) {
                alert(`Editorial ${nombreEditorial} guardada exitosamente!`);
                formAgregarEditorial.reset(); // Limpiar el formulario
            } else {
                alert("Error al guardar la editorial: " + (response.message || "Error desconocido."));
            }
        } catch (error) {
            alert("Ocurrió un error: " + error.message);
        }
    });

    // Función para obtener todas las editoriales existentes
    async function obtenerEditorialesExistentes() {
        try {
            const response = await envia("editoriales");
            return response || []; // Retornar un arreglo vacío si no hay respuesta
        } catch (error) {
            console.error("Error al obtener las editoriales existentes:", error);
            return []; // Retornar un arreglo vacío en caso de error
        }
    }
});
