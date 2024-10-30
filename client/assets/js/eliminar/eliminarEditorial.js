import { URL } from "../../../modules/config.js";
import { envia } from "../../../modules/ajax.js";

document.addEventListener("DOMContentLoaded", async () => {
    const selectEditorial = document.getElementById("selectEditorial");
    const btneliminarEditorial = document.getElementById("btneliminarEditorial");
    const resultadoInactivos = document.getElementById("resultadoInactivos");

    await cargarEditActivos(); // Cargar editoriales activas al inicio
    await cargarEditInactivos(); // Cargar editoriales inactivas al inicio

    btneliminarEditorial.addEventListener("click", async () => {
        const editId = selectEditorial.value;
        if (editId) {
            await eliminarEditorial(editId);
            await cargarEditActivos(); // Actualizar la lista de editoriales activas
            await cargarEditInactivos(); // Actualizar la lista de editoriales inactivas
        } else {
            alert("Por favor, selecciona una editorial para eliminar.");
        }
    });

    async function cargarEditActivos() {
        const editoriales = await envia("editoriales");
        const editorialesActivas = editoriales.filter(editorial => editorial.estado === 'activo');

        selectEditorial.innerHTML = '<option value="" disabled selected>Seleccione una editorial...</option>'; // Restablecer la opción predeterminada
        editorialesActivas.forEach(editorial => {
            const option = document.createElement("option");
            option.value = editorial.id; 
            option.textContent = `${editorial.nombre}`;
            selectEditorial.appendChild(option);
        });
    }

    async function eliminarEditorial(id) {
        // Cambia el estado de la editorial a inactivo en la base de datos
        const response = await fetch(`${URL}/editoriales/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ estado: "inactivo" })
        });

        if (response.ok) {
            alert("Editorial eliminada exitosamente.");
        } else {
            alert("Error al eliminar la editorial.");
        }
    }

    async function cargarEditInactivos() {
        const editoriales = await envia("editoriales");
        const editorialesInactivas = editoriales.filter(editorial => editorial.estado === 'inactivo');

        mostrarResultadosInactivos(editorialesInactivas);
    }

    function mostrarResultadosInactivos(editoriales) {
        resultadoInactivos.innerHTML = "<h2 class='main-content__h2'>Editoriales Inactivas</h2>";

        if (editoriales.length === 0) {
            resultadoInactivos.innerHTML += "<p>No hay editoriales inactivas.</p>";
            return;
        }

        const tabla = document.createElement("table");
        tabla.className = "resultado__tabla";

        const encabezado = document.createElement("tr");
        encabezado.innerHTML = "<th>Nombre</th><th>Correo</th><th>Teléfono</th><th>Estado</th>";
        tabla.appendChild(encabezado);

        editoriales.forEach(editorial => {
            const fila = document.createElement("tr");
            fila.innerHTML = `<td>${editorial.nombre}</td><td>${editorial.correo}</td><td>${editorial.telefono}</td><td>${editorial.estado}</td>`;
            tabla.appendChild(fila);
        });

        resultadoInactivos.appendChild(tabla); 
    }
});
