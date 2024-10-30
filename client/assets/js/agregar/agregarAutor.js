import { URL } from "../../../modules/config.js";
import { validarNombreApellido } from "../../../modules/validaciones.js";
import { envia } from "../../../modules/ajax.js";

document.addEventListener("DOMContentLoaded", () => {
    const formAgregarAutor = document.getElementById("formAgregarAutor");

    formAgregarAutor.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Capturamos los valores de nombre y apellido
        const nombre = document.getElementById("nombreAutor").value.trim();
        const apellido = document.getElementById("apellidoAutor").value.trim();

        // Validar nombre y apellido
        if (!validarNombreApellido(nombre) || !validarNombreApellido(apellido)) {
            alert("Nombre y apellido deben contener solo letras y caracteres válidos.");
            return; // Detener el proceso si la validación falla
        }

        // Verificar si el autor ya existe
        try {
            const autores = await envia("autores"); // Obtiene todos los autores

            const autorExistente = autores.find(autor =>
                autor.nombre.toLowerCase() === nombre.toLowerCase() &&
                autor.apellido.toLowerCase() === apellido.toLowerCase()
            );

            if (autorExistente) {
                alert(`El autor ${nombre} ${apellido} ya existe.`);
                return; // Detener el proceso si el autor ya existe
            }

        } catch (error) {
            alert("Error al verificar la existencia del autor.");
            return; // Detener el proceso si hay un error en la verificación
        }

        // Verificar si existe una editorial con el mismo nombre
        try {
            const editoriales = await envia("editoriales"); // Obtiene todas las editoriales

            const editorialExistente = editoriales.find(editorial =>
                editorial.nombre.toLowerCase() === nombre.toLowerCase() // Comparar solo el nombre
            );

            if (editorialExistente) {
                alert(`Ya existe una editorial con el nombre ${nombre}. No se puede agregar el autor.`);
                return; // Detener el proceso si existe una editorial con el mismo nombre
            }

        } catch (error) {
            alert("Error al verificar la existencia de la editorial.");
            return; // Detener el proceso si hay un error en la verificación
        }

        // Generamos un ID único
        const idAutor = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);

        // Creamos el objeto autor
        const nuevoAutor = {
            id: idAutor,
            nombre: nombre,
            apellido: apellido,
            estado: "activo"
        };

        try {
            const response = await envia("autores", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoAutor)
            });

            if (response) {
                alert(`El autor ${nombre} ${apellido} fue agregado exitosamente.`);
                formAgregarAutor.reset();
            } else {
                throw new Error("Error al guardar el autor.");
            }
        } catch (error) {
            alert("Error al agregar el autor. Intenta de nuevo.");
        }
    });
});
