import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";
import { validarNombreApellido } from "../../../modules/validaciones.js";

document.addEventListener("DOMContentLoaded", async () => {
    const btnBuscar = document.getElementById("btnBuscar");
    const btnLimpiar = document.getElementById("btnLimpiar");
    const buscarEditorial = document.getElementById("buscarEditorial");
    const resultado = document.getElementById("resultado");

    // Cargar todas las editoriales al inicio
    await cargarEditoriales();

    btnBuscar.addEventListener("click", async () => {
        const query = buscarEditorial.value.trim();

        if (query === "") {
            alert("Por favor, ingresa un nombre para buscar.");
            return;
        }

        // Validar que el texto solo contenga letras y caracteres especiales
        if (!validarNombreApellido(query)) {
            alert("El nombre solo puede contener letras y caracteres especiales.");
            return;
        }

        // Buscar editoriales
        const editoriales = await envia("editoriales");
        const editorialesFiltrados = editoriales.filter(autor =>
            autor.nombre.toLowerCase().includes(query.toLowerCase()) ||
            autor.estado.toLowerCase() === query
        );

        mostrarResultados(editorialesFiltrados);
    });

    btnLimpiar.addEventListener("click", async () => {
        buscarEditorial.value = ""; // Limpiar el campo de búsqueda
        await cargarEditoriales(); // Cargar todas las editoriales nuevamente
    });

    async function cargarEditoriales() {
        const editoriales = await envia("editoriales");
        mostrarResultados(editoriales);
    }

    function mostrarResultados(editoriales) {
        resultado.innerHTML = ""; // Limpiar resultados anteriores

        if (editoriales.length === 0) {
            resultado.innerHTML = "<p>No se encontraron editoriales.</p>";
            return;
        }

        // Crear tabla para mostrar los resultados
        const tabla = document.createElement("table");
        tabla.className = "resultado__tabla";

        const encabezado = document.createElement("tr");
        encabezado.innerHTML = "<th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Estado</th>";
        tabla.appendChild(encabezado);

        editoriales.forEach(autor => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${autor.nombre}</td><td>${autor.telefono }</td><td>${autor.correo}</td><td>${autor.estado}</td>`;
            tabla.appendChild(fila);
        });

        resultado.appendChild(tabla); // Agregar tabla al contenedor de resultados
    }
});
