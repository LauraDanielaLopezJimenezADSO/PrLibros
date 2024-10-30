import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";
import { validarNombreApellido } from "../../../modules/validaciones.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectAutor = document.getElementById("selectAutor");
    const nombreAutor = document.getElementById("nombreAutor");
    const apellidoAutor = document.getElementById("apellidoAutor");
    const estadoAutor = document.getElementById("estadoAutor");
    const btnActualizar = document.getElementById("btnActualizar");
    const autorDetails = document.getElementById("autorDetails");

    // Cargar todos los autores al inicio
    await cargarAutores();

    // Cargar autores en el select
    async function cargarAutores() {
        const autores = await envia("autores");
        autores.forEach(autor => {
            const option = document.createElement("option");
            option.value = autor.id; 
            option.textContent = `${autor.nombre} ${autor.apellido}`;
            selectAutor.appendChild(option);
        });
    }

    // Manejar el cambio de selección
    selectAutor.addEventListener("change", async () => {
        const autorId = selectAutor.value;

        if (autorId) {
            const autores = await envia("autores");
            const autorSeleccionado = autores.find(autor => autor.id === autorId);
            if (autorSeleccionado) {
                nombreAutor.value = autorSeleccionado.nombre;
                apellidoAutor.value = autorSeleccionado.apellido;
                estadoAutor.value = autorSeleccionado.estado;
                autorDetails.style.display = "block"; 
            }
        } else {
            autorDetails.style.display = "none"; 
        }
    });

    // Manejar la actualización del autor
    btnActualizar.addEventListener("click", async () => {
        const autorId = selectAutor.value;

        if (!autorId) {
            alert("Por favor, selecciona un autor.");
            return;
        }

        // Validar nombre y apellido
        if (!validarNombreApellido(nombreAutor.value)) {
            alert("El nombre solo puede contener letras y caracteres especiales.");
            return;
        }

        if (!validarNombreApellido(apellidoAutor.value)) {
            alert("El apellido solo puede contener letras y caracteres especiales.");
            return;
        }

        const autorActualizado = {
            id: autorId,
            nombre: nombreAutor.value.trim(),
            apellido: apellidoAutor.value.trim(),
            estado: estadoAutor.value
        };

        // Enviar datos al servidor para actualizar el autor en db.json
        try {
            const response = await fetch(`${URL}/autores/${autorId}`, {
                method: 'PUT', // Usar el método PUT para actualizar
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(autorActualizado)
            });

            if (response.ok) {
                alert("Autor actualizado con éxito.");
                await cargarAutores(); // cargar la lista de autores otra vez
                autorDetails.style.display = "none"; // Ocultar detalles después de la actualización
                selectAutor.value = ""; // Limpiar select
                nombreAutor.value = "";
                apellidoAutor.value = "";
                estadoAutor.value = "activo"; // Resetear estado
            } else {
                alert("Error al actualizar el autor.");
            }
        } catch (error) {
            console.error("Error:", error);
            console.log("Hubo un problema al actualizar el autor.");
        }
    });
});
