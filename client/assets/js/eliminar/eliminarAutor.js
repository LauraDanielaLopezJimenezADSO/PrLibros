import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectAutor = document.getElementById("selectAutor");
    const btnEliminarAutor = document.getElementById("btnEliminarAutor");
    const resultadoInactivos = document.getElementById("resultadoInactivos"); // Cambia aquí

    
    await cargarAutoresActivos(); // Cargar autores activos e inactivos al inicio
    await cargarAutoresInactivos(); // Cargar autores inactivos al inicio

    btnEliminarAutor.addEventListener("click", async () => {
        const autorId = selectAutor.value;
        if (autorId) {
            await eliminarAutor(autorId);
            // Cargar autores inactivos después de eliminar uno
            await cargarAutoresInactivos();
        } else {
            alert("Por favor, selecciona un autor para eliminar.");
        }
    });

    async function cargarAutoresActivos() {
        const autores = await envia("autores");
        const autoresActivos = autores.filter(autor => autor.estado === 'activo');

        // Limpiar el select antes de agregar opciones
        selectAutor.innerHTML = '<option value="" disabled selected>Seleccione un autor...</option>'; // Restablecer la opción predeterminada
        autoresActivos.forEach(autor => {
            const option = document.createElement("option");
            option.value = autor.id; 
            option.textContent = `${autor.nombre} ${autor.apellido}`;
            selectAutor.appendChild(option);
        });
    }

    async function eliminarAutor(id) {
        // Cambia el estado del autor a inactivo en la base de datos
        const response = await fetch(`${URL}/autores/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: "inactivo" })
        });

        if (response.ok) {
            alert("Autor eliminado exitosamente.");
        } else {
            alert("Error al eliminar el autor.");
        }
    }

    async function cargarAutoresInactivos() {
        const autores = await envia("autores");
        const autoresInactivos = autores.filter(autor => autor.estado === 'inactivo');

        mostrarResultadosInactivos(autoresInactivos);
    }

    function mostrarResultadosInactivos(autores) {
        // Limpiar resultados anteriores
        resultadoInactivos.innerHTML = "<h2 class='main-content__h2'>Autores Inactivos</h2>"; // Mantener el encabezado

        if (autores.length === 0) {
            resultadoInactivos.innerHTML += "<p>No hay autores inactivos.</p>";
            return;
        }

        // Tabla para mostrar los resultados
        const tabla = document.createElement("table");
        tabla.className = "resultado__tabla";

        const encabezado = document.createElement("tr");
        encabezado.innerHTML = "<th>Nombre</th><th>Apellido</th><th>Estado</th>";
        tabla.appendChild(encabezado);

        autores.forEach(autor => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${autor.nombre}</td><td>${autor.apellido}</td><td>${autor.estado}</td>`;
            tabla.appendChild(fila);
        });

        resultadoInactivos.appendChild(tabla); 
    }
});
